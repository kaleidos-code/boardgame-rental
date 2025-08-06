import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { AuthService } from '@api/auth/AuthService'
import prisma from '@api/lib/prisma'
import { OptInView, OptInViewProps } from '@features/auth/view/OptInView'
import { AuthOptions, getServerSession } from 'next-auth'
import { AuthSession } from '@typings/auth'
import { authConfig } from '@api/lib/auth'

export default async function OptIn ({ params: { locale, token } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)
  const authService = new AuthService(prisma)

  const session = await getServerSession<AuthOptions, AuthSession>(authConfig)

  const optInProps: OptInViewProps = {
    valid: false,
    session
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
        optInProps.verifiedAt = user.emailVerified

        return
      }

      await prisma.user.update({
        where: {
          id: userId || ''
        },
        data: {
          emailVerified: new Date()
        }
      })

      await prisma.validationToken.update({
        where: {
          token
        },
        data: {
          validatedAt: new Date()
        }
      })

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
      <OptInView {...optInProps} />
    </TranslationsProvider>
  )
}
