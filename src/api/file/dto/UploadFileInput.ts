import { InputType, Field } from 'type-graphql'

@InputType()
export class UploadFileInput {
  @Field(() => String)
    key!: string

  @Field(() => File)
    file!: File
}
