import React from 'react'
import { Text } from '@mantine/core'
import { FilterTypes } from '@typings/graphql'

import { UserColumn } from '../../../types/types'

const RenderCell: React.FC<{ record: any, index: number }> = ({ record }) => {
  const prefixed = React.useMemo(() => {
    if (!record.telephone) {
      return '-'
    }

    return record.telephone.startsWith('+')
      ? record.telephone
      : record.telephone.startsWith('0')
        ? record.telephone.replace(/^0/, '+49')
        : `+49${record.telephone}`
  }, [record.telephone])

  return (
    <Text
      fz="inherit"
    >
      {prefixed}
    </Text>
  )
}

export const userPhoneColumn: UserColumn = {
  accessor: 'telephone',
  type: FilterTypes.String,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
