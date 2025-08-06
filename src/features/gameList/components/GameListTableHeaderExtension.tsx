import { Button } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  disabled: boolean
  onExport: () => void
}

export const GameListTableHeaderExtension: React.FC<Props> = ({ disabled, onExport }) => {
  const { t } = useTranslation()

  return (
    <Button
      disabled={disabled}
      onClick={onExport}
      variant="transparent"
      style={{
        position: 'relative',
        padding: 0,
        height: 'auto',
        border: 'none'
      }}
      fz={12}
      fw={700}
      leftSection={(
        <MaterialIcon
          size="small"
          icon="download"
        />
    )}
      size='sm'
    >
      {t('action.exportLabels')}
    </Button>
  )
}
