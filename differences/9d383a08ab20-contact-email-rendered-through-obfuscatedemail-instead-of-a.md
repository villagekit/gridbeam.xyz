---
title: Contact email rendered through ObfuscatedEmail instead of a plain mailto href
status: regression
route: /contact
axis: code
kind: changed
---
## Legacy

`packages/applet-contact/src/pages/contact.tsx:20` `href={`mailto:${contactEmail}`}`: a plain string on the overlay anchor.

## Current

`app/contact/page.tsx:64-81` `<ObfuscatedEmail user="hello+gridbeam" domain="mikey.nz" css={{...}} />`: `app/_components/ObfuscatedEmail.tsx:8-21` entity-encodes each character (`encode`, `:40-45`) and injects `<a href="mailto:...">` with `dangerouslySetInnerHTML` under a `biome-ignore`. The helper itself is the shell item 68b53054e1f4 (open).

## Verdict

## Log

- 2026-09-12: Follows 68b53054e1f4: if the operator keeps the helper, this use follows under the same verdict.
