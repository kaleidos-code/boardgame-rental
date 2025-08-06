import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import prisma from '@api/lib/prisma'
import { ResetPasswordView } from '@features/auth/view/ResetPasswordView'
import { AuthService } from '@api/auth/AuthService'
import { AuthLayout } from '@shared/components/layout/AuthLayout'

export default async function ResetPassword ({ params: { locale, token } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)
  const authService = new AuthService(prisma)

  const validateResetToken = async () => {
    try {
      const userId = await authService.validateToken(token)

      const user = await prisma.user.findUnique({
        where: {
          id: userId || ''
        }
      })

      if (!user) {
        return false
      }

      return true
    } catch (error) {
      console.log(error)

      return false
    }
  }

  const isValidToken = await validateResetToken()

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <AuthLayout>
        <ResetPasswordView
          valid={isValidToken}
          token={token}
        />
      </AuthLayout>
    </TranslationsProvider>
  )
}
