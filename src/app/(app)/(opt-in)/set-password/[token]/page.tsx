import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { AuthService } from '@api/auth/AuthService'
import prisma from '@api/lib/prisma'
import { SetPasswordView, SetPasswordViewProps } from '@features/auth/view/SetPasswordView'

export default async function OptIn ({ params: { locale, token } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)
  const authService = new AuthService(prisma)

  const optInProps: SetPasswordViewProps = {
    valid: false,
    token: token as string
  }

  const acceptDoubleOptIn = async () => {
    try {
      const userId = await authService.validateToken(token)

      const user = await prisma.user.findUnique({
        where: {
          id: userId || ''
        }
      })

      if (!user) {
        optInProps.valid = false

        return
      }

      if (user.emailVerified) {
        optInProps.valid = true

        return
      }

      optInProps.valid = true
    } catch (error) {
      console.log(error)

      optInProps.valid = false
    }
  }

  await acceptDoubleOptIn()

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <SetPasswordView {...optInProps} />
    </TranslationsProvider>
  )
}
