import React from 'react'
import { Box, Text } from '@mantine/core'
import { FilterTypes, ReservationDataFragment } from '@typings/graphql'

import { ReservationColumn } from '../../../types/types'

const RenderCell: React.FC<{ record: ReservationDataFragment, index: number }> = ({ record }) => {
  return (
    <Box>
      {record.gameUnits.map((gameUnit) => (
        <Text
          key={gameUnit.prefixedShortId}
          fz="inherit"
        >
          {gameUnit.prefixedShortId}
        </Text>
      ))}
    </Box>
  )
}

export const gameUnitColumn: ReservationColumn = {
  accessor: 'gameUnits',
  type: FilterTypes.String,
  sortable: false,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
