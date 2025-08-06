import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { BreadcrumbContainer } from '@shared/components/ui/BreadcrumbContainer'
import initTranslations from '@services/i18n/i18n'
import { SettingsView } from '@features/settings/views/SettingsView'

export default async function Settings ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <BreadcrumbContainer>
        <SettingsView />
      </BreadcrumbContainer>
    </TranslationsProvider>
  )
}
