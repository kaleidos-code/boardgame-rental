import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateRentalInput {
  @Field(() => String)
    reservationId!: string
}
