import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import prisma from '@api/lib/prisma'
import { GraphQLError } from 'graphql'

import { PickUpTime } from '../pickUpTime/models/PickUpTime'

import { PickUpDay } from './models/PickUpDay'
import { CreateUpdatePickUpDayInput } from './dto/CreateUpdatePickUpDayInput'

@Resolver(() => PickUpDay)
export class PickUpDayResolver {
  constructor () {}

  @Query(() => [PickUpDay])
  async pickUpDays () {
    return await prisma.pickUpDay.findMany()
  }

  @Mutation(() => [PickUpDay])
  async createUpdatePickUpDay (
    @Arg('data', () => [CreateUpdatePickUpDayInput]) data: CreateUpdatePickUpDayInput[]
  ) {
    const pickUpDays = []

    const existingPickUpDays = await prisma.pickUpDay.findMany()

    const deletedPickUpDays = existingPickUpDays.filter(existingPickUpDay => {
      return !data.find(day => day.dayOfWeek === existingPickUpDay.dayOfWeek)
    })

    await prisma.pickUpDay.deleteMany({
      where: {
        dayOfWeek: {
          in: deletedPickUpDays.map(day => day.dayOfWeek)
        }
      }
    })

    for (const day of data) {
      const { dayOfWeek, pickUpTimes } = day

      if (!pickUpTimes.length || !pickUpTimes.every(pickUpTime => pickUpTime.from && pickUpTime.to)) {
        throw new GraphQLError('error.pickUpDay.pickUpTimesRequired')
      }

      const pickUpDay = await prisma.pickUpDay.upsert({
        where: { dayOfWeek },
        update: {
          pickUpTimes: {
            deleteMany: {},
            create: pickUpTimes.map(pickUpTime => ({
              from: pickUpTime.from,
              to: pickUpTime.to
            }))
          }
        },
        create: {
          dayOfWeek,
          pickUpTimes: {
            create: pickUpTimes.map(pickUpTime => ({
              from: pickUpTime.from,
              to: pickUpTime.to
            }))
          }
        }
      })

      pickUpDays.push(pickUpDay)
    }

    return pickUpDays
  }

  @FieldResolver(() => [PickUpTime])
  async pickUpTimes (
    @Root() parent: PickUpDay
  ) {
    return await prisma.pickUpTime.findMany({
      where: {
        dayOfWeek: parent.dayOfWeek
      }
    })
  }
}
