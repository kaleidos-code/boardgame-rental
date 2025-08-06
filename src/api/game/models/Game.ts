import { ObjectType, Field, Int } from 'type-graphql'

import { GameTag } from '../../gameTag/models/GameTag'
import { GameUnit } from '../../gameUnit/models/GameUnit'

@ObjectType('Game', {})
export class Game {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => Int, {
    nullable: false
  })
    gameShortId!: number

  @Field(() => String, {
    nullable: true
  })
    ean?: string

  @Field(() => String, {
    nullable: false
  })
    title!: string

  @Field(() => String, {
    nullable: false
  })
    publisher!: string

  @Field(() => Int, {
    nullable: false
  })
    minAge!: number

  @Field(() => Int, {
    nullable: true
  })
    maxAge?: number

  @Field(() => Int, {
    nullable: false
  })
    minPlayers!: number

  @Field(() => Int, {
    nullable: true
  })
    maxPlayers?: number

  @Field(() => Int, {
    nullable: true
  })
    minDuration?: number

  @Field(() => Int, {
    nullable: true
  })
    maxDuration?: number

  gameUnits?: GameUnit[]

  tags?: GameTag[]

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: true
  })
    deletedAt?: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
