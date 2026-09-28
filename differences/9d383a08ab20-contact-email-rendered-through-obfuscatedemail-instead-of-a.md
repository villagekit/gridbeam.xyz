---
title: Contact email rendered through ObfuscatedEmail instead of a plain mailto href
status: fixed
route: /contact
axis: code
kind: changed
---
## Legacy

`packages/applet-contact/src/pages/contact.tsx:20` `href={`mailto:${contactEmail}`}`: a plain string on the overlay anchor.

## Current

`app/contact/page.tsx:64-81` `<ObfuscatedEmail user="hello+gridbeam" domain="mikey.nz" css={{...}} />`: `app/_components/ObfuscatedEmail.tsx:8-21` entity-encodes each character (`encode`, `:40-45`) and injects `<a href="mailto:...">` with `dangerouslySetInnerHTML` under a `biome-ignore`. The helper itself is the shell item 68b53054e1f4 (open).

## Verdict

plan 73062532dff7

## Log

- 2026-09-12: Follows 68b53054e1f4: if the operator keeps the helper, this use follows under the same verdict.

- 2026-09-28: From the contact re-port (plan 73062532dff7): fixed, not sanctioned under the helper's shell item 68b53054e1f4. The 2026-09-12 note above was the filer's guess about a verdict to come; the operator's sanction on 68b53054e1f4 is the helper's existence (rule 5), not each route's use, and this item stayed regression through the shell and contact grillings, where K2 on 3b00b0149b6b asks for legacy's form: the address in the href only and never shown as text, which ObfuscatedEmail cannot meet (app/_components/ObfuscatedEmail.tsx:16 always renders the address as the link's text), and a LinkCard href is a string attribute React escapes, so an entity-encoded address cannot pass through it. The page's card is legacy's LinkCard with href={`mailto:${contactEmail}`} (app/contact/page.tsx:19), so the plain address appears in this route's HTML, as on legacy (curl on /contact: one href="mailto:hello+gridbeam@mikey.nz", no &#x68;). The helper stays for /legal and /legal/privacy-policy; nothing in app/_components/ObfuscatedEmail.tsx changes.
