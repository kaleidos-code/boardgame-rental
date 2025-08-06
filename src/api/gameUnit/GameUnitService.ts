import { GameUnit, Game, PrismaClient, ReservationStatus } from '@prisma/client'
import { GameUnitWithTitle } from '@typings/game'
import { GraphQLError } from 'graphql'

export class GameUnitService {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async getGameWithAvailableUnits (
    id: string,
    prisma: PrismaClient
  ) {
    return await prisma.game.findUnique({
      where: {
        id
      },
      include: {
        gameUnits: {
          where: {
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
          },
          orderBy: {
            incomplete: 'asc'
          }
        }
      }
    })
  }

  async getAvailableGameUnits (
    prisma: PrismaClient,
    games: {
      gameId: string
      quantity?: number
    }[]
  ): Promise<GameUnitWithTitle[]> {
    const gameItems: (Game & { gameUnits: GameUnit[] })[] = []

    for (const gameItem of games) {
      const game = await this.getGameWithAvailableUnits(gameItem.gameId, prisma)

      if (!game) {
        throw new GraphQLError('error.game.notFound', {
          extensions: {
            title: gameItem.gameId
          }
        })
      }

      gameItems.push(game)
    }

    const missingGames = gameItems.reduce<Game[]>((acc, gameItem) => {
      const quantity = games.find(game => game.gameId === gameItem.id)?.quantity || 1

      if (gameItem && gameItem.gameUnits.length < quantity) {
        acc.push(gameItem)
      }

      return acc
    }, [])

    if (missingGames.length > 0) {
      throw new GraphQLError('error.gameUnit.notAvailableUnits', {
        extensions: {
          games: missingGames.map(game => game.title).join(', ')
        }
      })
    }

    return gameItems.reduce<GameUnitWithTitle[]>((acc, game) => {
      const gameUnits = game.gameUnits.slice(0, games.find(gameItem => gameItem.gameId === game.id)?.quantity || 1)

      return [...acc, ...gameUnits.map(gameUnit => ({
        ...gameUnit,
        previxedId: `${String(game.gameShortId).padStart(4, '0')}_${String(gameUnit.unitShortId).padStart(2, '0')}`,
        title: game.title
      }))]
    }, [] as GameUnitWithTitle[])
  }

  async checkGameUnitAvailability (prisma: PrismaClient, gameUnitId: string): Promise<boolean> {
    const gameUnit = await prisma.gameUnit.findUnique({
      where: {
        id: gameUnitId,
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

    return !!gameUnit
  }
}
