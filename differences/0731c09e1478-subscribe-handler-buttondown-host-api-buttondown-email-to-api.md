---
title: "Subscribe handler Buttondown host: api.buttondown.email to api.buttondown.com, the host the docs give today"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`packages/applet-subscribe/src/api.ts:18` at `fce357d`: `prefixUrl: 'https://api.buttondown.email/v1'`.

## Current

`app/api/subscribe/route.ts:60`: `baseUrl: 'https://api.buttondown.com/v1/'`, the host Buttondown's docs give today (docs.buttondown.com, `api-subscribers-create`, read 2026-09-28). A redirect from the old host would turn the POST into a GET under `fetch`, so the current host is the default; the key slice `cc17a04d9cd7` reads which host answers. The alternative is legacy's host.

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9) as a translation of the handler no rule of 2032533f covers, the alternative named in Current for the operator; on the subscribe verdicts plan 91b42a34a79f. The key slice cc17a04d9cd7 reads the live API's answer where the item names one.
