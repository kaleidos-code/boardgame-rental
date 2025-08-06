import { PrismaClient } from '@prisma/client'

import { seedRoles } from './roles.ts'
import { seedPermissions } from './permissions.ts'

const prisma = new PrismaClient()

async function main () {
  await seedRoles(prisma)
  await seedPermissions(prisma)
}

async function run () {
  main()
    .catch(e => console.error(e))
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export default run
