import { ObjectType, Field, registerEnumType } from 'type-graphql'

export enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

registerEnumType(WeekDay, {
  name: 'WeekDay',
  description: 'Available pick up days'
})

@ObjectType('PickUpDay', {})
export class PickUpDay {
  @Field(() => WeekDay, {
    nullable: false
  })
    dayOfWeek!: WeekDay

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
