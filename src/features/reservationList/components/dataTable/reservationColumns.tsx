import { ReservationColumn } from '../../types/types'

import { reservationCodeColumn } from './columns/reservationCodeColumn'
import { gameUnitColumn } from './columns/gameUnitColumn'
import { gameColumn } from './columns/gameColumn'
import { userNameColumn } from './columns/userNameColumn'
import { reservationStatusColumn } from './columns/reservationStatusColumn'
import { createdAtColumn } from './columns/createdAtColumn'
import { overDueColumn } from './columns/overDueColumn'

export const reservationColumns: ReservationColumn[] = [
  reservationCodeColumn,
  userNameColumn,
  gameColumn,
  gameUnitColumn,
  reservationStatusColumn,
  createdAtColumn,
  overDueColumn
]
