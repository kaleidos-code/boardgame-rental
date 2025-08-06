import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import initTranslations from '@services/i18n/i18n'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { BreadcrumbContainer } from '@shared/components/ui/BreadcrumbContainer'
import { UserUpdateFormView } from '@features/userList/views/UserUpdateFormView'

export default async function UserUpdate ({ params: { locale } }: ServerSideComponentProp) {
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
        <UserUpdateFormView />
      </BreadcrumbContainer>
    </TranslationsProvider>
  )
}
