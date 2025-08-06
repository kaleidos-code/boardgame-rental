'use client'

import { Button, ButtonProps, Modal, ModalProps, Grid } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type ConfirmModalProps = ModalProps & {
  title?: string
  loading?: boolean
  disabled?: boolean
  hideCancel?: boolean
  confirmLabel?: string
  confirmProps?: ButtonProps
  onConfirm?: (onClose: () => void) => Promise<void> | void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  loading,
  disabled,
  hideCancel,
  confirmLabel,
  confirmProps,
  onConfirm,
  onClose,
  children,
  ...props
}) => {
  const { t } = useTranslation()

  const [confirmLoading, setConfirmLoading] = React.useState(false)

  const handleOnConfirm = async () => {
    setConfirmLoading(true)

    await onConfirm?.(onClose)

    setConfirmLoading(false)
  }

  return (
    <Modal
      centered
      onClose={onClose}
      title={title}
      {...props}
    >
      {children}

      <Grid mt={16}>
        {!hideCancel && (
          <Grid.Col span={6}>
            <Button
              fullWidth
              disabled={loading}
              variant='outline'
              onClick={onClose}
            >
              {t('action.cancel')}
            </Button>
          </Grid.Col>
        )}
        <Grid.Col span={hideCancel ? 12 : 6}>
          <Button
            loading={loading || confirmLoading}
            disabled={disabled}
            fullWidth
            onClick={handleOnConfirm}
            {...confirmProps}
          >
            {confirmLabel || t('action.confirm')}
          </Button>
        </Grid.Col>
      </Grid>
    </Modal>
  )
}
