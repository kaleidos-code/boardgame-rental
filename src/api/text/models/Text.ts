import { ObjectType, Field } from 'type-graphql'

@ObjectType('Text', {})
export class Text {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: false
  })
    key!: string

  @Field(() => String, {
    nullable: false
  })
    value!: string

  @Field(() => String, {
    nullable: false
  })
    lang!: string

  @Field(() => String, {
    nullable: false
  })
    modelId!: string

  @Field(() => String, {
    nullable: false
  })
    model!: string

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
