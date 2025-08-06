'use client'

import React from 'react'
import { Text, Stack, Button, Box, LoadingOverlay } from '@mantine/core'
import { Trans, useTranslation } from 'react-i18next'
import { useForm } from '@mantine/form'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { useGameQuery, useUpdateGameMutation } from '@typings/graphql'
import { CreateUpdateFormLayout } from '@shared/components/layout/CreateUpdateFormLayout'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'
import { useParams } from 'next/navigation'

import { CreateUpdateFormInputs } from '../components/CreateUpdateFormInputs'
import { GameFormProvider } from '../provider/GameFormProvider'
import { useGameInputValidation } from '../hooks/useGameInputValidation'
import { GameFormInput, GameInputWithUploads, GameTransformedInput } from '../types/types'

export const GameUpdateFormView: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams<{id: string}>()

  const [loading, setLoading] = React.useState(false)

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const { data: gameData, loading: gameLoading } = useGameQuery({
    variables: {
      id
    }
  })

  const { validate, transformValues, initialValues } = useGameInputValidation()

  const [updateGame] = useUpdateGameMutation()

  const form = useForm<GameFormInput, GameTransformedInput>({
    validateInputOnChange: true,
    initialValues: initialValues as GameFormInput,
    validate,
    transformValues: transformValues as GameTransformedInput
  })

  React.useEffect(() => {
    if (gameData) {
      form.resetDirty()

      form.initialize({
        ean: gameData?.game.ean || '',
        title: gameData?.game.title,
        publisher: gameData?.game.publisher ?? '',
        minAge: gameData?.game.minAge ?? 1,
        maxAge: gameData?.game.maxAge,
        minPlayers: gameData?.game.minPlayers ?? 1,
        maxPlayers: gameData?.game.maxPlayers ?? 2,
        minDuration: gameData?.game.minDuration ?? 1,
        maxDuration: gameData?.game.maxDuration ?? null,
        gameUnits: gameData?.game.units.map((unit) => ({
          notInStock: !unit.inStock,
          unitShortId: unit.unitShortId,
          incomplete: unit.incomplete,
          texts: Object.assign({}, unit.texts),
          available: unit.available,
          weight: unit.weight ?? null
        })) || [],
        tags: gameData?.game.tags?.map((tag) => tag.id) || [],
        texts: Object.assign({}, gameData?.game.texts),
        coverImage: gameData?.game.files?.filter((image) => image.key.includes('cover')) || [],
        images: gameData?.game.files?.filter((image) => image.key.includes('image')) || []
      })
    }

    form.validate()
  }, [gameData])

  useUnsavedChanges({ when: form.isDirty() })

  const handleOnSubmit = async (values: GameInputWithUploads) => {
    const { images, ...data } = values

    try {
      setLoading(true)

      await updateGame({
        variables: {
          id,
          data,
          uploads: images.map((image) => ({
            key: image.key,
            file: image.upload
          }))
        }
      })

      snackbBarRef.current?.handleSuccessMessage(
        <Trans
          i18nKey='gameList.gameUpdated'
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
                disabled={!form.isValid() || !form.isDirty()}
                loading={loading}
              >{t('action.submit')}</Button>
            )}
            onSubmit={form.onSubmit(handleOnSubmit)}
          >
            <Text>
              <Trans
                i18nKey='gameList.updateDescription'
                values={{ title: gameData?.game.title }}
                components={{
                  b: <b />
                }}
              />
            </Text>
            <LoadingOverlay
              visible={gameLoading}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />
            <CreateUpdateFormInputs />
          </CreateUpdateFormLayout>
        </GameFormProvider>
      </Box>

      <Snackbar ref={snackbBarRef} />
    </Stack>
  )
}
