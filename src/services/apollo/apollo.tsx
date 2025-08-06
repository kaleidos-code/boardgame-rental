'use client'

import React from 'react'
import { withScalars } from 'apollo-link-scalars'
import { buildClientSchema } from 'graphql'
import { DateTimeResolver } from 'graphql-scalars'
import { ApolloLink } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr'
import introspectionResult from '@graphql/graphql.schema.json'

import { cache } from './cache'
import { errorLink } from './error-link'

const schema = buildClientSchema(introspectionResult as any)

const typesMap = {
  Date: DateTimeResolver
}

export const apolloLink = ApolloLink.from([
  errorLink as unknown as ApolloLink,
  withScalars({ schema, typesMap }),
  new SSRMultipartLink({
    stripDefer: true
  }),
  createUploadLink({
    credentials: 'same-origin',
    uri: process.env.NEXT_PUBLIC_API_ENDPOINT + '/graphql'
  }) as unknown as ApolloLink
])

export const makeApolloClient = () => {
  return new NextSSRApolloClient({
    cache,
    link: apolloLink
  })
}

export function ApolloWrapper ({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeApolloClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
