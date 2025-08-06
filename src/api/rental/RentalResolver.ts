import { Arg, Authorized, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql'
import prisma from '@api/lib/prisma'
import { PrismaClient, ReservationStatus } from '@prisma/client'
import { GraphQLError } from 'graphql'
import { convertToSeconds } from '@utils/format'
import { appConfig } from '@shared/constants/config'
import type { AuthSessionUser } from '@typings/auth'
import { WeekDay } from '@typings/graphql'
import { MailingTemplates } from '@typings/mailing'

import { FilterInput } from '../pagination/dto/FilterInput'
import { OrderInput } from '../pagination/dto/OrderInput'
import { PaginationService } from '../pagination/PaginationService'
import { GameUnit } from '../gameUnit/models/GameUnit'
import { User } from '../user/models/User'
import { PermissionScope } from '../decorator/permissionScope'
import { UserSession } from '../decorator/userEntity'
import { sendMail } from '../lib/mail'

import { Rental, RentalStatus } from './models/Rental'
import { CreateRentalInput } from './dto/CreateRentalInput'
import { RentalService } from './RentalService'
import { PaginatedRentals } from './models/PaginatedRentals'
import { UpdateRentalInput } from './dto/UpdateRentalInput'

@Resolver(() => Rental)
export class RentalResolver {
  private rentalService: RentalService
  private paginationService: PaginationService

  constructor () {
    this.rentalService = new RentalService(prisma)
    this.paginationService = new PaginationService(prisma)
  }

  @Authorized(['rental:read', 'rental:read.own'])
  @Query(() => PaginatedRentals)
  async rentalsPaginated (
    @UserSession() user: AuthSessionUser,
    @PermissionScope('reservation:read') scope: string,
    @Arg('offset', () => Int)
      offset: number,
    @Arg('limit', () => Int)
      limit: number,
    @Arg('includeAll', { nullable: true })
      includeAll?: boolean,
    @Arg('orderBy', () => [OrderInput], { nullable: true })
      orderBy?: OrderInput[],
    @Arg('filterBy', () => [FilterInput], { nullable: true })
      filterBy?: FilterInput[]
  ) {
    const tableName = Rental.name

    const dataBase = process.env.POSTGRES_DB
    const columns = Object.keys(prisma.rental.fields)
      .filter(key => key !== 'status')
      .map(key => `"${tableName}"."${key}"`)
      .join(', ')

    let additionalWhere = ''

    if (scope !== 'all') {
      additionalWhere = `"${tableName}"."userId" = '${user.id}'`
    }

    const hasStatusFilter = filterBy?.some(filter => filter.columnAccessor === 'status')

    const joinedTable = `
    WITH "${tableName}" AS (
      SELECT ${columns}, CONCAT("renter"."firstname", ' ', "renter"."lastname", ' (', "renter"."email", ')') AS "user",
      "gameTable"."deletedAt" AS "deletedAt",
      "gameTable"."title" AS "game",
      CONCAT(LPAD(CAST("gameTable"."gameShortId" AS TEXT), 4, '0'), '_', "unit"."unitShortId") AS "gameUnit",
      CAST(status AS TEXT) AS "status"
      FROM 
      "${dataBase}"."${tableName}"
      LEFT JOIN 
      "${dataBase}"."GameUnit" AS "unit" ON "${dataBase}"."${tableName}"."gameUnitId" = "unit"."id"
      LEFT JOIN
      "${dataBase}"."Game" AS "gameTable" ON "unit"."gameId" = "gameTable"."id"
      LEFT JOIN 
      "${dataBase}"."User" AS "renter" ON "${dataBase}"."${tableName}"."userId" = "renter"."id"
      ${(includeAll || hasStatusFilter) ? '' : `WHERE "${tableName}"."status" != '${RentalStatus.RETURNED}'`}
      GROUP BY "${tableName}"."id", "renter"."firstname", "renter"."lastname", "renter"."email", 
      "gameTable"."deletedAt", "gameTable"."title", "gameTable"."gameShortId", "unit"."unitShortId"
    )`

    return await this.paginationService.getPaginatedResponse<PaginatedRentals, Rental>(
      {
        table: joinedTable,
        tableName,
        additionalWhere
      },
      {
        offset,
        limit
      },
      orderBy,
      filterBy
    )
  }

  @Authorized(['rental:create'])
  @Mutation(() => [Rental])
  async createRentalsByReservation (
    @Arg('data') data: CreateRentalInput
  ) {
    return await prisma.$transaction(async (prismaTx) => {
      const rentals = []

      const reservation = await prismaTx.reservation.findUnique({
        where: {
          id: data.reservationId
        },
        include: {
          gameUnits: {
            where: {
              gameUnit: {
                game: {
                  deletedAt: null
                }
              }
            },
            include: {
              gameUnit: {
                include: {
                  game: true
                }
              }
            }
          },
          user: true
        }
      })

      if (!reservation) {
        throw new GraphQLError('error.reservation.notFound')
      }

      if (reservation.status !== ReservationStatus.PENDING && reservation.status !== ReservationStatus.PACKED) {
        throw new GraphQLError('error.reservation.canceldOrCompleted')
      }

      const unavailableGameUnits = []

      for (const gameUnit of reservation.gameUnits) {
        const gameUnitRental = await prismaTx.rental.findFirst({
          where: {
            gameUnitId: gameUnit.gameUnitId,
            status: RentalStatus.RENTED
          }
        })

        if (gameUnitRental) {
          unavailableGameUnits.push(gameUnit)
        }
      }

      if (unavailableGameUnits.length > 0) {
        throw new GraphQLError('error.gameUnit.alreadyRented', {
          extensions: {
            units: unavailableGameUnits.map((unit) => unit.gameUnit.unitShortId).join(', ')
          }
        })
      }

      for (const gameUnit of reservation.gameUnits) {
        const bookingId = await this.rentalService.generateBookingId(prismaTx as PrismaClient)

        const rental = await prismaTx.rental.create({
          data: {
            rentedAt: new Date(),
            bookingId,
            gameUnitId: gameUnit.gameUnitId,
            userId: reservation.userId,
            reservationId: reservation.id,
            dueDate: new Date(new Date().getTime() + convertToSeconds(appConfig.rentingPeriod) * 1000)
          }
        })

        rentals.push(rental)
      }
      const pickUpDays = await prisma.pickUpDay.findMany({
        include: {
          pickUpTimes: true
        }
      })

      await sendMail({
        to: reservation.user.email,
        subject: {
          key: 'mail.rentalConfirmation.subject'
        },
        template: MailingTemplates.RENTAL_CONFIRMATION,
        templateProps: {
          name: reservation.user.firstname,
          reservationCode: reservation.reservationCode,
          dueDate: rentals[0].dueDate,
          pickUpDays: pickUpDays.map(pickUpDay => ({
            dayOfWeek: pickUpDay.dayOfWeek as WeekDay,
            pickUpTimes: pickUpDay.pickUpTimes.map(pickUpTime => ({
              from: pickUpTime.from,
              to: pickUpTime.to
            }))
          })),
          gameUnits: reservation.gameUnits.map((unit) => ({
            ...unit.gameUnit,
            previxedId: `${String(unit.gameUnit.game.gameShortId).padStart(4, '0')}_${String(unit.gameUnit.unitShortId).padStart(2, '0')}`,
            title: unit.gameUnit.game.title
          }
          )) || []
        }
      })

      await prismaTx.reservation.update({
        where: {
          id: reservation.id
        },
        data: {
          status: ReservationStatus.COMPLETED
        }
      })

      return rentals
    })
  }

  @Authorized(['rental:update'])
  @Mutation(() => Rental)
  async returnRental (
    @Arg('id') id: string
  ) {
    return await prisma.$transaction(async (prismaTx) => {
      const rental = await prismaTx.rental.findUnique({
        where: {
          id
        }
      })

      if (!rental) {
        throw new GraphQLError('error.rental.notFound')
      }

      if (rental.returnedAt) {
        throw new GraphQLError('error.rental.alreadyReturned')
      }

      const updated = await prismaTx.rental.update({
        where: {
          id
        },
        data: {
          returnedAt: new Date(),
          status: RentalStatus.RETURNED
        },
        include: {
          user: true,
          gameUnit: {
            include: {
              game: true
            }
          }
        }
      })

      await sendMail({
        to: updated.user.email,
        subject: {
          key: 'mail.rentalReturned.subject',
          props: {
            gameTitle: updated.gameUnit.game.title
          }
        },
        template: MailingTemplates.RENTAL_RETURNED,
        templateProps: {
          name: updated.user.firstname,
          rental: {
            ...updated,
            gameTitle: updated.gameUnit.game.title,
            gameUnit: `${String(updated.gameUnit.game.gameShortId).padStart(4, '0')}_${updated.gameUnit.unitShortId}`
          }
        }
      })

      return updated
    })
  }

  @Authorized(['rental:update'])
  @Mutation(() => Rental)
  async updateRental (
    @Arg('id') id: string,
    @Arg('data') data: UpdateRentalInput
  ) {
    return await prisma.rental.update({
      where: {
        id
      },
      data
    })
  }

  @FieldResolver(() => GameUnit, { nullable: true })
  async gameUnit (@Root() parent: Rental) {
    return await prisma.gameUnit.findFirst({
      where: {
        rentals: {
          some: {
            id: parent.id
          }
        },
        game: {
          deletedAt: null
        }
      }
    })
  }

  @FieldResolver(() => User)
  async user (@Root() parent: Rental) {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId
      }
    })
  }
}
