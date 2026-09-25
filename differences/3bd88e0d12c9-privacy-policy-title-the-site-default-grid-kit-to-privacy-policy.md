---
title: "Privacy policy title: the site default Grid Kit to Privacy policy"
status: sanctioned
route: /legal/privacy-policy
axis: copy
kind: changed
---
## Legacy

No `NextSeo` in the chain (`packages/applet-legal/src/pages/privacy-policy.tsx:10-26`, `LegalLayout.tsx`), so the live page renders the `DefaultSeo` title `<title>Grid Kit</title>` (`apps/gridkit/pages/_app.tsx:46-47`; `https://gridkit-landing-villagekit.vercel.app/legal/privacy-policy`).

## Current

`app/legal/privacy-policy/page.tsx:18,23-24` `const title = 'Privacy policy'` in `metadata`; rendered `<title>Privacy policy — gridbeam.xyz</title>`.

## Verdict

rule: operator (5). Legacy set no title and rendered the bare site default, an oversight rather than a choice; ships as "Privacy policy", templated by the shell ([[1c8b7461acb1]]). Privacy grilling P1.

## Log
