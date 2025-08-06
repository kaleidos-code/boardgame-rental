import { join } from 'path'
import { readFileSync, statSync } from 'fs'

import mime from 'mime-types'
import { FieldResolver, Resolver, Root } from 'type-graphql'
import { File } from '@api/file/models/File'
import { getPlaiceholder } from 'plaiceholder'

@Resolver(() => File)
export class FileResolver {
  constructor () {}

  @FieldResolver(() => String)
  async url (@Root() file: File) {
    const host = process.env.APP_URL
    return `${host}/api/stream/${file.id}`
  }

  @FieldResolver(() => Number)
  async size (@Root() file: File) {
    const extension = mime.extension(file.mimeType)

    const path = join(process.cwd(), './storage', file.path, `${file.id}.${extension}`)

    const stat = statSync(path)
    return stat.size
  }

  @FieldResolver(() => String)
  async dataUrl (@Root() file: File) {
    const extension = mime.extension(file.mimeType)

    const path = join(process.cwd(), './storage', file.path, `${file.id}.${extension}`)

    const image = await readFileSync(path)

    const buffer = Buffer.from(image)

    return getPlaiceholder(buffer).then(({ base64 }) => base64)
  }
}
