import { PrismaClient } from '@prisma/client'

export class RentalService {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async generateBookingId (prismaTx: PrismaClient): Promise<string> {
    const year = new Date().getFullYear()

    const lastBooking = await (prismaTx || this.prisma).rental.findFirst({
      where: {
        bookingId: {
          startsWith: `${year}`
        }
      },
      orderBy: {
        bookingId: 'desc'
      }
    })

    if (!lastBooking) {
      return `${year}-00001`
    }

    const lastBookingId = lastBooking.bookingId
    const lastBookingNumber = parseInt(lastBookingId.split('-')[1])

    const newBookingNumber = lastBookingNumber + 1

    return `${year}-${newBookingNumber.toString().padStart(5, '0')}`
  }
}
