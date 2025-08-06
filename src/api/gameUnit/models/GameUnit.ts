import { Field, Float, ObjectType } from 'type-graphql'

import { Game } from '../../game/models/Game'
import { Rental } from '../../rental/models/Rental'

@ObjectType('GameUnit', {})
export class GameUnit {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: false
  })
    unitShortId!: string

  @Field(() => String, {
    nullable: false
  })
    gameId!: string

  game?: Game

  rentals?: Rental[]

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date

  @Field(() => Boolean)
    incomplete!: boolean

  @Field(() => Boolean)
    inStock!: boolean

  @Field(() => Float, {
    nullable: true
  })
    weight?: number | null
}
