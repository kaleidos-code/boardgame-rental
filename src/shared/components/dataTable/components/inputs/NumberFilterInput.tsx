import React from 'react'
import { NumberInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { CustomFilterInputComponent } from '../../types/types'

export const NumberFilterInput: CustomFilterInputComponent = ({ onChange, value }) => {
  const { t } = useTranslation()

  return (
    <NumberInput
      label={t('dataTable.filterPanel.value')}
      value={value}
      onChange={(newValue) => onChange(typeof newValue === 'number' ? newValue : parseInt(newValue, 10))}
    />
  )
}
