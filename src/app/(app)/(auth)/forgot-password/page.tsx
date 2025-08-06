import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { LoginView } from '@features/auth/view/LoginView'
import { LoginViewStates } from '@typings/auth'
import { AuthLayout } from '@shared/components/layout/AuthLayout'
import { authConfig } from '@api/lib/auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Passwort vergessen | Brettspielverleih',
  description: 'Passwort vergessen? Kein Problem! Hier kannst du dein Passwort zurücksetzen.'
}

export default async function ForgotPassword ({ params: { locale } }: ServerSideComponentProp) {
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
          state={LoginViewStates.FORGOT_PASSWORD}
        />
      </AuthLayout>
    </TranslationsProvider>
  )
}
