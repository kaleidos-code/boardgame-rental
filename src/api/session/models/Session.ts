import { ObjectType, Field } from 'type-graphql'

import { User } from '../../user/models/User'

@ObjectType('Session', {})
export class Session {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: false
  })
    userId!: string

  @Field(() => Date, {
    nullable: false
  })
    expires!: Date

  @Field(() => String, {
    nullable: false
  })
    sessionToken!: string

  @Field(() => String, {
    nullable: false
  })
    accessToken!: string

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
