import React from 'react'
import { TextInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { CustomFilterInputComponent } from '../../types/types'

export const StringFilterInput: CustomFilterInputComponent = ({ onChange, value }) => {
  const { t } = useTranslation()

  return (
    <TextInput
      label={t('dataTable.filterPanel.value')}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      type='text'
    />
  )
}
