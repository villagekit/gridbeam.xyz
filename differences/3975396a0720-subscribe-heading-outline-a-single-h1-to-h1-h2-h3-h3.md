---
title: "Subscribe heading outline: a single h1 to h1, h2, h3, h3"
status: regression
route: /subscribe
axis: accessibility
kind: changed
---
## Legacy

`audit/subscribe/dom/legacy.aria.yaml:22` `heading "Subscribe to Grid Kit" [level=1]`, the only heading in `main`.

## Current

`audit/subscribe/dom/current.aria.yaml:23,31,33,37` `heading "Newsletter" [level=1]`, `heading "Find out when it launches" [level=2]`, `heading "Email the maintainer" [level=3]`, `heading "Watch the repository" [level=3]` (`app/subscribe/page.tsx:37,60,64,71`; the card level is the shell LinkCard heading item).

## Verdict

## Log
