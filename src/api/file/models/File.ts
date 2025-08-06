import { Prisma } from '@prisma/client'
import { JSONResolver } from 'graphql-scalars'
import { ObjectType, Field } from 'type-graphql'

@ObjectType('File', {})
export class File {
  @Field(() => String, {
    nullable: false
  })
    id!: string

  @Field(() => String, {
    nullable: false
  })
    modelId!: string

  @Field(() => String, {
    nullable: false
  })
    model!: string

  @Field(() => String, {
    nullable: false
  })
    fileName!: string

  @Field(() => String, {
    nullable: false
  })
    path!: string

  @Field(() => String, {
    nullable: false
  })
    mimeType!: string

  @Field(() => String, {
    nullable: false
  })
    key!: string

  @Field(() => JSONResolver, {
    nullable: true
  })
    meta?: Prisma.JsonValue | null

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
