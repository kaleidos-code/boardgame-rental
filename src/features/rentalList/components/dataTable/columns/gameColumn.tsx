import React from 'react'
import { Text } from '@mantine/core'
import { FilterTypes, RentalDataFragment } from '@typings/graphql'

import { RentalColumn } from '../../../types/types'

const RenderCell: React.FC<{ record: RentalDataFragment, index: number }> = ({ record }) => {
  return (
    <Text
      fz="inherit"
    >
      {record.gameUnit?.game.title}
    </Text>
  )
}

export const gameColumn: RentalColumn = {
  accessor: 'game',
  type: FilterTypes.String,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
