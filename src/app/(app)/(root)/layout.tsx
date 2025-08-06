import '@mantine/core/styles.css'
import { RootLayout } from '@shared/components/layout/RootLayout'
import { TermsProvider } from '@shared/provider/TermsProvider'
import Head from 'next/head'
import React from 'react'

export default async function AppContentLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <TermsProvider>
      <RootLayout>
        <Head>
          <meta name="theme-color" content="white"/>
        </Head>
        {children}
      </RootLayout>
    </TermsProvider>
  )
}
