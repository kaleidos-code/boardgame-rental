import { PrismaClient } from '@prisma/client'

import { seedPickUps } from './pickUps.ts'
import { seedAppConfig } from './appConfig.ts'

const prisma = new PrismaClient()

async function main () {
  await seedPickUps(prisma)
  await seedAppConfig(prisma)
}

async function run () {
  main()
    .catch(e => console.error(e))
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export default run
