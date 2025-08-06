import { ObjectType, Field } from 'type-graphql'

import { GameTag } from '../../gameTag/models/GameTag'

@ObjectType('Tag', {})
export class Tag {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: false
  })
    key!: string

  games?: GameTag[]

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
