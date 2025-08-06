import { OrderInput } from '@typings/graphql'

export const ORDER_SELECTION_OPTIONS: Record<string, OrderInput> = {
  titleAsc: {
    columnAccessor: 'title',
    direction: 'ASC'
  },
  titleDesc: {
    columnAccessor: 'title',
    direction: 'DESC'
  },
  minAgeAsc: {
    columnAccessor: 'minAge',
    direction: 'ASC'
  },
  minAgeDesc: {
    columnAccessor: 'minAge',
    direction: 'DESC'
  }
}
