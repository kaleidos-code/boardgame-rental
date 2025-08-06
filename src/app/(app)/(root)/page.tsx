import React from 'react'
import { ServerSideComponentProp } from '@typings/common'
import TranslationsProvider from '@shared/provider/TranslationsProvider'
import { GameLibraryView } from '@features/gameLibrary/views/GameLibraryView'
import prisma from '@api/lib/prisma'
import { TagDataFragment } from '@typings/graphql'
import initTranslations from '@services/i18n/i18n'

export default async function Home ({ params: { locale } }: ServerSideComponentProp) {
  const { resources } = await initTranslations(locale)

  const getTags = async (): Promise<TagDataFragment[]> => {
    const data = await prisma.tag.findMany()

    const tags = []

    for (const tag of data) {
      const texts = await prisma.text.findMany({
        where: {
          lang: 'de',
          model: 'Tag',
          modelId: tag.id
        }
      })

      const textObj = texts.reduce((acc, text) => {
        acc[text.key] = text.value
        return acc
      }, {} as Record<string, string>)

      tags.push({
        ...tag,
        texts: textObj
      })
    }

    return tags
  }

  const tags = await getTags()

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
    >
      <GameLibraryView
        tags={tags}
      />
    </TranslationsProvider>
  )
}
