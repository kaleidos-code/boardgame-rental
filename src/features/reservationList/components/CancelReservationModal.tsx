import { Button, Flex, Modal, ModalProps, Stack, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'
import { BaseTextarea } from '@shared/components/inputs/BaseTextarea'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import { CancelReservationInput, ReservationDataFragment, useCancelReservationMutation } from '@typings/graphql'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

type Props = ModalProps & {
  reservation: ReservationDataFragment | null
  opened: boolean
  onSuccess?: (reservation: ReservationDataFragment | null) => void
  onError?: (errors: any) => void
}

export const CancelReservationModal: React.FC<Props> = ({ reservation, opened, onClose, onSuccess, onError, ...props }) => {
  const { t } = useTranslation()

  const { modalManagerRef } = useModalContext()

  const [cancelReservation] = useCancelReservationMutation()

  const { onSubmit, isDirty, isValid, getInputProps, reset } = useForm<CancelReservationInput>({
    validateInputOnChange: true,
    initialValues: {
      reason: ''
    }
  })

  React.useEffect(() => {
    if (!opened) {
      reset()
    }
  }, [opened])

  const [loading, setLoading] = React.useState(false)

  useUnsavedChanges({ when: isDirty() })

  const handleCancelReservation = async (values: CancelReservationInput) => {
    setLoading(true)

    try {
      if (!reservation) {
        throw new Error('Reservation not found')
      }

      await cancelReservation({
        variables: {
          id: reservation.id,
          data: values
        }
      })

      onSuccess?.(reservation || null)

      onClose()
    } catch (error: any) {
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  const handelOnClose = () => {
    if (isDirty()) {
      modalManagerRef.current?.showModal(GlobalModalType.UNSAVED_CHANGES, {
        confirmCallback: onClose
      })
    } else {
      onClose()
    }
  }

  return (
    <Modal
      w="100%"
      opened={opened}
      centered
      onClose={handelOnClose}
      title={t('modal.cancelReservation.title')}
      {...props}
    >
      <form
        style={{
          height: '100%',
          position: 'relative'
        }}
        onSubmit={onSubmit(handleCancelReservation)}
      >
        <Stack gap={16}>
          <Stack
            gap={4}
          >
            <Text>
              <Trans
                i18nKey='modal.cancelReservation.message'
                values={{ code: reservation?.reservationCode }}
                components={{
                  b: <b />
                }}
              />
            </Text>

            <BaseTextarea
              label={t('reservation.cancelReason')}
              required
              resize="vertical"
              {...getInputProps('reason')}
            />
          </Stack>

          <Flex
            justify="space-between"
            gap={8}
          >
            <Button
              variant='outline'
              w='100%'
              onClick={handelOnClose}
            >
              {t('action.cancel')}
            </Button>
            <Button
              type="submit"
              w='100%'
              loading={loading}
              disabled={!isDirty() || !isValid()}
            >
              {t('action.cancelReservation')}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  )
}
