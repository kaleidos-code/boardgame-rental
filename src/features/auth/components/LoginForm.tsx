'use client'

import { useDebounce } from '@hooks/useDebounce'
import { Anchor, Button, Text, Stack, TextInput, Title, Box /** Divider**/ } from '@mantine/core'
import { getSession, signIn } from 'next-auth/react'
import { mailPattern } from '@utils/pattern'
import React from 'react'
import { isNotEmpty, useForm } from '@mantine/form'
// import { GoogleButton } from '@shared/components/ui/GoogleButton'
import { useTranslation } from 'react-i18next'
import { LoginInput } from '@api/auth/dto/LoginInput'
import { BaseTextInput } from '@shared/components/inputs/BaseTextInput'
import { AuthSession, LoginViewStates } from '@typings/auth'
// import { AppleButton } from '@shared/components/ui/AppleButton'
import { RoleTypes } from '@typings/roles'
import { useAppDispatch } from '@services/store/store'
import { clearRentalCart } from '@services/store/slices/app'

import { LoginViewStateComponentProps } from '../types/types'

export const LoginForm: React.FC<LoginViewStateComponentProps> = ({
  onError,
  onRedirect,
  onStateChange
}) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const [loading, setLoading] = React.useState(false)

  const form = useForm<LoginInput>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (value) => (mailPattern.test(value) ? null : t('error.input.invalidEmail')),
      password: isNotEmpty()
    }
  })

  const handleLogin = async (values: LoginInput) => {
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })

      if (result?.error) {
        onError(new Error(result.status === 401 ? 'error.auth.credentialsSignin' : result.error))
      } else {
        const session = await getSession() as AuthSession

        if (session?.user.role.key === RoleTypes.Admin) {
          dispatch(clearRentalCart())
        }

        onRedirect()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDebounce = useDebounce({
    callback: handleLogin,
    delay: 500
  })

  const handleOnStateChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, newState: LoginViewStates) => {
    e.preventDefault()
    onStateChange(newState)
  }

  return (
    <form onSubmit={form.onSubmit(handleDebounce)}>
      <Stack
        gap={18}
      >
        <Title
          order={3}
        >
          {t('auth.login.title')}
        </Title>
        <BaseTextInput
          label={t('common.email')}
          autoComplete='email'
          name='email'
          required
          withAsterisk={false}
          placeholder={t('common.email')}
          type='email'
          {...form.getInputProps('email')}
        />
        <Box
          style={{
            position: 'relative'
          }}
        >
          <Anchor
            size="xs"
            href="/forgot-password"
            onClick={(e) => handleOnStateChange(e, LoginViewStates.FORGOT_PASSWORD)}
            style={{
              position: 'absolute',
              right: 0,
              top: 0
            }}
          >
            {t('auth.forgetPassword.title')}
          </Anchor>
          <TextInput
            required
            withAsterisk={false}
            type="password"
            label="Password"
            placeholder={t('common.password')}
            {...form.getInputProps('password')}
          />
        </Box>

        <Button
          loading={loading}
          fullWidth
          type="submit"
          disabled={!form.isValid()}
        >
          {t('action.login')}
        </Button>

        <Text
          size="sm"
          ta="center"
        >
          {t('auth.login.noAccountYet')}
          <Anchor
            size="sm"
            ml={4}
            href="/sign-up"
            onClick={(e) => handleOnStateChange(e, LoginViewStates.SIGN_UP)}
          >
            {t('auth.createAccount')}
          </Anchor>
        </Text>
        {/*
        <Divider
          label={t('common.or')}
          labelPosition="center"
        />

        <Stack
          gap={16}
        >
          <GoogleButton
            radius="xl"
          >
            {t('action.loginWithGoogle')}
          </GoogleButton>
          <AppleButton
            radius="xl"
          >
            {t('action.loginWithApple')}
          </AppleButton>
        </Stack> */}
      </Stack>
    </form>
  )
}
