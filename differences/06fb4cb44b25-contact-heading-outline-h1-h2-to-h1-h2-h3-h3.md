---
title: "Contact heading outline: h1, h2 to h1, h2, h3, h3"
status: fixed
route: /contact
axis: accessibility
kind: changed
---
## Legacy

`audit/contact/dom/legacy.aria.yaml:22,25` `heading "Contact us" [level=1]`, `heading "Email us" [level=2]` (the LinkCard heading).

## Current

`audit/contact/dom/current.aria.yaml:23,26,28,32` `heading "Get in touch" [level=1]`, `heading "Two channels" [level=2]`, `heading "Email" [level=3]`, `heading "GitHub Issues" [level=3]` (`app/contact/page.tsx:39,49,57,88`).

## Verdict

plan 25e9376e0f72. The deletions leave the tree as legacy's h1 then one card heading; the card heading's level (h3 where legacy's LinkCard rendered h2) is the shell's [[bd05a2d3642d]] (upstream), named there.

## Log
