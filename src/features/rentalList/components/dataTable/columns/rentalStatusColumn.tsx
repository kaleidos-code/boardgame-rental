import React from 'react'
import { Text } from '@mantine/core'
import { FilterTypes, RentalStatus } from '@typings/graphql'
import { useTranslation } from 'react-i18next'
import { CustomFilterInputComponent } from '@shared/components/dataTable/types/types'
import { BaseSelectInput } from '@shared/components/inputs/BaseSelectInput'

import { RentalColumn } from '../../../types/types'

const RENTAL_STATUS_COLOR: Record<RentalStatus, string> = {
  [RentalStatus.Rented]: 'blue',
  [RentalStatus.Returned]: 'green',
  [RentalStatus.Overdue]: 'red'
}

const FilterInput: CustomFilterInputComponent = ({ onChange, value }) => {
  const { t } = useTranslation()

  const mappedOptions = React.useMemo(() => {
    return Object.keys(RENTAL_STATUS_COLOR).map((status) => ({
      id: status,
      label: t(`common.status.${status.toLowerCase()}`)
    }))
  }, [])

  return (
    <BaseSelectInput
      options={mappedOptions}
      value={value}
      onChange={onChange}
    />
  )
}

const RenderCell: React.FC<{ record: any, index: number }> = ({ record }) => {
  const { t } = useTranslation()

  return (
    <Text
      fw={700}
      fz="inherit"
      c={RENTAL_STATUS_COLOR[record.status as RentalStatus]}
    >
      {t(`common.status.${record.status.toLowerCase()}`)}
    </Text>
  )
}

export const rentalStatusColumn: RentalColumn = {
  accessor: 'status',
  type: FilterTypes.Select,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  },
  CustomFilterInput: FilterInput
}
