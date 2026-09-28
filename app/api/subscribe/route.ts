// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-subscribe/src/api.ts
// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/api/subscribe.ts
import ky, { HTTPError } from 'ky'

import { subscriptionRequestSchema } from '@/app/subscribe/schema'
import type { ButtondownSubscriptionRequestData } from '@/app/subscribe/types'

const route = '/api/subscribe'

/**
 * Subscribes the form's reader to the newsletter: 400 with zod's flattened `fieldErrors` and
 * `formErrors` for a body the request schema rejects, 204 once Buttondown has the subscriber, 500
 * when Buttondown refuses or the key is unset. The router itself answers 405 to any method this
 * file does not export, legacy's first branch. Neither the key nor the address is ever logged.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ fieldErrors: {}, formErrors: [] }, { status: 400 })
  }

  const schemaResult = await subscriptionRequestSchema.safeParseAsync(body)
  if (!schemaResult.success) {
    const { fieldErrors, formErrors } = schemaResult.error.flatten()
    return Response.json({ fieldErrors, formErrors }, { status: 400 })
  }

  // Read per request, where legacy read it at module scope and threw: `next build` evaluates
  // this module, and the page ships without the key (CLAUDE.md, Secrets). On the Worker,
  // `nodejs_compat` populates `process.env` from the bindings.
  const buttondownApiKey = process.env.BUTTONDOWN_API_KEY
  if (!buttondownApiKey) {
    console.error({ route }, 'BUTTONDOWN_API_KEY is unset')
    return new Response(null, { status: 500 })
  }

  const { email, name, location, referral, whyInterested, feedback, subscriptionTag } =
    schemaResult.data

  const buttondownSubscriptionRequestData: ButtondownSubscriptionRequestData = {
    email_address: email,
    metadata: {
      name,
      location,
      referral,
      why_interested: whyInterested,
      feedback,
    },
    tags: [subscriptionTag],
  }

  // ky 2 resolves `input` against `baseUrl` as a URL does, so the trailing slash keeps `/v1`.
  const buttondown = ky.extend({
    headers: {
      Authorization: `Token ${buttondownApiKey}`,
    },
    baseUrl: 'https://api.buttondown.com/v1/',
  })

  try {
    await buttondown.post('subscribers', {
      json: buttondownSubscriptionRequestData,
    })
    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof HTTPError) {
      const code = readErrorCode(error.data)
      console.error(
        { route, status: error.response.status, code },
        'buttondown rejected the subscriber',
      )
    } else {
      const message = error instanceof Error ? error.message : String(error)
      console.error({ route, error: message }, 'buttondown request failed')
    }
    return new Response(null, { status: 500 })
  }
}

// Buttondown's error body, which ky 2 parses into the error's `data` before it throws, carries a
// `code` and a `detail`; the detail can echo the address, so only the code is read.
function readErrorCode(data: unknown): string | undefined {
  if (data instanceof Object && 'code' in data && typeof data.code === 'string') {
    return data.code
  }
  return undefined
}
