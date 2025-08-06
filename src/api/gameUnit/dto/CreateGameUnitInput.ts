import { Field, Float, InputType } from 'type-graphql'

import { CreateTextInput } from '../../text/dto/createTranslation.input'

@InputType()
export class CreateGameUnitInput {
  @Field(() => String)
    unitShortId!: string

  @Field(() => Boolean, {
    nullable: true
  })
    incomplete?: boolean

  @Field(() => [CreateTextInput])
    texts!: CreateTextInput[]

  @Field(() => Boolean, { nullable: true })
    inStock?: boolean

  @Field(() => Float, {
    nullable: true
  })
    weight?: number | null
}
