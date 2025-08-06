import { PrismaClient, RentalStatus, ReservationStatus } from '@prisma/client'
import { appConfig } from '@shared/constants/config'
import { GraphQLError } from 'graphql'

export class ReservationService {
  constructor (private readonly prisma: PrismaClient) {}

  async userCanReserve (userId: string) {
    const maxActiveReservations = appConfig.maxReservationsPerUser

    const activeReservations = await this.prisma.reservation.findMany({
      where: {
        userId,
        OR: [
          {
            status: ReservationStatus.PENDING
          },
          {
            status: ReservationStatus.PACKED
          }
        ]
      },
      include: {
        gameUnits: {
          select: {
            gameUnitId: true
          }
        }
      }
    })

    const activeRents = await this.prisma.rental.count({
      where: {
        userId,
        status: {
          equals: RentalStatus.RENTED
        }
      }
    })

    if (activeReservations.length >= maxActiveReservations) {
      throw new GraphQLError('error.reservation.maxActiveReservations', {
        extensions: {
          count: appConfig.maxReservationsPerUser
        }
      })
    }
    const reservedGames = activeReservations.reduce((acc, reservation) => acc + reservation.gameUnits.length, 0)

    if (activeRents + reservedGames >= appConfig.maxGamesTotal) {
      throw new GraphQLError('error.reservation.maxGamesReached', {
        extensions: {
          available: Math.max(0, appConfig.maxGamesTotal - (activeRents + reservedGames))
        }
      })
    }
  }

  async generateReservationCode (): Promise<string> {
    const reservationCode = Math.random().toString(36).substr(2, 5).toUpperCase()

    const existingReservation = await this.prisma.reservation.findFirst({
      where: {
        reservationCode,
        OR: [
          {
            status: ReservationStatus.PENDING
          },
          {
            status: ReservationStatus.PACKED
          }
        ]
      }
    })

    if (existingReservation) {
      return this.generateReservationCode()
    }

    return reservationCode
  }
}
