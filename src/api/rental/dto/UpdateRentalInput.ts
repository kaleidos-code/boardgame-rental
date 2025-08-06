import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateRentalInput {
  @Field(() => Date)
    dueDate!: Date
}
