import { UpdateGameInput } from '@api/game/dto/UpdateGameInput'
import { DataTableExtendedColumn } from '@shared/components/dataTable/types/types'
import { EditableFile } from '@typings/file'
import { CreateGameInput, GameDataFragment } from '@typings/graphql'

export type GameColumn = DataTableExtendedColumn<GameDataFragment>;

export type GameImportInput = {
  file: EditableFile[]
}

export type GameInputWithUploads = (CreateGameInput | UpdateGameInput) & {
  images: EditableFile[];
  coverImage: EditableFile[];
}

export type GameUnitInputType = {
  unitShortId: string;
  available: boolean;
  weight: number | null;
  notInStock: boolean;
  incomplete: boolean;
  texts: Record<string, string>;
}

export type GameFormInput = Omit<GameInputWithUploads, 'texts' | 'gameUnits'> & {
  texts: Record<string, string>;
  gameUnits: GameUnitInputType[]
}

export type GameTransformedInput = (values: GameFormInput) => GameInputWithUploads

export type ValidationSchema = {
  [K in keyof CreateGameInput]?: any
};
