import xlsx from 'node-xlsx'
import { getServerSession } from 'next-auth'
import { AuthSession } from '@typings/auth'
import { checkPermissions } from '@api/utils/checkPermissions'
import prisma from '@api/lib/prisma'
import { NextResponse } from 'next/server'

import { authConfig } from '../../../../api/lib/auth'

export async function GET () {
  try {
    const session = await getServerSession(authConfig) as AuthSession

    const hasPersmission = checkPermissions(session, ['game:export'])

    if (!hasPersmission) {
      return NextResponse.json({
        message: 'Permission denied'
      }, {
        status: 403
      })
    }

    const gamesWithUnits = await prisma.game.findMany({
      where: {
        deletedAt: null
      },
      select: {
        title: true,
        gameShortId: true,
        gameUnits: {
          select: {
            unitShortId: true
          }
        }
      }
    })

    const units = gamesWithUnits.reduce((acc: { title: string; unitShortId: string; }[], game) => {
      return [
        ...acc,
        ...game.gameUnits.map((unit) => ({
          title: game.title,
          unitShortId: `${String(game.gameShortId).padStart(4, '0')}_${String(unit.unitShortId).padStart(2, '0')}`
        }))
      ]
    }, [])

    const sheet = xlsx.build([{
      name: 'Exemplare',
      data: [
        ['Titel', 'Exemplar-ID', 'Besitzer'],
        ...units.map((unit) => [unit.title, unit.unitShortId, 'Brettspielverleih'])
      ],
      options: {}
    }])

    const headers = {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachement; filename="spiele-exemplare-${new Date().toLocaleDateString().replace(/\./g, '-')}.xlsx"`
    }

    return new Response(new Uint8Array(sheet), {
      status: 200,
      headers
    })
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, {
        status: 400
      })
    }
  }
}
