// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-subscribe/src/types.ts
import type { z } from 'zod'

import {
  SubscriptionTag,
  type subscriptionFormSchema,
  type subscriptionRequestSchema,
} from './schema'

export { SubscriptionTag }

/**
 * The form's values before the schema fills the defaults, the type `useForm` registers its fields
 * as; `@hookform/resolvers` 5 types the resolver by the schema's input and output apart.
 */
export type SubscriptionFormInput = z.input<typeof subscriptionFormSchema>
/** The form's values once the schema has trimmed them and filled the defaults. */
export type SubscriptionFormData = z.infer<typeof subscriptionFormSchema>
/** The body the form posts: the form's values and the site's subscription tag. */
export type SubscriptionRequestData = z.infer<typeof subscriptionRequestSchema>

/** The subscriber Buttondown's create endpoint takes: the address, the form's answers as metadata and the tag. */
export interface ButtondownSubscriptionRequestData {
  email_address: SubscriptionRequestData['email']
  metadata: {
    name: SubscriptionRequestData['name']
    location: SubscriptionRequestData['location']
    referral: SubscriptionRequestData['referral']
    why_interested: SubscriptionRequestData['whyInterested']
    feedback: SubscriptionRequestData['feedback']
  }
  tags: Array<SubscriptionTag>
}

/** One validation message. */
export type ErrorMessage = string
/** The messages of one field or of the whole form. */
export type ErrorMessages = Array<string>
/** The messages by form field, only the fields that failed. */
export type SubscriptionResponseErrorsByKey = Partial<
  Record<keyof SubscriptionFormData, ErrorMessages>
>

/** The 400 body of the API route: zod's flattened errors, by form field and for the whole form. */
export type SubscriptionResponseError = {
  formErrors: ErrorMessages
  fieldErrors: SubscriptionResponseErrorsByKey
}

/** Whether a response body is the API route's 400 body, so the form can put each error on its field. */
export function isSubscriptionResponseError(response: any): response is SubscriptionResponseError {
  return (
    response instanceof Object &&
    Object.prototype.hasOwnProperty.call(response, 'formErrors') &&
    Object.prototype.hasOwnProperty.call(response, 'fieldErrors')
  )
}

/** What the API route answers with: nothing on a 204, the errors on a 400. */
export type SubscriptionResponseData = undefined | SubscriptionResponseError
