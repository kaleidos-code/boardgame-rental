import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { LoginViewStates } from '@typings/auth'
import { AuthLayout } from '@shared/components/layout/AuthLayout'
import { LoginView } from '@features/auth/view/LoginView'
import { authConfig } from '@api/lib/auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anmelden | Brettspielverleih',
  description: 'Melde dich bei dem Spieleverlei Brettspielverleih an und leih dir kostenlos Spiele aus.'
}

export default async function Login ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  const session = await getServerSession(authConfig)

  if (session) {
    redirect('/')
  }

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <AuthLayout>
        <LoginView
          state={LoginViewStates.LOGIN}
        />
      </AuthLayout>
    </TranslationsProvider>
  )
}
