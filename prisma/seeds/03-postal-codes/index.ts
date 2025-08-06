import { PrismaClient } from '@prisma/client'

import { seedPostalCodes } from './postalCodes.ts'

const prisma = new PrismaClient()

async function main () {
  await seedPostalCodes(prisma)
}

async function run () {
  main()
    .catch(e => console.error(e))
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export default run
