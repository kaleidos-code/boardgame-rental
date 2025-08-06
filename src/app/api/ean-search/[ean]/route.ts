import { checkPermissions } from '@api/utils/checkPermissions'
import { AuthSession } from '@typings/auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { authConfig } from '../../../../api/lib/auth'

export async function GET (req: Request, { params }: { params: { ean: string } }) {
  const session = await getServerSession(authConfig) as AuthSession

  const hasPersmission = checkPermissions(session, ['game:create'])

  if (!hasPersmission) {
    return NextResponse.json({
      message: 'Permission denied'
    }, {
      status: 403
    })
  }
  const endpoint = process.env.BOARDGAME_EAN_API

  try {
    const result = await fetch(`${endpoint}/${params.ean}`)

    if (!result.ok) {
      console.error(`Error fetching boardgame with ean: ${params.ean}`)

      return NextResponse.json({
        message: 'Error fetching boardgame'
      }, {
        status: 500
      })
    }

    const data = await result.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      message: 'Error fetching boardgame'
    }, {
      status: 500
    })
  }
}
