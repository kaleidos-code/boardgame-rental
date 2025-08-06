import { ObjectType, Field, registerEnumType } from 'type-graphql'

import { GameUnit } from '../../gameUnit/models/GameUnit'
import { User } from '../../user/models/User'
import { Reservation } from '../../reservation/models/ReservationModel'

export enum RentalStatus {
  OVERDUE = 'OVERDUE',
  RETURNED = 'RETURNED',
  RENTED = 'RENTED',
}

registerEnumType(RentalStatus, {
  name: 'RentalStatus',
  description: 'The status of a rental'
})

@ObjectType('Rental', {})
export class Rental {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: true
  })
    bookingId?: string

  @Field(() => Date, {
    nullable: false
  })
    rentedAt!: Date

  @Field(() => Date, {
    nullable: true
  })
    returnedAt?: Date

  @Field(() => Date, {
    nullable: true
  })
    lastReminder?: Date

  @Field(() => RentalStatus, {
    nullable: false
  })
    status!: RentalStatus

  @Field(() => Date, {
    nullable: false
  })
    dueDate!: Date

  @Field(() => String, {
    nullable: false
  })
    userId!: string

  @Field(() => String, {
    nullable: false
  })
    gameUnitId!: string

  @Field(() => String, {
    nullable: true
  })
    reservationId?: string

  user?: User

  gameUnit?: GameUnit

  reservation?: Reservation // Added to match the relation in Prisma schema

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
