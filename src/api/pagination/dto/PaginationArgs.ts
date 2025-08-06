import { Field, InputType } from 'type-graphql'

@InputType()
export class PaginationArgs {
  @Field(() => Number)
    offset!: number

  @Field(() => Number)
    limit!: number

  @Field(() => Date, { nullable: true })
    initialPaginationDate?: Date
}
