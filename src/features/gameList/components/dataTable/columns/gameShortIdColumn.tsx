import { GameColumn } from '@features/gameList/types/types'
import { FilterTypes } from '@typings/graphql'

export const gameShortIdColumn: GameColumn = {
  accessor: 'gameShortId',
  type: FilterTypes.String,
  render (record) {
    return String(record.gameShortId).padStart(4, '0')
  }
}
