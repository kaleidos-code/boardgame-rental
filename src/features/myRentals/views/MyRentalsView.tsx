'use client'

import { Box, Stack, Text, Title } from '@mantine/core'
import ResponsiveLayoutCard from '@shared/components/ui/ResponsiveLayoutCard'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePickUpDaysQuery } from '@typings/graphql'
import { PickUpDays } from '@shared/components/ui/PickUpDays'

import { RentalTabBar } from '../components/RentalTabBar'
import { RentalPaginatedList } from '../components/RentalPaginatedList'
import { HistoryTabItem } from '../types/types'

export const MyRentalsView: React.FC = () => {
  const { t } = useTranslation()

  const { data } = usePickUpDaysQuery()

  const [selectedTab, setSelectedTab] = React.useState<HistoryTabItem>(HistoryTabItem.Active)

  return (
    <Box
      h='100%'
    >
      <ResponsiveLayoutCard
        boxless
      >
        <Stack
          gap={4}
        >
          <Title
            mb={4}
            order={3}
          >
            {t('routes.myRentals')}
          </Title>

          <Text>
            {`${t('common.returnDays')}:`}
          </Text>

          <PickUpDays
            pickUpDays={data?.pickUpDays || []}
          />

          <RentalTabBar
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
          <RentalPaginatedList
            isHistory={selectedTab === HistoryTabItem.History}
          />
        </Stack>
      </ResponsiveLayoutCard>
    </Box>
  )
}
