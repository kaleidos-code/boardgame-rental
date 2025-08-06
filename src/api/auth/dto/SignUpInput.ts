import { Field, InputType } from 'type-graphql'

@InputType()
export class SignUpInput {
  @Field(() => String)
    email!: string

  @Field(() => String)
    password!: string

  @Field(() => String)
    firstname!: string

  @Field(() => String)
    lastname!: string

  @Field(() => String)
    telephone!: string

  @Field(() => String)
    street!: string

  @Field(() => String)
    city!: string

  @Field(() => String)
    postalCode!: string

  @Field(() => Date)
    birthdate!: Date

  @Field(() => Boolean)
    termsAccepted!: boolean
}
