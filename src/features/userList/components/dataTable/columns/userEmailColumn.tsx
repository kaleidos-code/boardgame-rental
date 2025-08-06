import React from 'react'
import { Text } from '@mantine/core'
import { FilterTypes } from '@typings/graphql'

import { UserColumn } from '../../../types/types'

const RenderCell: React.FC<{ record: any, index: number }> = ({ record }) => {
  return (
    <Text
      fw={700}
      fz="inherit"
    >
      {record.email}
    </Text>
  )
}

export const userEmailColumn: UserColumn = {
  accessor: 'email',
  type: FilterTypes.String,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
