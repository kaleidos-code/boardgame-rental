import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '@shared/components/inputs/BaseTextInput'
import { Button, Flex, Text, Stack } from '@mantine/core'
import { UpdateMeInput, UserDataFragment, useUpdateMeMutation } from '@typings/graphql'
import { useForm } from '@mantine/form'
import { mailPattern, postalPattern, numberPattern } from '@utils/pattern'
import { useUnsavedChanges } from '@hooks/useUnsavedChanges'
import { GlobalModalType, useModalContext } from '@shared/provider/ModalProvider'

import { ProfileFormProps, ProfileFormRefHandler, ValidationSchema } from '../types/types'

type Props = ProfileFormProps & {
  meData: UserDataFragment
}

type UpdateProfileFormRenderFn = React.ForwardRefRenderFunction<ProfileFormRefHandler, Props>

const UpdateProfileForm: UpdateProfileFormRenderFn = ({ active, meData, onSuccess, onError }, ref) => {
  const { t } = useTranslation()

  const [updateMe] = useUpdateMeMutation()

  const [loading, setLoading] = React.useState(false)

  const { modalManagerRef } = useModalContext()

  const form = useForm<UpdateMeInput>({
    validateInputOnChange: true,
    initialValues: {
      email: '',
      firstname: '',
      lastname: '',
      telephone: '',
      street: '',
      city: '',
      postalCode: ''
    },
    validate: {
      email: (value: string) => new RegExp(mailPattern).test(value) ? null : t('error.input.emailInvalid'),
      firstname: (value: string) => value.trim().length > 0 ? null : t('error.input.canNotBeEmpty'),
      lastname: (value: string) => value.trim().length > 0 ? null : t('error.input.canNotBeEmpty'),
      postalCode: (value: string) => !value ? null : (new RegExp(postalPattern).test(value) ? null : t('error.input.postalCodeInvalid')),
      telephone: (value: string) => !value ? null : (new RegExp(numberPattern).test(value) ? null : t('error.input.mustBeNumber'))
    } as ValidationSchema
  })

  const resetForm = () => {
    form.resetDirty()

    form.initialize({
      email: meData.email,
      firstname: meData.firstname,
      lastname: meData.lastname,
      city: meData.city,
      postalCode: meData.postalCode,
      street: meData.street,
      telephone: meData.telephone
    })
  }

  React.useImperativeHandle(ref, () => ({
    resetForm: () => form.resetDirty(),
    closeWithCallback: (callback) => {
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
  }))

  useUnsavedChanges({ when: active && form.isDirty() })

  React.useEffect(() => {
    resetForm()
  }, [meData])

  const handleSubmitData = async (values: UpdateMeInput) => {
    setLoading(true)
    try {
      await updateMe({
        variables: {
          data: values
        }
      })

      onSuccess?.(t('profile.updateSuccess'))
    } catch (error: any) {
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmitData)}>
      <Stack
        gap={18}
      >
        <BaseTextInput
          label={t('common.email')}
          required
          {...form.getInputProps('email')}
        />

        <BaseTextInput
          label={t('common.firstname')}
          required
          {...form.getInputProps('firstname')}
        />

        <BaseTextInput
          label={t('common.lastname')}
          required
          {...form.getInputProps('lastname')}
        />

        <BaseTextInput
          label={t('common.street')}
          {...form.getInputProps('street')}
        />

        <BaseTextInput
          label={t('common.postalCode')}
          type='number'
          {...form.getInputProps('postalCode')}
        />

        <BaseTextInput
          label={t('common.city')}
          {...form.getInputProps('city')}
        />

        <BaseTextInput
          label={t('common.telephone')}
          type='tel'
          leftSection={(
            <Text
              mx={4}
            >+49</Text>
            )}
          {...form.getInputProps('telephone')}
        />

        <Flex
          justify='flex-end'
        >
          <Button
            type="submit"
            disabled={!form.isValid() || !form.isDirty()}
            loading={loading}
          >
            {t('action.submit')}
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}

export default React.forwardRef(UpdateProfileForm)
