import { Field, ObjectType } from 'type-graphql'

import { RolePermission } from '../../rolePermission/models/RolePermission'

@ObjectType('Permission', {})
export class Permission {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: false
  })
    ability!: string

  @Field(() => String, {
    nullable: false
  })
    resource!: string

  roles?: RolePermission[]

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
