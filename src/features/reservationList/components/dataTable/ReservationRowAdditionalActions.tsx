import { Tooltip, ActionIcon } from '@mantine/core'
import { usePermissions } from '@hooks/usePermissions'
import { ReservationDataFragment, ReservationStatus } from '@typings/graphql'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  row: ReservationDataFragment
  onEdit?: () => void
  onPacked: () => void
  onConfirm: () => void
  onCancel: () => void
}

export const ReservationRowAdditionalActions: React.FC<Props> = ({ row, onConfirm, onPacked, onEdit, onCancel }) => {
  const { t } = useTranslation()

  const { can } = usePermissions()

  return (
    <>
      {can('reservation:update') && (
      <Tooltip label={t('action.editReservation')}>
        <ActionIcon
          size="sm"
          variant="transparent"
          onClick={onEdit}
        >
          <MaterialIcon icon={'edit'} />
        </ActionIcon>
      </Tooltip>
      )}
      {(can('rental:create') && row.status === ReservationStatus.Pending) && (
        <Tooltip label={t('action.confirmPacked')}>
          <ActionIcon
            size="sm"
            variant="transparent"
            onClick={onPacked}
          >
            <MaterialIcon icon={'event_available'} />
          </ActionIcon>
        </Tooltip>
      )}
      {(can('rental:create') && row.status === ReservationStatus.Packed) && (
        <Tooltip label={t('action.confirmPickup')}>
          <ActionIcon
            size="sm"
            variant="transparent"
            onClick={onConfirm}
          >
            <MaterialIcon icon={'check'} />
          </ActionIcon>
        </Tooltip>
      )}
      {can('reservation:cancel') && (
      <Tooltip label={t('action.cancelReservation')}>
        <ActionIcon
          size="sm"
          variant="transparent"
          onClick={onCancel}
        >
          <MaterialIcon icon={'do_disturb_alt'} />
        </ActionIcon>
      </Tooltip>
      )}
    </>
  )
}
