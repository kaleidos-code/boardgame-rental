import { TokenType } from '@prisma/client'
import { Session } from 'next-auth'

export type AuthSession = Session & {
  user: AuthSessionUser
}

export enum LoginViewStates {
  LOGIN = 'LOGIN',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  SIGN_UP = 'SIGN_UP'
}

export type AuthSessionUser = {
  email: string
  id: string
  firstname: string
  emailVerified: Date | null
  lastname: string
  activeTokens: TokenType[]
  role: {
    key: string
    permissions: string[]
  },
  acceptedTerms: {
    termsKey: string
    acceptedAt: Date,
    terms: {
      key: string
      updatedAt: Date
    }
  }[]
}
