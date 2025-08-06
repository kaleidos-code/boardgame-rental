import { ObjectType, Field, registerEnumType } from 'type-graphql'
import { GraphQLJSON } from 'graphql-scalars'

export enum TokenType {
  NEW_EMAIL = 'NEW_EMAIL',
  PASSWORD = 'PASSWORD',
  OPT_IN = 'OPT_IN',
}

registerEnumType(TokenType, {
  name: 'TokenType',
  description: 'Token types for validation tokens'
})

@ObjectType('ValidationToken', {})
export class ValidationToken {
 @Field(() => String)
   token!: string

  @Field(() => TokenType)
    type!: TokenType

  @Field(() => Date)
    verifiedAt!: Date

  @Field(() => String)
    userId!: string

  @Field(() => GraphQLJSON)
    meta!: Record<string, any>
}
