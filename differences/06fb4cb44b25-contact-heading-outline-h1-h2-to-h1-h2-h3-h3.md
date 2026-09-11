---
title: "Contact heading outline: h1, h2 to h1, h2, h3, h3"
status: regression
route: /contact
axis: accessibility
kind: changed
---
## Legacy

`audit/contact/dom/legacy.aria.yaml:22,25` `heading "Contact us" [level=1]`, `heading "Email us" [level=2]` (the LinkCard heading).

## Current

`audit/contact/dom/current.aria.yaml:23,26,28,32` `heading "Get in touch" [level=1]`, `heading "Two channels" [level=2]`, `heading "Email" [level=3]`, `heading "GitHub Issues" [level=3]` (`app/contact/page.tsx:39,49,57,88`).

## Verdict

## Log
