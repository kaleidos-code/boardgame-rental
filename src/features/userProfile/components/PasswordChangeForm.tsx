import { useForm } from '@mantine/form'
import React from 'react'
import { PASSWORD_PATTERN } from '@shared/constants/password'
import { useTranslation } from 'react-i18next'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'
import { Button, Flex, Stack } from '@mantine/core'
import { SetPasswordInput } from '@shared/components/inputs/password/SetPasswordInput'
import { useChangePasswordMutation } from '@typings/graphql'

import { PasswordChangeFormInput, ProfileFormProps, ProfileFormRefHandler } from '../types/types'

type PasswordChangeFormRenderFn = React.ForwardRefRenderFunction<ProfileFormRefHandler, ProfileFormProps>

const PasswordChangeForm: PasswordChangeFormRenderFn = ({ active, onSuccess, onError }, ref) => {
  const { t } = useTranslation()

  const [loading, setLoading] = React.useState(false)

  const [changePassword] = useChangePasswordMutation()

  const { modalManagerRef } = useModalContext()

  const form = useForm<PasswordChangeFormInput>({
    validateInputOnChange: true,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validate: {
      oldPassword: (value: string) => value.length > 0 ? null : t('error.input.canNotBeEmpty'),
      newPassword: (value: string, values: PasswordChangeFormInput) =>
        new RegExp(PASSWORD_PATTERN).test(value)
          ? value !== values.oldPassword ? null : t('error.password.canNotBeSameAsOld')
          : t('error.password.notMatchingPattern'),
      confirmPassword: (value: string, values: PasswordChangeFormInput) => value === values.newPassword ? null : t('error.password.notMatching')
    }
  })

  useUnsavedChanges({ when: active && form.isDirty() })

  React.useImperativeHandle(ref, () => ({
    resetForm: () => form.reset(),
    closeWithCallback: (callback: () => void) => {
      if (form.isDirty()) {
        modalManagerRef.current?.showModal(GlobalModalType.UNSAVED_CHANGES, {
          confirmCallback: () => {
            form.resetDirty()
            callback()
          }
        })
      } else {
        callback()
      }
    }
  }), [form])

  const handleSubmitData = async (data: PasswordChangeFormInput) => {
    setLoading(true)

    try {
      await changePassword({
        variables: {
          data: {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
          }
        }
      })

      onSuccess(t('profile.passwordChanged'))
    } catch (error: any) {
      onError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmitData)}>
      <Stack>
        <SetPasswordInput
          required
          oldPasswordProps={form.getInputProps('oldPassword')}
          passwordProps={form.getInputProps('newPassword')}
          confirmPasswordProps={form.getInputProps('confirmPassword')}
        />

        <Flex
          justify='flex-start'
        >
          <Button
            type="submit"
            disabled={!form.isValid() || !form.isDirty()}
            loading={loading}
          >
            {t('action.changePassword')}
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}

export default React.forwardRef(PasswordChangeForm)
