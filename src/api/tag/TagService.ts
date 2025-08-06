import { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'

import { TextService } from '../text/TextService'

import { CreateTagInput } from './dto/CreateTagInput'
import { Tag } from './models/Tag'

export class TagService {
  private textService: TextService

  constructor (
    private readonly prisma: PrismaClient
  ) {
    this.textService = new TextService(prisma)
  }

  async createTag (data: CreateTagInput) {
    const { games, texts, key, ...tagData } = data

    try {
      await this.prisma.$transaction(async (prismaTx) => {
        const tag = await prismaTx.tag.upsert({
          where: {
            key
          },
          update: {
            ...tagData
          },
          create: {
            ...tagData,
            key,
            games: {
              createMany: {
                data: games?.map((gameId) => ({
                  gameId
                })) || []
              }
            }
          }
        })

        await this.textService.createOrUpdateTextsFromInputArray(
          texts || [],
          Tag.name,
          tag.id,
          prismaTx
        )
      })
    } catch (error: any) {
      throw new GraphQLError(error)
    }
  }
}
