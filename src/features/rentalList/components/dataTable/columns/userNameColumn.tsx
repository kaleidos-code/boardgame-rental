import React from 'react'
import { Text } from '@mantine/core'
import { FilterTypes, RentalDataFragment } from '@typings/graphql'

import { RentalColumn } from '../../../types/types'

const RenderCell: React.FC<{ record: RentalDataFragment, index: number }> = ({ record }) => {
  const name = React.useMemo(() => {
    return `${record.user.firstname} ${record.user.lastname} (${record.user.email})`
  }, [record])

  return (
    <Text
      fz="inherit"
    >
      {name}
    </Text>
  )
}

export const userNameColumn: RentalColumn = {
  accessor: 'user',
  titleKey: 'dataTable.columns.renter',
  type: FilterTypes.String,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
