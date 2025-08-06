import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import initTranslations from '@services/i18n/i18n'
import { FaqView } from '@features/faq/FaqView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Brettspielverleih',
  description: 'Häufig gestellte Fragen zum Brettspielverleih.'
}

export default async function FAQ ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <FaqView />
    </TranslationsProvider>
  )
}
