'use client'

import { Button, Stack, Text, Title, Tooltip } from '@mantine/core'
import React from 'react'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'
import { SignUpInput, useSignUpMutation } from '@typings/graphql'
import { signIn } from 'next-auth/react'
import { BackToLoginButton } from '@shared/components/ui/BackToLoginButton'
import { LoginViewStates } from '@typings/auth'
import { useDebounce } from '@hooks/useDebounce'

import { LoginViewStateComponentProps, SignUpFormInput, SignUpTransformedInput } from '../types/types'
import { useSignUpValidation } from '../hooks/useSignUpValidation'
import { SignUpFormProvider } from '../provider/AuthFormProvider'

import { SignUpFormInputs } from './SignUpFormInputs'

export const SignUpForm: React.FC<LoginViewStateComponentProps> = ({
  onError,
  onRedirect,
  onStateChange,
  signUpDisabled = false,
  redirectUrl
}) => {
  const { t } = useTranslation()

  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const { validate, initialValues, transformValues } = useSignUpValidation()

  const [signUp] = useSignUpMutation()

  const form = useForm<SignUpFormInput, SignUpTransformedInput>({
    validateInputOnChange: true,
    initialValues: initialValues as SignUpFormInput,
    validate,
    transformValues: transformValues as SignUpTransformedInput
  })

  const handleSignUp = async (data: SignUpInput) => {
    setLoading(true)

    if (signUpDisabled) {
      onError(new Error('error.auth.resgistrationDisabled'))

      return
    }

    try {
      const user = await signUp({
        variables: {
          data
        }
      })

      setSuccess(true)

      if (user.data?.signUp) {
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false
        })
      }
    } catch (error: any) {
      onError(error)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const handleDebounce = useDebounce({
    callback: handleSignUp,
    delay: 500
  })

  const handleOnBackToLogin = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    form.reset()
    onStateChange(LoginViewStates.LOGIN)
  }

  return (
    <SignUpFormProvider form={form}>
      {success
        ? (
          <Stack
            gap={12}
            justify="center"
            align='flex-start'
            style={{
              height: '100%'
            }}
          >
            <Text fw="bold">
              {t('auth.signUp.successTitle')}
            </Text>
            <Text>{t('auth.signUp.success')}</Text>
            <Button
              onClick={onRedirect}
            >
              {t(redirectUrl ? 'action.continue' : 'action.toHome') }
            </Button>
          </Stack>
          )
        : (
          <form
            onSubmit={form.onSubmit(handleDebounce)}
          >
            <Stack gap={18}>
              <BackToLoginButton
                onClick={handleOnBackToLogin}
              />

              <Stack gap={12}>
                <Title
                  order={3}
                >
                  {t('auth.signUp.title')}
                </Title>

                <Text>{t('auth.signUp.description')}</Text>
              </Stack>

              <SignUpFormInputs />

              <Tooltip
                label={t('error.auth.resgistrationDisabled')}
                disabled={!signUpDisabled}
              >
                <Button
                  loading={loading}
                  fullWidth
                  type="submit"
                  disabled={!form.isValid() || signUpDisabled}
                >
                  {t('action.signUp')}
                </Button>
              </Tooltip>
            </Stack>
          </form>
          )}

    </SignUpFormProvider>
  )
}
