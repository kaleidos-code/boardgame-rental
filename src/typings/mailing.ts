import { Resource } from 'i18next'

import { GameUnitWithTitle } from './game'
import { PickUpDayDataFragment } from './graphql'
import { RentalWithGame } from './rental'

export type MailingTemplateComponentProps<T extends MailingTemplates> = {
  i18nResources: Resource
  locale?: string
  templateProps?: MailingTemplateProps[T]
}

// eslint-disable-next-line no-undef
export type MailingTemplateComponent<T extends MailingTemplates> = (props: MailingTemplateComponentProps<T>) => JSX.Element;

export enum MailingTemplates {
  DOUBLE_OPT_IN = 'doubleOptIn',
  RESET_PASSWORD = 'resetPassword',
  EMAIL_CHANGED = 'emailChanged',
  RESERVATION_CONFIRMATION = 'reservationConfirmation',
  RENTAL_CONFIRMATION = 'rentalConfirmation',
  RESERVATION_CANCELLED = 'reservationCancelled',
  RENTAL_OVERDUE = 'rentalOverdue',
  RENTAL_RETURNED = 'rentalReturned',
  RESERVATION_PICK_UP_CONFIRMATION = 'reservationPickUpConfirmation'
}

export type MailingTemplateProps = {
  [MailingTemplates.DOUBLE_OPT_IN]: {
    href: string
    name: string
    expiresAt: Date
  },
  [MailingTemplates.RESET_PASSWORD]: {
    href: string
    name: string
    expiresAt: Date
  },
  [MailingTemplates.EMAIL_CHANGED]: {
    href: string
    name: string
    expiresAt: Date
  },
  [MailingTemplates.RESERVATION_CONFIRMATION]: {
    reservationCode: string
    name: string
    gameUnits: GameUnitWithTitle[]
  },
  [MailingTemplates.RESERVATION_PICK_UP_CONFIRMATION]: {
    reservationCode: string
    name: string
    pickUpDays: PickUpDayDataFragment[]
  },
  [MailingTemplates.RESERVATION_CANCELLED]: {
    name: string
    reason: string
    own: boolean
    reservationCode: string
  },
  [MailingTemplates.RENTAL_CONFIRMATION]: {
    reservationCode: string
    name: string
    dueDate: Date
    pickUpDays: PickUpDayDataFragment[]
    gameUnits: GameUnitWithTitle[]
  },
  [MailingTemplates.RENTAL_OVERDUE]: {
    name: string
    rentals: RentalWithGame[]
  },
  [MailingTemplates.RENTAL_RETURNED]: {
    name: string
    rental: RentalWithGame
  }
};
