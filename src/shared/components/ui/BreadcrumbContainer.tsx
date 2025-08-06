'use client'

import { Box, Flex } from '@mantine/core'
import React from 'react'

import { BreadCrumbs, BreadCrumbsProps } from './Breadcrumbs'

export type BreadcrumbContainerProps = React.PropsWithChildren & {
  hideBreadcrumb?: boolean
  breadCrumbProps?: BreadCrumbsProps,
  autoHeight?: boolean
}

export const BreadcrumbContainer: React.FC<BreadcrumbContainerProps> = ({
  breadCrumbProps,
  hideBreadcrumb,
  autoHeight = true,
  children
}) => {
  return (
    <Flex
      direction="column"
      style={{
        height: '100%'
      }}
    >
      {!hideBreadcrumb && (
      <Box
        flex="0 0 auto"
      >
        <BreadCrumbs {...breadCrumbProps} />
      </Box>
      )}
      <Box
        flex="1 1 auto"
        h="100%"
        style={
          { ...(autoHeight ? {} : { overflow: 'hidden' }) }
        }
      >
        <Box
          h="100%"
          pb={24}
        >
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
