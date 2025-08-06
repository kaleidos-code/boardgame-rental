import React from 'react'
import { Text } from '@mantine/core'
import { FilterTypes, ReservationDataFragment } from '@typings/graphql'
import { useTranslation } from 'react-i18next'

import { ReservationColumn } from '../../../types/types'

const RenderCell:React.FC<{ record: ReservationDataFragment, index: number }> = ({ record }) => {
  const { t } = useTranslation()

  return (
    <Text
      fz="inherit"
      c={record.overDue ? 'red' : 'inherit'}
    >
      {record.overDue ? t('common.overDue') : '-'}
    </Text>
  )
}

export const overDueColumn: ReservationColumn = {
  accessor: 'overDue',
  type: FilterTypes.Boolean,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
