import { InputType, Field } from 'type-graphql'

@InputType()
export class CreateTextInput {
  @Field()
    key!: string

  @Field({ nullable: true })
    lang?: string

  @Field({ nullable: true })
    value?: string
}
