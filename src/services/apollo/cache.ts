import {
  NextSSRInMemoryCache
} from '@apollo/experimental-nextjs-app-support/ssr'
import { appConfig } from '@shared/constants/config'
import { GameUnitDataFragment, GameUnitDataFragmentDoc, ReservationStatus } from '@typings/graphql'
import { convertToSeconds } from '@utils/format'

export const cache = new NextSSRInMemoryCache({
  typePolicies: {
    Game: {
      keyFields: ['id'],
      fields: {
        available: {
          read (_, { readField }) {
            const availableUnits = readField('availableUnits') as number

            return availableUnits > 0
          }
        },
        incomplete: {
          read (_, { readField, cache: apolloCache }) {
            const units = readField('units') as any[]
            const unitData = units?.map((unit) => apolloCache.readFragment({
              id: apolloCache.identify(unit),
              fragment: GameUnitDataFragmentDoc
            })) as GameUnitDataFragment[]

            return !!unitData.filter((unit) => unit.available)?.every((unit) => unit.incomplete)
          }
        }
      }
    },
    Reservation: {
      keyFields: ['id'],
      fields: {
        overDue: {
          read (_, { readField }) {
            const createdAt = readField('createdAt') as string
            const status = readField('status') as string

            const createdAtDate = new Date(createdAt)

            const pickUpPeriodInSeconds = convertToSeconds(appConfig.pickUpPeriod)
            const overDueDate = new Date(createdAtDate.getTime() + pickUpPeriodInSeconds * 1000)

            return overDueDate < new Date() && (status === ReservationStatus.Pending || status === ReservationStatus.Packed)
          }
        }
      }
    }
  }
})
