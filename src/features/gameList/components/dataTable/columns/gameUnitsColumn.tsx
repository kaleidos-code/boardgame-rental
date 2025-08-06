import { GameColumn } from '@features/gameList/types/types'
import { FilterTypes } from '@typings/graphql'

export const gameUnitsColumn: GameColumn = {
  accessor: 'units',
  type: FilterTypes.Number,
  render: ({ units }) => units.length
}
