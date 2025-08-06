import { ObjectType, Field } from 'type-graphql'

import { Rental } from '../../rental/models/Rental'
import { Role } from '../../role/models/Role'
import { Session } from '../../session/models/Session'
import { Account } from '../../account/models/Account'

@ObjectType('User', {})
export class User {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: false
  })
    firstname!: string

  @Field(() => String, {
    nullable: false
  })
    lastname!: string

  @Field(() => String, {
    nullable: false
  })
    email!: string

  @Field(() => Date, {
    nullable: true
  })
    emailVerified?: Date | null

  @Field(() => String, {
    nullable: false
  })
    password!: string

  @Field(() => Date, {
    nullable: true
  })
    birthdate?: Date

  @Field(() => String, {
    nullable: true
  })
    street?: string

  @Field(() => String, {
    nullable: true
  })
    postalCode?: string

  @Field(() => String, {
    nullable: true
  })
    city?: string

  @Field(() => String, {
    nullable: true
  })
    telephone?: string

  @Field(() => String, {
    nullable: false
  })
    roleId!: string

  role?: Role

  rentals?: Rental[]

  @Field(() => Date, {
    nullable: false
  })
    deletedAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date

  accounts?: Account[]

  sessions?: Session[]
}
