import { render } from '@react-email/components'
import { MAILING_TEMPLATES } from '@email/templates'
import initTranslations from '@services/i18n/i18n'
import { MailingTemplates, MailingTemplateProps } from '@typings/mailing'
import nodemailer from 'nodemailer'

type MailOptions = {
  to: string
  subject: {
    key: string,
    props?: Record<string, string>
  }
  template: MailingTemplates
  templateProps?: MailingTemplateProps[MailingTemplates]
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

export async function sendMail ({
  to,
  subject,
  template,
  templateProps
}: MailOptions) {
  const { resources, t } = await initTranslations('de')

  const renderedHtml = render(MAILING_TEMPLATES[template]({
    i18nResources: resources,
    templateProps
  }))

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM_EMAIL,
      to,
      subject: t(subject.key, subject.props),
      html: renderedHtml
    })
  } catch (error) {
    console.error(error)
  }
}
