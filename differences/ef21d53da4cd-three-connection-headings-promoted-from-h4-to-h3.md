---
title: Three connection headings promoted from h4 to h3
status: fixed
route: /stories/how-to-furniture-bolts
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/how-to-furniture-bolts.mdx:187,209,246` `#### Beam To Beam Connections`, `#### Beam To 12mm Panel Connections`, `#### Beam To 18mm Panel Connections`; `audit/stories__how-to-furniture-bolts/dom/legacy.aria.yaml:83,91,104` level 4, under the h3 "Here's How To Determine Which Size Combo To Use".

## Current

`content/stories/how-to-furniture-bolts.mdx:186,208,245` `### ...`; `audit/stories__how-to-furniture-bolts/dom/current.aria.yaml:131,139,152` level 3, siblings of that h3, and so siblings in the table of contents.

## Verdict

plan edf6cccdfbf6

## Log

- 2026-09-12: Note 526d5330 names this promotion among the copy edits never presented to the operator; it holds.

- 2026-09-25: Regression (story grilling P4). The three connection headings return to h4 under "Here's How To Determine Which Size Combo To Use".

- 2026-09-26: Applied in legacy's order at `../node-modules/apps/gridkit/pages/stories/how-to-furniture-bolts.mdx:187,209,246` at `fce357d`: the three h4s sit under the h2 `What Sizes To Use` (`:99`) and before the h3 `Here's How To Determine Which Size Combo To Use` (`:283`), not under that h3 as the Legacy text and verdict line place them.
