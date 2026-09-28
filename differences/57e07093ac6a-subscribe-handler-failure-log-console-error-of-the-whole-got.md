---
title: "Subscribe handler failure log: console.error of the whole got error to structured fields with the status and Buttondown code"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`packages/applet-subscribe/src/api.ts:60-62` at `fce357d`: `console.error(error)` on any Buttondown failure, the whole `got` error, response body included.

## Current

`app/api/subscribe/route.ts:68-78`: `console.error({ route, status, code }, 'buttondown rejected the subscriber')` on an HTTP error, `code` read from Buttondown's error body and never the body itself, and `console.error({ route, error: message }, 'buttondown request failed')` otherwise: CLAUDE.md, Tracing (structured fields) and Secrets (Buttondown's body can echo the address, never logged).

## Verdict

## Log

- 2026-09-28: Filed open by the Parity review of the subscribe re-port (plan 244b962caae9) as a translation of the handler no rule of 2032533f covers, the mechanism cited in Current; on the subscribe verdicts plan 91b42a34a79f with the handler's other items.
