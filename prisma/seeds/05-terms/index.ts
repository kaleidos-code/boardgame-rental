import { PrismaClient } from '@prisma/client'

import { seedTerms } from './terms.ts'

const prisma = new PrismaClient()

async function main () {
  await seedTerms(prisma)
}

async function run () {
  main()
    .catch(e => console.error(e))
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export default run
