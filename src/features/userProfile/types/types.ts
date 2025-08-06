import { PasswordChangeInput, UpdateMeInput } from '@typings/graphql'

export type ProfileFormProps = {
  active: boolean
  onSuccess: (message: string) => void
  onError: (error: any) => void
}

export type ProfileFormRefHandler = {
  resetForm: () => void
  closeWithCallback: (callback: () => void) => void
}

export type PasswordChangeFormInput = PasswordChangeInput & {
  confirmPassword: string
}

export type ValidationSchema = {
  [K in keyof UpdateMeInput]?: any
};
