import { ActionIcon, Group, Tooltip } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { MaterialIcon } from '../../ui/MaterialIcon'

export type ActionsRenderCellProps = {
  showLink?: string
  onShow?: () => void
  editLink?: string
  onEdit?: () => void
  onDelete?: () => void
  additionalActions?: React.ReactNode
}

export const ActionsRenderCell: React.FC<ActionsRenderCellProps> = ({ additionalActions, showLink, onShow, editLink, onEdit, onDelete }) => {
  const { t } = useTranslation()

  const handleOnEdit = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    onEdit?.()
  }

  const handleOnShow = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    onShow?.()
  }

  const handleOnDelete = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    onDelete?.()
  }

  return (
    <Group gap={12} justify="right" wrap="nowrap">
      {additionalActions}
      {(onShow || showLink) && (
      <Tooltip label={t('action.showEntry')}>
        <ActionIcon
          size="sm"
          variant="transparent"
          {...(onShow
            ? { onClick: handleOnShow }
            : {
                component: 'a',
                href: showLink,
                onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => e.stopPropagation()
              })}
        >
          <MaterialIcon icon="visibility" />
        </ActionIcon>
      </Tooltip>
      )}
      {(onEdit || editLink) && (
      <Tooltip label={t('action.editEntry')}>
        <ActionIcon
          size="sm"
          variant="transparent"
          {...(onEdit
            ? { onClick: handleOnEdit }
            : {
                component: 'a',
                href: editLink,
                onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => e.stopPropagation()
              })}
        >
          <MaterialIcon icon="edit" />
        </ActionIcon>
      </Tooltip>
      )}
      {onDelete && (
      <Tooltip label={t('action.deleteEntry')}>
        <ActionIcon
          size="sm"
          variant="transparent"
          c="red.5"
          onClick={handleOnDelete}
        >
          <MaterialIcon icon="delete" />
        </ActionIcon>
      </Tooltip>
      )}
    </Group>
  )
}
