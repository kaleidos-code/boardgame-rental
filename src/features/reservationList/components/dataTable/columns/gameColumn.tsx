import React from 'react'
import { Box, Text } from '@mantine/core'
import { FilterTypes, ReservationDataFragment } from '@typings/graphql'

import { ReservationColumn } from '../../../types/types'

const RenderCell: React.FC<{ record: ReservationDataFragment, index: number }> = ({ record }) => {
  return (
    <Box>
      {record.gameUnits.map((gameUnit, index) => (
        <Text
          key={`${gameUnit.game.title}-${index}`}
          fz="inherit"
        >
          {gameUnit.game.title}
        </Text>
      ))}
    </Box>
  )
}

export const gameColumn: ReservationColumn = {
  accessor: 'games',
  type: FilterTypes.String,
  sortable: false,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
