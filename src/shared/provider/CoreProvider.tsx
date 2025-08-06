'use client'

import React from 'react'
import { MantineProvider } from '@mantine/core'
import { ApolloWrapper } from '@services/apollo/apollo'
import { theme } from '@theme/theme'
import { Provider } from 'react-redux'
import { persistor, store } from '@services/store/store'
import { PersistGate } from 'redux-persist/integration/react'

import { ModalProvider } from './ModalProvider'

const CoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloWrapper>
          <MantineProvider
            theme={theme}
          >
            <ModalProvider>
              {children}
            </ModalProvider>
          </MantineProvider>
        </ApolloWrapper>
      </PersistGate>
    </Provider>
  )
}

export default CoreProvider
