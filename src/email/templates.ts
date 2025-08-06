import { MailingTemplates, MailingTemplateComponent } from '../typings/mailing'

import DoubleOptIn from './templates/DoubleOptIn'
import NewMailOptIn from './templates/NewMailOptIn'
import RentalConfirmation from './templates/RentalConfirmation'
import RentalOverdue from './templates/RentalOverdue'
import RentalReturned from './templates/RentalReturned'
import ReservationCanceled from './templates/ReservationCanceled'
import ReservationConfirmation from './templates/ReservationConfirmation'
import ReservationPickUpConfirmation from './templates/ReservationPickUpConfirmation'
import ResetPassword from './templates/ResetPassword'

// Define a specific type for each template component
type SpecificMailingTemplateComponent<T extends MailingTemplates> = MailingTemplateComponent<T>;

export const MAILING_TEMPLATES: Record<MailingTemplates, SpecificMailingTemplateComponent<any>> = {
  [MailingTemplates.DOUBLE_OPT_IN]: DoubleOptIn,
  [MailingTemplates.RESET_PASSWORD]: ResetPassword,
  [MailingTemplates.EMAIL_CHANGED]: NewMailOptIn,
  [MailingTemplates.RESERVATION_CONFIRMATION]: ReservationConfirmation,
  [MailingTemplates.RESERVATION_CANCELLED]: ReservationCanceled,
  [MailingTemplates.RENTAL_CONFIRMATION]: RentalConfirmation,
  [MailingTemplates.RENTAL_OVERDUE]: RentalOverdue,
  [MailingTemplates.RENTAL_RETURNED]: RentalReturned,
  [MailingTemplates.RESERVATION_PICK_UP_CONFIRMATION]: ReservationPickUpConfirmation

}
