import React from 'react'

import { ErrorPage } from '../features/error/views/ErrorPage'

export default async function NotFountPage () {
  return (
    <ErrorPage
      code={404}
    />
  )
}
