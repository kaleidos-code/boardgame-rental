'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Stack, Text, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { PASSWORD_PATTERN } from '@shared/constants/password'
import { useSetPasswordMutation } from '@typings/graphql'
import { SetPasswordInput } from '@shared/components/inputs/password/SetPasswordInput'

import { SetPasswordFormInput } from '../types/types'

export type ResetPasswordViewProps = {
  valid: boolean,
  token: string
}

export const ResetPasswordView:React.FC<ResetPasswordViewProps> = ({ valid, token }) => {
  const { t } = useTranslation()

  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const [setPassword] = useSetPasswordMutation()

  const form = useForm<SetPasswordFormInput>({
    validateInputOnChange: true,
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: (value: string) => new RegExp(PASSWORD_PATTERN).test(value) ? null : t('error.password.notMatchingPattern', {}),
      confirmPassword: (value: string, values: SetPasswordFormInput) => value === values.password ? null : t('error.password.notMatching')
    }
  })

  const handleResetPassword = async (values: SetPasswordFormInput) => {
    setLoading(true)

    try {
      await setPassword({
        variables: {
          data: {
            password: values.password,
            token
          }
        }
      })

      setSuccess(true)

      snackbBarRef.current?.handleSuccessMessage(t('auth.resetPassword.success'))
    } catch (error: any) {
      snackbBarRef.current?.handleErrorMessage(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {valid
        ? success
          ? (
            <Stack
              align='flex-start'
              gap={8}
            >
              <Text
                fw='bold'
              >
                {t('auth.resetPassword.success')}
              </Text>

              <Text>
                {t('auth.resetPassword.tryLogin')}
              </Text>

              <Button
                component="a"
                href="/login"
              >
                {t('action.backToLogin') }
              </Button>
            </Stack>
            )
          : (

            <form
              onSubmit={form.onSubmit(handleResetPassword)}
            >
              <Stack
                gap={18}
              >
                <Stack gap={12}>
                  <Title
                    order={3}
                  >
                    {t('auth.resetPassword.title')}
                  </Title>

                  <Text>{t('auth.resetPassword.description')}</Text>
                </Stack>
                <SetPasswordInput
                  required
                  passwordProps={form.getInputProps('password')}
                  confirmPasswordProps={form.getInputProps('confirmPassword')}
                />

                <Button
                  style={{
                    marginTop: 20
                  }}
                  loading={loading}
                  fullWidth
                  type="submit"
                  disabled={!form.isValid()}
                >
                  {t('action.resetPassword')}
                </Button>
              </Stack>
            </form>
            )
        : (
          <Stack
            gap={8}
            align='flex-start'
          >
            <Text fw="bold">
              {t('auth.resetPassword.invalidToken')}
            </Text>
            <Text>
              {t('auth.resetPassword.requestNewPassword')}
            </Text>

            <Button
              component="a"
              href="/login"
            >
              {t('action.backToLogin') }
            </Button>
          </Stack>
          )}

      <Snackbar ref={snackbBarRef} />
    </>
  )
}
