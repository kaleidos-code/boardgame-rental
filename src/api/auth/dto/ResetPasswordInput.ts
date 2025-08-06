import { Field, InputType } from 'type-graphql'

@InputType()
export class SetPasswordInput {
  @Field(() => String)
    password!: string

  @Field(() => String)
    token!: string

  @Field(() => Boolean, { nullable: true })
    optIn?: boolean
}
