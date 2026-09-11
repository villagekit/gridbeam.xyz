---
title: "next.config: OpenNext Cloudflare dev hook added"
status: sanctioned
route: shell
axis: code
kind: added
---
## Legacy

`apps/gridkit/next.config.mjs:69-91`: the config is exported through `withSentryConfig(...)` for the Vercel deploy (the Sentry half has its own sanctioned item); no hosting adapter.

## Current

`next.config.ts:2,33-35`: `import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'` and `initOpenNextCloudflareForDev()` after the export, so `getCloudflareContext()` resolves under `next dev`; `wrangler.jsonc` and the `preview`/`deploy` scripts in `package.json` build the Worker.

## Verdict

rule: operator (CLAUDE.md, Tech stack: hosting on Cloudflare Workers via @opennextjs/cloudflare)

## Log

- 2026-09-12: Rule 5's record for this sanction is decision [[91cbeac8a3fd]] (the hosting call, carried forward from CLAUDE.md).
