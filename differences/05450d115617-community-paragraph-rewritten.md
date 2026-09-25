---
title: Community paragraph rewritten
status: fixed
route: /
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:346-352` "Grid Kit is part of a wider vision for a more sustainable, creative future . So we're building a community space where everyone can share their creations, exchange ideas, and learn together to shape a brighter tomorrow." (a space before the period, as rendered).

## Current

`app/page.tsx:318-330` "Grid beam is part of a wider vision for a more sustainable, creative future. There's a community space where everyone can share their creations, exchange ideas, and learn together."

## Verdict

plan 2de4b709bb36

## Log

- 2026-09-12: Note `526d5330`'s community paragraph.

- 2026-09-25: Regression (grilling Q14). Ships as legacy with the rule 1 swap and the stray space before the first period dropped: "Grid beam is part of a wider vision for a more sustainable, creative future. So we're building a community space where everyone can share their creations, exchange ideas, and learn together to shape a brighter tomorrow."
