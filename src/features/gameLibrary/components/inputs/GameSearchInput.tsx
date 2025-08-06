import { BaseTextInput } from '@shared/components/inputs/BaseTextInput'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  width?: number | string
  value: string
  onChange: (value: string) => void
}

export const GameSearchInput: React.FC<Props> = (
  {
    value,
    onChange,
    width = 300
  }
) => {
  const { t } = useTranslation()

  return (
    <BaseTextInput
      boxProps={{
        w: width
      }}
      labelAbsolute
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      label={t('common.search')}
      leftSection={<MaterialIcon icon='search' />}
      placeholder={t('common.searchPlaceholder')}
    />
  )
}
