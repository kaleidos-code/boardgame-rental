import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { LoginView } from '@features/auth/view/LoginView'
import { LoginViewStates } from '@typings/auth'
import prisma from '@api/lib/prisma'
import { AuthLayout } from '@shared/components/layout/AuthLayout'
import { authConfig } from '@api/lib/auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registrieren | Brettspielverleih',
  description: 'Registriere dich kostenlos für den Brettspielverleih und leih dir Spiele aus.'
}

export default async function SignUp ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  const session = await getServerSession(authConfig)

  if (session) {
    redirect('/')
  }

  const checkSignUpDisabled = async () => {
    try {
      const appConfig = await prisma.appConfig.findUnique({
        where: {
          key: 'app'
        }
      })

      return appConfig?.signUpDisabled || false
    } catch (error) {
      console.log(error)

      return false
    }
  }

  const signUpDisabled = await checkSignUpDisabled()

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <AuthLayout>
        <LoginView
          signUpDisabled={signUpDisabled}
          state={LoginViewStates.SIGN_UP}
        />
      </AuthLayout>
    </TranslationsProvider>
  )
}
