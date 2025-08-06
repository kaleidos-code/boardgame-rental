import React from 'react'
import { FilterTypes, useRolesQuery } from '@typings/graphql'
import { CustomFilterInputComponent } from '@shared/components/dataTable/types/types'
import { BaseSelectInput } from '@shared/components/inputs/BaseSelectInput'

import { UserColumn } from '../../../types/types'

const FilterInput: CustomFilterInputComponent = ({ onChange, value }) => {
  const { data } = useRolesQuery()

  const mappedOptions = React.useMemo(() => {
    return data?.roles.map((role) => ({
      id: role.id,
      label: role.texts.name
    })) || []
  }, [data])

  return (
    <BaseSelectInput
      options={mappedOptions}
      value={value}
      onChange={onChange}
    />
  )
}

export const userRoleColumn: UserColumn = {
  accessor: 'roleId',
  type: FilterTypes.Select,
  titleKey: 'dataTable.columns.role',
  render (record) {
    return record.role.texts.name
  },
  CustomFilterInput: FilterInput
}
