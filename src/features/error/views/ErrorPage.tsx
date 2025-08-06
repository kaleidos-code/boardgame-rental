'use client'

import React from 'react'
import { Anchor, Box, Center, Container, Title } from '@mantine/core'
import { MaterialIcon } from '@shared/components/ui/MaterialIcon'
import { useTranslation } from 'react-i18next'

type ErrorPageProps = {
  code: number
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ code }) => {
  const { t } = useTranslation()

  return (
    <Container
      h="100%"
    >
      <Center
        h="100%"
      >
        <MaterialIcon
          icon="error"
          iconProps={{
            fz: '128px',
            mr: '24px'
          }}
        />
        <Box>
          <Title order={4}>
            {t(`error.page.${code}`)}
          </Title>
          <Anchor href="/">
            {t('action.backToHome')}
          </Anchor>
        </Box>
      </Center>
    </Container>
  )
}
