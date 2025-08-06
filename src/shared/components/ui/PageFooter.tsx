import { Flex, Anchor, Text } from '@mantine/core'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const PageFooter: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flex
      w='100%'
      py={4}
      align="center"
      justify="space-between"
      px={24}
      bg="white"
      direction={{
        base: 'column',
        sm: 'row'
      }}
      pos={{
        base: 'relative',
        sm: 'fixed'
      }}
      styles={(theme) => ({
        root: {
          bottom: 0,
          borderTop: '1px solid',
          borderColor: theme.colors.gray[2],
          zIndex: 1000
        }
      }
      )}
    >
      <Text
        mb={4}
        size="xs"
      >
        <Trans
          i18nKey="common.developedBy"
          components={{
            a: <Anchor
              size="xs"
              target='_blank'
              href="https://kaleidoscode.de"
            />
          }}
        />
      </Text>
      <Flex
        gap={8}
      >
        <Anchor
          size="xs"
          ml={4}
          href="/faq"
        >
          {t('common.faq')}
        </Anchor>
        <Anchor
          size="xs"
          ml={4}
          href="/imprint"
        >
          {t('common.imprint')}
        </Anchor>
        <Anchor
          size="xs"
          ml={4}
          href="/terms"
        >
          {t('common.terms')}
        </Anchor>
        <Anchor
          size="xs"
          ml={4}
          href="/privacy"
        >
          {t('common.privacy')}
        </Anchor>
      </Flex>
    </Flex>
  )
}
