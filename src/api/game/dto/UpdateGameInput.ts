import { Field, InputType, Int } from 'type-graphql'
import { CreateTextInput } from '@api/text/dto/createTranslation.input'

import { CreateGameUnitInput } from '../../gameUnit/dto/CreateGameUnitInput'

@InputType()
export class UpdateGameInput {
  @Field(() => String, { nullable: false })
    ean!: string

  @Field(() => String, { nullable: true })
    title?: string

  @Field(() => String, { nullable: true })
    publisher?: string

  @Field(() => Int, { nullable: true })
    minAge?: number

  @Field(() => Int, { nullable: true })
    maxAge?: number

  @Field(() => Int, { nullable: true })
    minPlayers?: number

  @Field(() => Int, { nullable: true })
    maxPlayers?: number

  @Field(() => Int, { nullable: true })
    minDuration?: number

  @Field(() => Int, { nullable: true })
    maxDuration?: number

  @Field(() => [CreateGameUnitInput], { nullable: true })
    gameUnits?: CreateGameUnitInput[]

  @Field(() => [CreateTextInput], { nullable: true })
    texts?: CreateTextInput[]

  @Field(() => [String], { nullable: true })
    tags?: string[]
}
