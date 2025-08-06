import { PrismaClient } from '@prisma/client'

import { TermsType } from './models/Terms'

export class TermsService {
  constructor (private readonly prisma: PrismaClient) {}

  async getUnacceptedTerms (userId: string): Promise<TermsType[]> {
    const terms = await this.prisma.terms.findMany()

    const unacceptedTerms: TermsType[] = []

    for (const term of terms) {
      const userTerms = await this.prisma.userTerms.findMany({
        where: {
          userId,
          termsKey: term.key,
          acceptedAt: {
            gte: term.updatedAt
          }
        }
      })

      if (userTerms.length === 0) {
        unacceptedTerms.push(term.key as TermsType)
      }
    }

    return unacceptedTerms
  }
}
