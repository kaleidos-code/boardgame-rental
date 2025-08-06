import { DEFAULT_LIBRARY_PAGE_SIZES } from '@shared/components/dataTable/constants/dataTable'
import { BaseSelectInput } from '@shared/components/inputs/BaseSelectInput'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export const GamePageInput: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation()

  const mappedPageSizes = React.useMemo(() => DEFAULT_LIBRARY_PAGE_SIZES.map((size) => ({
    id: size.toString(),
    label: t('common.perPage', { count: size })
  })), [])

  const handleOnPageSizeChange = (input: string | string[]) => {
    const parsedPageSize = parseInt(input as string)

    onChange(parsedPageSize)
  }

  return (
    <BaseSelectInput
      boxProps={{
        miw: {
          base: 100,
          md: 175
        },
        maw: '100%'
      }}
      hideRequireSymbol
      required
      label={t('gameLibrary.gamesPerPage')}
      labelAbsolute
      value={value.toString()}
      onChange={handleOnPageSizeChange}
      options={mappedPageSizes}
    />
  )
}
