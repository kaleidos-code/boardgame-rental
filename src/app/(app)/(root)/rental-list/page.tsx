import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { BreadcrumbContainer } from '@shared/components/ui/BreadcrumbContainer'
import { RentalListView } from '@features/rentalList/RentalListView'

export default async function RentalList ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <BreadcrumbContainer
        autoHeight={false}
      >
        <RentalListView />
      </BreadcrumbContainer>
    </TranslationsProvider>
  )
}
