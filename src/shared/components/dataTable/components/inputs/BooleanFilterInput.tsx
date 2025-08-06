import React from 'react'
import { Select } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { CustomFilterInputComponent } from '../../types/types'

export const BooleanFilterInput: CustomFilterInputComponent = ({ onChange, value }) => {
  const { t } = useTranslation()

  const stringValue = React.useMemo(() => {
    return value === undefined ? null : value ? 'true' : 'false'
  }, [value])

  const handleOnChange = (newValue: string | null) => {
    const parsedValue = newValue === undefined || newValue === null
      ? undefined
      : newValue === 'true'

    onChange(newValue === stringValue ? undefined : parsedValue)
  }

  return (
    <Select
      label={t('dataTable.filterPanel.value')}
      value={stringValue}
      data={[
        { value: 'true', label: t('common.yes') },
        { value: 'false', label: t('common.no') }
      ]}
      onChange={(newValue) => handleOnChange(newValue)}
    />
  )
}
