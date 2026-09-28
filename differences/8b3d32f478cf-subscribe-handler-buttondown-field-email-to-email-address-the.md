---
title: "Subscribe handler Buttondown field: email to email_address, the field the subscribers create endpoint takes today"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`packages/applet-subscribe/src/types.ts:15` at `fce357d`: `ButtondownSubscriptionRequestData.email`, and `api.ts:43-44` posts `{ email, metadata, tags }` to Buttondown.

## Current

`app/subscribe/types.ts:20` `email_address` and `app/api/subscribe/route.ts:43` `email_address: email`. Buttondown's subscribers create endpoint takes `email_address` today (docs.buttondown.com, `api-subscribers-create`, read 2026-09-28, the page naming `email_address` and no `email`). The alternative is legacy's `email`, if the live API still accepts it, which the key slice `cc17a04d9cd7` reads.

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9) as a translation of the handler no rule of 2032533f covers, the alternative named in Current for the operator; on the subscribe verdicts plan 91b42a34a79f. The key slice cc17a04d9cd7 reads the live API's answer where the item names one.
