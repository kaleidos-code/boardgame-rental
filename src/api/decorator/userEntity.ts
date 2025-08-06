import { createParamDecorator } from 'type-graphql'
import { GraphQlContext } from '@typings/common'

export function UserSession () {
  return createParamDecorator<GraphQlContext>(({ context }) => {
    return context.session?.user
  })
}
