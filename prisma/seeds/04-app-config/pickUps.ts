import { PrismaClient, WeekDay } from '@prisma/client'

const pickUpDays = [{
  day: WeekDay.FRIDAY,
  times: [{
    fromTime: '13:00',
    toTime: '15:00'
  }]
}]

export const seedPickUps = async (prisma: PrismaClient) => {
  for (const pickUpDay of pickUpDays) {
    await prisma.pickUpDay.upsert({
      where: {
        dayOfWeek: pickUpDay.day
      },
      update: {
        pickUpTimes: {
          deleteMany: {},
          createMany: {
            skipDuplicates: true,
            data: pickUpDay.times.map(time => ({
              from: time.fromTime,
              to: time.toTime
            }))
          }
        }
      },
      create: {
        dayOfWeek: pickUpDay.day,
        pickUpTimes: {
          createMany: {
            data: pickUpDay.times.map(time => ({
              from: time.fromTime,
              to: time.toTime
            }))
          }
        }
      }
    })
  }

  console.log('Pick up days seeded')
}
