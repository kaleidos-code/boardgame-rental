'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, Stack } from '@mantine/core'
import { OptInLayout } from '@shared/components/layout/OptInLayout'
import { useForm } from '@mantine/form'
import { SetPasswordInput } from '@shared/components/inputs/password/SetPasswordInput'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { PASSWORD_PATTERN } from '@shared/constants/password'
import { useSetPasswordMutation } from '@typings/graphql'

import { SetPasswordFormInput } from '../types/types'

export type SetPasswordViewProps = {
  valid: boolean,
  token: string,
}

export const SetPasswordView:React.FC<SetPasswordViewProps> = ({ valid, token }) => {
  const { t } = useTranslation()

  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [setPassword] = useSetPasswordMutation()

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

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
            token,
            optIn: true
          }
        }
      })

      setSuccess(true)
    } catch (error: any) {
      snackbBarRef.current?.handleErrorMessage(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <OptInLayout>
      <Stack
        gap={12}
        align="flex-start"
      >

        <Text
          fw="bold"
        >
          {t(`auth.optIn.${!valid ? 'error' : success ? 'setPasswordSuccess' : 'setPassword'}`)}
        </Text>
        {valid
          ? (
              !success
                ? (
                  <Stack w="100%" gap={12}>
                    <Text>{t('auth.optIn.setPasswordDescription')}</Text>
                    <form
                      onSubmit={form.onSubmit(handleResetPassword)}
                      style={{
                        width: '100%'
                      }}
                    >
                      <Stack
                        gap={12}
                        w="100%"
                      >
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
                          {t('action.setPassword')}
                        </Button>
                      </Stack>
                    </form>
                  </Stack>
                  )
                : (
                  <Stack
                    align='flex-start'
                    gap={12}
                  >

                    <Text>
                      {t('auth.optIn.setPasswordSuccessMessage')}
                    </Text>

                    <Button
                      component="a"
                      href="/login"
                    >
                      {t('action.backToLogin') }
                    </Button>
                  </Stack>
                  )
            )
          : (
            <Text>
              {t('auth.optIn.errorMessage')}
            </Text>
            )}
      </Stack>

      <Snackbar ref={snackbBarRef} />
    </OptInLayout>
  )
}
