import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { GameListView } from '@features/gameList/views/GameListView'
import { BreadcrumbContainer } from '@shared/components/ui/BreadcrumbContainer'

export default async function GameList ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <BreadcrumbContainer
        autoHeight={false}
      >
        <GameListView />
      </BreadcrumbContainer>
    </TranslationsProvider>
  )
}
