import React from 'react'
import { useSession } from 'next-auth/react'

import { RoleTypes } from '../typings/roles'
import { AuthSession } from '../typings/auth'

export const useCanRent = (): boolean => {
  const { data: session } = useSession()

  const canRent = React.useMemo((): boolean => {
    return (session as AuthSession)?.user?.role?.key === RoleTypes.User || !session
  }, [session])

  return canRent
}
