import React from 'react'
import { SignUpInput } from '@typings/graphql'
import { LoginViewStates } from '@typings/auth'

export type LoginViewStateComponentProps = {
  onSuccess: (message: string) => void
  onError: (error: any) => void
  onRedirect: () => void
  onStateChange: (state: LoginViewStates) => void
  signUpDisabled?: boolean
  redirectUrl?: string | null
}

export type LoginViewStateComponent = Record<LoginViewStates, React.FC<LoginViewStateComponentProps>>

export type SetPasswordFormInput = {
  password: string,
  confirmPassword: string
}

export type SignUpFormInput = SignUpInput & {
  confirmPassword: string,
}

export type SignUpTransformedInput = (values: SignUpFormInput) => SignUpInput

export type ValidationSchema = {
  [K in keyof SignUpFormInput]?: any
};
