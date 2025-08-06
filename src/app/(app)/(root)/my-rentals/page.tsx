import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { BreadcrumbContainer } from '@shared/components/ui/BreadcrumbContainer'
import { MyRentalsView } from '@features/myRentals/views/MyRentalsView'

export default async function MyRentals ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <BreadcrumbContainer>
        <MyRentalsView />
      </BreadcrumbContainer>
    </TranslationsProvider>
  )
}
