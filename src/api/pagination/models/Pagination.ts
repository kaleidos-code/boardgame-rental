import { ClassType, Field, Int, ObjectType } from 'type-graphql'

@ObjectType('PageInfo', {})
export class PageInfo {
  @Field(() => Int)
    currentPage!: number

  @Field(() => Int)
    totalPages!: number

  @Field(() => Int)
    perPage!: number
}

export default function PaginatedResponse<TItem extends object> (TItemClass: ClassType<TItem>) {
  @ObjectType('PaginatedResponse')
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass], { nullable: true })
      nodes!: TItem[]

    @Field(() => PageInfo)
      pageInfo!: PageInfo

    @Field(() => Int)
      totalCount!: number

    @Field(() => Date, { nullable: true })
      intitialPaginationDate?: Date
  }

  return PaginatedResponseClass
}
