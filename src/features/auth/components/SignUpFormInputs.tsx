import { BaseTextInput } from '@shared/components/inputs/BaseTextInput'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { BaseDateInput } from '@shared/components/inputs/BaseDateInput'
import { Anchor, Checkbox, Grid, Text } from '@mantine/core'
import { SetPasswordInput } from '@shared/components/inputs/password/SetPasswordInput'

import { useSignUpFormContext } from '../provider/AuthFormProvider'

export const SignUpFormInputs:React.FC = () => {
  const { t } = useTranslation()

  const { getInputProps } = useSignUpFormContext()

  return (
    <>
      <BaseTextInput
        label={t('common.email')}
        autoComplete='email'
        name='email'
        required
        type='email'
        {...getInputProps('email')}
      />

      <Grid>
        <Grid.Col span={{ lg: 6, xs: 12 }}>
          <BaseTextInput
            name='firstname'
            autoComplete='given-name'
            label={t('common.firstname')}
            required
            {...getInputProps('firstname')}
          />
        </Grid.Col>

        <Grid.Col span={{ lg: 6, xs: 12 }}>
          <BaseTextInput
            name='lastname'
            label={t('common.lastname')}
            autoComplete='family-name'
            required
            {...getInputProps('lastname')}
          />
        </Grid.Col>
      </Grid>

      <SetPasswordInput
        required
        passwordProps={getInputProps('password')}
        confirmPasswordProps={getInputProps('confirmPassword')}
      />

      <BaseDateInput
        label={t('common.birthdate')}
        required
        defaultLevel="decade"
        {...getInputProps('birthdate')}
      />

      <BaseTextInput
        label={t('common.street')}
        required
        autoComplete='street-address'
        {...getInputProps('street')}
      />

      <Grid>
        <Grid.Col span={{ lg: 4, xs: 4 }}>
          <BaseTextInput
            label={t('common.postalCode')}
            required
            autoComplete='postal-code'
            {...getInputProps('postalCode')}
          />
        </Grid.Col>

        <Grid.Col span={{ lg: 8, xs: 8 }}>
          <BaseTextInput
            label={t('common.city')}
            autoComplete='address-level2'
            name='city'
            required
            {...getInputProps('city')}
          />
        </Grid.Col>
      </Grid>

      <BaseTextInput
        label={t('common.telephone')}
        type='tel'
        required
        leftSection={(
          <Text
            mx={4}
          >+49</Text>
          )}
        {...getInputProps('telephone')}
      />

      <Checkbox
        required
        label={(
          <Trans
            i18nKey="auth.terms"
            components={{
              privacy: <Anchor
                size='sm'
                href='/privacy'
                target='_blank'
              />,
              terms: <Anchor href='/terms' size='sm' target='_blank' />
            }}
          />
          )}
        {...getInputProps('termsAccepted')}
      />
    </>
  )
}
