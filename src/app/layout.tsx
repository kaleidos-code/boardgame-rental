/* eslint-disable max-len */
import '@mantine/core/styles.css'
import '@theme/styles/global.scss'
import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import axios from 'axios'
import { Session } from 'next-auth'
import AuthSessionProvider from '@shared/provider/AuthSessionProvider'
import CoreProvider from '@shared/provider/CoreProvider'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import initTranslations from '@services/i18n/i18n'

async function getSession (cookie: string): Promise<Session | null> {
  const response = await axios({
    method: 'GET',
    url: `${process.env.NEXTAUTH_URL}/api/auth/session`,
    headers: {
      cookie,
      'Content-Type': 'application/json'
    }
  })

  const session = await response.data

  return Object.keys(session).length > 0 ? session : null
}

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: 'Kostenlos Gesellschaftsspiele ausleihen beim Spieleverleih! Jetzt anmelden und die besten Spiele für Kinder und Familien entdecken. Einfach und kostenlos registrieren!',

  icons: {
    icon: [
      {
        rel: 'shortcut icon',
        url: '/favicon.ico'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/android-chrome-512x512.png'
      }
    ]
  },

  manifest: '/site.webmanifest'
}

export default async function RootLayout ({
  children,
  params: { locale }
}: ServerSideComponentProp & { children: React.ReactNode }) {
  const { resources } = await initTranslations(locale)

  const session = await getSession(headers().get('cookie') ?? '')

  return (
    <html lang="de" data-mantine-color-scheme="light">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2" />
        <meta charSet="utf-8" />
        <meta name="keywords" content="Spieleverleih, kostenlos Spiele ausleihen, Brettspiele, Gesellschaftsspiele, kostenlos anmelden" />
      </head>
      <body>
        <AuthSessionProvider
          session={session}
        >
          <TranslationsProvider
            locale={locale}
            resources={resources}
          >
            <CoreProvider>
              {children}
            </CoreProvider>
          </TranslationsProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
