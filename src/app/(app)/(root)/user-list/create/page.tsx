import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { BreadcrumbContainer } from '@shared/components/ui/BreadcrumbContainer'
import { UserCreateFormView } from '@features/userList/views/UserCreateFormView'

export default async function UserCreate ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <BreadcrumbContainer>
        <UserCreateFormView />
      </BreadcrumbContainer>
    </TranslationsProvider>
  )
}
