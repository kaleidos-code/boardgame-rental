import { ObjectType } from 'type-graphql'

import PaginatedResponse from '../../pagination/models/Pagination'

import { User } from './User'

@ObjectType('PaginatedUsers', {})
export class PaginatedUsers extends PaginatedResponse(User) {}
