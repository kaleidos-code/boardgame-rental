import React from 'react'
import { Anchor, Notification } from '@mantine/core'
import { useTranslation, Trans } from 'react-i18next'
import { TokenType, useSendDoubleOptInMailToMeMutation, useSendDoubleOptInNewMailToMeMutation } from '@typings/graphql'

export type MailVerificationWarningProps = {
  closable?: boolean
  type?: TokenType
  onSuccess: (message: string) => void
  onError: (error: Error) => void
}

export const MailVerificationWarning: React.FC<MailVerificationWarningProps> = ({ onSuccess, onError, type = TokenType.OptIn, closable = false }) => {
  const { t } = useTranslation()

  const [sendVerificationMail] = useSendDoubleOptInMailToMeMutation()
  const [sendVerificationNewMail] = useSendDoubleOptInNewMailToMeMutation()

  const [isVisible, setIsVisible] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  const handleResendEmail = async () => {
    setLoading(true)
    try {
      if (type === TokenType.NewEmail) {
        await sendVerificationNewMail()
      } else {
        await sendVerificationMail()
      }

      onSuccess(t('common.doubleOptInSuccess'))

      if (!closable) {
        setIsVisible(false)
      }
    } catch (error: any) {
      onError(error)
    } finally {
      setLoading(false)
    }
  }

  return isVisible
    ? (
      <Notification
        title={t('notification.emailVerification.title')}
        onClose={() => setIsVisible(false)}
        withCloseButton={closable}
        loading={loading}
      >
        <Trans
          i18nKey="notification.emailVerification.message"
          components={{
            a: <Anchor
              fz="sm"
              onClick={handleResendEmail}
            />
          }}
        />
      </Notification>
      )
    : null
}
