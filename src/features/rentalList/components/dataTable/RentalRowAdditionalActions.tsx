import { Tooltip, ActionIcon } from '@mantine/core'
import { usePermissions } from '@hooks/usePermissions'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  onEdit?: () => void
  onReturned: () => void
}

export const RentalRowAdditionalActions: React.FC<Props> = ({ onEdit, onReturned }) => {
  const { t } = useTranslation()

  const { can } = usePermissions()

  return (
    <>
      {(can('rental:update') && onEdit) && (
      <Tooltip label={t('action.editRental')}>
        <ActionIcon
          size="sm"
          variant="transparent"
          onClick={onEdit}
        >
          <MaterialIcon icon={'edit'} />
        </ActionIcon>
      </Tooltip>
      )}
      {can('rental:update') && (
        <Tooltip label={t('action.confirmReturn')}>
          <ActionIcon
            size="sm"
            variant="transparent"
            onClick={onReturned}
          >
            <MaterialIcon icon={'check'} />
          </ActionIcon>
        </Tooltip>
      )}
    </>
  )
}
