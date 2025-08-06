import { FilterTypes } from '@typings/graphql'

import { UserColumn } from '../../../types/types'

export const userLastnameColumn: UserColumn = {
  accessor: 'lastname',
  type: FilterTypes.String
}
