import { Tabs } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { HistoryTabItem } from '../types/types'

type Props = {
  selectedTab: HistoryTabItem
  onTabChange: (tab: HistoryTabItem) => void
}

export const RentalTabBar: React.FC<Props> = ({ selectedTab, onTabChange }) => {
  const { t } = useTranslation()

  return (
    <Tabs
      value={selectedTab}
      onChange={(value) => onTabChange(value as HistoryTabItem)}
    >
      <Tabs.List>
        {Object.values(HistoryTabItem).map((tab) => (
          <Tabs.Tab key={tab} value={tab}>
            {t(`myRentals.tabs.${tab}`)}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  )
}
