---
title: Document head metadata streamed into the body for browsers
status: open
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:46-87`: `DefaultSeo` and `Head` render the title, the meta tags and the links inside `<head>` on every request.

## Current

Next 15.5 streams the metadata of `app/layout.tsx` and each route's `metadata` export after the shell for a user agent it does not treat as a bot: on a plain `curl` of `/about` the `<title>` sits after `</head>`, inside `<body>`. For a bot user agent (`Twitterbot/1.0`) the tags render in `<head>`, as legacy's did.

## Verdict

## Log

- 2026-09-25: Filed by plan ffe8e5d5 at its Parity review. Behavior of the framework from before the plan, not changed by it; `htmlLimitedBots` in `next.config.ts` is the setting that governs it. For the operator to judge.

- 2026-09-26: Handed to the operator on the attended verdicts plan [[77cf83a1285a]] at the finish of the shell record [[a78b167170b8]] (decision 40abdb2f222a); the state stays until the operator judges it.
