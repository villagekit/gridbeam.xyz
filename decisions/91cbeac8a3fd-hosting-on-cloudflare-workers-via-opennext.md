---
title: Hosting on Cloudflare Workers via OpenNext
status: accepted
date: 2026-09-12
---
## Context

Carried forward from CLAUDE.md ("Tech stack", Hosting), where the operator recorded the call, so the ledger can cite a decision for it (the sanctioned-deviations decision, rule 5, names a decision or a verdict as the record).

## Decision

The site is hosted on Cloudflare Workers through `@opennextjs/cloudflare`. Static export is not an option: server components, dynamic routes and future API handlers need a runtime. The legacy site's Vercel deploy and its Sentry wrapper are not carried over.

## Consequences

`next.config.ts` carries the OpenNext dev hook (`initOpenNextCloudflareForDev`), `wrangler.jsonc` and the `preview` and `deploy` scripts build the Worker; `pnpm deploy` is the operator's. Differences that follow from the hosting change cite this decision under rule 5.
