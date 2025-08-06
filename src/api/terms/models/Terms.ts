import { ObjectType, Field, registerEnumType } from 'type-graphql'

export enum TermsType {
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS'
}

registerEnumType(TermsType, {
  name: 'TermsType',
  description: 'Type of terms'
})

@ObjectType('Terms', {})
export class Terms {
  @Field(() => TermsType, {
    nullable: false
  })
    key!: TermsType

  @Field(() => Date, {
    nullable: false
  })
    createdAt!: Date

  @Field(() => Date, {
    nullable: false
  })
    updatedAt!: Date
}
