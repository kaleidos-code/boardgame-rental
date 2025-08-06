import { Rental } from '@prisma/client'

export type RentalWithGame = Rental & {
  gameTitle: string;
  gameUnit: string;
}
