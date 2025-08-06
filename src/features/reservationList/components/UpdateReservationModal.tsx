import { ActionIcon, Button, Flex, Modal, ModalProps, Stack, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import { ReservationDataFragment, UpdateReservationInput, useUpdateReservationMutation } from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = ModalProps & {
  reservation: ReservationDataFragment | null
  opened: boolean
  onSuccess?: (reservation: ReservationDataFragment | null) => void
  onError?: (errors: any) => void
}

export const UpdateReservationModal: React.FC<Props> = ({ reservation, opened, onClose, onSuccess, onError, ...props }) => {
  const { t } = useTranslation()

  const { modalManagerRef } = useModalContext()

  const [updateReservation] = useUpdateReservationMutation()

  const { getValues, setValues, resetDirty, onSubmit, resetTouched, isDirty, isValid } = useForm<UpdateReservationInput>({
    validateInputOnChange: true,
    initialValues: {
      gameIds: reservation?.gameUnits.map((game) => game.id) || []
    }
  })

  const [loading, setLoading] = React.useState(false)

  useUnsavedChanges({ when: isDirty() })

  React.useEffect(() => {
    setValues({
      gameIds: reservation?.gameUnits.map((game) => game.id) || []
    })

    resetDirty()
    resetTouched()
  }, [reservation, opened])

  const handleUpdateReservation = async (values: UpdateReservationInput) => {
    setLoading(true)

    try {
      if (!reservation) {
        throw new Error('Reservation not found')
      }

      await updateReservation({
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

  const gameUnits = getValues()?.gameIds?.map((gameId) => ({
    id: gameId,
    title: reservation?.gameUnits.find((unit) => unit.id === gameId)?.game.title,
    shortCode: reservation?.gameUnits.find((unit) => unit.id === gameId)?.prefixedShortId
  }))

  const onRemoveGame = (gameId: string) => {
    setValues({
      gameIds: getValues()?.gameIds?.filter((id) => id !== gameId)
    })
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
      title={t('reservation.updateReservation', { code: reservation?.reservationCode })}
      {...props}
    >
      <form
        style={{
          height: '100%',
          position: 'relative'
        }}
        onSubmit={onSubmit(handleUpdateReservation)}
      >
        <Stack gap={16}>
          <Stack
            gap={4}
          >
            <Text>
              {`${t('common.games')}:`}
            </Text>

            {gameUnits?.map((gameUnit) => (
              <Flex
                key={gameUnit.id}
                bd="1px solid gray.2"
                p="8px"
                justify="space-between"
              >
                <Text>
                  {gameUnit.title}
                </Text>

                <ActionIcon
                  variant='transparent'
                  onClick={() => onRemoveGame(gameUnit.id)}
                >
                  <MaterialIcon
                    icon='delete'
                  />
                </ActionIcon>
              </Flex>
            )
            )}

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
              {t('action.save')}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  )
}
