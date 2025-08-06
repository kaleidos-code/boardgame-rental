import { Button, Flex, Modal, ModalProps, Stack, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'
import { BaseDateInput } from '@shared/components/inputs/BaseDateInput'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import {
  RentalDataFragment,
  UpdateRentalInput,
  useUpdateRentalMutation
} from '@typings/graphql'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = ModalProps & {
  rental: RentalDataFragment | null
  opened: boolean
  onSuccess?: (rental: RentalDataFragment | null) => void
  onError?: (errors: any) => void
}

export const UpdateRentalModal: React.FC<Props> = ({ rental, opened, onClose, onSuccess, onError, ...props }) => {
  const { t } = useTranslation()

  const { modalManagerRef } = useModalContext()

  const [updateRental] = useUpdateRentalMutation()

  const { setValues, getInputProps, resetDirty, onSubmit, resetTouched, isDirty, isValid } = useForm<UpdateRentalInput>({
    validateInputOnChange: true,
    initialValues: {
      dueDate: rental?.dueDate
    },
    validate: {
      dueDate: (value) => {
        if (!value) {
          return t('validation.required')
        }

        return null
      }
    }
  })

  const [loading, setLoading] = React.useState(false)

  useUnsavedChanges({ when: isDirty() })

  React.useEffect(() => {
    setValues({
      dueDate: rental?.dueDate
    })

    resetDirty()
    resetTouched()
  }, [rental, opened])

  const handleUpdateRental = async (values: UpdateRentalInput) => {
    setLoading(true)

    try {
      if (!rental) {
        throw new Error('Rental not found')
      }

      await updateRental({
        variables: {
          id: rental.id,
          data: values
        }
      })

      onSuccess?.(rental || null)

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
      title={t('rental.updateRental', { code: rental?.bookingId })}
      {...props}
    >
      <form
        style={{
          height: '100%',
          position: 'relative'
        }}
        onSubmit={onSubmit(handleUpdateRental)}
      >
        <Stack gap={16}>
          <Stack
            gap={4}
          >
            <Text>
              {`${t('common.game')}: ${rental?.gameUnit?.game.title}`}
            </Text>
          </Stack>

          <BaseDateInput
            label={t('common.dueDate')}
            required
            excludeDate={(date) => date < new Date(rental?.dueDate) || date < new Date()}
            popoverProps={{
              withinPortal: true
            }}
            {...getInputProps('dueDate')}
          />

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
