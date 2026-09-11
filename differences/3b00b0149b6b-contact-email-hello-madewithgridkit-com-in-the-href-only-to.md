---
title: "Contact email: hello@madewithgridkit.com in the href only to hello+gridbeam@mikey.nz shown as text"
status: open
route: /contact
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/contact.ts:5` `contactEmail: 'hello@madewithgridkit.com'`, used only as `href={`mailto:${contactEmail}`}` (`packages/applet-contact/src/pages/contact.tsx:20`); the address is never visible text (`audit/contact/dom/legacy.aria.yaml:27-28`: an unnamed `link` with `/url: mailto:hello@madewithgridkit.com`).

## Current

`app/contact/page.tsx:64-66` `<ObfuscatedEmail user="hello+gridbeam" domain="mikey.nz" />` renders `<a href="mailto:hello+gridbeam@mikey.nz">hello+gridbeam@mikey.nz</a>` (`app/_components/ObfuscatedEmail.tsx:10-17`); `audit/contact/dom/current.aria.yaml:30-31` `link "hello+gridbeam@mikey.nz"`. The same address appears on `/legal` and `/legal/privacy-policy`.

## Verdict

## Log

- 2026-09-12: Copy: the footer lock (ad5363e4e1d5) names `hello@mikey.nz` for the footer; this route uses `hello+gridbeam@mikey.nz` and shows it as text, which no lock or rule names. The rendering helper is the shell item 68b53054e1f4.
