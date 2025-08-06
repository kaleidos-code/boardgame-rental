import { DataTableExtendedColumn } from '@shared/components/dataTable/types/types'
import { CreateUserInput, UpdateUserInput, UserDataFragment } from '@typings/graphql'

export type UserColumn = DataTableExtendedColumn<UserDataFragment>;

export type UserFormInput = CreateUserInput | UpdateUserInput

export type UserTransformedInput = (values: UserFormInput) => UserFormInput

export type ValidationSchema = {
  [K in keyof CreateUserInput]?: any
};
