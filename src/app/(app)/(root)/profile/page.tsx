import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { BreadcrumbContainer } from '@shared/components/ui/BreadcrumbContainer'
import initTranslations from '@services/i18n/i18n'
import { UserProfileView } from '@features/userProfile/views/UserProfileView'

export default async function UserProfile ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <BreadcrumbContainer>
        <UserProfileView />
      </BreadcrumbContainer>
    </TranslationsProvider>
  )
}
