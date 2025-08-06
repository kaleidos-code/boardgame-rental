import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateReservationInput {
  @Field(() => [String], { nullable: true })
    gameIds?: string[]
}
