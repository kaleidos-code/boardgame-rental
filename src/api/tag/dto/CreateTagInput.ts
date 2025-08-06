import { Field, InputType } from 'type-graphql'
import { CreateTextInput } from '@api/text/dto/createTranslation.input'

@InputType()
export class CreateTagInput {
  @Field(() => String)
    key!: string

  @Field(() => [CreateTextInput])
    texts!: CreateTextInput[]

  @Field(() => [String], { nullable: true })
    games?: string[]
}
