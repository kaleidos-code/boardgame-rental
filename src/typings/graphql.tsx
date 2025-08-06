import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
  /** File scalar type */
  FileScalar: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type CancelReservationInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type CreateGameInput = {
  ean: Scalars['String']['input'];
  gameUnits: Array<CreateGameUnitInput>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  maxDuration?: InputMaybe<Scalars['Int']['input']>;
  maxPlayers: Scalars['Int']['input'];
  minAge: Scalars['Int']['input'];
  minDuration: Scalars['Int']['input'];
  minPlayers: Scalars['Int']['input'];
  publisher: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  texts: Array<CreateTextInput>;
  title: Scalars['String']['input'];
};

export type CreateGameUnitInput = {
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  incomplete?: InputMaybe<Scalars['Boolean']['input']>;
  texts: Array<CreateTextInput>;
  unitShortId: Scalars['String']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateRentalInput = {
  reservationId: Scalars['String']['input'];
};

export type CreateReservationInput = {
  gameId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateTextInput = {
  key: Scalars['String']['input'];
  lang?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUpdatePickUpDayInput = {
  dayOfWeek: WeekDay;
  pickUpTimes: Array<CreateUpdatePickUpTimeInput>;
};

export type CreateUpdatePickUpTimeInput = {
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  roleId: Scalars['String']['input'];
};

export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTimeISO']['output'];
  dataUrl: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  mimeType: Scalars['String']['output'];
  model: Scalars['String']['output'];
  modelId: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  url: Scalars['String']['output'];
};

export type FilterInput = {
  columnAccessor: Scalars['String']['input'];
  operator: FilterOperator;
  type: FilterTypes;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

/** Filter operators for datatables */
export enum FilterOperator {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  In = 'IN',
  Is = 'IS',
  IsNotNull = 'IS_NOT_NULL',
  IsNull = 'IS_NULL',
  Like = 'LIKE',
  Lt = 'LT',
  Lte = 'LTE',
  Neq = 'NEQ',
  Nin = 'NIN',
  NotLike = 'NOT_LIKE'
}

/** Filter types for datatables */
export enum FilterTypes {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Number = 'NUMBER',
  Select = 'SELECT',
  String = 'STRING'
}

export type Game = {
  __typename?: 'Game';
  available: Scalars['Boolean']['output'];
  availableAt?: Maybe<Scalars['DateTimeISO']['output']>;
  availableUnits: Scalars['Int']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  ean?: Maybe<Scalars['String']['output']>;
  files?: Maybe<Array<File>>;
  gameShortId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  incomplete: Scalars['Boolean']['output'];
  maxAge?: Maybe<Scalars['Int']['output']>;
  maxDuration?: Maybe<Scalars['Int']['output']>;
  maxPlayers?: Maybe<Scalars['Int']['output']>;
  minAge: Scalars['Int']['output'];
  minDuration?: Maybe<Scalars['Int']['output']>;
  minPlayers: Scalars['Int']['output'];
  publisher: Scalars['String']['output'];
  tags: Array<Tag>;
  texts: Scalars['JSON']['output'];
  title: Scalars['String']['output'];
  units: Array<GameUnit>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type GameUnit = {
  __typename?: 'GameUnit';
  available: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  game: Game;
  gameId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  inStock: Scalars['Boolean']['output'];
  incomplete: Scalars['Boolean']['output'];
  prefixedShortId?: Maybe<Scalars['String']['output']>;
  rentals?: Maybe<Array<Rental>>;
  texts: Scalars['JSON']['output'];
  unitShortId: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptTerms: Scalars['Boolean']['output'];
  cancelReservation: Reservation;
  changePassword: Scalars['Boolean']['output'];
  createGame: Game;
  createRentalsByReservation: Array<Rental>;
  createReservation: Reservation;
  createUpdatePickUpDay: Array<PickUpDay>;
  createUser: User;
  forgotPassword: Scalars['Boolean']['output'];
  importGames: Scalars['Boolean']['output'];
  login: Scalars['String']['output'];
  returnRental: Rental;
  sendDoubleOptInMail: Scalars['Boolean']['output'];
  sendDoubleOptInMailToMe: Scalars['Boolean']['output'];
  sendDoubleOptInNewMailToMe: Scalars['Boolean']['output'];
  setPassword: Scalars['Boolean']['output'];
  setReservationPacked: Reservation;
  signUp: Scalars['Boolean']['output'];
  softDeleteGame: Game;
  softDeleteUser: User;
  updateGame: Game;
  updateMe: User;
  updateRental: Rental;
  updateReservation: Reservation;
  updateUser: User;
};


export type MutationAcceptTermsArgs = {
  terms: Array<TermsType>;
};


export type MutationCancelReservationArgs = {
  data?: InputMaybe<CancelReservationInput>;
  id: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  data: PasswordChangeInput;
};


export type MutationCreateGameArgs = {
  data: CreateGameInput;
  uploads?: InputMaybe<Array<Scalars['FileScalar']['input']>>;
};


export type MutationCreateRentalsByReservationArgs = {
  data: CreateRentalInput;
};


export type MutationCreateReservationArgs = {
  games: Array<CreateReservationInput>;
};


export type MutationCreateUpdatePickUpDayArgs = {
  data: Array<CreateUpdatePickUpDayInput>;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationImportGamesArgs = {
  upload: Scalars['FileScalar']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationReturnRentalArgs = {
  id: Scalars['String']['input'];
};


export type MutationSendDoubleOptInMailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSetPasswordArgs = {
  data: SetPasswordInput;
};


export type MutationSetReservationPackedArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  data: SignUpInput;
};


export type MutationSoftDeleteGameArgs = {
  id: Scalars['String']['input'];
};


export type MutationSoftDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateGameArgs = {
  data: UpdateGameInput;
  id: Scalars['String']['input'];
  uploads?: InputMaybe<Array<Scalars['FileScalar']['input']>>;
};


export type MutationUpdateMeArgs = {
  data: UpdateMeInput;
};


export type MutationUpdateRentalArgs = {
  data: UpdateRentalInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateReservationArgs = {
  data: UpdateReservationInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['String']['input'];
};

export type OrderInput = {
  columnAccessor: Scalars['String']['input'];
  direction: Scalars['String']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedRentals = {
  __typename?: 'PaginatedRentals';
  intitialPaginationDate?: Maybe<Scalars['DateTimeISO']['output']>;
  nodes?: Maybe<Array<Rental>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaginatedReservations = {
  __typename?: 'PaginatedReservations';
  intitialPaginationDate?: Maybe<Scalars['DateTimeISO']['output']>;
  nodes?: Maybe<Array<Reservation>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  intitialPaginationDate?: Maybe<Scalars['DateTimeISO']['output']>;
  nodes?: Maybe<Array<User>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaginationGames = {
  __typename?: 'PaginationGames';
  intitialPaginationDate?: Maybe<Scalars['DateTimeISO']['output']>;
  nodes?: Maybe<Array<Game>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PasswordChangeInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type PickUpDay = {
  __typename?: 'PickUpDay';
  createdAt: Scalars['DateTimeISO']['output'];
  dayOfWeek: WeekDay;
  pickUpTimes: Array<PickUpTime>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type PickUpTime = {
  __typename?: 'PickUpTime';
  dayOfWeek: WeekDay;
  from: Scalars['String']['output'];
  to: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  game: Game;
  games: Array<Game>;
  gamesByIds: Array<Game>;
  gamesPaginated: PaginationGames;
  me: User;
  myReservations: Array<Reservation>;
  pickUpDays: Array<PickUpDay>;
  rentalsPaginated: PaginatedRentals;
  reservation?: Maybe<Reservation>;
  reservationsPaginated: PaginatedReservations;
  role: Role;
  roles: Array<Role>;
  tag: Tag;
  tags: Array<Tag>;
  term: Terms;
  terms: Array<Terms>;
  user: User;
  users: Array<User>;
  usersPaginated: PaginatedUsers;
};


export type QueryGameArgs = {
  id: Scalars['String']['input'];
};


export type QueryGamesByIdsArgs = {
  games: Array<Scalars['String']['input']>;
};


export type QueryGamesPaginatedArgs = {
  filterBy?: InputMaybe<Array<FilterInput>>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<OrderInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMyReservationsArgs = {
  status?: InputMaybe<Array<ReservationStatus>>;
};


export type QueryRentalsPaginatedArgs = {
  filterBy?: InputMaybe<Array<FilterInput>>;
  includeAll?: InputMaybe<Scalars['Boolean']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<OrderInput>>;
};


export type QueryReservationArgs = {
  id: Scalars['String']['input'];
};


export type QueryReservationsPaginatedArgs = {
  filterBy?: InputMaybe<Array<FilterInput>>;
  includeAll?: InputMaybe<Scalars['Boolean']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<OrderInput>>;
};


export type QueryRoleArgs = {
  id: Scalars['String']['input'];
};


export type QueryTagArgs = {
  id: Scalars['String']['input'];
};


export type QueryTermArgs = {
  key: TermsType;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersPaginatedArgs = {
  filterBy?: InputMaybe<Array<FilterInput>>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<OrderInput>>;
};

export type Rental = {
  __typename?: 'Rental';
  bookingId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  dueDate: Scalars['DateTimeISO']['output'];
  gameUnit?: Maybe<GameUnit>;
  gameUnitId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastReminder?: Maybe<Scalars['DateTimeISO']['output']>;
  rentedAt: Scalars['DateTimeISO']['output'];
  reservationId?: Maybe<Scalars['String']['output']>;
  returnedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  status: RentalStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

/** The status of a rental */
export enum RentalStatus {
  Overdue = 'OVERDUE',
  Rented = 'RENTED',
  Returned = 'RETURNED'
}

export type Reservation = {
  __typename?: 'Reservation';
  cancelledAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  gameUnits: Array<GameUnit>;
  id: Scalars['String']['output'];
  overDue: Scalars['Boolean']['output'];
  rentalId?: Maybe<Scalars['String']['output']>;
  reservationCode: Scalars['String']['output'];
  status: ReservationStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

/** The status of a reservation */
export enum ReservationStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Packed = 'PACKED',
  Pending = 'PENDING'
}

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  texts: Scalars['JSON']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type SetPasswordInput = {
  optIn?: InputMaybe<Scalars['Boolean']['input']>;
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SignUpInput = {
  birthdate: Scalars['DateTimeISO']['input'];
  city: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  street: Scalars['String']['input'];
  telephone: Scalars['String']['input'];
  termsAccepted: Scalars['Boolean']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  texts: Scalars['JSON']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type Terms = {
  __typename?: 'Terms';
  createdAt: Scalars['DateTimeISO']['output'];
  key: TermsType;
  texts: Scalars['JSON']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** Type of terms */
export enum TermsType {
  Privacy = 'PRIVACY',
  Terms = 'TERMS'
}

/** Token types for validation tokens */
export enum TokenType {
  NewEmail = 'NEW_EMAIL',
  OptIn = 'OPT_IN',
  Password = 'PASSWORD'
}

export type UpdateGameInput = {
  ean: Scalars['String']['input'];
  gameUnits?: InputMaybe<Array<CreateGameUnitInput>>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  maxDuration?: InputMaybe<Scalars['Int']['input']>;
  maxPlayers?: InputMaybe<Scalars['Int']['input']>;
  minAge?: InputMaybe<Scalars['Int']['input']>;
  minDuration?: InputMaybe<Scalars['Int']['input']>;
  minPlayers?: InputMaybe<Scalars['Int']['input']>;
  publisher?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  texts?: InputMaybe<Array<CreateTextInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeInput = {
  birthdate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  telephone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRentalInput = {
  dueDate: Scalars['DateTimeISO']['input'];
};

export type UpdateReservationInput = {
  gameIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  activeToken?: Maybe<TokenType>;
  birthdate?: Maybe<Scalars['DateTimeISO']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  deletedAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['DateTimeISO']['output']>;
  firstname: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  password: Scalars['String']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  role: Role;
  roleId: Scalars['String']['output'];
  street?: Maybe<Scalars['String']['output']>;
  telephone?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};


export type UserActiveTokenArgs = {
  type: TokenType;
};

/** Available pick up days */
export enum WeekDay {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type SignUpMutationVariables = Exact<{
  data: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type SetPasswordMutationVariables = Exact<{
  data: SetPasswordInput;
}>;


export type SetPasswordMutation = { __typename?: 'Mutation', setPassword: boolean };

export type ChangePasswordMutationVariables = Exact<{
  data: PasswordChangeInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type FileDataFragment = { __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string };

export type GameUnitDataFragment = { __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null };

export type GameDataFragment = { __typename?: 'Game', id: string, ean?: string | null, title: string, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null };

export type GameQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GameQuery = { __typename?: 'Query', game: { __typename?: 'Game', id: string, ean?: string | null, title: string, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null } };

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', id: string, ean?: string | null, title: string, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }> };

export type GamesByIdsQueryVariables = Exact<{
  games: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GamesByIdsQuery = { __typename?: 'Query', gamesByIds: Array<{ __typename?: 'Game', id: string, ean?: string | null, title: string, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }> };

export type GamesPaginatedQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<OrderInput> | OrderInput>;
  filterBy?: InputMaybe<Array<FilterInput> | FilterInput>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type GamesPaginatedQuery = { __typename?: 'Query', gamesPaginated: { __typename?: 'PaginationGames', totalCount: number, nodes?: Array<{ __typename?: 'Game', id: string, ean?: string | null, title: string, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }> | null, pageInfo: { __typename?: 'PageInfo', currentPage: number, totalPages: number, perPage: number } } };

export type CreateGameMutationVariables = Exact<{
  data: CreateGameInput;
  uploads?: InputMaybe<Array<Scalars['FileScalar']['input']> | Scalars['FileScalar']['input']>;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: string, ean?: string | null, title: string, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null } };

export type UpdateGameMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateGameInput;
  uploads?: InputMaybe<Array<Scalars['FileScalar']['input']> | Scalars['FileScalar']['input']>;
}>;


export type UpdateGameMutation = { __typename?: 'Mutation', updateGame: { __typename?: 'Game', id: string, ean?: string | null, title: string, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null } };

export type SoftDeleteGameMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SoftDeleteGameMutation = { __typename?: 'Mutation', softDeleteGame: { __typename?: 'Game', id: string, ean?: string | null, title: string, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null } };

export type ImportGamesMutationVariables = Exact<{
  upload: Scalars['FileScalar']['input'];
}>;


export type ImportGamesMutation = { __typename?: 'Mutation', importGames: boolean };

export type PickUpDayDataFragment = { __typename?: 'PickUpDay', dayOfWeek: WeekDay, pickUpTimes: Array<{ __typename?: 'PickUpTime', from: string, to: string }> };

export type PickUpDaysQueryVariables = Exact<{ [key: string]: never; }>;


export type PickUpDaysQuery = { __typename?: 'Query', pickUpDays: Array<{ __typename?: 'PickUpDay', dayOfWeek: WeekDay, pickUpTimes: Array<{ __typename?: 'PickUpTime', from: string, to: string }> }> };

export type CreateUpdatePickUpDayMutationVariables = Exact<{
  data: Array<CreateUpdatePickUpDayInput> | CreateUpdatePickUpDayInput;
}>;


export type CreateUpdatePickUpDayMutation = { __typename?: 'Mutation', createUpdatePickUpDay: Array<{ __typename?: 'PickUpDay', dayOfWeek: WeekDay, pickUpTimes: Array<{ __typename?: 'PickUpTime', from: string, to: string }> }> };

export type RentalDataFragment = { __typename?: 'Rental', id: string, bookingId?: string | null, status: RentalStatus, reservationId?: string | null, createdAt: any, dueDate: any, returnedAt?: any | null, gameUnit?: { __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null } | null, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string } };

export type RentalsPaginatedQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  includeAll?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Array<OrderInput> | OrderInput>;
  filterBy?: InputMaybe<Array<FilterInput> | FilterInput>;
}>;


export type RentalsPaginatedQuery = { __typename?: 'Query', rentalsPaginated: { __typename?: 'PaginatedRentals', totalCount: number, nodes?: Array<{ __typename?: 'Rental', id: string, bookingId?: string | null, status: RentalStatus, reservationId?: string | null, createdAt: any, dueDate: any, returnedAt?: any | null, gameUnit?: { __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null } | null, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string } }> | null, pageInfo: { __typename?: 'PageInfo', currentPage: number, totalPages: number, perPage: number } } };

export type CreateRentalsByReservationMutationVariables = Exact<{
  data: CreateRentalInput;
}>;


export type CreateRentalsByReservationMutation = { __typename?: 'Mutation', createRentalsByReservation: Array<{ __typename?: 'Rental', id: string, bookingId?: string | null, status: RentalStatus, reservationId?: string | null, createdAt: any, dueDate: any, returnedAt?: any | null, gameUnit?: { __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null } | null, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string } }> };

export type UpdateRentalMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateRentalInput;
}>;


export type UpdateRentalMutation = { __typename?: 'Mutation', updateRental: { __typename?: 'Rental', id: string, bookingId?: string | null, status: RentalStatus, reservationId?: string | null, createdAt: any, dueDate: any, returnedAt?: any | null, gameUnit?: { __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null } | null, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string } } };

export type ReturnRentalMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ReturnRentalMutation = { __typename?: 'Mutation', returnRental: { __typename?: 'Rental', id: string, bookingId?: string | null, status: RentalStatus, reservationId?: string | null, createdAt: any, dueDate: any, returnedAt?: any | null, gameUnit?: { __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null } | null, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string } } };

export type ReservationDataFragment = { __typename?: 'Reservation', id: string, reservationCode: string, status: ReservationStatus, overDue: boolean, cancelledAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string }, gameUnits: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }> };

export type MyReservationsQueryVariables = Exact<{
  status?: InputMaybe<Array<ReservationStatus> | ReservationStatus>;
}>;


export type MyReservationsQuery = { __typename?: 'Query', myReservations: Array<{ __typename?: 'Reservation', id: string, reservationCode: string, status: ReservationStatus, overDue: boolean, cancelledAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string }, gameUnits: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }> }> };

export type ReservationsPaginatedQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  includeAll?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Array<OrderInput> | OrderInput>;
  filterBy?: InputMaybe<Array<FilterInput> | FilterInput>;
}>;


export type ReservationsPaginatedQuery = { __typename?: 'Query', reservationsPaginated: { __typename?: 'PaginatedReservations', totalCount: number, nodes?: Array<{ __typename?: 'Reservation', id: string, reservationCode: string, status: ReservationStatus, overDue: boolean, cancelledAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string }, gameUnits: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }> }> | null, pageInfo: { __typename?: 'PageInfo', currentPage: number, totalPages: number, perPage: number } } };

export type CreateReservationMutationVariables = Exact<{
  games: Array<CreateReservationInput> | CreateReservationInput;
}>;


export type CreateReservationMutation = { __typename?: 'Mutation', createReservation: { __typename?: 'Reservation', id: string, reservationCode: string, status: ReservationStatus, overDue: boolean, cancelledAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string }, gameUnits: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }> } };

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateReservationInput;
}>;


export type UpdateReservationMutation = { __typename?: 'Mutation', updateReservation: { __typename?: 'Reservation', id: string, reservationCode: string, status: ReservationStatus, overDue: boolean, cancelledAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string }, gameUnits: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }> } };

export type SetReservationPackedMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SetReservationPackedMutation = { __typename?: 'Mutation', setReservationPacked: { __typename?: 'Reservation', id: string, reservationCode: string, status: ReservationStatus, overDue: boolean, cancelledAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string }, gameUnits: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }> } };

export type CancelReservationMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data?: InputMaybe<CancelReservationInput>;
}>;


export type CancelReservationMutation = { __typename?: 'Mutation', cancelReservation: { __typename?: 'Reservation', id: string, reservationCode: string, status: ReservationStatus, overDue: boolean, cancelledAt?: any | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string }, gameUnits: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string, ean?: string | null, publisher: string, minAge: number, maxAge?: number | null, gameShortId: number, minPlayers: number, maxPlayers?: number | null, minDuration?: number | null, maxDuration?: number | null, createdAt: any, availableUnits: number, availableAt?: any | null, available: boolean, incomplete: boolean, texts: any, tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }>, units: Array<{ __typename?: 'GameUnit', id: string, unitShortId: string, available: boolean, incomplete: boolean, prefixedShortId?: string | null, inStock: boolean, weight?: number | null, texts: any, game: { __typename?: 'Game', id: string, title: string }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }>, files?: Array<{ __typename?: 'File', id: string, fileName: string, key: string, mimeType: string, size: number, url: string, dataUrl: string }> | null }, rentals?: Array<{ __typename?: 'Rental', id: string }> | null }> } };

export type RoleDataFragment = { __typename?: 'Role', id: string, key: string, texts: any };

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: string, key: string, texts: any }> };

export type TagDataFragment = { __typename?: 'Tag', id: string, key: string, texts: any };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, key: string, texts: any }> };

export type TermsDataFragment = { __typename?: 'Terms', key: TermsType, texts: any };

export type TermQueryVariables = Exact<{
  key: TermsType;
}>;


export type TermQuery = { __typename?: 'Query', term: { __typename?: 'Terms', key: TermsType, texts: any } };

export type TermsQueryVariables = Exact<{ [key: string]: never; }>;


export type TermsQuery = { __typename?: 'Query', terms: Array<{ __typename?: 'Terms', key: TermsType, texts: any }> };

export type UserMinimalDataFragment = { __typename?: 'User', id: string, firstname: string, lastname: string, email: string };

export type UserDataFragment = { __typename?: 'User', emailVerified?: any | null, createdAt: any, updatedAt: any, street?: string | null, postalCode?: string | null, city?: string | null, telephone?: string | null, id: string, firstname: string, lastname: string, email: string, newMailToken?: TokenType | null, role: { __typename?: 'Role', id: string, key: string, texts: any } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', emailVerified?: any | null, createdAt: any, updatedAt: any, street?: string | null, postalCode?: string | null, city?: string | null, telephone?: string | null, id: string, firstname: string, lastname: string, email: string, newMailToken?: TokenType | null, role: { __typename?: 'Role', id: string, key: string, texts: any } } };

export type UserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', emailVerified?: any | null, createdAt: any, updatedAt: any, street?: string | null, postalCode?: string | null, city?: string | null, telephone?: string | null, id: string, firstname: string, lastname: string, email: string, newMailToken?: TokenType | null, role: { __typename?: 'Role', id: string, key: string, texts: any } } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', emailVerified?: any | null, createdAt: any, updatedAt: any, street?: string | null, postalCode?: string | null, city?: string | null, telephone?: string | null, id: string, firstname: string, lastname: string, email: string, newMailToken?: TokenType | null, role: { __typename?: 'Role', id: string, key: string, texts: any } }> };

export type UsersPaginatedQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<OrderInput> | OrderInput>;
  filterBy?: InputMaybe<Array<FilterInput> | FilterInput>;
}>;


export type UsersPaginatedQuery = { __typename?: 'Query', usersPaginated: { __typename?: 'PaginatedUsers', totalCount: number, nodes?: Array<{ __typename?: 'User', emailVerified?: any | null, createdAt: any, updatedAt: any, street?: string | null, postalCode?: string | null, city?: string | null, telephone?: string | null, id: string, firstname: string, lastname: string, email: string, newMailToken?: TokenType | null, role: { __typename?: 'Role', id: string, key: string, texts: any } }> | null, pageInfo: { __typename?: 'PageInfo', currentPage: number, totalPages: number, perPage: number } } };

export type AcceptTermsMutationVariables = Exact<{
  terms: Array<TermsType> | TermsType;
}>;


export type AcceptTermsMutation = { __typename?: 'Mutation', acceptTerms: boolean };

export type SendDoubleOptInMailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendDoubleOptInMailMutation = { __typename?: 'Mutation', sendDoubleOptInMail: boolean };

export type UpdateMeMutationVariables = Exact<{
  data: UpdateMeInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', emailVerified?: any | null, createdAt: any, updatedAt: any, street?: string | null, postalCode?: string | null, city?: string | null, telephone?: string | null, id: string, firstname: string, lastname: string, email: string, newMailToken?: TokenType | null, role: { __typename?: 'Role', id: string, key: string, texts: any } } };

export type SendDoubleOptInMailToMeMutationVariables = Exact<{ [key: string]: never; }>;


export type SendDoubleOptInMailToMeMutation = { __typename?: 'Mutation', sendDoubleOptInMailToMe: boolean };

export type SendDoubleOptInNewMailToMeMutationVariables = Exact<{ [key: string]: never; }>;


export type SendDoubleOptInNewMailToMeMutation = { __typename?: 'Mutation', sendDoubleOptInNewMailToMe: boolean };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', emailVerified?: any | null, createdAt: any, updatedAt: any, street?: string | null, postalCode?: string | null, city?: string | null, telephone?: string | null, id: string, firstname: string, lastname: string, email: string, newMailToken?: TokenType | null, role: { __typename?: 'Role', id: string, key: string, texts: any } } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', emailVerified?: any | null, createdAt: any, updatedAt: any, street?: string | null, postalCode?: string | null, city?: string | null, telephone?: string | null, id: string, firstname: string, lastname: string, email: string, newMailToken?: TokenType | null, role: { __typename?: 'Role', id: string, key: string, texts: any } } };

export type SoftDeleteUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SoftDeleteUserMutation = { __typename?: 'Mutation', softDeleteUser: { __typename?: 'User', emailVerified?: any | null, createdAt: any, updatedAt: any, street?: string | null, postalCode?: string | null, city?: string | null, telephone?: string | null, id: string, firstname: string, lastname: string, email: string, newMailToken?: TokenType | null, role: { __typename?: 'Role', id: string, key: string, texts: any } } };

export const PickUpDayDataFragmentDoc = gql`
    fragment PickUpDayData on PickUpDay {
  dayOfWeek
  pickUpTimes {
    from
    to
  }
}
    `;
export const GameUnitDataFragmentDoc = gql`
    fragment GameUnitData on GameUnit {
  id
  unitShortId
  available
  incomplete
  prefixedShortId
  inStock
  weight
  texts
  game {
    id
    title
  }
  rentals {
    id
  }
}
    `;
export const TagDataFragmentDoc = gql`
    fragment TagData on Tag {
  id
  key
  texts
}
    `;
export const FileDataFragmentDoc = gql`
    fragment FileData on File {
  id
  id
  fileName
  key
  mimeType
  size
  url
  dataUrl
}
    `;
export const GameDataFragmentDoc = gql`
    fragment GameData on Game {
  id
  ean
  title
  publisher
  minAge
  maxAge
  gameShortId
  minPlayers
  maxPlayers
  minDuration
  maxDuration
  createdAt
  availableUnits
  availableAt
  available @client
  incomplete @client
  texts
  tags {
    ...TagData
  }
  units {
    ...GameUnitData
  }
  files {
    ...FileData
  }
}
    ${TagDataFragmentDoc}
${GameUnitDataFragmentDoc}
${FileDataFragmentDoc}`;
export const UserMinimalDataFragmentDoc = gql`
    fragment UserMinimalData on User {
  id
  firstname
  lastname
  email
}
    `;
export const RentalDataFragmentDoc = gql`
    fragment RentalData on Rental {
  id
  bookingId
  status
  reservationId
  createdAt
  dueDate
  returnedAt
  gameUnit {
    ...GameUnitData
    game {
      ...GameData
    }
  }
  user {
    ...UserMinimalData
  }
}
    ${GameUnitDataFragmentDoc}
${GameDataFragmentDoc}
${UserMinimalDataFragmentDoc}`;
export const ReservationDataFragmentDoc = gql`
    fragment ReservationData on Reservation {
  id
  reservationCode
  status
  user {
    ...UserMinimalData
  }
  gameUnits {
    ...GameUnitData
    game {
      ...GameData
    }
  }
  overDue @client
  cancelledAt
  createdAt
  updatedAt
}
    ${UserMinimalDataFragmentDoc}
${GameUnitDataFragmentDoc}
${GameDataFragmentDoc}`;
export const TermsDataFragmentDoc = gql`
    fragment TermsData on Terms {
  key
  texts
}
    `;
export const RoleDataFragmentDoc = gql`
    fragment RoleData on Role {
  id
  key
  texts
}
    `;
export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  ...UserMinimalData
  emailVerified
  createdAt
  updatedAt
  street
  postalCode
  city
  telephone
  newMailToken: activeToken(type: NEW_EMAIL)
  role {
    ...RoleData
  }
}
    ${UserMinimalDataFragmentDoc}
${RoleDataFragmentDoc}`;
export const SignUpDocument = gql`
    mutation signUp($data: SignUpInput!) {
  signUp(data: $data)
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const SetPasswordDocument = gql`
    mutation setPassword($data: SetPasswordInput!) {
  setPassword(data: $data)
}
    `;
export type SetPasswordMutationFn = Apollo.MutationFunction<SetPasswordMutation, SetPasswordMutationVariables>;

/**
 * __useSetPasswordMutation__
 *
 * To run a mutation, you first call `useSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPasswordMutation, { data, loading, error }] = useSetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SetPasswordMutation, SetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPasswordMutation, SetPasswordMutationVariables>(SetPasswordDocument, options);
      }
export type SetPasswordMutationHookResult = ReturnType<typeof useSetPasswordMutation>;
export type SetPasswordMutationResult = Apollo.MutationResult<SetPasswordMutation>;
export type SetPasswordMutationOptions = Apollo.BaseMutationOptions<SetPasswordMutation, SetPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($data: PasswordChangeInput!) {
  changePassword(data: $data)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const GameDocument = gql`
    query game($id: String!) {
  game(id: $id) {
    ...GameData
  }
}
    ${GameDataFragmentDoc}`;

/**
 * __useGameQuery__
 *
 * To run a query within a React component, call `useGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGameQuery(baseOptions: Apollo.QueryHookOptions<GameQuery, GameQueryVariables> & ({ variables: GameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GameQuery, GameQueryVariables>(GameDocument, options);
      }
export function useGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameQuery, GameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GameQuery, GameQueryVariables>(GameDocument, options);
        }
export function useGameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GameQuery, GameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GameQuery, GameQueryVariables>(GameDocument, options);
        }
export type GameQueryHookResult = ReturnType<typeof useGameQuery>;
export type GameLazyQueryHookResult = ReturnType<typeof useGameLazyQuery>;
export type GameSuspenseQueryHookResult = ReturnType<typeof useGameSuspenseQuery>;
export type GameQueryResult = Apollo.QueryResult<GameQuery, GameQueryVariables>;
export const GamesDocument = gql`
    query games {
  games {
    ...GameData
  }
}
    ${GameDataFragmentDoc}`;

/**
 * __useGamesQuery__
 *
 * To run a query within a React component, call `useGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGamesQuery(baseOptions?: Apollo.QueryHookOptions<GamesQuery, GamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GamesQuery, GamesQueryVariables>(GamesDocument, options);
      }
export function useGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GamesQuery, GamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GamesQuery, GamesQueryVariables>(GamesDocument, options);
        }
export function useGamesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GamesQuery, GamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GamesQuery, GamesQueryVariables>(GamesDocument, options);
        }
export type GamesQueryHookResult = ReturnType<typeof useGamesQuery>;
export type GamesLazyQueryHookResult = ReturnType<typeof useGamesLazyQuery>;
export type GamesSuspenseQueryHookResult = ReturnType<typeof useGamesSuspenseQuery>;
export type GamesQueryResult = Apollo.QueryResult<GamesQuery, GamesQueryVariables>;
export const GamesByIdsDocument = gql`
    query gamesByIds($games: [String!]!) {
  gamesByIds(games: $games) {
    ...GameData
  }
}
    ${GameDataFragmentDoc}`;

/**
 * __useGamesByIdsQuery__
 *
 * To run a query within a React component, call `useGamesByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesByIdsQuery({
 *   variables: {
 *      games: // value for 'games'
 *   },
 * });
 */
export function useGamesByIdsQuery(baseOptions: Apollo.QueryHookOptions<GamesByIdsQuery, GamesByIdsQueryVariables> & ({ variables: GamesByIdsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GamesByIdsQuery, GamesByIdsQueryVariables>(GamesByIdsDocument, options);
      }
export function useGamesByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GamesByIdsQuery, GamesByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GamesByIdsQuery, GamesByIdsQueryVariables>(GamesByIdsDocument, options);
        }
export function useGamesByIdsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GamesByIdsQuery, GamesByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GamesByIdsQuery, GamesByIdsQueryVariables>(GamesByIdsDocument, options);
        }
export type GamesByIdsQueryHookResult = ReturnType<typeof useGamesByIdsQuery>;
export type GamesByIdsLazyQueryHookResult = ReturnType<typeof useGamesByIdsLazyQuery>;
export type GamesByIdsSuspenseQueryHookResult = ReturnType<typeof useGamesByIdsSuspenseQuery>;
export type GamesByIdsQueryResult = Apollo.QueryResult<GamesByIdsQuery, GamesByIdsQueryVariables>;
export const GamesPaginatedDocument = gql`
    query gamesPaginated($offset: Int!, $limit: Int!, $orderBy: [OrderInput!], $filterBy: [FilterInput!], $search: String) {
  gamesPaginated(
    offset: $offset
    limit: $limit
    orderBy: $orderBy
    filterBy: $filterBy
    search: $search
  ) {
    nodes {
      ...GameData
    }
    pageInfo {
      currentPage
      totalPages
      perPage
    }
    totalCount
  }
}
    ${GameDataFragmentDoc}`;

/**
 * __useGamesPaginatedQuery__
 *
 * To run a query within a React component, call `useGamesPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesPaginatedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *      filterBy: // value for 'filterBy'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGamesPaginatedQuery(baseOptions: Apollo.QueryHookOptions<GamesPaginatedQuery, GamesPaginatedQueryVariables> & ({ variables: GamesPaginatedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GamesPaginatedQuery, GamesPaginatedQueryVariables>(GamesPaginatedDocument, options);
      }
export function useGamesPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GamesPaginatedQuery, GamesPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GamesPaginatedQuery, GamesPaginatedQueryVariables>(GamesPaginatedDocument, options);
        }
export function useGamesPaginatedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GamesPaginatedQuery, GamesPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GamesPaginatedQuery, GamesPaginatedQueryVariables>(GamesPaginatedDocument, options);
        }
export type GamesPaginatedQueryHookResult = ReturnType<typeof useGamesPaginatedQuery>;
export type GamesPaginatedLazyQueryHookResult = ReturnType<typeof useGamesPaginatedLazyQuery>;
export type GamesPaginatedSuspenseQueryHookResult = ReturnType<typeof useGamesPaginatedSuspenseQuery>;
export type GamesPaginatedQueryResult = Apollo.QueryResult<GamesPaginatedQuery, GamesPaginatedQueryVariables>;
export const CreateGameDocument = gql`
    mutation createGame($data: CreateGameInput!, $uploads: [FileScalar!]) {
  createGame(data: $data, uploads: $uploads) {
    ...GameData
  }
}
    ${GameDataFragmentDoc}`;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      data: // value for 'data'
 *      uploads: // value for 'uploads'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const UpdateGameDocument = gql`
    mutation updateGame($id: String!, $data: UpdateGameInput!, $uploads: [FileScalar!]) {
  updateGame(id: $id, data: $data, uploads: $uploads) {
    ...GameData
  }
}
    ${GameDataFragmentDoc}`;
export type UpdateGameMutationFn = Apollo.MutationFunction<UpdateGameMutation, UpdateGameMutationVariables>;

/**
 * __useUpdateGameMutation__
 *
 * To run a mutation, you first call `useUpdateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGameMutation, { data, loading, error }] = useUpdateGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *      uploads: // value for 'uploads'
 *   },
 * });
 */
export function useUpdateGameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGameMutation, UpdateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGameMutation, UpdateGameMutationVariables>(UpdateGameDocument, options);
      }
export type UpdateGameMutationHookResult = ReturnType<typeof useUpdateGameMutation>;
export type UpdateGameMutationResult = Apollo.MutationResult<UpdateGameMutation>;
export type UpdateGameMutationOptions = Apollo.BaseMutationOptions<UpdateGameMutation, UpdateGameMutationVariables>;
export const SoftDeleteGameDocument = gql`
    mutation softDeleteGame($id: String!) {
  softDeleteGame(id: $id) {
    ...GameData
  }
}
    ${GameDataFragmentDoc}`;
export type SoftDeleteGameMutationFn = Apollo.MutationFunction<SoftDeleteGameMutation, SoftDeleteGameMutationVariables>;

/**
 * __useSoftDeleteGameMutation__
 *
 * To run a mutation, you first call `useSoftDeleteGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteGameMutation, { data, loading, error }] = useSoftDeleteGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteGameMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteGameMutation, SoftDeleteGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteGameMutation, SoftDeleteGameMutationVariables>(SoftDeleteGameDocument, options);
      }
export type SoftDeleteGameMutationHookResult = ReturnType<typeof useSoftDeleteGameMutation>;
export type SoftDeleteGameMutationResult = Apollo.MutationResult<SoftDeleteGameMutation>;
export type SoftDeleteGameMutationOptions = Apollo.BaseMutationOptions<SoftDeleteGameMutation, SoftDeleteGameMutationVariables>;
export const ImportGamesDocument = gql`
    mutation importGames($upload: FileScalar!) {
  importGames(upload: $upload)
}
    `;
export type ImportGamesMutationFn = Apollo.MutationFunction<ImportGamesMutation, ImportGamesMutationVariables>;

/**
 * __useImportGamesMutation__
 *
 * To run a mutation, you first call `useImportGamesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportGamesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importGamesMutation, { data, loading, error }] = useImportGamesMutation({
 *   variables: {
 *      upload: // value for 'upload'
 *   },
 * });
 */
export function useImportGamesMutation(baseOptions?: Apollo.MutationHookOptions<ImportGamesMutation, ImportGamesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportGamesMutation, ImportGamesMutationVariables>(ImportGamesDocument, options);
      }
export type ImportGamesMutationHookResult = ReturnType<typeof useImportGamesMutation>;
export type ImportGamesMutationResult = Apollo.MutationResult<ImportGamesMutation>;
export type ImportGamesMutationOptions = Apollo.BaseMutationOptions<ImportGamesMutation, ImportGamesMutationVariables>;
export const PickUpDaysDocument = gql`
    query pickUpDays {
  pickUpDays {
    ...PickUpDayData
  }
}
    ${PickUpDayDataFragmentDoc}`;

/**
 * __usePickUpDaysQuery__
 *
 * To run a query within a React component, call `usePickUpDaysQuery` and pass it any options that fit your needs.
 * When your component renders, `usePickUpDaysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePickUpDaysQuery({
 *   variables: {
 *   },
 * });
 */
export function usePickUpDaysQuery(baseOptions?: Apollo.QueryHookOptions<PickUpDaysQuery, PickUpDaysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PickUpDaysQuery, PickUpDaysQueryVariables>(PickUpDaysDocument, options);
      }
export function usePickUpDaysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PickUpDaysQuery, PickUpDaysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PickUpDaysQuery, PickUpDaysQueryVariables>(PickUpDaysDocument, options);
        }
export function usePickUpDaysSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PickUpDaysQuery, PickUpDaysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PickUpDaysQuery, PickUpDaysQueryVariables>(PickUpDaysDocument, options);
        }
export type PickUpDaysQueryHookResult = ReturnType<typeof usePickUpDaysQuery>;
export type PickUpDaysLazyQueryHookResult = ReturnType<typeof usePickUpDaysLazyQuery>;
export type PickUpDaysSuspenseQueryHookResult = ReturnType<typeof usePickUpDaysSuspenseQuery>;
export type PickUpDaysQueryResult = Apollo.QueryResult<PickUpDaysQuery, PickUpDaysQueryVariables>;
export const CreateUpdatePickUpDayDocument = gql`
    mutation createUpdatePickUpDay($data: [CreateUpdatePickUpDayInput!]!) {
  createUpdatePickUpDay(data: $data) {
    ...PickUpDayData
  }
}
    ${PickUpDayDataFragmentDoc}`;
export type CreateUpdatePickUpDayMutationFn = Apollo.MutationFunction<CreateUpdatePickUpDayMutation, CreateUpdatePickUpDayMutationVariables>;

/**
 * __useCreateUpdatePickUpDayMutation__
 *
 * To run a mutation, you first call `useCreateUpdatePickUpDayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUpdatePickUpDayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUpdatePickUpDayMutation, { data, loading, error }] = useCreateUpdatePickUpDayMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUpdatePickUpDayMutation(baseOptions?: Apollo.MutationHookOptions<CreateUpdatePickUpDayMutation, CreateUpdatePickUpDayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUpdatePickUpDayMutation, CreateUpdatePickUpDayMutationVariables>(CreateUpdatePickUpDayDocument, options);
      }
export type CreateUpdatePickUpDayMutationHookResult = ReturnType<typeof useCreateUpdatePickUpDayMutation>;
export type CreateUpdatePickUpDayMutationResult = Apollo.MutationResult<CreateUpdatePickUpDayMutation>;
export type CreateUpdatePickUpDayMutationOptions = Apollo.BaseMutationOptions<CreateUpdatePickUpDayMutation, CreateUpdatePickUpDayMutationVariables>;
export const RentalsPaginatedDocument = gql`
    query rentalsPaginated($offset: Int!, $limit: Int!, $includeAll: Boolean, $orderBy: [OrderInput!], $filterBy: [FilterInput!]) {
  rentalsPaginated(
    offset: $offset
    limit: $limit
    includeAll: $includeAll
    orderBy: $orderBy
    filterBy: $filterBy
  ) {
    nodes {
      ...RentalData
    }
    pageInfo {
      currentPage
      totalPages
      perPage
    }
    totalCount
  }
}
    ${RentalDataFragmentDoc}`;

/**
 * __useRentalsPaginatedQuery__
 *
 * To run a query within a React component, call `useRentalsPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useRentalsPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRentalsPaginatedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      includeAll: // value for 'includeAll'
 *      orderBy: // value for 'orderBy'
 *      filterBy: // value for 'filterBy'
 *   },
 * });
 */
export function useRentalsPaginatedQuery(baseOptions: Apollo.QueryHookOptions<RentalsPaginatedQuery, RentalsPaginatedQueryVariables> & ({ variables: RentalsPaginatedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RentalsPaginatedQuery, RentalsPaginatedQueryVariables>(RentalsPaginatedDocument, options);
      }
export function useRentalsPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RentalsPaginatedQuery, RentalsPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RentalsPaginatedQuery, RentalsPaginatedQueryVariables>(RentalsPaginatedDocument, options);
        }
export function useRentalsPaginatedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RentalsPaginatedQuery, RentalsPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RentalsPaginatedQuery, RentalsPaginatedQueryVariables>(RentalsPaginatedDocument, options);
        }
export type RentalsPaginatedQueryHookResult = ReturnType<typeof useRentalsPaginatedQuery>;
export type RentalsPaginatedLazyQueryHookResult = ReturnType<typeof useRentalsPaginatedLazyQuery>;
export type RentalsPaginatedSuspenseQueryHookResult = ReturnType<typeof useRentalsPaginatedSuspenseQuery>;
export type RentalsPaginatedQueryResult = Apollo.QueryResult<RentalsPaginatedQuery, RentalsPaginatedQueryVariables>;
export const CreateRentalsByReservationDocument = gql`
    mutation createRentalsByReservation($data: CreateRentalInput!) {
  createRentalsByReservation(data: $data) {
    ...RentalData
  }
}
    ${RentalDataFragmentDoc}`;
export type CreateRentalsByReservationMutationFn = Apollo.MutationFunction<CreateRentalsByReservationMutation, CreateRentalsByReservationMutationVariables>;

/**
 * __useCreateRentalsByReservationMutation__
 *
 * To run a mutation, you first call `useCreateRentalsByReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRentalsByReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRentalsByReservationMutation, { data, loading, error }] = useCreateRentalsByReservationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRentalsByReservationMutation(baseOptions?: Apollo.MutationHookOptions<CreateRentalsByReservationMutation, CreateRentalsByReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRentalsByReservationMutation, CreateRentalsByReservationMutationVariables>(CreateRentalsByReservationDocument, options);
      }
export type CreateRentalsByReservationMutationHookResult = ReturnType<typeof useCreateRentalsByReservationMutation>;
export type CreateRentalsByReservationMutationResult = Apollo.MutationResult<CreateRentalsByReservationMutation>;
export type CreateRentalsByReservationMutationOptions = Apollo.BaseMutationOptions<CreateRentalsByReservationMutation, CreateRentalsByReservationMutationVariables>;
export const UpdateRentalDocument = gql`
    mutation updateRental($id: String!, $data: UpdateRentalInput!) {
  updateRental(id: $id, data: $data) {
    ...RentalData
  }
}
    ${RentalDataFragmentDoc}`;
export type UpdateRentalMutationFn = Apollo.MutationFunction<UpdateRentalMutation, UpdateRentalMutationVariables>;

/**
 * __useUpdateRentalMutation__
 *
 * To run a mutation, you first call `useUpdateRentalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRentalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRentalMutation, { data, loading, error }] = useUpdateRentalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateRentalMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRentalMutation, UpdateRentalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRentalMutation, UpdateRentalMutationVariables>(UpdateRentalDocument, options);
      }
export type UpdateRentalMutationHookResult = ReturnType<typeof useUpdateRentalMutation>;
export type UpdateRentalMutationResult = Apollo.MutationResult<UpdateRentalMutation>;
export type UpdateRentalMutationOptions = Apollo.BaseMutationOptions<UpdateRentalMutation, UpdateRentalMutationVariables>;
export const ReturnRentalDocument = gql`
    mutation returnRental($id: String!) {
  returnRental(id: $id) {
    ...RentalData
  }
}
    ${RentalDataFragmentDoc}`;
export type ReturnRentalMutationFn = Apollo.MutationFunction<ReturnRentalMutation, ReturnRentalMutationVariables>;

/**
 * __useReturnRentalMutation__
 *
 * To run a mutation, you first call `useReturnRentalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReturnRentalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [returnRentalMutation, { data, loading, error }] = useReturnRentalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReturnRentalMutation(baseOptions?: Apollo.MutationHookOptions<ReturnRentalMutation, ReturnRentalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReturnRentalMutation, ReturnRentalMutationVariables>(ReturnRentalDocument, options);
      }
export type ReturnRentalMutationHookResult = ReturnType<typeof useReturnRentalMutation>;
export type ReturnRentalMutationResult = Apollo.MutationResult<ReturnRentalMutation>;
export type ReturnRentalMutationOptions = Apollo.BaseMutationOptions<ReturnRentalMutation, ReturnRentalMutationVariables>;
export const MyReservationsDocument = gql`
    query myReservations($status: [ReservationStatus!]) {
  myReservations(status: $status) {
    ...ReservationData
  }
}
    ${ReservationDataFragmentDoc}`;

/**
 * __useMyReservationsQuery__
 *
 * To run a query within a React component, call `useMyReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyReservationsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useMyReservationsQuery(baseOptions?: Apollo.QueryHookOptions<MyReservationsQuery, MyReservationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyReservationsQuery, MyReservationsQueryVariables>(MyReservationsDocument, options);
      }
export function useMyReservationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyReservationsQuery, MyReservationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyReservationsQuery, MyReservationsQueryVariables>(MyReservationsDocument, options);
        }
export function useMyReservationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyReservationsQuery, MyReservationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyReservationsQuery, MyReservationsQueryVariables>(MyReservationsDocument, options);
        }
export type MyReservationsQueryHookResult = ReturnType<typeof useMyReservationsQuery>;
export type MyReservationsLazyQueryHookResult = ReturnType<typeof useMyReservationsLazyQuery>;
export type MyReservationsSuspenseQueryHookResult = ReturnType<typeof useMyReservationsSuspenseQuery>;
export type MyReservationsQueryResult = Apollo.QueryResult<MyReservationsQuery, MyReservationsQueryVariables>;
export const ReservationsPaginatedDocument = gql`
    query reservationsPaginated($offset: Int!, $limit: Int!, $includeAll: Boolean, $orderBy: [OrderInput!], $filterBy: [FilterInput!]) {
  reservationsPaginated(
    offset: $offset
    limit: $limit
    includeAll: $includeAll
    orderBy: $orderBy
    filterBy: $filterBy
  ) {
    nodes {
      ...ReservationData
    }
    pageInfo {
      currentPage
      totalPages
      perPage
    }
    totalCount
  }
}
    ${ReservationDataFragmentDoc}`;

/**
 * __useReservationsPaginatedQuery__
 *
 * To run a query within a React component, call `useReservationsPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useReservationsPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReservationsPaginatedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      includeAll: // value for 'includeAll'
 *      orderBy: // value for 'orderBy'
 *      filterBy: // value for 'filterBy'
 *   },
 * });
 */
export function useReservationsPaginatedQuery(baseOptions: Apollo.QueryHookOptions<ReservationsPaginatedQuery, ReservationsPaginatedQueryVariables> & ({ variables: ReservationsPaginatedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReservationsPaginatedQuery, ReservationsPaginatedQueryVariables>(ReservationsPaginatedDocument, options);
      }
export function useReservationsPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReservationsPaginatedQuery, ReservationsPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReservationsPaginatedQuery, ReservationsPaginatedQueryVariables>(ReservationsPaginatedDocument, options);
        }
export function useReservationsPaginatedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReservationsPaginatedQuery, ReservationsPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReservationsPaginatedQuery, ReservationsPaginatedQueryVariables>(ReservationsPaginatedDocument, options);
        }
export type ReservationsPaginatedQueryHookResult = ReturnType<typeof useReservationsPaginatedQuery>;
export type ReservationsPaginatedLazyQueryHookResult = ReturnType<typeof useReservationsPaginatedLazyQuery>;
export type ReservationsPaginatedSuspenseQueryHookResult = ReturnType<typeof useReservationsPaginatedSuspenseQuery>;
export type ReservationsPaginatedQueryResult = Apollo.QueryResult<ReservationsPaginatedQuery, ReservationsPaginatedQueryVariables>;
export const CreateReservationDocument = gql`
    mutation createReservation($games: [CreateReservationInput!]!) {
  createReservation(games: $games) {
    ...ReservationData
  }
}
    ${ReservationDataFragmentDoc}`;
export type CreateReservationMutationFn = Apollo.MutationFunction<CreateReservationMutation, CreateReservationMutationVariables>;

/**
 * __useCreateReservationMutation__
 *
 * To run a mutation, you first call `useCreateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReservationMutation, { data, loading, error }] = useCreateReservationMutation({
 *   variables: {
 *      games: // value for 'games'
 *   },
 * });
 */
export function useCreateReservationMutation(baseOptions?: Apollo.MutationHookOptions<CreateReservationMutation, CreateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReservationMutation, CreateReservationMutationVariables>(CreateReservationDocument, options);
      }
export type CreateReservationMutationHookResult = ReturnType<typeof useCreateReservationMutation>;
export type CreateReservationMutationResult = Apollo.MutationResult<CreateReservationMutation>;
export type CreateReservationMutationOptions = Apollo.BaseMutationOptions<CreateReservationMutation, CreateReservationMutationVariables>;
export const UpdateReservationDocument = gql`
    mutation updateReservation($id: String!, $data: UpdateReservationInput!) {
  updateReservation(id: $id, data: $data) {
    ...ReservationData
  }
}
    ${ReservationDataFragmentDoc}`;
export type UpdateReservationMutationFn = Apollo.MutationFunction<UpdateReservationMutation, UpdateReservationMutationVariables>;

/**
 * __useUpdateReservationMutation__
 *
 * To run a mutation, you first call `useUpdateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReservationMutation, { data, loading, error }] = useUpdateReservationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateReservationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReservationMutation, UpdateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReservationMutation, UpdateReservationMutationVariables>(UpdateReservationDocument, options);
      }
export type UpdateReservationMutationHookResult = ReturnType<typeof useUpdateReservationMutation>;
export type UpdateReservationMutationResult = Apollo.MutationResult<UpdateReservationMutation>;
export type UpdateReservationMutationOptions = Apollo.BaseMutationOptions<UpdateReservationMutation, UpdateReservationMutationVariables>;
export const SetReservationPackedDocument = gql`
    mutation setReservationPacked($id: String!) {
  setReservationPacked(id: $id) {
    ...ReservationData
  }
}
    ${ReservationDataFragmentDoc}`;
export type SetReservationPackedMutationFn = Apollo.MutationFunction<SetReservationPackedMutation, SetReservationPackedMutationVariables>;

/**
 * __useSetReservationPackedMutation__
 *
 * To run a mutation, you first call `useSetReservationPackedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetReservationPackedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setReservationPackedMutation, { data, loading, error }] = useSetReservationPackedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetReservationPackedMutation(baseOptions?: Apollo.MutationHookOptions<SetReservationPackedMutation, SetReservationPackedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetReservationPackedMutation, SetReservationPackedMutationVariables>(SetReservationPackedDocument, options);
      }
export type SetReservationPackedMutationHookResult = ReturnType<typeof useSetReservationPackedMutation>;
export type SetReservationPackedMutationResult = Apollo.MutationResult<SetReservationPackedMutation>;
export type SetReservationPackedMutationOptions = Apollo.BaseMutationOptions<SetReservationPackedMutation, SetReservationPackedMutationVariables>;
export const CancelReservationDocument = gql`
    mutation cancelReservation($id: String!, $data: CancelReservationInput) {
  cancelReservation(id: $id, data: $data) {
    ...ReservationData
  }
}
    ${ReservationDataFragmentDoc}`;
export type CancelReservationMutationFn = Apollo.MutationFunction<CancelReservationMutation, CancelReservationMutationVariables>;

/**
 * __useCancelReservationMutation__
 *
 * To run a mutation, you first call `useCancelReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelReservationMutation, { data, loading, error }] = useCancelReservationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCancelReservationMutation(baseOptions?: Apollo.MutationHookOptions<CancelReservationMutation, CancelReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelReservationMutation, CancelReservationMutationVariables>(CancelReservationDocument, options);
      }
export type CancelReservationMutationHookResult = ReturnType<typeof useCancelReservationMutation>;
export type CancelReservationMutationResult = Apollo.MutationResult<CancelReservationMutation>;
export type CancelReservationMutationOptions = Apollo.BaseMutationOptions<CancelReservationMutation, CancelReservationMutationVariables>;
export const RolesDocument = gql`
    query Roles {
  roles {
    ...RoleData
  }
}
    ${RoleDataFragmentDoc}`;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
      }
export function useRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export function useRolesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesSuspenseQueryHookResult = ReturnType<typeof useRolesSuspenseQuery>;
export type RolesQueryResult = Apollo.QueryResult<RolesQuery, RolesQueryVariables>;
export const TagsDocument = gql`
    query Tags {
  tags {
    ...TagData
  }
}
    ${TagDataFragmentDoc}`;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export function useTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsSuspenseQueryHookResult = ReturnType<typeof useTagsSuspenseQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const TermDocument = gql`
    query term($key: TermsType!) {
  term(key: $key) {
    ...TermsData
  }
}
    ${TermsDataFragmentDoc}`;

/**
 * __useTermQuery__
 *
 * To run a query within a React component, call `useTermQuery` and pass it any options that fit your needs.
 * When your component renders, `useTermQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTermQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useTermQuery(baseOptions: Apollo.QueryHookOptions<TermQuery, TermQueryVariables> & ({ variables: TermQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TermQuery, TermQueryVariables>(TermDocument, options);
      }
export function useTermLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermQuery, TermQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TermQuery, TermQueryVariables>(TermDocument, options);
        }
export function useTermSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TermQuery, TermQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TermQuery, TermQueryVariables>(TermDocument, options);
        }
export type TermQueryHookResult = ReturnType<typeof useTermQuery>;
export type TermLazyQueryHookResult = ReturnType<typeof useTermLazyQuery>;
export type TermSuspenseQueryHookResult = ReturnType<typeof useTermSuspenseQuery>;
export type TermQueryResult = Apollo.QueryResult<TermQuery, TermQueryVariables>;
export const TermsDocument = gql`
    query terms {
  terms {
    ...TermsData
  }
}
    ${TermsDataFragmentDoc}`;

/**
 * __useTermsQuery__
 *
 * To run a query within a React component, call `useTermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTermsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTermsQuery(baseOptions?: Apollo.QueryHookOptions<TermsQuery, TermsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TermsQuery, TermsQueryVariables>(TermsDocument, options);
      }
export function useTermsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermsQuery, TermsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TermsQuery, TermsQueryVariables>(TermsDocument, options);
        }
export function useTermsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TermsQuery, TermsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TermsQuery, TermsQueryVariables>(TermsDocument, options);
        }
export type TermsQueryHookResult = ReturnType<typeof useTermsQuery>;
export type TermsLazyQueryHookResult = ReturnType<typeof useTermsLazyQuery>;
export type TermsSuspenseQueryHookResult = ReturnType<typeof useTermsSuspenseQuery>;
export type TermsQueryResult = Apollo.QueryResult<TermsQuery, TermsQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UsersPaginatedDocument = gql`
    query usersPaginated($offset: Int!, $limit: Int!, $orderBy: [OrderInput!], $filterBy: [FilterInput!]) {
  usersPaginated(
    offset: $offset
    limit: $limit
    orderBy: $orderBy
    filterBy: $filterBy
  ) {
    nodes {
      ...UserData
    }
    pageInfo {
      currentPage
      totalPages
      perPage
    }
    totalCount
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useUsersPaginatedQuery__
 *
 * To run a query within a React component, call `useUsersPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersPaginatedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *      filterBy: // value for 'filterBy'
 *   },
 * });
 */
export function useUsersPaginatedQuery(baseOptions: Apollo.QueryHookOptions<UsersPaginatedQuery, UsersPaginatedQueryVariables> & ({ variables: UsersPaginatedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersPaginatedQuery, UsersPaginatedQueryVariables>(UsersPaginatedDocument, options);
      }
export function useUsersPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersPaginatedQuery, UsersPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersPaginatedQuery, UsersPaginatedQueryVariables>(UsersPaginatedDocument, options);
        }
export function useUsersPaginatedSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersPaginatedQuery, UsersPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersPaginatedQuery, UsersPaginatedQueryVariables>(UsersPaginatedDocument, options);
        }
export type UsersPaginatedQueryHookResult = ReturnType<typeof useUsersPaginatedQuery>;
export type UsersPaginatedLazyQueryHookResult = ReturnType<typeof useUsersPaginatedLazyQuery>;
export type UsersPaginatedSuspenseQueryHookResult = ReturnType<typeof useUsersPaginatedSuspenseQuery>;
export type UsersPaginatedQueryResult = Apollo.QueryResult<UsersPaginatedQuery, UsersPaginatedQueryVariables>;
export const AcceptTermsDocument = gql`
    mutation acceptTerms($terms: [TermsType!]!) {
  acceptTerms(terms: $terms)
}
    `;
export type AcceptTermsMutationFn = Apollo.MutationFunction<AcceptTermsMutation, AcceptTermsMutationVariables>;

/**
 * __useAcceptTermsMutation__
 *
 * To run a mutation, you first call `useAcceptTermsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptTermsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptTermsMutation, { data, loading, error }] = useAcceptTermsMutation({
 *   variables: {
 *      terms: // value for 'terms'
 *   },
 * });
 */
export function useAcceptTermsMutation(baseOptions?: Apollo.MutationHookOptions<AcceptTermsMutation, AcceptTermsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptTermsMutation, AcceptTermsMutationVariables>(AcceptTermsDocument, options);
      }
export type AcceptTermsMutationHookResult = ReturnType<typeof useAcceptTermsMutation>;
export type AcceptTermsMutationResult = Apollo.MutationResult<AcceptTermsMutation>;
export type AcceptTermsMutationOptions = Apollo.BaseMutationOptions<AcceptTermsMutation, AcceptTermsMutationVariables>;
export const SendDoubleOptInMailDocument = gql`
    mutation sendDoubleOptInMail($email: String!) {
  sendDoubleOptInMail(email: $email)
}
    `;
export type SendDoubleOptInMailMutationFn = Apollo.MutationFunction<SendDoubleOptInMailMutation, SendDoubleOptInMailMutationVariables>;

/**
 * __useSendDoubleOptInMailMutation__
 *
 * To run a mutation, you first call `useSendDoubleOptInMailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendDoubleOptInMailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendDoubleOptInMailMutation, { data, loading, error }] = useSendDoubleOptInMailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendDoubleOptInMailMutation(baseOptions?: Apollo.MutationHookOptions<SendDoubleOptInMailMutation, SendDoubleOptInMailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendDoubleOptInMailMutation, SendDoubleOptInMailMutationVariables>(SendDoubleOptInMailDocument, options);
      }
export type SendDoubleOptInMailMutationHookResult = ReturnType<typeof useSendDoubleOptInMailMutation>;
export type SendDoubleOptInMailMutationResult = Apollo.MutationResult<SendDoubleOptInMailMutation>;
export type SendDoubleOptInMailMutationOptions = Apollo.BaseMutationOptions<SendDoubleOptInMailMutation, SendDoubleOptInMailMutationVariables>;
export const UpdateMeDocument = gql`
    mutation updateMe($data: UpdateMeInput!) {
  updateMe(data: $data) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const SendDoubleOptInMailToMeDocument = gql`
    mutation sendDoubleOptInMailToMe {
  sendDoubleOptInMailToMe
}
    `;
export type SendDoubleOptInMailToMeMutationFn = Apollo.MutationFunction<SendDoubleOptInMailToMeMutation, SendDoubleOptInMailToMeMutationVariables>;

/**
 * __useSendDoubleOptInMailToMeMutation__
 *
 * To run a mutation, you first call `useSendDoubleOptInMailToMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendDoubleOptInMailToMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendDoubleOptInMailToMeMutation, { data, loading, error }] = useSendDoubleOptInMailToMeMutation({
 *   variables: {
 *   },
 * });
 */
export function useSendDoubleOptInMailToMeMutation(baseOptions?: Apollo.MutationHookOptions<SendDoubleOptInMailToMeMutation, SendDoubleOptInMailToMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendDoubleOptInMailToMeMutation, SendDoubleOptInMailToMeMutationVariables>(SendDoubleOptInMailToMeDocument, options);
      }
export type SendDoubleOptInMailToMeMutationHookResult = ReturnType<typeof useSendDoubleOptInMailToMeMutation>;
export type SendDoubleOptInMailToMeMutationResult = Apollo.MutationResult<SendDoubleOptInMailToMeMutation>;
export type SendDoubleOptInMailToMeMutationOptions = Apollo.BaseMutationOptions<SendDoubleOptInMailToMeMutation, SendDoubleOptInMailToMeMutationVariables>;
export const SendDoubleOptInNewMailToMeDocument = gql`
    mutation sendDoubleOptInNewMailToMe {
  sendDoubleOptInNewMailToMe
}
    `;
export type SendDoubleOptInNewMailToMeMutationFn = Apollo.MutationFunction<SendDoubleOptInNewMailToMeMutation, SendDoubleOptInNewMailToMeMutationVariables>;

/**
 * __useSendDoubleOptInNewMailToMeMutation__
 *
 * To run a mutation, you first call `useSendDoubleOptInNewMailToMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendDoubleOptInNewMailToMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendDoubleOptInNewMailToMeMutation, { data, loading, error }] = useSendDoubleOptInNewMailToMeMutation({
 *   variables: {
 *   },
 * });
 */
export function useSendDoubleOptInNewMailToMeMutation(baseOptions?: Apollo.MutationHookOptions<SendDoubleOptInNewMailToMeMutation, SendDoubleOptInNewMailToMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendDoubleOptInNewMailToMeMutation, SendDoubleOptInNewMailToMeMutationVariables>(SendDoubleOptInNewMailToMeDocument, options);
      }
export type SendDoubleOptInNewMailToMeMutationHookResult = ReturnType<typeof useSendDoubleOptInNewMailToMeMutation>;
export type SendDoubleOptInNewMailToMeMutationResult = Apollo.MutationResult<SendDoubleOptInNewMailToMeMutation>;
export type SendDoubleOptInNewMailToMeMutationOptions = Apollo.BaseMutationOptions<SendDoubleOptInNewMailToMeMutation, SendDoubleOptInNewMailToMeMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($data: CreateUserInput!) {
  createUser(data: $data) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($id: String!, $data: UpdateUserInput!) {
  updateUser(id: $id, data: $data) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const SoftDeleteUserDocument = gql`
    mutation softDeleteUser($id: String!) {
  softDeleteUser(id: $id) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export type SoftDeleteUserMutationFn = Apollo.MutationFunction<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>;

/**
 * __useSoftDeleteUserMutation__
 *
 * To run a mutation, you first call `useSoftDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteUserMutation, { data, loading, error }] = useSoftDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>(SoftDeleteUserDocument, options);
      }
export type SoftDeleteUserMutationHookResult = ReturnType<typeof useSoftDeleteUserMutation>;
export type SoftDeleteUserMutationResult = Apollo.MutationResult<SoftDeleteUserMutation>;
export type SoftDeleteUserMutationOptions = Apollo.BaseMutationOptions<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    