---
title: "Subscribe form error body: err.response.json() to err.data on a 400, ky 2 reads the error body before it throws"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`packages/applet-subscribe/src/component.tsx:64-65` at `fce357d`: on a 400, `const response = await err.response.json()`, `ky` 0.31 leaving the error body unread.

## Current

`app/subscribe/SubscribeForm.tsx:66`: `const response: unknown = err.data`. `ky` 2.1.0 reads the error body into the error's `data` before it throws and says `err.response.json()` will not work on the consumed body (`node_modules/ky/distribution/errors/HTTPError.js`, its doc comment); with legacy's line kept, the read threw out of the catch, so a 400 set no field error and showed no toast. Read on `pnpm dev` with the handler probed to answer a 400 naming `name` and a form error: `Taken` under the name field, the toast reading `Nope`. The handler reads `error.data` the same way for Buttondown's `code` (`app/api/subscribe/route.ts`, `readErrorCode`).

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9) as a code translation ky 2 forced, found by the Spec review and read on pnpm dev; an agent sanctions nothing, so the operator reads it on the subscribe verdicts plan 91b42a34a79f.
