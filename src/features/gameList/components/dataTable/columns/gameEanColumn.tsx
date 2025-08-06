import { GameColumn } from '@features/gameList/types/types'
import { FilterTypes } from '@typings/graphql'

export const gameEanColumn: GameColumn = {
  accessor: 'ean',
  type: FilterTypes.String,
  render (record) {
    return record.ean || '-'
  }
}
