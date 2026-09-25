---
title: "Open Graph video alt: made from Grid Kit to made from grid beam"
status: open
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:63`: `alt: 'Assembly of a coffee table made from Grid Kit'`, rendered as `og:video:alt`.

## Current

`app/_lib/open-graph.ts`: `alt: 'Assembly of a coffee table made from grid beam'`, rendered as `og:video:alt` on every route.

## Verdict

## Log

- 2026-09-25: Filed by plan ffe8e5d5 at its Parity review: the plan applied rule 1 literally to the alt, as the shell record's split called it, and no verdict quotes the string, so it waits for the operator. Split out of [[aa71d706e02b]], whose code difference (the video removed) the plan fixed.

- 2026-09-26: Handed to the operator on the attended verdicts plan [[77cf83a1285a]] at the finish of the shell record [[a78b167170b8]] (decision 40abdb2f222a); the state stays until the operator judges it.
