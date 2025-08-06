import { Container, Markdown, Text } from '@react-email/components'
import i18next from 'i18next'
import { MailingTemplateComponentProps, MailingTemplates } from '@typings/mailing'

import { EmailLayout } from '../components/EmailLayout'
import { mailMarkDownStyles } from '../emailTheme'

export default function ReservationCanceled ({
  i18nResources,
  locale = 'de',
  templateProps
}: MailingTemplateComponentProps<MailingTemplates.RESERVATION_CANCELLED>) {
  i18next.init({
    resources: i18nResources,
    lng: locale
  })

  const { t } = i18next

  return (
    <EmailLayout>
      <Container>
        <Text>
          {t('mail.greating', { name: templateProps?.name })}
        </Text>

        <Markdown
          markdownContainerStyles={mailMarkDownStyles}
        >
          {t(`mail.reservationCanceled.content${templateProps?.own ? 'Own' : 'Admin'}`, {
            code: templateProps?.reservationCode
          })}
        </Markdown>

        {!templateProps?.own && templateProps?.reason && (
          <Markdown
            markdownContainerStyles={mailMarkDownStyles}
          >
            {t('mail.reservationCanceled.reason', { reason: templateProps?.reason })}
          </Markdown>
        )}

      </Container>
    </EmailLayout>
  )
}
