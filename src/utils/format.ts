import { WEEKDAYS_ORDERERD } from '../shared/constants/days'
import { PickUpDayDataFragment, WeekDay } from '../typings/graphql'

export const convertBytesToHumanReadable = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())

  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
}

export const dateToHumanReadable = (date: Date, {
  lang = 'en',
  withTime = false
} = {}) => {
  const dateItem = new Date(date)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }

  if (withTime) {
    options.hour = 'numeric'
    options.minute = 'numeric'
  }

  return dateItem.toLocaleDateString(lang, options)
}

export const convertMinutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return {
    hours,
    minutes: remainingMinutes
  }
}

export const constFormatUrl = (url: string) => {
  return url.indexOf('://') === -1 ? `https://${url}` : url
}

export const toCamelCase = (str: string) => {
  const charactersToReplace = /[-_]+(.)?/g

  return str.toLowerCase().replace(charactersToReplace, (_, character) =>
    character ? character.toUpperCase() : ''
  )
}

export const convertToSeconds = (time: string): number => {
  const units = time.slice(-1)
  const value = parseInt(time.slice(0, -1))

  switch (units) {
    case 'm':
      return value * 60
    case 'w':
      return value * 60 * 60 * 24 * 7
    case 'h':
      return value * 60 * 60
    case 'd':
      return value * 24 * 60 * 60
    default:
      throw new Error('Invalid time format')
  }
}

export const formatPickUpDays = (days: PickUpDayDataFragment[]): {
  dayOfWeek: WeekDay
  pickUpTimes: string[]
}[] => {
  const orderedDays = [...days].sort((a, b) => WEEKDAYS_ORDERERD.indexOf(a.dayOfWeek) - WEEKDAYS_ORDERERD.indexOf(b.dayOfWeek))

  return orderedDays.map((day) => {
    const mappedTimes = day.pickUpTimes.map((time) => `${time.from}—${time.to}`)

    return {
      dayOfWeek: day.dayOfWeek,
      pickUpTimes: mappedTimes
    }
  })
}
