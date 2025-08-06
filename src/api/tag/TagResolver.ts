import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql'
import prisma from '@api/lib/prisma'
import { GraphQLJSON } from 'graphql-scalars'
import { Tag } from '@api/tag/models/Tag'

import { TextService } from '../text/TextService'

@Resolver(() => Tag)
export class TagResolver {
  private textService: TextService

  constructor () {
    this.textService = new TextService(prisma)
  }

  @Query(() => Tag)
  async tag (@Arg('id') id: string) {
    return await prisma.tag.findUnique({
      where: {
        id
      }
    })
  }

  @Query(() => [Tag])
  async tags () {
    return await prisma.tag.findMany()
  }

  @FieldResolver(() => GraphQLJSON)
  async texts (
    @Root() parent: Tag
  ): Promise<Record<string, string>> {
    return await this.textService.getModelTexts(Tag.name, parent.id)
  }
}
