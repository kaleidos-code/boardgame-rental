import { PrismaClient } from '@prisma/client'

const appConfig = {
  key: 'app',
  signUpDisabled: true
}

export const seedAppConfig = async (prisma: PrismaClient) => {
  await prisma.appConfig.upsert({
    where: {
      key: appConfig.key
    },
    update: {
      ...appConfig
    },
    create: {
      ...appConfig
    }
  })

  console.log('App config seeded')
}
