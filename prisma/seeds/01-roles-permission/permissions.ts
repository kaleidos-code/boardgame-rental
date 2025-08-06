import { PrismaClient } from '@prisma/client'

const PERMISSIONS: Record<string, string[]> = {
  user: ['create', 'read', 'update', 'delete'],
  role: ['create', 'read', 'update', 'delete'],
  permission: ['create', 'read', 'update', 'delete'],
  game: ['create', 'read', 'update', 'delete', 'export'],
  reservation: ['create', 'read', 'confirm', 'update', 'cancel'],
  rental: ['create', 'read', 'update', 'delete'],
  settings: ['read', 'update']
}

const ROLE_PERMISSIONS: Record<string, Record<string, string[]>> = {
  admin: {
    user: ['create', 'read', 'update', 'delete'],
    role: ['create', 'read', 'update', 'delete'],
    permission: ['create', 'read', 'update', 'delete'],
    game: ['create', 'read', 'update', 'delete', 'export'],
    reservation: ['read', 'cancel', 'update'],
    rental: ['create', 'read', 'update', 'delete'],
    settings: ['read', 'update']
  },
  renter: {
    game: ['create', 'read', 'update', 'delete', 'export'],
    reservation: ['read', 'cancel', 'update'],
    rental: ['create', 'read', 'update']
  },
  user: {
    game: ['read.minimal'],
    reservation: ['create', 'read.own', 'cancel.own', 'update.own'],
    rental: ['read.own']
  }
}

const assingPermissions = async (prisma: PrismaClient) => {
  for (const [role, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    const roleData = await prisma.role.findFirst({
      where: {
        key: role
      }
    })

    if (!roleData) {
      throw new Error(`Role not found: ${role}`)
    }

    for (const [resource, actions] of Object.entries(permissions)) {
      for (const action of actions) {
        const [ability, scope] = action.split('.')

        const permission = await prisma.permission.findFirst({
          where: {
            ability,
            resource
          }
        })

        if (!permission) {
          throw new Error(`Permission not found: ${resource}:${action}`)
        }

        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: roleData.id,
              permissionId: permission.id
            }
          },
          create: {
            roleId: roleData.id,
            permissionId: permission.id,
            scope: scope || 'all'
          },
          update: {
            scope: scope || 'all'
          }
        })

        console.log(`Role permission created: ${role} - ${resource}:${action}`)
      }
    }
  }
}

export const seedPermissions = async (prisma: PrismaClient) => {
  for (const [key, value] of Object.entries(PERMISSIONS)) {
    for (const permission of value) {
      const existingPermission = await prisma.permission.findFirst({
        where: {
          ability: permission,
          resource: key
        }
      })

      if (!existingPermission) {
        await prisma.permission.create({
          data: {
            ability: permission,
            resource: key
          }
        })
      }

      console.log(`Permission created: ${key}:${permission}`)
    }
  }

  await assingPermissions(prisma)
}
