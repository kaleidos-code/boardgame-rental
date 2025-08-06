import { createdAtColumn } from '@shared/components/dataTable/columns/createdAtColumn'

import { RentalColumn } from '../../types/types'

import { bookingIdColumn } from './columns/bookingIdColumn'
import { gameColumn } from './columns/gameColumn'
import { gameUnitColumn } from './columns/gameUnitColumn'
import { userNameColumn } from './columns/userNameColumn'
import { returnedAtColumn } from './columns/returnedAtColumn'
import { dueDateColumn } from './columns/dueDateColumn'
import { rentalStatusColumn } from './columns/rentalStatusColumn'

export const rentalColumns: RentalColumn[] = [
  bookingIdColumn,
  userNameColumn,
  gameColumn,
  gameUnitColumn,
  dueDateColumn,
  returnedAtColumn,
  rentalStatusColumn,
  createdAtColumn as RentalColumn
]
