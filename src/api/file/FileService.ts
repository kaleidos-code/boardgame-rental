import { parse, resolve } from 'path'
import { createWriteStream, existsSync, mkdirSync } from 'fs'

import { v4 as uuidv4 } from 'uuid'
import { File as FileModel } from '@api/file/models/File'
import { lookup } from 'mime-types'
import sharp from 'sharp'
import { GraphQLError } from 'graphql'
import { PrismaClient } from '@prisma/client'

import { UploadFileInput } from './dto/UploadFileInput'

export class FileService {
  constructor (private readonly prisma: PrismaClient) {}

  async storeUpload (
    data: UploadFileInput,
    model: string,
    modelId: string
  ) {
    const previousFile = await this.prisma.file.findFirst({
      where: {
        model,
        modelId,
        key: data.key
      }
    })

    const id = previousFile?.id || uuidv4()
    const path = `${model.toLowerCase()}/${modelId}`
    const convertToWebP =
      data.file.type.startsWith('image/') && !data.file.type.includes('svg')

    const resolvedPath = resolve(`./storage/${path}`)
    if (!existsSync(resolvedPath)) {
      mkdirSync(resolvedPath, { recursive: true })
    }

    const onSuccess = async (resolver: (result: FileModel) => void) => {
      await this.prisma.file.deleteMany({
        where: {
          id
        }
      })

      const sanitizedFileName = data.file.name.replace(/[^a-zA-Z0-9.\-\s]/g, '_')
      const fixedFileName = convertToWebP
        ? `${parse(sanitizedFileName).name}.webp`
        : sanitizedFileName

      const result = await this.prisma.file.create({
        data: {
          id,
          key: data.key,
          model,
          modelId,
          fileName: fixedFileName,
          mimeType: lookup(fixedFileName) || 'text/plain',
          path
        }
      })

      resolver(result)
    }

    return new Promise<FileModel>(async (res) => {
      const fileArrayBuffer = await data.file.arrayBuffer()

      await sharp(fileArrayBuffer)
        .webp({
          quality: 80
        })
        .resize({
          width: 1920,
          height: 1080,
          fit: 'inside',
          withoutEnlargement: true
        })
        .toBuffer()
        .then((outputBuffer) => {
          const fileStream = createWriteStream(`${resolvedPath}/${id}.webp`)
          fileStream.write(outputBuffer)
          fileStream.end()

          onSuccess(res)
        })
        .catch(() => {
          throw new GraphQLError('error.storeUpload.failed')
        })
    })
  }

  async handleFileUpload (
    data: UploadFileInput[],
    model: string,
    modelId: string,
    prismaTx?: any,
    options?: {
      deletedKeys?: string[]
    }
  ) {
    const { deletedKeys } = options || {}

    for (const upload of data.filter((u) => !deletedKeys?.includes(u.key))) {
      if (!upload.file) {
        await (prismaTx || this.prisma).file.update({
          where: {
            modelId_model_key: {
              modelId,
              model,
              key: upload.key
            }
          },
          data: {
            model,
            modelId,
            key: upload.key
          }
        })
      }

      if (upload.file) {
        await this.storeUpload(upload, model, modelId)
      }
    }

    if (deletedKeys) {
      await this.prisma.file.deleteMany({
        where: {
          model,
          modelId,
          key: {
            in: deletedKeys
          }
        }
      })
    }
  }
}
