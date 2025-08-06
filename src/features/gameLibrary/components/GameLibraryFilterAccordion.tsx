'use client'

import { Accordion, Flex } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = React.PropsWithChildren & {
  accordionKey: string
  titleExtension?: React.ReactNode
}

export const GameLibraryFilterAccordion: React.FC<Props> = ({ accordionKey, titleExtension, children }) => {
  const { t } = useTranslation()

  return (
    <Accordion.Item value={accordionKey}>
      <Accordion.Control>
        <Flex
          pr={8}
          justify="space-between"
          align="center"
        >
          {t(`common.${accordionKey}`)}
          { titleExtension }
        </Flex>
      </Accordion.Control>
      <Accordion.Panel>
        { children }
      </Accordion.Panel>
    </Accordion.Item>
  )
}
