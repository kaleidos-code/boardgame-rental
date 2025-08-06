import React from 'react'
import { FilterTypes } from '@typings/graphql'
import { useTranslation } from 'react-i18next'
import { dateToHumanReadable } from '@utils/format'

import { DataTableExtendedColumn } from '../types/types'

const RenderCell:React.FC<{value: any}> = (value: any) => {
  const { i18n } = useTranslation()

  return dateToHumanReadable(value.createdAt, {
    lang: i18n.language
  })
}

export const createdAtColumn: DataTableExtendedColumn<any> = {
  accessor: 'createdAt',
  type: FilterTypes.Date,
  render: RenderCell

}
