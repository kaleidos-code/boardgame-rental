import { AuthSessionUser } from '@typings/auth'
import { GraphQlContext } from '@typings/common'
import { createParamDecorator } from 'type-graphql'

export function PermissionScope (permission: string) {
  return createParamDecorator<GraphQlContext>(({ context }): string => {
    const user = context.session?.user as unknown as AuthSessionUser

    const relevantPermissions = user.role?.permissions?.find((p: string) => p.includes(permission))

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, scope] = relevantPermissions?.split('.') || []

    return scope
  })
}
