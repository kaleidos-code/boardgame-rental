import { Arg, Authorized, FieldResolver, Query, Resolver, Root } from 'type-graphql'
import prisma from '@api/lib/prisma'
import { Role } from '@api/role/models/Role'
import { GraphQLJSON } from 'graphql-scalars'

import { TextService } from '../text/TextService'

@Resolver(() => Role)
export class RoleResolver {
  private textService: TextService

  constructor () {
    this.textService = new TextService(prisma)
  }

  @Authorized(['role:read'])
  @Query(() => Role)
  async role (@Arg('id') id: string) {
    return await prisma.role.findUnique({
      where: {
        id
      }
    })
  }

  @Authorized(['role:read'])
  @Query(() => [Role])
  async roles () {
    return await prisma.role.findMany()
  }

  @FieldResolver(() => GraphQLJSON)
  async texts (
    @Root() parent: Role
  ): Promise<Record<string, string>> {
    return await this.textService.getModelTexts(Role.name, parent.id)
  }
}
