import React from 'react'
import { Grid, PasswordInput, PasswordInputProps, Popover, Progress } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { MAPPED_PASSWORD_SYMBOLS, PASSWORD_MIN_LENGTH, PASSWORD_SYMBOLS } from '@shared/constants/password'

import { MaterialIcon } from '../../ui/MaterialIcon'

import { PasswortRequirement } from './PasswordRequirement'

export type SetPasswordInputProps = {
  oldPasswordProps?: PasswordInputProps & {
    value?: string
  }
  passwordProps: PasswordInputProps & {
    value?: string
  }
  confirmPasswordProps: PasswordInputProps & {
    value?: string
  },
  required?: boolean
}

export const SetPasswordInput: React.FC<SetPasswordInputProps> = ({ oldPasswordProps, passwordProps, confirmPasswordProps, required = false }) => {
  const { t } = useTranslation()

  const { value } = passwordProps

  const [popoverOpened, setPopoverOpened] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  const inputRequirements = [
    { re: new RegExp(`.{${PASSWORD_MIN_LENGTH},}`), label: t('error.password.passwordLength', { length: PASSWORD_MIN_LENGTH }) },
    { re: /[0-9]/, label: t('error.password.passwordNumber') },
    { re: /[A-Z]/, label: t('error.password.passwordUppercase') },
    { re: new RegExp(`[${MAPPED_PASSWORD_SYMBOLS}]+`), label: t('error.password.passwordSpecialCharacter') + ` ${PASSWORD_SYMBOLS}` }
  ]

  const passwordStrength = React.useMemo(() => {
    const validRequirements = inputRequirements.filter(({ re }) => re.test(value || ''))

    return validRequirements.length / inputRequirements.length * 100
  }, [value])

  return (
    <Grid>
      {oldPasswordProps && (
        <Grid.Col span={{
          lg: 12
        }}
        >
          <PasswordInput
            {...oldPasswordProps}
            autoComplete='old-password'
            label={t('common.oldPassword')}
            required={required}
            visible={visible}
            onVisibilityChange={(visiblePassword) => setVisible(visiblePassword)}
            visibilityToggleIcon={({ reveal }) => <MaterialIcon icon={reveal ? 'visibility' : 'visibility_off'} />}
          />
        </Grid.Col>
      )}
      <Grid.Col span={{
        lg: 12
      }}
      >
        <Popover
          opened={popoverOpened}
          position="bottom"
          width="target"
          transitionProps={{ transition: 'pop' }}
        >
          <Popover.Target>
            <div
              onFocusCapture={() => setPopoverOpened(true)}
              onBlurCapture={() => setPopoverOpened(false)}
            >
              <PasswordInput
                {...passwordProps}
                label={t('common.password')}
                name='new-password'
                autoComplete='new-password'
                value={value || ''}
                visible={visible}
                required={required}
                onVisibilityChange={(visiblePassword) => setVisible(visiblePassword)}
                visibilityToggleIcon={({ reveal }) => <MaterialIcon icon={reveal ? 'visibility' : 'visibility_off'} />}
              />
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <Progress value={passwordStrength} size={inputRequirements.length} mb="xs" />
            {inputRequirements.map(({ label, re }, index) => (
              <PasswortRequirement
                key={`password_requirement_${index}`}
                meets={re.test(value || '')}
                label={label}
              />
            ))}
          </Popover.Dropdown>
        </Popover>
      </Grid.Col>
      <Grid.Col span={{
        lg: 12
      }}
      >
        <PasswordInput
          {...confirmPasswordProps}
          autoComplete='new-password'
          label={t('common.confirmPassword')}
          required={required}
          visible={visible}

          visibilityToggleButtonProps={{
            style: {
              display: 'none'
            }
          }}
        />
      </Grid.Col>
    </Grid>
  )
}
