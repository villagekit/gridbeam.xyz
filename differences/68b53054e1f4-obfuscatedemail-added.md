---
title: ObfuscatedEmail added
status: sanctioned
route: shell
axis: code
kind: added
---
## Legacy

`packages/applet-contact/src/pages/contact.tsx:20`: a plain `` href={`mailto:${contactEmail}`} `` (`apps/gridkit/pages/contact.ts:5`: `hello@madewithgridkit.com`).

## Current

`app/_components/ObfuscatedEmail.tsx:1-45`: `ObfuscatedEmail` and `ObfuscatedEmailLink`, entity-encoding the address into `dangerouslySetInnerHTML`; used by `app/contact/page.tsx`, `app/legal/page.tsx`, `app/legal/privacy-policy/page.tsx`.

## Verdict

rule: operator (5).

## Log

- 2026-09-28: From the contact re-port (plan 73062532dff7): this item's Current names three consumers; /contact renders legacy's LinkCard with a plain mailto href now (9d383a08ab20 fixed, its note says why the helper's sanction does not reach it), so the helper's consumers are two, app/legal/page.tsx and app/legal/privacy-policy/page.tsx. Nothing in app/_components/ObfuscatedEmail.tsx changes; this verdict, the helper's existence, stands.
