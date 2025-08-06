import { Field, InputType } from 'type-graphql'

import { CreateUpdatePickUpTimeInput } from '../../pickUpTime/dto/CreateUpdatePickUpTimeInput'
import { WeekDay } from '../models/PickUpDay'

@InputType()
export class CreateUpdatePickUpDayInput {
  @Field(() => WeekDay, {
    nullable: false
  })
    dayOfWeek!: WeekDay

  @Field(() => [CreateUpdatePickUpTimeInput], {
    nullable: false
  })
    pickUpTimes!: CreateUpdatePickUpTimeInput[]
}
