---
title: "Subscribe handler HTTP client: got on Node http to ky on fetch, the form client, since the handler runs on Cloudflare Workers"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`packages/applet-subscribe/src/api.ts:1,14-20` at `fce357d`: `got.extend({ headers: { Authorization: ... }, prefixUrl: 'https://api.buttondown.email/v1', responseType: 'json' })`, `got` 12 on Node's `http`, and `:56-58` `buttondownGot.post('subscribers', { json })`.

## Current

`app/api/subscribe/route.ts:56-61`: `ky.extend({ headers: { Authorization: ... }, baseUrl: 'https://api.buttondown.com/v1/' })` and `:64` `buttondown.post('subscribers', { json })`, `ky` 2.1.0 on `fetch`, the client the form already uses (`app/subscribe/SubscribeForm.tsx:6`). The site runs on Cloudflare Workers (decision `91cbeac8`), where `got` does not run, so one HTTP client on both sides; the alternative is bare `fetch` with no library. `ky` 2 names the option `baseUrl` where `ky` 0.31 and `got` named it `prefixUrl`, resolved as a URL, so the trailing slash keeps `/v1`.

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9) as a translation of the handler no rule of 2032533f covers, the alternative named in Current for the operator; on the subscribe verdicts plan 91b42a34a79f. The key slice cc17a04d9cd7 reads the live API's answer where the item names one.

- 2026-09-28: The handler's catch reads Buttondown's error `code` from `error.data`, which ky 2 fills before it throws, in place of a read of the consumed response body (plan 244b962caae9, the Spec review's finding); the form's counterpart is its own item on this route.
