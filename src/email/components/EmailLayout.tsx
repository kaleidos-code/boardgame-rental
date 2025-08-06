import { Body, Html, Tailwind } from '@react-email/components'
import React from 'react'

import { EmailFooter } from '../components/EmailFooter'
import { EmailHeader } from '../components/EmailHeader'
import { emailTheme } from '../emailTheme'

export const EmailLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Html>
      <Tailwind
        config={emailTheme}
      >
        <Body
          className="width-full"
        >
          <EmailHeader />
          {children}
          <EmailFooter />
        </Body>
      </Tailwind>
    </Html>
  )
}
