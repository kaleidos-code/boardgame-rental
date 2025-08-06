import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { BreadcrumbContainer } from '@shared/components/ui/BreadcrumbContainer'
import initTranslations from '@services/i18n/i18n'
import { RentalCartView } from '@features/rentalCart/views/RentalCartView'

export default async function RentalCart ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <BreadcrumbContainer>
        <RentalCartView />
      </BreadcrumbContainer>
    </TranslationsProvider>
  )
}
