import { Field, InputType } from 'type-graphql'

@InputType()
export class PasswordChangeInput {
  @Field(() => String)
    oldPassword!: string

  @Field(() => String)
    newPassword!: string
}
