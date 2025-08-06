'use client'

import React from 'react'
import { Flex, Group, Anchor, Card, Text, Image } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useResponsive } from '@hooks/useResponsive'

const LegalGroup: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Group
      gap="md"
    >
      <Anchor
        fz={{
          base: 'xs',
          md: 'sm'
        }}
        target="_blank"
        href="/imprint"
      >
        {t('common.imprint')}
      </Anchor>
      <Anchor
        fz={{
          base: 'xs',
          md: 'sm'
        }}
        target="_blank"
        href="/terms"
      >
        {t('common.terms')}
      </Anchor>
      <Anchor
        fz={{
          base: 'xs',
          md: 'sm'
        }}
        target="_blank"
        href="/privacy"
      >
        {t('common.privacy')}
      </Anchor>
      <Anchor
        fz={{
          base: 'xs',
          md: 'sm'
        }}
        target="_blank"
        href="/faq"
      >
        {t('common.faq')}
      </Anchor>
    </Group>
  )
}

export const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()

  const { xs, sm } = useResponsive()

  return (
    <Flex
      py={24}
      px={{
        base: 24,
        sm: 48
      }}
      direction={{
        base: 'column',
        md: 'row'
      }}
      gap={16}
      align="center"
      justify={{
        base: 'center',
        md: 'space-evenly'
      }}
      {...(!sm && {
        h: '100%'
      })}
    >
      <Flex
        gap={16}
        direction="column"
        justify="flex-start"
        w={{
          base: '100%',
          md: '45%',
          lg: '40%',
          xl: '35%'
        }}
      >
        <Flex
          align="center"
          w="100%"
          {...(sm && {
            justify: 'center'
          })}
        >
          <Anchor href='/'>
            <Image
              src="/logo.png"
              w={{
                base: 200,
                md: 300
              }}
            />
          </Anchor>
        </Flex>

        {!xs && (
          <>
            <Text fw="bold">
              {t('auth.welcome')}
            </Text>

            <Text>
              {t('auth.appDescription')}
            </Text>

            {!sm && (
              <LegalGroup />
            )}
          </>
        )}
      </Flex>
      <Flex
        direction="column"
        w={{
          base: '100%',
          md: '45%',
          lg: '40%',
          xl: '35%'
        }}
        {...(!sm && {
          h: '100%'
        })}
        gap={16}
        justify="center"
        align="center"
      >
        <Card
          w="100%"
          style={{
            overflow: 'auto'
          }}
        >
          {children}
        </Card>

        {sm && (
          <Flex
            justify="center"
          >
            <LegalGroup />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
