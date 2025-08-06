module.exports = {
  overwrite: true,
  schema: [[process.env.APP_URL, 'api/graphql']
    .join('/')
    .replace('//graphql', '/graphql'),
  'src/graphql/graphql.schema.local.graphql'
  ],
  documents: 'src/graphql/*.graphql',
  watch: ['src/graphql/*.graphql'],
  config: {
    scalars: {
      DateTime: 'Date',
      Texts: 'Record<string, string>'
    }
  },
  generates: {
    'src/typings/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'fragment-matcher'
      ]
    },
    'src/graphql/graphql.schema.json': {
      plugins: [
        'introspection'
      ]
    }
  },
  extensions: {
    customDirectives: ['directive @client on FIELD']
  }
}
