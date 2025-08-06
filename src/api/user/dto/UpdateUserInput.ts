import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
    email?: string

  @Field(() => String, { nullable: true })
    firstname?: string

  @Field(() => String, { nullable: true })
    lastname?: string

  @Field(() => String, { nullable: true })
    roleId?: string
}
