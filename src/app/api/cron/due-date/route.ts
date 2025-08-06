import prisma from '@api/lib/prisma'
import { sendMail } from '@api/lib/mail'
import { MailingTemplates } from '@typings/mailing'
import { NextResponse } from 'next/server'

export async function GET (req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  console.log('Checking for overdue rentals')
  const rentalCondition = {
    dueDate: {
      lte: new Date()
    },
    OR: [{
      lastReminder: {
        lte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
      }
    }, {
      lastReminder: null
    }],
    returnedAt: null
  }

  const overdueUsers = await prisma.user.findMany({
    where: {
      role: {
        key: 'user'
      },
      rentals: {
        some: rentalCondition
      }
    },
    include: {
      rentals: {
        where: rentalCondition,
        include: {
          gameUnit: {
            include: {
              game: true
            }
          }
        }
      }
    }
  })

  const overdueRentals = overdueUsers.flatMap(user => user.rentals)

  if (overdueRentals.length === 0) {
    console.log('No overdue rentals found')
    return NextResponse.json({ data: 'No overdue rentals found' })
  }

  console.log(`Found ${overdueRentals.length} overdue rentals`)

  for (const user of overdueUsers) {
    console.log(`Sending overdue rental notification to ${user.email}`)

    await sendMail({
      to: user.email,
      subject: {
        key: 'mail.rentalOverdue.subject'
      },
      template: MailingTemplates.RENTAL_OVERDUE,
      templateProps: {
        name: user.firstname,
        rentals: user.rentals.map(rental => ({
          ...rental,
          gameUnit: `${String(rental.gameUnit.game.gameShortId).padStart(4, '0')}_${String(rental.gameUnit.unitShortId).padStart(2, '0')}`,
          gameTitle: rental.gameUnit.game.title
        }))
      }
    })

    await prisma.rental.updateMany({
      where: {
        bookingId: {
          in: user.rentals.map(rental => rental.bookingId)
        }
      },
      data: {
        lastReminder: new Date()
      }
    })
  }
  return NextResponse.json({ data: `${overdueRentals.length} Overdue rentals processed from ${overdueUsers.length} User` })
}
