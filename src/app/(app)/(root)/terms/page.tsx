import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import initTranslations from '@services/i18n/i18n'
import { LegalView } from '@features/legal/LegalView'
import { TermsType } from '@typings/graphql'

export default async function Terms ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <LegalView type={TermsType.Terms} />
    </TranslationsProvider>
  )
}
