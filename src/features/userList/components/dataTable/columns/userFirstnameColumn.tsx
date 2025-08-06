import { FilterTypes } from '@typings/graphql'

import { UserColumn } from '../../../types/types'

export const userFirstnameColumn: UserColumn = {
  accessor: 'firstname',
  type: FilterTypes.String
}
