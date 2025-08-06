import { Column, Container, Row, Section, Text } from '@react-email/components'
import i18next from 'i18next'
import { MailingTemplateComponentProps, MailingTemplates } from '@typings/mailing'

import { EmailLayout } from '../components/EmailLayout'

export default function ReservationConfirmation ({
  i18nResources,
  locale = 'de',
  templateProps
}: MailingTemplateComponentProps<MailingTemplates.RESERVATION_CONFIRMATION>) {
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
          {t('mail.reservationConfirmation.info')}
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
                  <Text>{t('common.title')}</Text>
                  {templateProps?.gameUnits.map((game, index) => (
                    <Text key={`title-${index}`}>{game.title}</Text>
                  ))}
                </Column>
                <Column>
                  <Text>{t('common.gameUnit')}</Text>
                  {templateProps?.gameUnits.map((game, index) => (
                    <Text key={`unit-${index}`}>{game.previxedId}</Text>
                  ))}
                </Column>
              </Row>
            </Column>
          </Row>
        </Section>

        <br/>
        <Text>
          {t('mail.reservationConfirmation.pickupInfo')}
        </Text>

      </Container>
    </EmailLayout>
  )
}
