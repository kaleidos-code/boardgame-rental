'use client'

import React from 'react'
import 'dayjs/locale/de'
import { DatePickerInput, DatesProvider } from '@mantine/dates'
import { useTranslation } from 'react-i18next'

import { CustomFilterInputComponent } from '../../types/types'

export const DateFilterInput: CustomFilterInputComponent = ({ onChange, value }) => {
  const { t } = useTranslation()

  return (
    <DatesProvider
      settings={{
        locale: 'de'
      }}
    >
      <DatePickerInput
        label={t('dataTable.filterPanel.value')}
        placeholder={t('common.pickDate')}
        popoverProps={{
          withinPortal: false
        }}
        clearable
        value={value ? new Date(value) : null}
        onChange={(newValue) => onChange(newValue?.toISOString() || null)}
      />
    </DatesProvider>
  )
}
