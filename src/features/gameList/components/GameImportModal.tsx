import { Button, Flex, Modal, ModalProps, Stack, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'
import BaseFileInput from '@shared/components/inputs/file/BaseFileInput'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useImportGamesMutation } from '@typings/graphql'

import { GameImportInput } from '../types/types'

type Props = Omit<ModalProps, 'onError'> & {
  onSuccess: () => void
  onError: (error: Error) => void
}

export const GameImportModal: React.FC<Props> = ({ onClose, onError, onSuccess, opened, ...props }) => {
  const { t } = useTranslation()

  const { modalManagerRef } = useModalContext()

  const [importGames] = useImportGamesMutation()

  const { onSubmit, getInputProps, reset, isDirty, isValid } = useForm<GameImportInput>({
    initialValues: {
      file: []
    },
    validateInputOnChange: true,
    validate: (values) => ({
      file: values.file ? undefined : t('form.validation.required')
    })
  })

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    reset()
  }, [opened])

  useUnsavedChanges({ when: isDirty() })

  const handelOnClose = () => {
    if (isDirty()) {
      modalManagerRef.current?.showModal(GlobalModalType.UNSAVED_CHANGES, {
        confirmCallback: onClose
      })
    } else {
      onClose()
    }
  }

  const handleImportGames = async (values: GameImportInput) => {
    setLoading(true)

    try {
      await importGames({
        variables: {
          upload: values.file[0].upload
        }
      })

      onSuccess?.()

      onClose()
    } catch (error: any) {
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      centered
      w="100%"
      miw={400}
      styles={{
        content: {
          flex: '0 1 auto'
        }
      }}
      opened={opened}
      title={t('gameList.importGames')}
      onClose={handelOnClose}
      {...props}
    >
      <form
        style={{
          height: '100%',
          position: 'relative'
        }}
        onSubmit={onSubmit(handleImportGames)}
      >
        <Stack
          gap={16}
        >
          <Text>{t('gameList.importGamesDescription')}</Text>

          <BaseFileInput
            fileKey='file'
            acceptedFileTypes={{
              'text/csv': [
                '.csv',
                '.xls',
                '.xlsx'
              ]
            }}
            {...getInputProps('file')}
          />

          <Flex
            justify="space-evenly"
            gap={16}
          >
            <Button
              w="100%"
              onClick={handelOnClose}
              variant='outline'
            >
              {t('action.cancel')}
            </Button>
            <Button
              type="submit"
              w="100%"
              loading={loading}
              disabled={!isValid() || !isDirty()}
            >
              {t('action.import')}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  )
}
