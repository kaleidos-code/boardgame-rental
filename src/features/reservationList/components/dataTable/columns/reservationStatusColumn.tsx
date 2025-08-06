import React from 'react'
import { Text } from '@mantine/core'
import { FilterTypes, ReservationStatus } from '@typings/graphql'
import { useTranslation } from 'react-i18next'
import { CustomFilterInputComponent } from '@shared/components/dataTable/types/types'
import { BaseSelectInput } from '@shared/components/inputs/BaseSelectInput'

import { ReservationColumn } from '../../../types/types'

const RESERVATION_STATUS_COLORS: Record<ReservationStatus, string> = {
  [ReservationStatus.Pending]: 'gray',
  [ReservationStatus.Packed]: 'blue',
  [ReservationStatus.Completed]: 'green',
  [ReservationStatus.Cancelled]: 'red'
}

const FilterInput: CustomFilterInputComponent = ({ onChange, value }) => {
  const { t } = useTranslation()

  const mappedOptions = React.useMemo(() => {
    return Object.keys(RESERVATION_STATUS_COLORS).map((status) => ({
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
      c={RESERVATION_STATUS_COLORS[record.status as ReservationStatus]}
    >
      {t(`common.status.${record.status.toLowerCase()}`)}
    </Text>
  )
}

export const reservationStatusColumn: ReservationColumn = {
  accessor: 'status',
  type: FilterTypes.Select,
  render (record, index) {
    return <RenderCell record={record} index={index} />
  },
  CustomFilterInput: FilterInput
}
