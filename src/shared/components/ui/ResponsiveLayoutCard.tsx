'use client'

import { Box, BoxProps, Card, Container, Stack } from '@mantine/core'
import React from 'react'

export type ResponisveLayoutCardProps = React.PropsWithChildren & {
  boxProps?: BoxProps
  boxless?: boolean
}

export type ResponsiveLayoutCardHandler = {
  scrollToBottom: () => void
  scrollToTop: () => void
}

type PasswordChangeFormRenderFn = React.ForwardRefRenderFunction<ResponsiveLayoutCardHandler, ResponisveLayoutCardProps>

const ResponisveLayoutCard: PasswordChangeFormRenderFn = ({ children, boxless, boxProps }, ref) => {
  const contentBoxRef = React.useRef<HTMLDivElement>(null)

  React.useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      window.setTimeout(() => {
        contentBoxRef.current?.scrollTo({
          top: contentBoxRef.current?.offsetHeight || 0,
          behavior: 'smooth'
        })
      }, 0)
    },
    scrollToTop: () => {
      window.setTimeout(() => {
        contentBoxRef.current?.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }, 0)
    }
  }), [])

  return (
    <Box
      ref={contentBoxRef}
      {...boxProps}
    >
      <Box
        h='auto'
      >
        <Container
          px={24}
          pb={24}
          w={{
            xs: '100%',
            sm: '90%',
            md: '850px'
          }}
        >
          <Box
            w='100%'
            dir='column'
            pb={24}
          >
            <Card
              style={{
                ...(boxless && {
                  border: 'none',
                  backgroundColor: 'transparent',
                  padding: 0
                })
              }}
            >
              <Stack
                w="100%"
                gap={12}
              >
                {children}
              </Stack>
            </Card>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default React.forwardRef(ResponisveLayoutCard)
