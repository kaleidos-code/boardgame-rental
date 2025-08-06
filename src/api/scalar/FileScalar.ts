import { GraphQLScalarType } from 'graphql'

export const FileScalar = new GraphQLScalarType({
  name: 'FileScalar',
  description: 'File scalar type',
  serialize (): string {
    throw new Error('File scaler not fully implemented')
  },
  parseValue (value: unknown): File {
    return value as File
  },
  parseLiteral () {
    throw new Error('File scaler not fully implemented')
  }
})
