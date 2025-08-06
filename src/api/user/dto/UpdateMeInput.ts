import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateMeInput {
  @Field(() => String, {
    nullable: true
  })
    email!: string

  @Field(() => String, {
    nullable: true
  })
    firstname!: string

  @Field(() => String, {
    nullable: true
  })
    lastname!: string

  @Field(() => String, {
    nullable: true
  })
    telephone!: string

  @Field(() => String, {
    nullable: true
  })
    street!: string

  @Field(() => String, {
    nullable: true
  })
    city!: string

  @Field(() => String, {
    nullable: true
  })
    postalCode!: string

  @Field(() => Date, {
    nullable: true
  })
    birthdate?: Date
}
