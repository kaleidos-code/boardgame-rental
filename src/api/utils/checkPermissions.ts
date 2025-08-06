import { AuthSession } from '@typings/auth'

export const checkPermissions = (session: AuthSession, permissions: string[]) => {
  if (!session?.user) {
    return false
  }

  if (!permissions.length) {
    return true
  }

  const sessionPermission = session?.user?.role?.permissions
  const hasPermission = permissions.some((permission) => {
    const scope = permission.split('.')[1]

    return scope !== 'all' ? sessionPermission?.find((p) => p.includes(permission)) : sessionPermission?.includes(permission)
  })

  if (!hasPermission) {
    return false
  }

  return !!hasPermission
}
