---
title: Return policy route removed
status: sanctioned
route: /legal/return-policy
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/legal/return-policy.tsx:1-8` `createReturnPolicyPage({ Layout: MainLayout, supportEmail: 'hello@madewithgridkit.com' })` from `packages/applet-legal/src/pages/return-policy.tsx`, rendering `packages/applet-legal/src/mdx/return-policy.mdx` (42 lines) in `LegalLayout`. Live: `https://gridkit-landing-villagekit.vercel.app/legal/return-policy`; its visible text is `audit/legal__return-policy/dom/legacy.txt` (the route is `legacy-only` in `scripts/audit-routes.txt`).

## Current

No `app/legal/return-policy/` route: `http://localhost:3000/legal/return-policy` is the 404 page (`audit/legal__return-policy/dom/manifest.json` records the current side as skipped). The `/legal` card that linked to it is its own item on `/legal`.

## Verdict

rule: no e-commerce (the return policy is gone)

## Log
