import { Column, Container, Markdown, Row, Section, Text } from '@react-email/components'
import i18next from 'i18next'
import { MailingTemplateComponentProps, MailingTemplates } from '@typings/mailing'
import { dateToHumanReadable } from '@utils/format'

import { EmailLayout } from '../components/EmailLayout'
import { mailMarkDownStyles } from '../emailTheme'
import { EmailPickUpTimes } from '../components/EmailPickUpTimes'

export default function RentalConfirmation ({
  i18nResources,
  locale = 'de',
  templateProps
}: MailingTemplateComponentProps<MailingTemplates.RENTAL_CONFIRMATION>) {
  i18next.init({
    resources: i18nResources,
    lng: locale
  })

  const { t, language } = i18next

  return (
    <EmailLayout>
      <Container>
        <Text>
          {t('mail.greating', { name: templateProps?.name })}
        </Text>

        <Markdown markdownContainerStyles={mailMarkDownStyles}>
          {t('mail.rentalConfirmation.content')}
        </Markdown>

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
                <Column style={{ width: '170px' }}>
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

        <Markdown markdownContainerStyles={mailMarkDownStyles}>
          {t('mail.rentalConfirmation.info', {
            dueDate: templateProps?.dueDate ? dateToHumanReadable(templateProps?.dueDate, { lang: language }) : ''
          })}
        </Markdown>

        <Text>
          {t('mail.rentalConfirmation.return', { count: templateProps?.pickUpDays.length })}
        </Text>

        <EmailPickUpTimes pickUpDays={templateProps?.pickUpDays || []} i18next={i18next} />
      </Container>
    </EmailLayout>
  )
}
