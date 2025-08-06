import { ObjectType } from 'type-graphql'

import PaginatedResponse from '../../pagination/models/Pagination'

import { Game } from './Game'

@ObjectType('PaginationGames', {})
export class PaginatedGames extends PaginatedResponse(Game) {}
