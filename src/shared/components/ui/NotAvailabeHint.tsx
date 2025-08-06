import { Flex, Text } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { MaterialIcon } from './MaterialIcon'

export const NotAvailabeHint: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flex
      gap={2}
      align='center'
    >
      <MaterialIcon
        icon="error"
        iconProps={{
          c: 'red.5',
          fz: 'md'
        }}
      />
      <Text
        size="xs"
        c="red.5"
      >
        {t('rentalCart.notAvailable')}
      </Text>
    </Flex>
  )
}
