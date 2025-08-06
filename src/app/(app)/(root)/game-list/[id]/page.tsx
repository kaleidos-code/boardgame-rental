import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { GameUpdateFormView } from '@features/gameList/views/GameUpdateFormView'
import { BreadcrumbContainer } from '@shared/components/ui/BreadcrumbContainer'

export default async function GameUpdate ({ params: { locale } }: ServerSideComponentProp) {
  const { resources, t } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <BreadcrumbContainer
        breadCrumbProps={{
          customBreadcrumbTitle: {
            id: t('action.edit')
          }
        }}
      >
        <GameUpdateFormView />
      </BreadcrumbContainer>
    </TranslationsProvider>
  )
}
