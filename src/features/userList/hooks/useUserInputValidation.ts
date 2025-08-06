import React from 'react'
import { useTranslation } from 'react-i18next'
import { mailPattern } from '@utils/pattern'

import { UserFormInput, ValidationSchema } from '../types/types'

export const useUserInputValidation = (existing?: UserFormInput): {
  validate: ValidationSchema
  initialValues: Partial<UserFormInput>
  transformValues: (values: UserFormInput) => UserFormInput
} => {
  const { t } = useTranslation()

  const initialValues = React.useMemo<UserFormInput>(() => ({
    email: '',
    firstname: '',
    lastname: '',
    roleId: ''
  }), [existing])

  const validate = {
    email: (value: string) => new RegExp(mailPattern).test(value) ? null : t('error.input.emailInvalid'),
    firstname: (value: string) => value.trim().length > 0 ? null : t('error.input.canNotBeEmpty'),
    lastname: (value: string) => value.trim().length > 0 ? null : t('error.input.canNotBeEmpty'),
    roleId: (value: string) => value.trim().length > 0 ? null : t('error.input.canNotBeEmpty')
  }

  const transformValues = (values: UserFormInput): UserFormInput => {
    return values
  }

  return {
    validate,
    initialValues,
    transformValues
  }
}
