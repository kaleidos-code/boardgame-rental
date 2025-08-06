'use client'

import { Box, Stack } from '@mantine/core'
import React from 'react'
import { useResponsive } from '@hooks/useResponsive'

import { PageHeader } from '../header/PageHeader'
import { PageFooter } from '../ui/PageFooter'

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { xs } = useResponsive()

  return (
    <Box
      h='100%'
    >
      <PageHeader />
      <Stack
        h={{
          sm: '100%'
        }}
        mih="calc(100% - 48px)"
        gap={0}
        pt={60}
        pb={{
          xs: 0,
          sm: 24
        }}
        style={{
          ...(!xs && {
            overflow: 'auto',
            scrollBehavior: 'smooth'
          })
        }}
      >
        {children}
      </Stack>

      <PageFooter />
    </Box>
  )
}
