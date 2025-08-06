import { Column, Container, Row, Section, Text } from '@react-email/components'
import i18next from 'i18next'
import { MailingTemplateComponentProps, MailingTemplates } from '@typings/mailing'
import { dateToHumanReadable } from '@utils/format'

import { EmailLayout } from '../components/EmailLayout'

export default function RentalOverdue ({
  i18nResources,
  locale = 'de',
  templateProps
}: MailingTemplateComponentProps<MailingTemplates.RENTAL_RETURNED>) {
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

        <Text >
          {t('mail.rentalReturned.info')}
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
          {templateProps?.rental && (
          <Row style={{ padding: '0 16px' }}>
            <Column colSpan={2}>
              <Row style={{ display: 'inline-flex', marginBottom: 40 }}>
                <Column style={{ width: '170px', paddingRight: '8px' }}>
                  <Text>{t('common.bookingId')}</Text>
                  <Text>{templateProps.rental.bookingId}</Text>
                </Column>
                <Column style={{ width: '170px', paddingRight: '8px' }}>
                  <Text>{t('common.title')}</Text>
                  <Text>{templateProps.rental.gameTitle}</Text>
                </Column>
                <Column style={{
                  paddingRight: '8px'
                }}
                >
                  <Text>{t('common.gameUnit')}</Text>
                  <Text>{templateProps.rental.gameUnit}</Text>
                </Column>
                <Column>
                  <Text>{t('common.returnedAt')}</Text>
                  <Text>{templateProps.rental.returnedAt ? dateToHumanReadable(templateProps.rental.returnedAt) : ''}</Text>
                </Column>
              </Row>
            </Column>
          </Row>
          )}
        </Section>

      </Container>
    </EmailLayout>
  )
}
