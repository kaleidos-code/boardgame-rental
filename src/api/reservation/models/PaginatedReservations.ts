import { ObjectType } from 'type-graphql'

import PaginatedResponse from '../../pagination/models/Pagination'

import { Reservation } from './ReservationModel'

@ObjectType('PaginatedReservations', {})
export class PaginatedReservations extends PaginatedResponse(Reservation) {}
