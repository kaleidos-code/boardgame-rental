import { Box, Text, useMantineTheme } from '@mantine/core'
import { hexToRgb } from '@utils/color'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const NoItemsCard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()
  const { colors } = useMantineTheme()

  return (
    <Box
      bg={`rgba(${hexToRgb(colors.gray[1])}, 0.8)`}
      p={16}
    >
      {children || (
        <Text>
          {t('common.noEntries')}
        </Text>
      )}
    </Box>
  )
}
