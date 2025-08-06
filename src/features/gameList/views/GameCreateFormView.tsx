'use client'

import React from 'react'
import { Text, Flex, Stack, Button, Box } from '@mantine/core'
import { Trans, useTranslation } from 'react-i18next'
import { useForm } from '@mantine/form'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { CreateGameInput, useCreateGameMutation } from '@typings/graphql'
import { CreateUpdateFormLayout } from '@shared/components/layout/CreateUpdateFormLayout'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import { useRouter } from 'next/navigation'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'

import { CreateUpdateFormInputs } from '../components/CreateUpdateFormInputs'
import { GameFormProvider } from '../provider/GameFormProvider'
import { useGameInputValidation } from '../hooks/useGameInputValidation'
import { GameFormInput, GameInputWithUploads, GameTransformedInput } from '../types/types'

export const GameCreateFormView: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const { modalManagerRef } = useModalContext()
  const { validate, initialValues, transformValues } = useGameInputValidation()
  const [createGame] = useCreateGameMutation()

  const form = useForm<GameFormInput, GameTransformedInput>({
    validateInputOnChange: true,
    initialValues: initialValues as GameFormInput,
    validate,
    transformValues: transformValues as GameTransformedInput
  })

  useUnsavedChanges({ when: form.isDirty() })

  const handleOnSubmit = async (values: GameInputWithUploads) => {
    const { images, ...data } = values

    try {
      setLoading(true)

      await createGame({
        variables: {
          data: data as CreateGameInput,
          uploads: images.map((image) => ({
            key: image.key,
            file: image.upload
          }))
        }
      })

      modalManagerRef.current?.showModal(GlobalModalType.DEFAULT, {
        confirmCallback: () => {
          router.replace('/game-list')
        },
        modalProps: {
          title: t('modal.gameCreated.title'),
          children: (
            <Trans
              i18nKey='modal.gameCreated.message'
              values={{ title: values.title }}
              components={{
                b: <b />
              }}
            />
          ),
          hideCancel: true
        }
      })

      snackbBarRef.current?.handleSuccessMessage(
        <Trans
          i18nKey='gameList.gameCreated'
          values={{ title: values.title }}
          components={{
            b: <b />
          }}
        />
      )
    } catch (error) {
      snackbBarRef.current?.handleErrorMessage(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack
      style={{
        height: '100%'
      }}
    >
      <Box
        flex="1 1 auto"
      >
        <GameFormProvider form={form}>
          <CreateUpdateFormLayout
            footer={(
              <Button
                type="submit"
                disabled={!form.isValid()}
                loading={loading}
              >{t('action.submit')}</Button>
            )}
            onSubmit={form.onSubmit(handleOnSubmit)}
          >
            <Flex
              justify="space-between"
            >
              <Text>
                {t('gameList.createDescription')}
              </Text>
            </Flex>
            <CreateUpdateFormInputs />
          </CreateUpdateFormLayout>
        </GameFormProvider>
      </Box>

      <Snackbar ref={snackbBarRef} />
    </Stack>
  )
}
