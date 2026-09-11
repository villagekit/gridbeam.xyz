---
title: "Startup plumbing removed: Matomo, Sentry, cookie consent provider"
status: sanctioned
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/_app.tsx:1,31-36`: `@socialgouv/matomo-next` `init({ siteId: '6', url: 'https://analytics.mikey.nz' })`; `:95` `CookieBannerProvider`; `:86` preconnect to `analytics.mikey.nz`; `apps/gridkit/next.config.mjs:1,69-91`: `withSentryConfig`; `apps/gridkit/sentry.{client,edge,server}.config.ts`.

## Current

None of it: no Matomo, Sentry or cookie provider in `app/layout.tsx`, `next.config.ts` or `package.json`.

## Verdict

rule: no startup plumbing

## Log
