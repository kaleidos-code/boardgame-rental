import { GraphQLJSON } from 'graphql-scalars'
import { Field, InputType, registerEnumType } from 'type-graphql'

export enum FilterOperator {
  EQ = '=',
  NEQ = '!=',
  GT = '>',
  GTE = '>=',
  LT = '<',
  LTE = '<=',
  IS = 'IS',
  IN = 'IN',
  NIN = 'NOT IN',
  LIKE = 'LIKE',
  NOT_LIKE = 'NOT LIKE',
  IS_NULL = 'IS NULL',
  IS_NOT_NULL = 'IS NOT NULL'
}

registerEnumType(FilterOperator, {
  name: 'FilterOperator',
  description: 'Filter operators for datatables'
})

export enum FilterTypes {
  DATE = 'date',
  NUMBER = 'number',
  STRING = 'string',
  BOOLEAN = 'boolean',
  SELECT = 'select'
}

registerEnumType(FilterTypes, {
  name: 'FilterTypes',
  description: 'Filter types for datatables'
})

@InputType()
export class FilterInput {
  @Field(() => String)
    columnAccessor!: string

  @Field(() => FilterOperator)
    operator!: FilterOperator

  @Field(() => FilterTypes)
    type!: FilterTypes

  @Field(() => GraphQLJSON, { nullable: true })
    value?: JSON
}
