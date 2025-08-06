import { BaseSelectInput } from '@shared/components/inputs/BaseSelectInput'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ORDER_SELECTION_OPTIONS } from '../../constants/constants'

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const GameOrderInput: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation()

  const mappedOrderOptions = React.useMemo(() => Object.keys(ORDER_SELECTION_OPTIONS).map((key) => ({
    id: key,
    label: t(`gameLibrary.sorting.${key}`)
  })), [])

  const handleOnOrderChange = (input: string | string[]) => {
    const order = input as string

    onChange(order)
  }

  return (
    <BaseSelectInput
      boxProps={{
        miw: 250,
        maw: '100%'
      }}
      required
      label={t('common.sorting')}
      hideRequireSymbol
      labelAbsolute
      value={value}
      onChange={handleOnOrderChange}
      options={mappedOrderOptions}
    />
  )
}
