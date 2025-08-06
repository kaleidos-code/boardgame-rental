import { useSession } from 'next-auth/react'

import { AuthSession } from '../typings/auth'

export const useAuthSession = (): AuthSession => {
  const { data: session } = useSession()

  return session as AuthSession
}
