import React from 'react'
import { Text } from '@mantine/core'
import { FilterTypes, ReservationDataFragment } from '@typings/graphql'

import { ReservationColumn } from '../../../types/types'

const RenderCell: React.FC<{ record: ReservationDataFragment, index: number }> = ({ record }) => {
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

export const userNameColumn: ReservationColumn = {
  accessor: 'user',
  titleKey: 'dataTable.columns.renter',
  type: FilterTypes.String,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
