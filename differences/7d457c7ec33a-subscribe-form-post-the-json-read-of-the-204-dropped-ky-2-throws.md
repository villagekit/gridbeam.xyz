---
title: "Subscribe form post: the .json() read of the 204 dropped, ky 2 throws on an empty body"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`packages/applet-subscribe/src/component.tsx:56-60` at `fce357d`: `await ky.post(subscribeApiPath, { json: requestData }).json()`, `ky` 0.31, whose `.json()` returned an empty string on a 204.

## Current

`app/subscribe/SubscribeForm.tsx:56-58`: `await ky.post(subscribeApiPath, { json: requestData })`, the response not read. `ky` 2.1.0's `.json()` throws on an empty body (`node_modules/ky/readme.md`, the `.json()` note), so with the call kept the route's 204 landed in the catch and showed the error toast, read on `pnpm dev` with the handler probed to answer 204.

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9) as a code translation the toolchain or a dependency's major forced, the mechanism cited in Current; an agent sanctions nothing, so the operator reads it on the subscribe verdicts plan 91b42a34a79f.
