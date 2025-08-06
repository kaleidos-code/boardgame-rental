'use client'

import React from 'react'
import { Text, Stack, Button, Box } from '@mantine/core'
import { Trans, useTranslation } from 'react-i18next'
import { useForm } from '@mantine/form'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { CreateUserInput, useCreateUserMutation } from '@typings/graphql'
import { CreateUpdateFormLayout } from '@shared/components/layout/CreateUpdateFormLayout'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import { useRouter } from 'next/navigation'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'

import { CreateUpdateFormInputs } from '../components/CreateUpdateFormInputs'
import { UserFormProvider } from '../provider/UserFormProvider'
import { useUserInputValidation } from '../hooks/useUserInputValidation'
import { UserFormInput, UserTransformedInput } from '../types/types'

export const UserCreateFormView: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const { modalManagerRef } = useModalContext()
  const { validate, initialValues, transformValues } = useUserInputValidation()
  const [createUser] = useCreateUserMutation()

  const form = useForm<UserFormInput, UserTransformedInput>({
    validateInputOnChange: true,
    initialValues: initialValues as UserFormInput,
    validate,
    transformValues: transformValues as UserTransformedInput
  })

  useUnsavedChanges({ when: form.isDirty() })

  const handleOnSubmit = async (data: UserFormInput) => {
    const userData = data as CreateUserInput
    try {
      setLoading(true)

      await createUser({
        variables: {
          data: userData
        }
      })

      modalManagerRef.current?.showModal(GlobalModalType.DEFAULT, {
        confirmCallback: () => {
          router.replace('/user-list')
        },
        modalProps: {
          title: t('modal.userCreated.title'),
          children: (
            <Trans
              i18nKey='modal.userCreated.message'
              values={{ email: userData.email }}
              components={{
                b: <b />
              }}
            />
          ),
          hideCancel: true
        }
      })
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
                disabled={!form.isValid()}
                loading={loading}
              >{t('action.submit')}</Button>
            )}
            onSubmit={form.onSubmit(handleOnSubmit)}
          >
            <Text>
              {t('userList.createDescription')}
            </Text>
            <CreateUpdateFormInputs />
          </CreateUpdateFormLayout>
        </UserFormProvider>
      </Box>

      <Snackbar ref={snackbBarRef} />
    </Stack>
  )
}
