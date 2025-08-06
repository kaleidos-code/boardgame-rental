import { CreateUpdatePickUpDayInput, WeekDay } from '@typings/graphql'

export type SettingsFormProps = {
  active: boolean
  onSuccess: (message: string) => void
  onError: (error: any) => void
}

export type SettingsFormRefHandler = {
  resetForm: () => void
  closeWithCallback: (callback: () => void) => void
}

export type SettingsEditForm = {
  days: {
    dayOfWeek: WeekDay,
    enabled: boolean,
    pickUpTimes: CreateUpdatePickUpDayInput['pickUpTimes']
  }[]
}

export type SettingsTransformedInput = (values: SettingsEditForm) => CreateUpdatePickUpDayInput[]
