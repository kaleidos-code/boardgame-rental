import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseTextInput } from '@shared/components/inputs/BaseTextInput'
import { useRolesQuery } from '@typings/graphql'
import { BaseSelectInput } from '@shared/components/inputs/BaseSelectInput'

import { useUserFormContext } from '../provider/UserFormProvider'

export const CreateUpdateFormInputs: React.FC = () => {
  const { t } = useTranslation()

  const { getInputProps } = useUserFormContext()

  const { data: roleData } = useRolesQuery()

  const mappedRoles = React.useMemo(() => roleData?.roles.map((role) => ({
    id: role.id,
    label: role.texts.name
  })) ?? [], [roleData])

  return (
    <>
      <BaseTextInput
        label={t('common.email')}
        required
        {...getInputProps('email')}
      />

      <BaseTextInput
        label={t('common.firstname')}
        required
        {...getInputProps('firstname')}
      />

      <BaseTextInput
        label={t('common.lastname')}
        required
        {...getInputProps('lastname')}
      />

      <BaseSelectInput
        label={t('common.role')}
        required
        options={mappedRoles}
        {...getInputProps('roleId')}
      />

    </>
  )
}
