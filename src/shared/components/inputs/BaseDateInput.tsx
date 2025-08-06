'use client'

import React from 'react'
import 'dayjs/locale/de'
import { DatePickerInput, DatePickerInputProps, DateValue, DatesProvider, DatesRangeValue } from '@mantine/dates'

import { MaterialIcon } from '../ui/MaterialIcon'

export type BaseDateInputProps = DatePickerInputProps & {
  onChange?: (value: string | null) => void
}

export const BaseDateInput: React.FC<BaseDateInputProps> = ({ onChange, value, popoverProps, ...props }) => {
  const handleOnChange = (newValue: DateValue | DatesRangeValue | Date[]) => {
    if (newValue instanceof Date) {
      onChange?.(newValue.toISOString() || null)
    } else {
      onChange?.(null)
    }
  }

  return (
    <DatesProvider
      settings={{
        locale: 'de'
      }}
    >
      <DatePickerInput
        {...props}
        leftSection={<MaterialIcon icon="calendar_today" />}
        popoverProps={{
          withinPortal: false,
          ...popoverProps
        }}
        clearable
        value={value ? new Date(value) : null}
        onChange={handleOnChange}
      />
    </DatesProvider>
  )
}
