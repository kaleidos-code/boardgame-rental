'use client'

import { Anchor, Box, Button, Flex, Stack, Text, useMantineTheme } from '@mantine/core'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TokenType } from '@typings/graphql'
import { useAuthSession } from '@hooks/useAuthSession'
import { RoleTypes } from '@typings/roles'
import { useResponsive } from '@hooks/useResponsive'

import { MailVerificationWarning } from '../ui/MailVerificationWarning'
import Snackbar, { SnackbarHandler } from '../ui/Snackbar'
import { MaterialIcon } from '../ui/MaterialIcon'

import { PageHeaderMenu } from './PageHeaderMenu'
import { RentalCartMenu } from './RentalCartMenu'

export const PageHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()
  const pathName = usePathname()

  const session = useAuthSession()
  const theme = useMantineTheme()

  const { xs } = useResponsive()

  const snackbBarRef = React.useRef<SnackbarHandler>(null)

  const activeToken = React.useMemo(() => {
    const newMailToken = session?.user?.activeTokens?.find((token) => token === TokenType.NewEmail)

    return newMailToken ? session?.user?.activeTokens?.find((token) => token === TokenType.OptIn) : null
  }, [session])

  const showMailVerificationWarning = React.useMemo(() => activeToken && !pathName.includes('profile'), [activeToken])

  const handleMailError = (error: Error) => {
    snackbBarRef.current?.handleErrorMessage(error)
  }

  const handleMailSuccess = (message: string) => {
    snackbBarRef.current?.handleSuccessMessage(message)
  }

  return (
    <Flex
      py={10}
      px={24}
      w="100%"
      style={{
        position: 'fixed',
        top: 0,
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottom: '1px solid',
        borderColor: theme.colors.gray[2],
        zIndex: 1000
      }}
    >
      <Flex
        flex="0 1 auto"
      >
        <Anchor href='/' style={{ height: '40px' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '100%' }} />
        </Anchor>
        <Box ml={8}>
          <Text
            size="sm"
            fw={700}
          >
            {t('app.title')}
          </Text>
          <Text
            size="sm"
          >
            {t('app.subtitle')}
          </Text>
        </Box>
      </Flex>

      <Box flex={1}>
        {children}
      </Box>

      <Stack
        gap={8}
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
        flex="0 1 auto"
      >
        {session?.user?.role?.key !== RoleTypes.Admin && (
          <RentalCartMenu />
        )}
        {!session
          ? (
            <Anchor href='/login'>
              {xs
                ? (
                  <Button
                    size="xs"
                  >
                    <MaterialIcon icon='login' />
                  </Button>
                  )
                : (
                  <Button>
                    {t('action.login')}
                  </Button>
                  )}
            </Anchor>
            )
          : (<PageHeaderMenu />)}
      </Stack>

      {showMailVerificationWarning && (
        <Box
          style={{
            position: 'absolute',
            right: '10px',
            bottom: '-10px',
            maxWidth: '500px',
            transform: 'translateY(100%)'
          }}
        >
          <MailVerificationWarning closable
            onSuccess={handleMailSuccess}
            onError={handleMailError}
            type={activeToken as TokenType}
          />
        </Box>
      )}

      <Snackbar ref={snackbBarRef} />
    </Flex>
  )
}
