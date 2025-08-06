import { onError } from 'apollo-link-error'

export const errorLink = onError(
  ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.log(
            `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`
        )
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  }
)
