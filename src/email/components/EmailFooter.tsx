import { Container, Hr, Markdown } from '@react-email/components'
import { IMPRINT_MAIL } from '@shared/constants/imprint'

import { mailMarkDownStyles } from '../emailTheme'

export const EmailFooter = () => {
  return (
    <Container>
      <Hr className="border border-solid border-[#eaeaea] mb-0 mx-0 w-full" />
      <Markdown markdownContainerStyles={{
        ...mailMarkDownStyles,
        color: '#222222',
        fontSize: '12px',
        lineHeight: '1.2'
      }}
      >
        {IMPRINT_MAIL}
      </Markdown>
    </Container>
  )
}
