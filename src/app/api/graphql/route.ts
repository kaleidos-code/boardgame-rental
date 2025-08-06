import 'reflect-metadata'

import path from 'path'

import { createFetch } from '@whatwg-node/fetch'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '@api/user/UserResolver'
import { AuthResolver } from '@api/auth/AuthResolver'
import { authChecker } from '@api/decorator/authChecker'
import { GameResolver } from '@api/game/GameResolver'
import { TagResolver } from '@api/tag/TagResolver'
import { createYoga } from 'graphql-yoga'
import { FileResolver } from '@api/file/FileResolver'
import { GameUnitResolver } from '@api/gameUnit/GameUnitResolver'
import { RentalResolver } from '@api/rental/RentalResolver'
import { getServerSession } from 'next-auth'
import { RoleResolver } from '@api/role/RoleRelsover'
import { ReservationResolver } from '@api/reservation/ReservationResolver'
import { PickUpDayResolver } from '@api/pickUpDay/PickUpDayResolver'
import { TermsResolver } from '@api/terms/TermsResolver'
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection'

import { authConfig } from '../../../api/lib/auth'

import { loggingPlugin } from './logging'

const config = {
  output: 'export',
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false
  }
}

const { handleRequest } = createYoga({
  schema: await buildSchema({
    resolvers: [
      UserResolver,
      AuthResolver,
      GameResolver,
      PickUpDayResolver,
      RentalResolver,
      RoleResolver,
      TagResolver,
      FileResolver,
      GameUnitResolver,
      TermsResolver,
      ReservationResolver
    ],
    authChecker,
    emitSchemaFile: {
      path: path.resolve(process.cwd(), 'src/graphql/schema.graphql'),
      sortedSchema: true
    }
  }),
  ...(process.env.NODE_ENV === 'production'
    ? {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        plugins: [useDisableIntrospection()],
        graphiql: false
      }
    : {}),
  context: async () => {
    const session = await getServerSession(authConfig)

    return { session }
  },
  graphqlEndpoint: '/api/graphql',
  plugins: [loggingPlugin],
  fetchAPI: createFetch({
    useNodeFetch: true,
    formDataLimits: {
      fileSize: 1000000,
      files: 10,
      fieldSize: 1000000,
      headerSize: 1000000
    }
  })
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
