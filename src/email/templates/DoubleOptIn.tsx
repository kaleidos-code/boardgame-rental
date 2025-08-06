import { Button, Container, Text } from '@react-email/components'
import i18next from 'i18next'
import { MailingTemplateComponentProps, MailingTemplates } from '@typings/mailing'

import { EmailLayout } from '../components/EmailLayout'

export default function DoubleOptIn ({
  i18nResources,
  locale = 'de',
  templateProps
}: MailingTemplateComponentProps<MailingTemplates.DOUBLE_OPT_IN>) {
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
          {t('mail.doubleOptIn.content')}
        </Text>
        <Container
          className="flex items-center justify-center"
        >
          <Button
            className="bg-[#000000] text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
            href={templateProps?.href || ''}
            target="_blank"
          >
            {t('mail.doubleOptIn.link')}
          </Button>
        </Container>
      </Container>
    </EmailLayout>
  )
}
