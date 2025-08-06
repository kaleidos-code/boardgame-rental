import { Field, InputType } from 'type-graphql'

@InputType()
export class CancelReservationInput {
  @Field(() => String, { nullable: true })
    reason?: string
}
