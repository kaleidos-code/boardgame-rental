'use client'

import { Divider, Stack, Text, Title } from '@mantine/core'
import ResponsiveLayoutCard from '@shared/components/ui/ResponsiveLayoutCard'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePickUpDaysQuery } from '@typings/graphql'
import { PickUpDays } from '@shared/components/ui/PickUpDays'

import { ReservationList } from '../components/ReservationList'

export const MyReservationsView: React.FC = () => {
  const { t } = useTranslation()

  const { data } = usePickUpDaysQuery()

  return (
    <ResponsiveLayoutCard
      boxless
    >
      <Stack
        gap={16}
      >
        <Stack
          gap={4}
          mb={4}
        >
          <Title
            order={3}
          >
            {t('routes.myReservations')}
          </Title>

          <Text>
            {`${t('common.pickUpDays')}:`}
          </Text>
          <PickUpDays
            pickUpDays={data?.pickUpDays || []}
          />
        </Stack>

        <Divider
          size={2}
        />

        <ReservationList />
      </Stack>
    </ResponsiveLayoutCard>)
}
