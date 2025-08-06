import { ObjectType, Field } from 'type-graphql'

import { WeekDay } from '../../pickUpDay/models/PickUpDay'

@ObjectType('PickUpTime', {})
export class PickUpTime {
  @Field(() => WeekDay, {
    nullable: false
  })
    dayOfWeek!: WeekDay

  @Field(() => String, {
    nullable: false
  })
    from!: string

  @Field(() => String, {
    nullable: false
  })
    to!: string
}
