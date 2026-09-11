---
title: "Legal heading outline: h1 and three h2 cards to h1, h2, h3, h3, h2"
status: regression
route: /legal
axis: accessibility
kind: changed
---
## Legacy

`audit/legal/dom/legacy.aria.yaml:22-35` `heading "Our legal information" [level=1]` then `heading "Return policy" [level=2]`, `heading "Privacy policy" [level=2]`, `heading "Cookie policy" [level=2]`.

## Current

`audit/legal/dom/current.aria.yaml:23,26,28,32,36` `heading "Legal" [level=1]`, `heading "Policies" [level=2]`, `heading "Privacy policy" [level=3]`, `heading "Site licence" [level=3]`, `heading "Questions" [level=2]` (`app/legal/page.tsx:40,49,73`; the card level is the shell LinkCard heading item).

## Verdict

## Log
