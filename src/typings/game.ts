import { GameUnit } from '@prisma/client'

export type GameUnitWithTitle = GameUnit & {
  previxedId: string;
  title: string;
};
