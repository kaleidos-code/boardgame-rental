'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, Stack } from '@mantine/core'
import { dateToHumanReadable } from '@utils/format'
import { AuthSession } from '@typings/auth'
import { OptInLayout } from '@shared/components/layout/OptInLayout'

export type OptInViewProps = {
  valid: boolean,
  session: AuthSession | null,
  verifiedAt?: Date,
}

export const OptInView:React.FC<OptInViewProps> = ({ valid, verifiedAt, session }) => {
  const { t, i18n } = useTranslation()

  const message = React.useMemo(() => {
    if (verifiedAt) {
      return t('auth.optIn.alreadyVerified', {
        date: dateToHumanReadable(verifiedAt, {
          lang: i18n.language,
          withTime: true
        })
      })
    } else if (!valid) {
      return t('auth.optIn.errorMessage')
    } else {
      return t('auth.optIn.successMessage')
    }
  }, [verifiedAt])

  return (
    <OptInLayout>
      <Stack
        gap={12}
        align="flex-start"
      >
        <Text
          fw="bold"
        >
          {t(`auth.optIn.${!valid || verifiedAt ? 'error' : 'success'}`)}
        </Text>
        <Text>
          {message}
        </Text>

        <Button
          component="a"
          href={!session ? '/login' : '/'}
        >
          {t(!session ? 'action.backToLogin' : 'action.backToHome') }
        </Button>
      </Stack>
    </OptInLayout>
  )
}
