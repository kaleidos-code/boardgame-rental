import { Field, InputType } from 'type-graphql'

@InputType()
export class OrderInput {
  @Field(() => String)
    columnAccessor!: string

  @Field(() => String)
    direction!: string
}
