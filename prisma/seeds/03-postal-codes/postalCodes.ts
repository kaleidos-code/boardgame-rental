import { PrismaClient } from '@prisma/client'

import zipCodes from '../../assets/zipcodes.de.json' assert { type: 'json' }

export const seedPostalCodes = async (prisma: PrismaClient) => {
  await prisma.postalCode.createMany({
    data: (zipCodes as any).map((zipCode: any) => ({
      code: zipCode.zipcode,
      city: zipCode.place,
      state: zipCode.state
    })),
    skipDuplicates: true
  })
}
