import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String)
    email!: string

  @Field(() => String)
    firstname!: string

  @Field(() => String)
    lastname!: string

  @Field(() => String)
    roleId!: string
}
