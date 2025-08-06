import React from 'react'
import { Text } from '@mantine/core'
import { GameColumn } from '@features/gameList/types/types'
import { FilterTypes } from '@typings/graphql'

const RenderCell: React.FC<{ record: any, index: number }> = ({ record }) => {
  return (
    <Text
      fw={700}
      fz="inherit"
    >
      {record.title}
    </Text>
  )
}

export const gameTitleColumn: GameColumn = {
  accessor: 'title',
  type: FilterTypes.String,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
