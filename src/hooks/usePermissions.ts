import { useAuthSession } from './useAuthSession'

export type UsePermissions = {
  can: (permission: string) => boolean
  permissions: string[]
}

export const usePermissions = () => {
  const session = useAuthSession()

  const splitPermission = (permission: string) => {
    const [resource, action] = permission.split(':')
    const [ability, scope] = (action || '').split('.')

    return {
      resource,
      scope: scope || 'all',
      ability
    }
  }
  const checkPermission = (permission: string) => {
    const splittedPermission = splitPermission(permission)

    return session?.user?.role?.permissions.some((p) => {
      const splittedSessionPermission = splitPermission(p)
      if (splittedSessionPermission.resource !== splittedPermission.resource) {
        return false
      }

      if (splittedSessionPermission.scope !== splittedPermission.scope) {
        return false
      }

      if (splittedSessionPermission.ability !== splittedPermission.ability) {
        return false
      }

      return true
    })
  }

  const can = (permission: string[] | string) => {
    if (Array.isArray(permission)) {
      return permission.every((p) => checkPermission(p))
    }

    return checkPermission(permission)
  }

  return {
    can,
    permissions: session?.user?.role?.permissions || []
  }
}
