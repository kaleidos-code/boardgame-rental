import React from 'react'
import { Text } from '@mantine/core'
import { FilterTypes, ReservationDataFragment } from '@typings/graphql'
import { useTranslation } from 'react-i18next'
import { dateToHumanReadable } from '@utils/format'

import { ReservationColumn } from '../../../types/types'

const RenderCell:React.FC<{ record: ReservationDataFragment, index: number }> = ({ record }) => {
  const { i18n } = useTranslation()

  const date = dateToHumanReadable(record.createdAt, {
    lang: i18n.language
  })

  return (
    <Text
      fz="inherit"
      c={record.overDue ? 'red' : 'inherit'}
    >
      {date}
    </Text>
  )
}

export const createdAtColumn: ReservationColumn = {
  accessor: 'createdAt',
  type: FilterTypes.Date,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
