---
title: "Privacy policy last updated: a sentence in Changes, April 2021, to a subtitle, 2026-08-03"
status: regression
route: /legal/privacy-policy
axis: copy
kind: changed
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx:103` "... This privacy policy was last updated in April 2021." inside the Changes paragraph; the h1 (`:1`) has no description.

## Current

`app/legal/privacy-policy/page.tsx:21,40` `const lastUpdated = '2026-08-03'` rendered as `<Title description={`Last updated ${lastUpdated}.`}>Privacy policy</Title>`: "Last updated 2026-08-03." under the h1 (`audit/legal__privacy-policy/dom/current.txt:11`).

## Verdict

## Log

- 2026-09-25: Regression (privacy grilling P1). No subtitle. The date returns to the end of the Changes paragraph as legacy had it, reading the month the restored policy ships: "This privacy policy was last updated in <month year>."
