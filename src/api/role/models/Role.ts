import { ObjectType, Field } from 'type-graphql'

import { RolePermission } from '../../rolePermission/models/RolePermission'
import { User } from '../../user/models/User'

@ObjectType('Role', {})
export class Role {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: false
  })
    key!: string

  permissions?: RolePermission[]

  users?: User[]

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
