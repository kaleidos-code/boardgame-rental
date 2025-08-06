import React from 'react'
import { Anchor, Notification } from '@mantine/core'
import { useTranslation, Trans } from 'react-i18next'

import { useTermsContext } from '../../provider/TermsProvider'

export const TermsAcceptenceWarning: React.FC = () => {
  const { t } = useTranslation()

  const { termsManagerRef } = useTermsContext()

  const handelOnClick = () => {
    termsManagerRef.current?.showTerms()
  }

  return (
    <Notification
      title={t('notification.termsAcceptance.title')}
      withCloseButton={false}
    >
      <Trans
        i18nKey="notification.termsAcceptance.message"
        components={{
          a: <Anchor
            fz="sm"
            onClick={handelOnClick}
          />
        }}
      />
    </Notification>
  )
}
