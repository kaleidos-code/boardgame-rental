import React from 'react'
import { GameColumn } from '@features/gameList/types/types'
import { Text } from '@mantine/core'
import { FilterTypes } from '@typings/graphql'

const RenderCell: React.FC<{ record: any, index: number }> = ({ record }) => {
  return (
    <Text
      fw="inherit"
      fz="inherit"
    >
      {record.maxAge ? `${record.minAge}–${record.maxAge}` : `${record.minAge}+`}
    </Text>
  )
}

export const gameAgeColumn: GameColumn = {
  accessor: 'minAge',
  type: FilterTypes.Number,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
