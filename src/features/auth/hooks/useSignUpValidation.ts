import React from 'react'
import { useTranslation } from 'react-i18next'
import { mailPattern, numberPattern, postalPattern } from '@utils/pattern'
import { PASSWORD_PATTERN } from '@shared/constants/password'
import { SignUpInput } from '@typings/graphql'

import { SignUpFormInput, ValidationSchema } from '../types/types'

export const useSignUpValidation = (existing?: SignUpFormInput): {
  validate: ValidationSchema
  initialValues: Partial<SignUpFormInput>
  transformValues: (values: SignUpFormInput) => SignUpInput
} => {
  const { t } = useTranslation()

  const initialValues = React.useMemo<SignUpFormInput>(() => ({
    email: '',
    firstname: '',
    birthdate: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()).toISOString(),
    lastname: '',
    password: '',
    confirmPassword: '',
    telephone: '',
    street: '',
    city: '',
    postalCode: '',
    termsAccepted: false
  }), [existing])

  const validate: ValidationSchema = {
    email: (value: string) => new RegExp(mailPattern).test(value) ? null : t('error.input.emailInvalid'),
    firstname: (value: string) => value.trim().length > 0 ? null : t('error.input.canNotBeEmpty'),
    lastname: (value: string) => value.trim().length > 0 ? null : t('error.input.canNotBeEmpty'),
    password: (value: string) => new RegExp(PASSWORD_PATTERN).test(value) ? null : t('error.password.notMatchingPattern', {}),
    confirmPassword: (value: string, values: SignUpFormInput) => value === values.password ? null : t('error.password.notMatching'),
    postalCode: (value: string) => new RegExp(postalPattern).test(value) ? null : t('error.input.postalCodeInvalid'),
    termsAccepted: (value: boolean) => value ? null : t('error.input.mustBeAccepted'),
    telephone: (value: string) => value.trim().length > 0
      ? new RegExp(numberPattern).test(value)
        ? null
        : t('error.input.mustBeNumber')
      : t('error.input.canNotBeEmpty')
  }

  const transformValues = (values: SignUpFormInput): SignUpInput => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = values

    return rest
  }

  return {
    validate,
    initialValues,
    transformValues
  }
}
