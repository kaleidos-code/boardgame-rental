'use client'

import React from 'react'
import Snackbar, { SnackbarHandler } from '@shared/components/ui/Snackbar'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LoginViewStates } from '@typings/auth'

import { LoginForm } from '../components/LoginForm'
import { SignUpForm } from '../components/SignUpForm'
import { ForgotPasswordForm } from '../components/ForgotPasswordForm'

const ROUTE_MAP: Record<LoginViewStates, string> = {
  [LoginViewStates.LOGIN]: 'login',
  [LoginViewStates.FORGOT_PASSWORD]: 'forgot-password',
  [LoginViewStates.SIGN_UP]: 'sign-up'
}

type Props = {
  signUpDisabled?: boolean
  state: LoginViewStates
}

export const LoginView: React.FC<Props> = ({ state, signUpDisabled }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const snackbBarRef = React.useRef<SnackbarHandler>(null)
  const pathName = usePathname()

  const [viewState, setViewState] = React.useState<LoginViewStates>(state)

  const redirectUrl = searchParams.get('callbackUrl')

  const LoginFormComponent = React.useMemo(() => {
    if (pathName === '/forgot-password') {
      return ForgotPasswordForm
    } else if (pathName === '/sign-up') {
      return SignUpForm
    } else {
      return LoginForm
    }
  }, [viewState, pathName])

  const handleOnRedirect = () => {
    router.push(redirectUrl || '/')
  }

  const handleOnSuccess = (message: string) => {
    snackbBarRef.current?.handleSuccessMessage(message)
  }

  const handleOnError = (error: any) => {
    snackbBarRef.current?.handleErrorMessage(error)
  }

  const handleOnStateChange = (newState: LoginViewStates) => {
    setViewState(newState)

    const searchPar = new URLSearchParams(window.location.search)

    if (redirectUrl) {
      searchPar.set('callbackUrl', redirectUrl)
    }
    const newUrl = `/${ROUTE_MAP[newState]}?${searchPar.toString()}`

    window.history.pushState({}, '', newUrl)
  }

  return (
    <>
      <LoginFormComponent
        signUpDisabled={signUpDisabled}
        onSuccess={handleOnSuccess}
        onError={handleOnError}
        onRedirect={handleOnRedirect}
        redirectUrl={redirectUrl}
        onStateChange={handleOnStateChange}
      />
      <Snackbar ref={snackbBarRef} />
    </>
  )
}
