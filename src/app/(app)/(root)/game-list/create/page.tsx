import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { GameCreateFormView } from '@features/gameList/views/GameCreateFormView'
import { BreadcrumbContainer } from '@shared/components/ui/BreadcrumbContainer'

export default async function GameCreate ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <BreadcrumbContainer>
        <GameCreateFormView />
      </BreadcrumbContainer>
    </TranslationsProvider>
  )
}
