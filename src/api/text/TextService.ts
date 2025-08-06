import { PrismaClient } from '@prisma/client'

import { CreateTextInput } from './dto/createTranslation.input'

export class TextService {
  constructor (private readonly prisma: PrismaClient) {}

  async getModelTexts (model: string, modelId: string): Promise<Record<string, string>> {
    const texts = await this.prisma.text.findMany({
      where: {
        model,
        modelId
      }
    })

    return texts.reduce((acc, text) => {
      acc[text.key] = text.value
      return acc
    }, {} as Record<string, string>)
  }

  async createOrUpdateTextsFromInputArray (
    texts: CreateTextInput[],
    model: string,
    modelId: string,
    prismaTx?: any
  ) {
    const data = texts.reduce<Map<string, { lang: string; value: string }[]>>(
      (acc, { key, lang = 'de', value }) => {
        acc.set(key, [...(acc.get(key) ?? []), { lang, value: value ?? '' }])
        return acc
      },
      new Map()
    )

    for (const key of data.keys()) {
      for (const { lang, value } of data.get(key)!) {
        await (prismaTx || this.prisma).text.upsert({
          where: {
            key_lang_modelId_model: {
              model,
              modelId,
              key,
              lang
            }
          },
          create: {
            model,
            modelId,
            key,
            lang,
            value
          },
          update: {
            value
          }
        })
      }
    }
  }
}
