---
title: FAQ add-ons question and two-paragraph answer rewritten as one, link label changed
status: fixed
route: /faq
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:136,138-144` "What add-ons are compatible with Grid Kit?": "We plan to offer a wide range of add-ons to expand your Grid Kit’s possibilities: connectors, brackets, wheels, and more." then "For now, if you have a 3d printer, we have an open source repository of 3d printable add-on designs." (link "an open source repository of 3d printable add-on designs" to `https://github.com/villagekit/replicad-models`).

## Current

`app/faq/page.tsx:118,120-133` "What add-ons exist?": "A small but growing ecosystem: connector brackets, wheels, hooks, replacement caps. Some are off-the-shelf from the suppliers; others are 3D-printable from open repositories like villagekit/replicad-models." (link "villagekit/replicad-models", same href).

## Verdict

plan 241b65da8226

## Log

- 2026-09-25: Regression (faq grilling F3). Question ships as "What add-ons are compatible with grid beam?". The first paragraph ("We plan to offer a wide range of add-ons...") stays out under rule 2; the second ships verbatim: "For now, if you have a 3d printer, we have an open source repository of 3d printable add-on designs." with legacy's link extent and href.
