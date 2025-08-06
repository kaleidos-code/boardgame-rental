import React from 'react'
import { ActionIcon, Box, Flex, Loader, Paper, useMantineTheme } from '@mantine/core'
import { MaterialIcon as MaterialIconType } from 'material-icons'
import { Trans, useTranslation } from 'react-i18next'

import { MaterialIcon } from './MaterialIcon'

export enum SnackbarColorSchemes {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info'
}

type ColorScheme = Record<SnackbarColorSchemes, {
  backgroundColor: string
  icon: MaterialIconType
  color?: string
}>

export type HandleErrorOptions = {
  customDefaultMessage?: string;
}

export type SnackbarHandler = {
  handleLoadingMessage: (message: string | React.ReactNode) => void
  handleSuccessMessage: (message: string | React.ReactNode, colorScheme?: SnackbarColorSchemes) => void
  handleErrorMessage: (error: Error, options?: HandleErrorOptions) => void
}

export type SnackbarProps = {
  closeTimeout?: number
}

type SnackbarRenderFn = React.ForwardRefRenderFunction<SnackbarHandler, SnackbarProps>

const Snackbar: SnackbarRenderFn = ({ closeTimeout = 6000 }, ref) => {
  const { t, i18n } = useTranslation()
  const theme = useMantineTheme()

  const [isOpen, setIsOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [colorScheme, setColorScheme] = React.useState<SnackbarColorSchemes>(SnackbarColorSchemes.success)
  const [message, setMessage] = React.useState<string | React.ReactNode>('')

  const hideTimeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    if (!isOpen || loading) {
      return
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, closeTimeout)

    return () => {
      clearTimeout(hideTimeoutRef.current)
    }
  }, [isOpen, loading, closeTimeout])

  const handleSuccessMessage = React.useCallback((snackbarMessage: string | React.ReactNode, scheme?: SnackbarColorSchemes) => {
    clearTimeout(hideTimeoutRef.current)

    setColorScheme(scheme || SnackbarColorSchemes.success)
    setMessage(snackbarMessage)
    setIsOpen(true)

    setLoading(false)
  }, [])

  const handleLoadingMessage = React.useCallback((loadingMessage: string | React.ReactNode) => {
    clearTimeout(hideTimeoutRef.current)

    setColorScheme(SnackbarColorSchemes.info)
    setMessage(loadingMessage)
    setLoading(true)
    setIsOpen(true)
  }, [])

  const handleErrorMessage = React.useCallback((error: Error & { graphQLErrors?: Record<string, string>[] }, options?: HandleErrorOptions) => {
    clearTimeout(hideTimeoutRef.current)

    const keyExists = i18n.exists(error.message)
    const extension = error?.graphQLErrors?.[0]?.extensions

    setColorScheme(SnackbarColorSchemes.error)
    setMessage(keyExists
      ? (
        <Trans
          i18nKey={error.message}
          values={extension || {}}
          components={{
            b: <b />
          }}
        />
        )
      : (options?.customDefaultMessage ?? t('error.default')))
    setIsOpen(true)
    setLoading(false)
  }, [])

  React.useImperativeHandle(ref, () => ({
    handleSuccessMessage,
    handleErrorMessage,
    handleLoadingMessage
  }))

  const colorSchemes = React.useMemo<ColorScheme>(() => ({
    [SnackbarColorSchemes.success]: {
      backgroundColor: theme.colors.green[5],
      icon: 'check_circle'
    },
    [SnackbarColorSchemes.error]: {
      backgroundColor: theme.colors.red[5],
      icon: 'error'
    },
    [SnackbarColorSchemes.warning]: {
      backgroundColor: theme.colors.orange[5],
      icon: 'warning'
    },
    [SnackbarColorSchemes.info]: {
      backgroundColor: theme.colors.blue[5],
      icon: 'info'
    }
  }), [theme])

  return isOpen
    ? (
      <Paper
        p="xs"
        w={{
          base: '95%',
          md: 'auto'
        }}
        style={{
          position: 'fixed',
          bottom: '24px',
          zIndex: 1001,
          left: '50%',
          borderRadius: 0,
          transform: 'translateX(-50%)',
          color: theme.white,
          ...colorSchemes[colorScheme]
        }}
      >
        <Flex
          align="center"
        >
          {loading && (
            <Loader
              size={20}
              color={theme.white}
            />
          )}
          {!loading && !!colorSchemes[colorScheme].icon && (
            <MaterialIcon icon={colorSchemes[colorScheme].icon} />
          )}
          <Box
            flex={1}
            ml="xs"
          >
            {message}
          </Box>

          {!loading && (
            <ActionIcon
              variant='transparent'
              color='white'
              onClick={() => setIsOpen(false)}
            >
              <MaterialIcon icon="close" />
            </ActionIcon>
          )}
        </Flex>
      </Paper>
      )
    : null
}

export default React.forwardRef(Snackbar)
