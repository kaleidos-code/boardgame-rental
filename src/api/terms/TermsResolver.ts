import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql'
import prisma from '@api/lib/prisma'
import { GraphQLJSON } from 'graphql-scalars'

import { TextService } from '../text/TextService'

import { Terms, TermsType } from './models/Terms'

@Resolver(() => Terms)
export class TermsResolver {
  private textService: TextService

  constructor () {
    this.textService = new TextService(prisma)
  }

  @Query(() => Terms)
  async term (@Arg('key') key: TermsType) {
    return await prisma.terms.findUnique({
      where: {
        key
      }
    })
  }

  @Query(() => [Terms])
  async terms () {
    return await prisma.terms.findMany()
  }

  @FieldResolver(() => GraphQLJSON)
  async texts (
    @Root() parent: Terms
  ): Promise<Record<string, string>> {
    return await this.textService.getModelTexts(Terms.name, parent.key.toLowerCase())
  }
}
