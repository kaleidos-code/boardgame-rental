import { createFormContext } from '@mantine/form'

import { SignUpFormInput, SignUpTransformedInput } from '../types/types'

export const [SignUpFormProvider, useSignUpFormContext, useSignUpForm] =
  createFormContext<SignUpFormInput, SignUpTransformedInput>()
