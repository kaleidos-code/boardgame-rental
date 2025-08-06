import React from 'react'
import { Container, Center, Anchor, Box, Flex, Group, Card, Stack } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const OptInLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()

  return (
    <Flex
      direction="column"
      align="center"
      bg="gray.0"
      mih="100%"
    >
      <Container
        flex={1}
        w={{
          sm: 620
        }}
        py={40}
        h="100%"
      >
        <Stack
          justify='center'
          align='center'
          gap={18}
          w="100%"
        >
          <Center>
            <Anchor
              href='/login'
            >
              <img
                width={200}
                style={{
                  cursor: 'pointer'
                }}
                src="/logo.png"
                alt="Logo"
              />
            </Anchor>
          </Center>

          <Card
            w="100%"
          >
            {children}
          </Card>
        </Stack>
      </Container>

      <Box
        flex={0}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Group
          gap={16}
          my={24}
        >
          <Anchor
            size="sm"
            ml={4}
            href="/imprint"
          >

            {t('common.imprint')}
          </Anchor>
          <Anchor
            size="sm"
            ml={4}
            href="/privacy"
          >
            {t('common.privacy')}
          </Anchor>
        </Group>
      </Box>
    </Flex>
  )
}
