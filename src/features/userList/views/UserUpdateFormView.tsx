'use client'

import React from 'react'
import { Text, Stack, Button, Box, LoadingOverlay } from '@mantine/core'
import { Trans, useTranslation } from 'react-i18next'
import { useForm } from '@mantine/form'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { useUpdateUserMutation, useUserQuery } from '@typings/graphql'
import { CreateUpdateFormLayout } from '@shared/components/layout/CreateUpdateFormLayout'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'
import { useParams } from 'next/navigation'

import { CreateUpdateFormInputs } from '../components/CreateUpdateFormInputs'
import { UserFormProvider } from '../provider/UserFormProvider'
import { useUserInputValidation } from '../hooks/useUserInputValidation'
import { UserFormInput, UserTransformedInput } from '../types/types'

export const UserUpdateFormView: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams<{id: string}>()

  const [loading, setLoading] = React.useState(false)

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const { data: user, loading: userLoading } = useUserQuery({
    variables: {
      id
    }
  })

  const { validate, transformValues, initialValues } = useUserInputValidation()

  const [updateUser] = useUpdateUserMutation()

  const form = useForm<UserFormInput, UserTransformedInput>({
    validateInputOnChange: true,
    initialValues: initialValues as UserFormInput,
    validate,
    transformValues: transformValues as UserTransformedInput
  })

  React.useEffect(() => {
    if (user) {
      form.resetDirty()

      form.initialize({
        email: user?.user.email || '',
        firstname: user?.user.firstname || '',
        lastname: user?.user.lastname || '',
        roleId: user?.user.role.id
      })
    }

    form.validate()
  }, [user])

  useUnsavedChanges({ when: form.isDirty() })

  const handleOnSubmit = async (data: UserFormInput) => {
    try {
      setLoading(true)

      const result = await updateUser({
        variables: {
          id,
          data
        }
      })

      snackbBarRef.current?.handleSuccessMessage(
        <Trans
          i18nKey='userList.userUpdated'
          values={{ email: result.data?.updateUser.email }}
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
        <UserFormProvider form={form}>
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
                i18nKey='userList.updateDescription'
                values={{ email: user?.user.email }}
                components={{
                  b: <b />
                }}
              />
            </Text>
            <LoadingOverlay
              visible={userLoading}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />
            <CreateUpdateFormInputs />
          </CreateUpdateFormLayout>
        </UserFormProvider>
      </Box>

      <Snackbar ref={snackbBarRef} />
    </Stack>
  )
}
