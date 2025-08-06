import { ObjectType, Field, registerEnumType } from 'type-graphql'

import { GameUnit } from '../../gameUnit/models/GameUnit'
import { User } from '../../user/models/User'

export enum ReservationStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  PACKED = 'PACKED'
}

registerEnumType(ReservationStatus, {
  name: 'ReservationStatus',
  description: 'The status of a reservation'
})

@ObjectType('Reservation', {})
export class Reservation {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: false
  })
    reservationCode!: string

  @Field(() => Date, {
    nullable: true
  })
    cancelledAt?: Date

  @Field(() => ReservationStatus, {
    nullable: false
  })
    status!: ReservationStatus

  @Field(() => String, {
    nullable: false
  })
    userId!: string

  @Field(() => String, {
    nullable: true
  })
    rentalId?: string

  user?: User

  gameUnits?: GameUnit[]

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
