import { ObjectType, Field } from 'type-graphql'

import { User } from '../../user/models/User'

@ObjectType('Account', {})
export class Account {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: false
  })
    userId!: string

  @Field(() => String, {
    nullable: false
  })
    providerType!: string

  @Field(() => String, {
    nullable: false
  })
    providerId!: string

  @Field(() => String, {
    nullable: false
  })
    providerAccountId!: string

  @Field(() => String, {
    nullable: true
  })
    refreshToken?: string | null

  @Field(() => String, {
    nullable: true
  })
    accessToken?: string | null

  @Field(() => Date, {
    nullable: true
  })
    accessTokenExpires?: Date | null

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date

  user?: User
}
