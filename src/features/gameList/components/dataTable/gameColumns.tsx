import { GameColumn } from '@features/gameList/types/types'
import { createdAtColumn } from '@shared/components/dataTable/columns/createdAtColumn'

import { gameTitleColumn } from './columns/gameTitleColumn'
import { gameAgeColumn } from './columns/gameAgeColumn'
import { gamePublisherColumn } from './columns/gamePublisherColumn'
import { gameUnitsColumn } from './columns/gameUnitsColumn'
import { gameEanColumn } from './columns/gameEanColumn'
import { gameShortIdColumn } from './columns/gameShortIdColumn'

export const gameColumns: GameColumn[] = [
  gameShortIdColumn,
  gameEanColumn,
  gameTitleColumn,
  gamePublisherColumn,
  gameAgeColumn,
  gameUnitsColumn,
  createdAtColumn as GameColumn
]
