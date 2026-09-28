// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-subscribe/src/schema.ts
import z from 'zod'

/**
 * The newsletter each Village Kit site subscribes its readers to; the tag Buttondown files them
 * under. Legacy's `enum`, as a `const` object because `tsconfig.json` sets `erasableSyntaxOnly`.
 */
export const SubscriptionTag = {
  gridkit: 'Grid Kit',
  villagekit: 'Village Kit',
  gridbeam: 'Grid Beam',
} as const
/** One of the three tags' values. */
export type SubscriptionTag = (typeof SubscriptionTag)[keyof typeof SubscriptionTag]

/** What the subscribe form collects: an email and a preferred name, the rest optional and defaulting to empty. */
export const subscriptionFormSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim(),
  location: z.string().trim().default(''),
  referral: z.string().trim().default(''),
  whyInterested: z.string().trim().default(''),
  feedback: z.string().trim().default(''),
})

/** The body the form posts to the API route: the form's fields and the site's subscription tag. */
export const subscriptionRequestSchema = subscriptionFormSchema.extend({
  subscriptionTag: z.nativeEnum(SubscriptionTag),
})
