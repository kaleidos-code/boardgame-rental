import { Arg, Authorized, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql'
import prisma from '@api/lib/prisma'
import { Prisma, ReservationStatus } from '@prisma/client'
import { GraphQLJSON } from 'graphql-scalars'
import { TextService } from '@api/text/TextService'
import { FileScalar } from '@api/reservation/scalar/FileScalar'
import { GraphQLError } from 'graphql'

import { FileService } from '../file/FileService'
import { UploadFileInput } from '../file/dto/UploadFileInput'
import { GameUnit } from '../gameUnit/models/GameUnit'
import { File as FileModel } from '../file/models/File'
import { Tag } from '../tag/models/Tag'
import { OrderInput } from '../pagination/dto/OrderInput'
import { PaginationService } from '../pagination/PaginationService'
import { FilterInput } from '../pagination/dto/FilterInput'

import { CreateGameInput } from './dto/CreateGameInput'
import { UpdateGameInput } from './dto/UpdateGameInput'
import { Game } from './models/Game'
import { PaginatedGames } from './models/PaginatedGames'
import { GameService } from './GameService'

@Resolver(() => Game)
export class GameResolver {
  private paginationService: PaginationService
  private gameService: GameService
  private fileService: FileService
  private textService: TextService

  constructor () {
    this.paginationService = new PaginationService(prisma)
    this.gameService = new GameService(prisma)
    this.fileService = new FileService(prisma)
    this.textService = new TextService(prisma)
  }

  @Authorized('game:read')
  @Query(() => Game)
  async game (
    @Arg('id') id: string
  ) {
    return await prisma.game.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })
  }

  @Authorized('game:read')
  @Query(() => [Game])
  async games () {
    return await prisma.game.findMany({
      where: {
        deletedAt: null
      }
    })
  }

  @Query(() => [Game])
  async gamesByIds (@Arg('games', () => [String]) games: string[]) {
    return await prisma.game.findMany({
      where: {
        id: {
          in: games
        }
      }
    })
  }

  @Query(() => PaginatedGames)
  async gamesPaginated (
    @Arg('offset', () => Int)
      offset: number,
    @Arg('limit', () => Int)
      limit: number,
    @Arg('orderBy', () => [OrderInput], { nullable: true })
      orderBy?: OrderInput[],
    @Arg('filterBy', () => [FilterInput], { nullable: true })
      filterBy?: FilterInput[],
    @Arg('search', { nullable: true })
      search?: string
  ) {
    const dataBase = process.env.POSTGRES_DB
    const gameColumns = Object.keys(prisma.game.fields).filter(key => key !== 'gameShortId')
      .map(key => `"Game"."${key}"`)
      .join(', ')

    const tableName = Game.name

    const additionalWhere = search
      ? `(LOWER("${tableName}"."title") LIKE LOWER('%${search.trimStart()}%') 
        OR LOWER("${tableName}"."publisher") LIKE LOWER('%${search.trimStart()}%'))
        OR LOWER("${tableName}"."ean") LIKE LOWER('%${search.trimStart()}%')`
      : ''

    const joinedTable = `
    WITH "${tableName}" AS (
      SELECT ${gameColumns},
      array_agg("gameTags"."tagId") FILTER (WHERE "gameTags"."tagId" IS NOT NULL) AS "tags",
      LPAD(CAST("Game"."gameShortId" AS TEXT), 4, '0') AS "gameShortId",
      COUNT(DISTINCT "gameUnits"."id") AS "units",
      CASE 
        WHEN COUNT(DISTINCT "rentals"."id") + COUNT(DISTINCT "reservations"."id")< COUNT(DISTINCT "gameUnits"."id") THEN TRUE
        ELSE FALSE
      END as "available"
      FROM 
      "${dataBase}"."${tableName}"
      LEFT JOIN "${dataBase}"."GameUnit" AS "gameUnits" ON "Game"."id" = "gameUnits"."gameId"
      LEFT JOIN "${dataBase}"."GameTag" AS "gameTags" ON "Game"."id" = "gameTags"."gameId"
      LEFT JOIN "${dataBase}"."GameUnitReservation" AS "gameUnitReservation" ON "gameUnits"."id" = "gameUnitReservation"."gameUnitId"
      LEFT JOIN "${dataBase}"."Reservation" AS "reservations" ON 
        "gameUnitReservation"."reservationId" = "reservations"."id" AND "reservations"."status" = 'PENDING'
      LEFT JOIN "${dataBase}"."Rental" AS "rentals" ON "gameUnits"."id" = "rentals"."gameUnitId" AND "rentals"."status" = 'RENTED'
      GROUP BY "${tableName}"."id"
    )`

    return await this.paginationService.getPaginatedResponse<PaginatedGames, Game>(
      {
        table: joinedTable,
        tableName,
        hasSoftDelete: true,
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

  @Authorized('game:create')
  @Mutation(() => Game)
  async createGame (
    @Arg('data') data: CreateGameInput,
    @Arg('uploads', () => [FileScalar], { nullable: true })
      uploads: UploadFileInput[]
  ) {
    const { gameUnits, texts, tags, ...rest } = data

    try {
      const transaction = await prisma.$transaction(async (prismaTx) => {
        const result = await prismaTx.game.create({
          data: {
            ...rest,
            gameUnits: {
              create: gameUnits?.map(unit => ({
                ...(unit.inStock !== null && { inStock: unit.inStock }),
                unitShortId: unit.unitShortId,
                weight: unit.weight,
                incomplete: unit.incomplete
              })) || []
            },
            tags: {
              create: tags?.map(tag => ({
                tag: {
                  connect: {
                    id: tag
                  }
                }
              }))
            }
          },
          include: {
            gameUnits: true
          }
        })

        await this.textService.createOrUpdateTextsFromInputArray(
          texts,
          Game.name,
          result.id,
          prismaTx
        )

        for (const unit of result.gameUnits) {
          await this.textService.createOrUpdateTextsFromInputArray(
            gameUnits?.find(u => u.unitShortId === unit.unitShortId)?.texts || [],
            GameUnit.name,
            unit.id,
            prismaTx
          )
        }

        await this.fileService.handleFileUpload(uploads, Game.name, result.id, prismaTx)

        return result
      })

      return transaction
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new GraphQLError('error.gameList.alreadyExists')
      }

      throw new GraphQLError(error)
    }
  }

  @Authorized('game:update')
  @Mutation(() => Game)
  async updateGame (
    @Arg('id') id: string,
    @Arg('data') data: UpdateGameInput,
    @Arg('uploads', () => [FileScalar], { nullable: true })
      uploads: UploadFileInput[]
  ) {
    const { gameUnits, texts, tags, ...rest } = data

    try {
      const transaction = await prisma.$transaction(async (prismaTx) => {
        const exisitingUnits = await prismaTx.gameUnit.findMany({
          where: {
            gameId: id
          }
        })

        const deletedUnits = exisitingUnits.filter(unit => !gameUnits?.some(newUnit =>
          newUnit.unitShortId === unit.unitShortId
        ))

        const newUnits = gameUnits?.filter(unit => !exisitingUnits.some(existingUnit => existingUnit.unitShortId === unit.unitShortId))
        const updatedUnits = gameUnits?.filter(unit => exisitingUnits.some(existingUnit => existingUnit.unitShortId === unit.unitShortId))

        const updated = await prismaTx.game.update({
          where: {
            id
          },
          data: {
            ...rest,
            gameUnits: {
              deleteMany: {
                id: {
                  in: deletedUnits.map(unit => unit.id)
                }
              },
              create: newUnits?.map(unit => ({
                ...(unit.inStock !== null && { inStock: unit.inStock }),
                unitShortId: unit.unitShortId,
                weight: unit.weight,
                incomplete: unit.incomplete
              })) || [],
              updateMany: updatedUnits?.map(unit => ({
                where: {
                  unitShortId: unit.unitShortId
                },
                data: {
                  ...(unit.inStock !== null && { inStock: unit.inStock }),
                  weight: unit.weight,
                  incomplete: unit.incomplete
                }
              })) || []
            },
            tags: {
              deleteMany: {},
              create: tags?.map(tag => ({
                tag: {
                  connect: {
                    id: tag
                  }
                }
              }))
            }
          },
          include: {
            gameUnits: true
          }
        })

        for (const unit of updated.gameUnits) {
          await this.textService.createOrUpdateTextsFromInputArray(
            gameUnits?.find(u => u.unitShortId === unit.unitShortId)?.texts || [],
            GameUnit.name,
            unit.id,
            prismaTx
          )
        }

        await this.textService.createOrUpdateTextsFromInputArray(
          texts || [],
          Game.name,
          id,
          prismaTx
        )

        const files = await prisma.file.findMany({
          where: {
            model: Game.name,
            modelId: id
          }
        })

        await this.fileService.handleFileUpload(
          uploads,
          Game.name,
          id,
          prismaTx,
          {
            deletedKeys: files.filter(file => !uploads.some(upload => upload.key === file.key)).map(file => file.key)
          }
        )

        return updated
      })

      return transaction
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new GraphQLError('error.gameList.alreadyExists')
      }

      throw new GraphQLError(error)
    }
  }

  @Authorized('game:delete')
  @Mutation(() => Game)
  async softDeleteGame (
    @Arg('id') id: string
  ) {
    try {
      const currentGame = await prisma.game.findUnique({
        where: {
          id
        }
      })

      const deleted = await prisma.game.update({
        where: {
          id
        },
        data: {
          title: `${currentGame?.title} (deleted) ${new Date().toISOString()}`,
          ean: null,
          deletedAt: new Date()
        }
      })

      return deleted
    } catch (error: any) {
      throw new GraphQLError(error)
    }
  }

  @Authorized('game:create')
  @Mutation(() => Boolean)
  async importGames (
    @Arg('upload', () => FileScalar)
      upload: File
  ) {
    return await this.gameService.importGameData(upload)
  }

  @FieldResolver(() => [GameUnit])
  async units (
    @Root() parent: Game
  ): Promise<GameUnit[]> {
    return await prisma.gameUnit.findMany({
      where: {
        gameId: parent.id
      },
      orderBy: {
        unitShortId: 'asc'
      }
    })
  }

  @FieldResolver(() => [Tag])
  async tags (
    @Root() parent: Game
  ): Promise<Tag[]> {
    return await prisma.tag.findMany({
      where: {
        games: {
          some: {
            gameId: parent.id
          }
        }
      }
    })
  }

  @FieldResolver(() => [FileModel], { nullable: true })
  async files (
    @Root() parent: Game
  ): Promise<FileModel[]> {
    return await prisma.file.findMany({
      where: {
        model: Game.name,
        modelId: parent.id
      }
    })
  }

  @FieldResolver(() => Int)
  async availableUnits (
    @Root() parent: Game
  ): Promise<number> {
    return await prisma.gameUnit.count({
      where: {
        gameId: parent.id,
        inStock: true,
        reservations: {
          none: {
            reservation: {
              OR: [{
                status: ReservationStatus.PENDING
              }, {
                status: ReservationStatus.PACKED
              }]
            }
          }
        },
        rentals: {
          none: {
            returnedAt: null
          }
        }
      }
    })
  }

  @FieldResolver(() => Date, { nullable: true })
  async availableAt (
    @Root() parent: Game
  ): Promise<Date> {
    const availableUnits = await this.availableUnits(parent)

    if (availableUnits > 0) {
      return new Date()
    }

    const units = await prisma.gameUnit.findMany({
      where: {
        gameId: parent.id,
        inStock: true,
        rentals: {
          some: {
            returnedAt: null
          }
        }
      },
      include: {
        rentals: {
          where: {
            returnedAt: null
          },
          select: {
            dueDate: true
          }
        }
      }
    })

    const flattenedRentals = units.map(unit => unit.rentals).flat()

    return flattenedRentals.reduce((acc, rental) => {
      if (rental.dueDate < acc) {
        return rental.dueDate
      }

      return acc
    }, flattenedRentals?.[0]?.dueDate)
  }

  @FieldResolver(() => GraphQLJSON)
  async texts (
    @Root() parent: Game
  ): Promise<Record<string, string>> {
    return await this.textService.getModelTexts(Game.name, parent.id)
  }
}
