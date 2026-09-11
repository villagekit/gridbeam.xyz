---
title: ObfuscatedEmail added
status: open
route: shell
axis: code
kind: added
---
## Legacy

`packages/applet-contact/src/pages/contact.tsx:20`: a plain `` href={`mailto:${contactEmail}`} `` (`apps/gridkit/pages/contact.ts:5`: `hello@madewithgridkit.com`).

## Current

`app/_components/ObfuscatedEmail.tsx:1-45`: `ObfuscatedEmail` and `ObfuscatedEmailLink`, entity-encoding the address into `dangerouslySetInnerHTML`; used by `app/contact/page.tsx`, `app/legal/page.tsx`, `app/legal/privacy-policy/page.tsx`.

## Verdict

## Log
