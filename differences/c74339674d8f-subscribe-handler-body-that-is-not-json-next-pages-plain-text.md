---
title: "Subscribe handler body that is not JSON: Next pages plain-text Invalid JSON 400 to a 400 with empty fieldErrors and formErrors"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

Next 14's pages API (`next/dist/server/api-utils`, the body parser): a POST whose body is not JSON answers 400 with the plain text `Invalid JSON` before `packages/applet-subscribe/src/api.ts:28` at `fce357d` runs.

## Current

`app/api/subscribe/route.ts:17-22`: `request.json()` in a try, a body that is not JSON answering 400 with `{ fieldErrors: {}, formErrors: [] }`, the shape the form's 400 branch reads, so it shows its fallback toast; the app router parses no body itself.

## Verdict

## Log

- 2026-09-28: Filed open by the Parity review of the subscribe re-port (plan 244b962caae9) as a translation of the handler no rule of 2032533f covers, the mechanism cited in Current; on the subscribe verdicts plan 91b42a34a79f with the handler's other items.
