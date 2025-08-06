import { ObjectType } from 'type-graphql'

import PaginatedResponse from '../../pagination/models/Pagination'

import { Rental } from './Rental'

@ObjectType('PaginatedRentals', {})
export class PaginatedRentals extends PaginatedResponse(Rental) {}
