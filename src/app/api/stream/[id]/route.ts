import { readFileSync, statSync } from 'fs'
import { join } from 'path'

import prisma from '@api/lib/prisma'
import { extension } from 'mime-types'

export async function GET (request: Request,
  { params }: { params: { id: string } }) {
  const file = await prisma.file.findFirst({
    where: { id: params.id }
  })

  if (!file) {
    return new Response('File not found', {
      status: 404
    })
  }

  const fileExtenstion = extension(file.mimeType)
  const path = join(process.cwd(), './storage', file.path, `${file.id}.${fileExtenstion}`)

  const stat = statSync(path)
  const fileSize = stat.size

  const headers = new Headers({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
    'Cache-Control': 'max-age=2592000',
    'Content-Length': fileSize.toString(),
    'Content-Type': file.mimeType,
    'Content-Disposition': `inline; filename="${file.fileName}"`
  })

  const fileContent = await readFileSync(path)

  return new Response(
    fileContent,
    {
      status: 200,
      headers
    })
}
