export type AppConfig = {
  rentingPeriod: string
  maxGamesPerRenting: number
  maxReservationsPerUser: number
  maxGamesTotal: number
  pickUpPeriod: string
  pickUpDays: {
    day: number
    minHour: number
    maxHour: number
  }[]
}

export const appConfig: AppConfig = {
  rentingPeriod: '30d',
  maxReservationsPerUser: 3,
  maxGamesPerRenting: 5,
  maxGamesTotal: 10,
  pickUpPeriod: '2w',
  pickUpDays: [{
    day: 5,
    minHour: 13,
    maxHour: 15
  }]
}
