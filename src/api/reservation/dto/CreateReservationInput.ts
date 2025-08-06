import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class CreateReservationInput {
  @Field(() => String)
    gameId!: string

  @Field(() => Int, { nullable: true })
    quantity?: number
}
