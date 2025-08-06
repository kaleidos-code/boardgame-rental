'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

export type AuthContextProps = React.PropsWithChildren & {
  session: Session | null
}

export default function AuthSessionProvider ({ session, children }: AuthContextProps) {
  return (
    <SessionProvider
      session={session}
    >
      {children}
    </SessionProvider>
  )
}
