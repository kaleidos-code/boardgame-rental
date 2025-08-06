import { createdAtColumn } from '@shared/components/dataTable/columns/createdAtColumn'

import { UserColumn } from '../../types/types'

import { userEmailColumn } from './columns/userEmailColumn'
import { userFirstnameColumn } from './columns/userFirstnameColumn'
import { userLastnameColumn } from './columns/userLastnameColumn'
import { userRoleColumn } from './columns/userRoleColumn'
import { userPhoneColumn } from './columns/userPhoneColumn'

export const userColumns: UserColumn[] = [
  userEmailColumn,
  userFirstnameColumn,
  userLastnameColumn,
  userPhoneColumn,
  userRoleColumn,
  createdAtColumn as UserColumn
]
