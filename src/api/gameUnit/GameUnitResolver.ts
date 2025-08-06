import { FieldResolver, Resolver, Root } from 'type-graphql'
import prisma from '@api/lib/prisma'
import { GraphQLJSON } from 'graphql-scalars'

import { Rental } from '../rental/models/Rental'
import { Game } from '../game/models/Game'
import { TextService } from '../text/TextService'

import { GameUnit } from './models/GameUnit'
import { GameUnitService } from './GameUnitService'

@Resolver(() => GameUnit)
export class GameUnitResolver {
  private gameUnitService: GameUnitService
  private textService: TextService

  constructor () {
    this.gameUnitService = new GameUnitService(prisma)
    this.textService = new TextService(prisma)
  }

  @FieldResolver(() => [Rental], { nullable: true })
  async rentals (
    @Root() parent: GameUnit
  ) {
    return await prisma.rental.findMany({
      where: {
        gameUnitId: parent.id
      }
    })
  }

  @FieldResolver(() => Boolean)
  async available (
    @Root() parent: GameUnit
  ) {
    return await this.gameUnitService.checkGameUnitAvailability(prisma, parent.id)
  }

  @FieldResolver(() => Game)
  async game (
    @Root() parent: GameUnit
  ) {
    return await prisma.game.findUnique({
      where: {
        id: parent.gameId
      }
    })
  }

  @FieldResolver(() => GraphQLJSON)
  async texts (
    @Root() parent: GameUnit
  ): Promise<Record<string, string>> {
    return await this.textService.getModelTexts(GameUnit.name, parent.id)
  }

  @FieldResolver(() => String, { nullable: true })
  async prefixedShortId (
    @Root() parent: GameUnit
  ): Promise<string | null> {
    const game = await prisma.game.findUnique({
      where: {
        id: parent.gameId
      }
    })

    return !game ? null : `${String(game.gameShortId).padStart(4, '0')}_${parent.unitShortId}`
  }
}
