import React from 'react'
import { FilterTypes, RentalDataFragment } from '@typings/graphql'
import { useTranslation } from 'react-i18next'
import { dateToHumanReadable } from '@utils/format'

import { RentalColumn } from '../../../types/types'

const RenderCell: React.FC<{ record: RentalDataFragment, index: number }> = ({ record }) => {
  const { i18n } = useTranslation()

  return dateToHumanReadable(record.dueDate, {
    lang: i18n.language
  })
}

export const dueDateColumn: RentalColumn = {
  accessor: 'dueDate',
  type: FilterTypes.Date,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  }
}
