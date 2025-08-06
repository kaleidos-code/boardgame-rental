'use client'

import { Button, Stack, Title, Text, Box } from '@mantine/core'
import { mailPattern } from '@utils/pattern'
import React from 'react'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '@shared/components/inputs/BaseTextInput'
import { useForgotPasswordMutation } from '@typings/graphql'
import { BackToLoginButton } from '@shared/components/ui/BackToLoginButton'
import { LoginViewStates } from '@typings/auth'
import { useDebounce } from '@hooks/useDebounce'

import { LoginViewStateComponentProps } from '../types/types'

export const ForgotPasswordForm: React.FC<LoginViewStateComponentProps> = ({
  onError,
  onSuccess,
  onStateChange
}) => {
  const { t } = useTranslation()

  const [loading, setLoading] = React.useState(false)

  const [forgotPassword] = useForgotPasswordMutation()

  const form = useForm<{email: string}>({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) => (mailPattern.test(value) ? null : t('error.input.invalidEmail'))
    }
  })

  const handleForgotPassword = async (values: {email: string}) => {
    setLoading(true)

    try {
      await forgotPassword({
        variables: {
          email: values.email
        }
      })

      onSuccess(t('auth.forgetPassword.success'))
    } catch (error: any) {
      onError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDebounce = useDebounce({
    callback: handleForgotPassword,
    delay: 500
  })

  const handleOnBackToLogin = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    form.reset()
    onStateChange(LoginViewStates.LOGIN)
  }

  return (
    <form onSubmit={form.onSubmit(handleDebounce)}>
      <Box mb={24}>
        <BackToLoginButton
          onClick={handleOnBackToLogin}
        />
      </Box>

      <Stack
        gap={18}
      >
        <Stack gap={12}>
          <Title order={3}>{t('auth.forgetPassword.title')}</Title>
          <Text>{t('auth.forgetPassword.description')}</Text>
        </Stack>
        <BaseTextInput
          withAsterisk={false}
          label={t('common.email')}
          autoComplete='email'
          name='email'
          required
          type='email'
          {...form.getInputProps('email')}
        />
      </Stack>

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
    </form>
  )
}
