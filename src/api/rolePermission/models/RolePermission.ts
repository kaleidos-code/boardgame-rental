import { ObjectType, Field } from 'type-graphql'

import { Permission } from '../../permission/models/Permission'
import { Role } from '../../role/models/Role'

@ObjectType('RolePermission', {})
export class RolePermission {
  @Field(() => String, {
    nullable: false
  })
    roleId!: string

  @Field(() => String, {
    nullable: false
  })
    permissionId!: string

  role?: Role

  permission?: Permission

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
