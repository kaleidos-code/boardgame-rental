import { Arg, Authorized, Int, Mutation, Query, Resolver, FieldResolver, Root } from 'type-graphql'
import prisma from '@api/lib/prisma'
import type { AuthSessionUser } from '@typings/auth'
import { GraphQLError } from 'graphql'
import { MailingTemplates } from '@typings/mailing'
import { appConfig } from '@shared/constants/config'
import { convertToSeconds } from '@utils/format'
import { WeekDay } from '@typings/graphql'

import { UserSession } from '../decorator/userEntity'
import { PermissionScope } from '../decorator/permissionScope'
import { FilterInput } from '../pagination/dto/FilterInput'
import { OrderInput } from '../pagination/dto/OrderInput'
import { User } from '../user/models/User'
import { GameUnit } from '../gameUnit/models/GameUnit'
import { PaginationService } from '../pagination/PaginationService'
import { GameUnitService } from '../gameUnit/GameUnitService'
import { sendMail } from '../lib/mail'
import { TermsService } from '../terms/TermsService'

import { Reservation, ReservationStatus } from './models/ReservationModel'
import { PaginatedReservations } from './models/PaginatedReservations'
import { CreateReservationInput } from './dto/CreateReservationInput'
import { ReservationService } from './ReservationService'
import { UpdateReservationInput } from './dto/UpdateReservationInput'
import { CancelReservationInput } from './dto/CancelReservationInput'

@Resolver(() => Reservation)
export class ReservationResolver {
  private readonly reservationService: ReservationService
  private readonly paginationService: PaginationService
  private readonly gameUnitService: GameUnitService
  private readonly termsService: TermsService

  constructor () {
    this.reservationService = new ReservationService(prisma)
    this.paginationService = new PaginationService(prisma)
    this.gameUnitService = new GameUnitService(prisma)
    this.termsService = new TermsService(prisma)
  }

  @Authorized(['reservation:read', 'reservation:read.own'])
  @Query(() => Reservation, { nullable: true })
  async reservation (
    @Arg('id') id: string,
    @UserSession() user: AuthSessionUser,
    @PermissionScope('reservation:read') scope: string) {
    return await prisma.reservation.findUnique({
      where: {
        id,
        ...(scope !== 'all' && { userId: user.id })
      }
    })
  }

  @Authorized(['reservation:read.own'])
  @Query(() => [Reservation])
  async myReservations (
    @UserSession() user: AuthSessionUser,
    @Arg('status', () => [ReservationStatus], { nullable: true }) status?: ReservationStatus
  ) {
    return await prisma.reservation.findMany({
      where: {
        userId: user.id,
        ...(status && {
          status: {
            in: Array.isArray(status) ? status : [status]
          }
        })
      },
      orderBy: {
        createdAt: 'asc'
      },
      take: 50
    })
  }

  @Authorized(['reservation:read'])
  @Query(() => PaginatedReservations)
  async reservationsPaginated (
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
    const tableName = Reservation.name

    const dataBase = process.env.POSTGRES_DB
    const columns = Object.keys(prisma.reservation.fields)
      .filter(key => key !== 'status')
      .map(key => `"${tableName}"."${key}"`)
      .join(', ')

    const pickUpPeriodInSeconds = convertToSeconds(appConfig.pickUpPeriod)

    const hasStatusFilter = filterBy?.some(filter => filter.columnAccessor === 'status')

    const joinedTable = `
    WITH "${tableName}" AS (
      SELECT ${columns}, CONCAT("renter"."firstname", ' ', "renter"."lastname", ' (', "renter"."email", ')') AS "user",
      CAST(status AS TEXT) AS "status",

      string_agg(
        CONCAT(
          LPAD(CAST("game"."gameShortId" AS TEXT), 4, '0'), 
          '_', 
          "unit"."unitShortId"
        )::text, 
        ' '
      ) AS "gameUnits",
      string_agg("game"."title", ' ') AS "games",
      (NOW() > ("${tableName}"."createdAt" + INTERVAL '${pickUpPeriodInSeconds} seconds')) AS "overDue"
      FROM 
      "${dataBase}"."${tableName}"
      LEFT JOIN 
      "${dataBase}"."User" AS "renter" ON "${dataBase}"."Reservation"."userId" = "renter"."id"
      LEFT JOIN 
      "${dataBase}"."GameUnitReservation" AS "unitRes" ON "${dataBase}"."Reservation"."id" = "unitRes"."reservationId"
      LEFT JOIN 
      "${dataBase}"."GameUnit" AS "unit" ON "unit"."id" = "unitRes"."gameUnitId"
      LEFT JOIN
      "${dataBase}"."Game" AS "game" ON "unit"."gameId" = "game"."id"
      ${(includeAll || hasStatusFilter)
? ''
: `WHERE "${tableName}"."status" = '${ReservationStatus.PENDING}' 
        OR "${tableName}"."status" = '${ReservationStatus.PACKED}'`}
      GROUP BY "${tableName}"."id", "renter"."firstname", "renter"."lastname", "renter"."email"
    )`

    return await this.paginationService.getPaginatedResponse<PaginatedReservations, Reservation>(
      {
        table: joinedTable,
        tableName
      },
      {
        offset,
        limit
      },
      orderBy,
      filterBy
    )
  }

  @Authorized(['reservation:create'])
  @Mutation(() => Reservation)
  async createReservation (
    @Arg('games', () => [CreateReservationInput]) games: CreateReservationInput[],
    @UserSession() user: AuthSessionUser
  ) {
    const unacceptedTerms = await this.termsService.getUnacceptedTerms(user.id)

    if (unacceptedTerms.length > 0) {
      throw new GraphQLError('error.terms.unacceptedTerms')
    }

    const reservationCode = await this.reservationService.generateReservationCode()

    await this.reservationService.userCanReserve(user.id)

    if (!user.emailVerified) {
      throw new GraphQLError('error.user.emailNotVerified')
    }
    if (games.length > appConfig.maxGamesPerRenting) {
      throw new GraphQLError('error.reservation.maxGames')
    }

    const gameUnits = await this.gameUnitService.getAvailableGameUnits(prisma, games)

    await sendMail({
      to: user.email,
      subject: {
        key: 'mail.reservationConfirmation.subject',
        props: {
          code: reservationCode
        }
      },
      template: MailingTemplates.RESERVATION_CONFIRMATION,
      templateProps: {
        reservationCode,
        name: user.firstname,
        gameUnits
      }
    })

    return await prisma.reservation.create({
      data: {
        gameUnits: {
          createMany: {
            data: gameUnits.map(gameUnit => ({
              gameUnitId: gameUnit.id
            }))
          }
        },
        userId: user.id,
        reservationCode,
        status: ReservationStatus.PENDING
      }
    })
  }

  @Authorized(['reservation:update', 'reservation:update.own'])
  @Mutation(() => Reservation)
  async updateReservation (
    @Arg('id') id: string,
    @Arg('data') data: UpdateReservationInput,
    @UserSession() user: AuthSessionUser,
    @PermissionScope('reservation:update') scope: string
  ) {
    const { gameIds } = data

    const gameUnits = await prisma.gameUnit.findMany({
      where: {
        reservations: {
          some: {
            reservationId: id,
            ...(scope !== 'all' && {
              reservation: {
                userId: user.id
              }
            })
          }
        }
      }
    })

    const deleteGameUnits = gameUnits.filter(gameUnit => !gameIds?.includes(gameUnit.id))

    const updated = await prisma.reservation.update({
      where: {
        id
      },
      data: {
        gameUnits: {
          deleteMany: deleteGameUnits.map(gameUnit => ({
            gameUnitId: gameUnit.id
          }))
        }
      },
      include: {
        gameUnits: true
      }
    })

    if (updated.gameUnits.length === 0) {
      await prisma.reservation.update({
        where: {
          id
        },
        data: {
          status: ReservationStatus.CANCELLED,
          cancelledAt: new Date()
        }
      })
    }

    return updated
  }

  @Authorized(['reservation:update'])
  @Mutation(() => Reservation)
  async setReservationPacked (
    @Arg('id') id: string
  ) {
    const reservation = await prisma.reservation.update({
      where: {
        id
      },
      include: {
        user: true
      },
      data: {
        status: ReservationStatus.PACKED
      }
    })

    const pickUpDays = await prisma.pickUpDay.findMany({
      include: {
        pickUpTimes: true
      }
    })

    await sendMail({
      to: reservation.user.email,
      subject: {
        key: 'mail.reservationPickUpConfirmation.subject',
        props: {
          code: reservation.reservationCode
        }
      },
      template: MailingTemplates.RESERVATION_PICK_UP_CONFIRMATION,
      templateProps: {
        reservationCode: reservation.reservationCode,
        name: reservation.user.firstname,
        pickUpDays: pickUpDays.map(pickUpDay => ({
          dayOfWeek: pickUpDay.dayOfWeek as WeekDay,
          pickUpTimes: pickUpDay.pickUpTimes.map(pickUpTime => ({
            from: pickUpTime.from,
            to: pickUpTime.to
          }))
        }))
      }
    })

    return reservation
  }

  @Authorized(['reservation:cancel', 'reservation:cancel.own'])
  @Mutation(() => Reservation)
  async cancelReservation (
    @Arg('id') id: string,
    @UserSession() user: AuthSessionUser,
    @PermissionScope('reservation:cancel') scope: string,
    @Arg('data', { nullable: true }) data?: CancelReservationInput
  ) {
    const { reason } = data || {}

    const reservation = await prisma.reservation.findUnique({
      where: {
        id,
        ...(scope !== 'all' && { userId: user.id })
      },
      include: {
        user: true
      }
    })

    if (!reservation) {
      throw new GraphQLError('error.reservation.notFound')
    }

    if (scope !== 'all' && reservation.userId !== user.id) {
      throw new GraphQLError('error.reservation.notAllowed')
    }

    const updated = await prisma.reservation.update({
      where: {
        id
      },
      data: {
        status: ReservationStatus.CANCELLED,
        cancelledAt: new Date()
      }
    })

    await sendMail({
      to: reservation.user.email,
      subject: {
        key: 'mail.reservationCanceled.subject',
        props: {
          code: reservation.reservationCode
        }
      },
      template: MailingTemplates.RESERVATION_CANCELLED,
      templateProps: {
        name: reservation.user.firstname,
        reason: reason || '',
        reservationCode: updated.reservationCode,
        own: reservation.userId === user.id
      }
    })

    return updated
  }

  @FieldResolver(() => User)
  async user (@Root() parent: Reservation) {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId
      }
    })
  }

  @FieldResolver(() => [GameUnit])
  async gameUnits (@Root() parent: Reservation) {
    return await prisma.gameUnit.findMany({
      where: {
        reservations: {
          some: {
            reservationId: parent.id
          }
        },
        game: {
          deletedAt: null
        }
      }
    })
  }
}
