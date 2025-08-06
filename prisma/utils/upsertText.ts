import { PrismaClient } from '@prisma/client'

export const upsertText = async (prisma: PrismaClient, {
  key,
  lang,
  modelId,
  model,
  value
}: {
  key: string,
  lang: string,
  modelId: string,
  model: string,
  value: string
}) => {
  await prisma.text.upsert({
    where: {
      key_lang_modelId_model: {
        key,
        lang,
        modelId,
        model
      }
    },
    update: {
      value
    },
    create: {
      key,
      lang,
      modelId,
      model,
      value
    }
  })
}
