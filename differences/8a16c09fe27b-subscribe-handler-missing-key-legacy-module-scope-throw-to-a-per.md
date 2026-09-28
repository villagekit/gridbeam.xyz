---
title: "Subscribe handler missing key: legacy module-scope throw to a per-request 500 with an error line, so the build and the page ship without the key"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/api/subscribe.ts:3-7` at `fce357d`: `process.env.BUTTONDOWN_API_KEY` read at module scope, `throw new Error('BUTTONDOWN_API_KEY is undefined')` without it, so the route answered 500 on every request and the build carried the throw.

## Current

`app/api/subscribe/route.ts:31-36`: the key read inside `POST`, per request, after the body is validated; unset, `console.error({ route }, 'BUTTONDOWN_API_KEY is unset')` and a 500 with no body. `next build` evaluates route modules, so a module-scope throw fails the gate and CI without the key, and CLAUDE.md, Secrets, asks the page to degrade with the key unset: the page renders, the form validates, a submit shows the error toast, legacy's outcome for a missing key without legacy's throw. Read on `pnpm dev` (`.env.local`) and on `pnpm preview` (`.dev.vars`), where `nodejs_compat` at the pinned `compatibility_date` populates `process.env` from the bindings.

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9) as a translation of the handler no rule of 2032533f covers, the alternative named in Current for the operator; on the subscribe verdicts plan 91b42a34a79f. The key slice cc17a04d9cd7 reads the live API's answer where the item names one.

- 2026-09-28: The key is read after the body is validated (plan 244b962caae9), so without a key a bad body answers 400 where legacy's module-scope throw answered 500 to every request; the Done when of the re-port asks for that order, and the Spec review asked that this item say so.
