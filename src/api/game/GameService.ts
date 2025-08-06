import xlsx from 'node-xlsx'
import { Prisma, PrismaClient, GameUnit } from '@prisma/client'
import { GraphQLError } from 'graphql'

import { TagService } from '../tag/TagService'
import { TextService } from '../text/TextService'

import { Game } from './models/Game'

type Sheet = {
  name: string;
  data: any[][];
} | undefined

type ColumnKey<T extends string> = {
  key: T;
  selector: string;
  required?: boolean;
}

const TAG_KEYS: ColumnKey<'key' | 'title'>[] = [{
  key: 'key',
  selector: 'Key'
}, {
  key: 'title',
  selector: 'Titel'
}]

const GAME_KEYS: ColumnKey<'ean'
 | 'title'
 | 'description'
 | 'publisher'
 | 'content'
 | 'minAge'
 | 'maxAge'
 | 'minPlayers'
 | 'maxPlayers'
 | 'minDuration'
 | 'maxDuration'
 | 'units'
 | 'incomplete'
 | 'weight'
 | 'categories'
 | 'images'>[] = [{
   key: 'ean',
   selector: 'EAN (Optional)'
 }, {
   key: 'title',
   selector: 'Titel',
   required: true
 }, {
   key: 'description',
   selector: 'Beschreibung'
 }, {
   key: 'publisher',
   selector: 'Verlag',
   required: true
 }, {
   key: 'content',
   selector: 'Inhalt'
 }, {
   key: 'minAge',
   selector: 'Mindest Alter',
   required: true
 }, {
   key: 'maxAge',
   selector: 'Maximal Alter (Optional)'
 }, {
   key: 'minPlayers',
   selector: 'Mindest Spieleranzahl',
   required: true
 }, {
   key: 'maxPlayers',
   selector: 'Maximale Spieleranzahl (Optional)'
 }, {
   key: 'minDuration',
   selector: 'Mindest Spieldauer',
   required: true
 }, {
   key: 'maxDuration',
   selector: 'Maximal Spieldauer (Optional)'
 },
 {
   key: 'units',
   selector: 'Exemplare'
 },
 {
   key: 'incomplete',
   selector: 'Unvollständige Exemplare (Optional)'
 }, {
   key: 'weight',
   selector: 'Gewicht (Optional)'
 }, {
   key: 'categories',
   selector: 'Kategorien'
 }, {
   key: 'images',
   selector: 'Bildernamen (Optional)'
 }]

export class GameService {
  private tagService: TagService
  private textService: TextService

  constructor (
    private readonly prisma: PrismaClient
  ) {
    this.tagService = new TagService(prisma)
    this.textService = new TextService(prisma)
  }

  private getParsedSheet<T extends string> (sheet: Sheet, keys: ColumnKey<T>[], errMsg: string): Record<T, string>[] {
    if (!sheet) {
      return []
    }

    const sheetKeys = sheet.data[0].map((item) => item.toLowerCase().trim())
    const missingKeys = keys.filter(({ selector }) => !sheetKeys.includes(selector.toLowerCase().trim())).map(({ key }) => key)

    if (missingKeys.length > 0) {
      throw new GraphQLError(errMsg, {
        extensions: {
          missingColumns: missingKeys.join(', ')
        }
      })
    }

    const requiredKeys = keys.filter(({ required }) => required).map(({ key }) => key)

    const mappedKeys = keys.map(({ key, selector }) =>
      sheetKeys.indexOf(selector.toLowerCase().trim()) > -1 ? key : null).filter((key) => key !== null) as T[]

    const shiftedData = sheet.data.slice(1)

    return shiftedData.reduce((acc, item) => {
      const mappedItem = item.reduce((accItem, value, index) => {
        accItem[mappedKeys[index]] = value
        return accItem
      }, {})

      if (requiredKeys.every((key) => mappedItem[key])) {
        acc.push(mappedItem)
      } else {
        console.log(item[1], 'missing')
      }

      return acc
    }, [])
  }

  private async createtTagsFromImport (tags: Sheet): Promise<void> {
    const tagData = this.getParsedSheet(tags, TAG_KEYS, 'error.import.importTagsFailedColumns')

    for (const tag of tagData) {
      await this.tagService.createTag({
        key: tag.key,
        texts: [{
          key: 'name',
          value: tag.title
        }]
      })
    }
  }

  private getUnitsFromCount (data: {
    existing: GameUnit[]
    count: number
    incomplete?: number
  }): { unitShortId: string, incomplete: boolean }[] {
    const { existing, count, incomplete } = data
    const newUnits = []

    const existingIncomplete = existing.filter((unit) => unit.incomplete)?.length || 0
    const diff = count - existing.length
    const incompleteDiff = (incomplete || 0) - existingIncomplete

    if (diff > 0) {
      const mapped = Array.from({ length: count }, (_, index) => {
        return {
          unitShortId: String(index + (existing.length || 0) + 1).padStart(2, '0'),
          incomplete: !!incompleteDiff && index + 1 > (count - incompleteDiff)
        }
      })

      newUnits.push(...mapped)
    }

    return [...(existing?.map((unit) => {
      return {
        unitShortId: unit.unitShortId,
        incomplete: unit.incomplete
      }
    }) || []), ...newUnits]
  }

  private async createGamesFromImport (games: Sheet, tags: Sheet): Promise<void> {
    const tagData = this.getParsedSheet(tags, TAG_KEYS, 'error.import.importTagsFailedColumns')
    const gameData = this.getParsedSheet(games, GAME_KEYS, 'error.import.importGamesFailedColumns')

    for (const game of gameData) {
      console.log('importing:', game.title)

      await this.prisma.$transaction(async (prismaTx) => {
        const gameTags = game.categories.split(',').map((tag) => tag.toLocaleLowerCase().trim())
        const mappedTagKeys = tagData.filter((tag) => gameTags.includes(tag.title.toLocaleLowerCase().trim())).map((tag) => tag.key)

        const upsertData:Prisma.XOR<Prisma.GameCreateInput, Prisma.GameUncheckedCreateInput> = {
          title: game.title,
          publisher: game.publisher,
          minAge: parseInt(game.minAge),
          maxAge: game.maxAge ? parseInt(game.maxAge) : null,
          minPlayers: parseInt(game.minPlayers),
          maxPlayers: game.maxPlayers ? parseInt(game.maxPlayers) : null,
          minDuration: parseInt(game.minDuration),
          maxDuration: game.maxDuration ? parseInt(game.maxDuration) : null,
          ean: game.ean,
          tags: {
            create: mappedTagKeys.map((tag) => ({
              tag: {
                connect: {
                  key: tag
                }
              }
            }))
          }
        }

        const existingGame = await prismaTx.game.findFirst({
          where: {
            ean: game.ean,
            title: game.title
          }
        })

        let created

        if (existingGame) {
          created = await prismaTx.game.update({
            where: {
              id: existingGame.id
            },
            data: {
              ...upsertData,
              tags: {
                deleteMany: {},
                ...upsertData.tags
              }
            },
            include: {
              gameUnits: true
            }
          })
        } else {
          created = await prismaTx.game.create({
            data: {
              ...upsertData
            },
            include: {
              gameUnits: true
            }
          })
        }

        await this.textService.createOrUpdateTextsFromInputArray(
          [{
            key: 'description',
            value: game.description
          }, {
            key: 'content',
            value: game.content
          }],
          Game.name,
          created.id,
          prismaTx
        )
        const units = this.getUnitsFromCount({
          existing: created.gameUnits || [],
          count: parseInt(game.units),
          incomplete: game.incomplete ? parseInt(game.incomplete) : undefined
        })

        for (const unit of units) {
          const unitExists = await prismaTx.gameUnit.findFirst({
            where: {
              gameId: created.id,
              unitShortId: unit.unitShortId
            }
          })

          if (!unitExists) {
            await prismaTx.gameUnit.create({
              data: {
                incomplete: unit.incomplete,
                gameId: created.id,
                unitShortId: unit.unitShortId,
                ...((!unit.incomplete && game.weight) ? { weight: parseFloat(game.weight) } : {})
              }
            })
          } else {
            await prismaTx.gameUnit.update({
              where: {
                id: unitExists.id
              },
              data: {
                incomplete: unit.incomplete,
                ...((!unit.incomplete && game.weight) ? { weight: parseFloat(game.weight) } : {})
              }
            })
          }
        }

        console.log(game.title, 'upserted')
      })
    }
  }

  async importGameData (upload: File): Promise<boolean> {
    const fileArrayBuffer = await upload.arrayBuffer()

    const buffer = Buffer.from(fileArrayBuffer)

    const sheet = xlsx.parse(buffer)

    const tagSheet = sheet.find((sheetItem) => sheetItem.name === 'Kategorien')
    const gameSheet = sheet.find((sheetItem) => sheetItem.name === 'Spiele')

    await this.createtTagsFromImport(tagSheet)
    await this.createGamesFromImport(gameSheet, tagSheet)

    return true
  }
}
