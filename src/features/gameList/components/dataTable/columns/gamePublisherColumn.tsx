import { GameColumn } from '@features/gameList/types/types'
import { FilterTypes } from '@typings/graphql'

export const gamePublisherColumn: GameColumn = {
  accessor: 'publisher',
  type: FilterTypes.String
}
