import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateUpdatePickUpTimeInput {
  @Field(() => String, {
    nullable: false
  })
    from!: string

  @Field(() => String, {
    nullable: false
  })
    to!: string
}
