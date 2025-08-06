import { createFormContext } from '@mantine/form'

import { UserFormInput, UserTransformedInput } from '../types/types'

export const [UserFormProvider, useUserFormContext, useUserForm] =
  createFormContext<UserFormInput, UserTransformedInput>()
