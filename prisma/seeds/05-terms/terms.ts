/* eslint-disable max-len */
import { PrismaClient } from '@prisma/client'

import { upsertText } from '../../utils/upsertText.ts'

const terms:Record<string, string> = {
  TERMS: '### 1. Allgemeine Bedingungen',
  PRIVACY: '### 1. Allgemeines zur Datenverarbeitung'
}

export const seedTerms = async (prisma: PrismaClient) => {
  console.log('Terms seeded')

  for (const key of Object.keys(terms)) {
    await prisma.terms.upsert({
      where: {
        key: key as any
      },
      update: {
        updatedAt: new Date()
      },
      create: {
        key: key as any
      }
    })

    upsertText(prisma, {
      key: 'content',
      lang: 'de',
      modelId: key.toLowerCase(),
      model: 'Terms',
      value: terms[key]
    })
  }
}
