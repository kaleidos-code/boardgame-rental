import { Column, Container, Row, Section, Text } from '@react-email/components'
import i18next from 'i18next'
import { MailingTemplateComponentProps, MailingTemplates } from '@typings/mailing'
import { dateToHumanReadable } from '@utils/format'

import { EmailLayout } from '../components/EmailLayout'

export default function RentalOverdue ({
  i18nResources,
  locale = 'de',
  templateProps
}: MailingTemplateComponentProps<MailingTemplates.RENTAL_OVERDUE>) {
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
          {t('mail.rentalOverdue.info')}
        </Text>

        <Section style={{
          borderCollapse: 'collapse' as const,
          borderSpacing: '0px',
          color: 'rgb(51,51,51)',
          backgroundColor: 'rgb(250,250,250)',
          borderRadius: '3px',
          fontSize: '12px'
        }}
        >
          <Row style={{ padding: '0 16px' }}>
            <Column colSpan={2}>
              <Row style={{ display: 'inline-flex', marginBottom: 40 }}>
                <Column style={{ width: '170px', paddingRight: '8px' }}>
                  <Text>{t('common.bookingId')}</Text>
                  {templateProps?.rentals.map((rental, index) => (
                    <Text key={`booking-${index}`}>{rental.bookingId}</Text>
                  ))}
                </Column>
                <Column style={{ width: '170px', paddingRight: '8px' }}>
                  <Text>{t('common.title')}</Text>
                  {templateProps?.rentals.map((rental, index) => (
                    <Text key={`title-${index}`}>{rental.gameTitle}</Text>
                  ))}
                </Column>
                <Column style={{
                  paddingRight: '8px'
                }}
                >
                  <Text>{t('common.gameUnit')}</Text>
                  {templateProps?.rentals.map((rental, index) => (
                    <Text key={`unit-${index}`}>{rental.gameUnit}</Text>
                  ))}
                </Column>
                <Column>
                  <Text>{t('common.dueDate')}</Text>
                  {templateProps?.rentals.map((rental, index) => (
                    <Text key={`dueDate-${index}`}>{dateToHumanReadable(rental.dueDate)}</Text>
                  ))}
                </Column>
              </Row>
            </Column>
          </Row>
        </Section>

        <Text>
          {t('mail.rentalOverdue.annotation')}
        </Text>

      </Container>
    </EmailLayout>
  )
}
