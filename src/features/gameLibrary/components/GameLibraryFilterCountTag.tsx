'use client'

import { Flex, Text } from '@mantine/core'
import React from 'react'

type Props = {
  count: number
}

export const GameLibraryFilterCountTag: React.FC<Props> = ({ count }) => {
  return (
    <Flex
      h="18px"
      w="18px"
      align="center"
      justify="center"
      bg="blue.1"
    >
      <Text
        c="blue.7"
        fz="12px"
        lh="12px"
      >
        {count}
      </Text>
    </Flex>
  )
}
