import { Divider, Flex } from '@mantine/core'
import React from 'react'

import ResponsiveLayoutContent from '../ui/ResponsiveLayoutCard'

export type CreateUpdateLayoutProps = {
  children: React.ReactNode
  onSubmit: () => void
  footer?: React.ReactNode
}

export const CreateUpdateFormLayout: React.FC<CreateUpdateLayoutProps> = ({ onSubmit, footer, children }) => {
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit()
  }

  return (
    <form
      style={{
        height: '100%',
        position: 'relative'
      }}
      onSubmit={handleOnSubmit}
    >
      <Flex
        direction="column"
        style={{
          height: '100%'
        }}
      >
        <ResponsiveLayoutContent
          boxProps={{
            flex: '1 1 auto'
          }}
        >
          {children}
          <Divider mt={24}/>
          <Flex
            direction="row-reverse"
          >
            {footer}
          </Flex>
        </ResponsiveLayoutContent>
      </Flex>
    </form>
  )
}
