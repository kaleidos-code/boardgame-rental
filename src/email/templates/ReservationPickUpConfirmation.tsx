import { Container, Text } from '@react-email/components'
import i18next from 'i18next'
import { MailingTemplateComponentProps, MailingTemplates } from '@typings/mailing'

import { EmailLayout } from '../components/EmailLayout'
import { EmailPickUpTimes } from '../components/EmailPickUpTimes'

export default function ReservationPickUpConfirmation ({
  i18nResources,
  locale = 'de',
  templateProps
}: MailingTemplateComponentProps<MailingTemplates.RESERVATION_PICK_UP_CONFIRMATION>) {
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
        <Text>
          {t('rentalCart.reservationCode')} <strong>{templateProps?.reservationCode}</strong>
        </Text>

        <Text>
          {t('mail.reservationPickUpConfirmation.info')}
        </Text>

        <Text>
          {t('mail.reservationPickUpConfirmation.pickup', { count: templateProps?.pickUpDays.length })}
        </Text>
        <EmailPickUpTimes pickUpDays={templateProps?.pickUpDays || []} i18next={i18next} />
        <br/>
        <Text>
          {t('mail.reservationPickUpConfirmation.pickupInfo')}
        </Text>

      </Container>
    </EmailLayout>
  )
}
