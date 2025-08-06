import { AuthSession } from '@typings/auth'
import type { GraphQlContext } from '@typings/common'
import { GraphQLError } from 'graphql'
import { AuthChecker } from 'type-graphql'

import { checkPermissions } from '../utils/checkPermissions'

export const authChecker: AuthChecker<GraphQlContext> = async (
  { context },
  permissions
) => {
  const session = context?.session as AuthSession

  const hasPermission = checkPermissions(session, permissions)

  if (!hasPermission) {
    throw new GraphQLError('error.api.permissionDenied')
  }

  return !!hasPermission
}
