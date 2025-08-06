import { ObjectType, Field } from 'type-graphql'

import { Game } from '../../game/models/Game'
import { Tag } from '../../tag/models/Tag'

@ObjectType('GameTag', {})
export class GameTag {
  @Field(() => String, {
    nullable: false
  })
    gameId!: string

  @Field(() => String, {
    nullable: false
  })
    tagId!: string

  game?: Game

  tag?: Tag

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
