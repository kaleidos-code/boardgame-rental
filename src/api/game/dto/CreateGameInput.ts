import { Field, InputType, Int } from 'type-graphql'
import { CreateTextInput } from '@api/text/dto/createTranslation.input'

import { CreateGameUnitInput } from '../../gameUnit/dto/CreateGameUnitInput'

@InputType()
export class CreateGameInput {
  @Field(() => String)
    ean!: string

  @Field(() => String)
    title!: string

  @Field(() => String)
    publisher!: string

  @Field(() => Int)
    minAge!: number

  @Field(() => Int, { nullable: true })
    maxAge?: number

  @Field(() => Int)
    minPlayers!: number

  @Field(() => Int)
    maxPlayers!: number

  @Field(() => Int)
    minDuration!: number

  @Field(() => Int, { nullable: true })
    maxDuration?: number

  @Field(() => [CreateGameUnitInput], { nullable: false })
    gameUnits?: CreateGameUnitInput[]

  @Field(() => [CreateTextInput])
    texts!: CreateTextInput[]

  @Field(() => [String], { nullable: true })
    tags?: string[]
}
