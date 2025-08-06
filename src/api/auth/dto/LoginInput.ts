import { Field, InputType } from 'type-graphql'

@InputType()
export class LoginInput {
  @Field(() => String)
    email!: string

  @Field(() => String)
    password!: string
}
