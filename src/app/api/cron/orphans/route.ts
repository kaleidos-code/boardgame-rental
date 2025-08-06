import { join } from 'path'
import fs from 'fs'

import prisma from '@api/lib/prisma'
import { NextResponse } from 'next/server'
import mime from 'mime-types'

async function deleteOrphanedTexts () {
  const ignoredModelNames = ['postalCode', 'terms', 'role']
  let deleteCount = 0

  console.log('[TASK] deleteOrphanedTexts started')

  const entries = await prisma.text.findMany()

  for (const entry of entries) {
    const modelName =
      entry.model.charAt(0).toLowerCase() + entry.model.slice(1)

    if (ignoredModelNames.includes(modelName)) continue

    if (!(prisma as any)[modelName]) {
      console.error(`Model ${modelName} not found in prisma`)

      await prisma.text.delete({
        where: {
          key_lang_modelId_model: {
            key: entry.key,
            lang: entry.lang,
            modelId: entry.modelId,
            model: entry.model
          }
        }
      })

      deleteCount++
      continue
    }

    const model = await (prisma as any)[modelName].findUnique({
      where: {
        id: entry.modelId
      }
    })

    if (!model) {
      console.log(
        `Deleting orphaned text ${entry.key} on ${entry.model}:${entry.modelId}\n${entry.value}`
      )

      await prisma.text.delete({
        where: {
          key_lang_modelId_model: {
            key: entry.key,
            lang: entry.lang,
            modelId: entry.modelId,
            model: entry.model
          }
        }
      })

      deleteCount++
    }
  }

  console.log(
    `[TASK] deleteOrphanedTexts completed. ${deleteCount} entries deleted.`
  )
}

async function deleteOrphanedFileModels () {
  console.log('[TASK] removeOrphanedFileModels started')

  let deleteCount = 0
  const entries = await prisma.file.findMany()

  for (const entry of entries) {
    const prismaModelName =
      entry.model.charAt(0).toLowerCase() + entry.model.slice(1)

    try {
      const model = await (prisma as any)[prismaModelName].findUnique({
        where: {
          id: entry.modelId
        }
      })

      if (!model) {
        console.log(
          `Deleting orphaned file entry ${entry.id} on ${entry.model}:${entry.modelId}`
        )

        await prisma.file.delete({
          where: {
            id: entry.id
          }
        })
        const extension = mime.extension(entry.mimeType)

        const path = join(process.cwd(), './storage', entry.path, `${entry.id}.${extension}`)

        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }

        deleteCount++
      }
    } catch (error) {
      console.error(
        `Error while checking file entry ${entry.id} on ${entry.model}:${entry.modelId}`,
        error
      )
    }
  }

  console.log(
    `[TASK] removeOrphanedFileModels completed. ${deleteCount} entries deleted.`
  )
}

export async function GET (req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  await deleteOrphanedTexts()
  await deleteOrphanedFileModels()

  return NextResponse.json({ data: 'Orphanes deleted' })
}
