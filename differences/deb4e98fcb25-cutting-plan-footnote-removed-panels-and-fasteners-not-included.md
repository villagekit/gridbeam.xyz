---
title: "Cutting plan footnote removed: Panels and fasteners not included in estimate. Please contact us for any help."
status: regression
route: /designs/bed-frame
axis: copy
kind: removed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:214-220` `* Panels and fasteners not included in estimate. Please <Link href="/contact">contact us</Link> for any help.`

## Current

`app/_components/design/DesignCuttingPlan.tsx` no footnote.

## Verdict

## Log

- 2026-09-12: Template.

- 2026-09-25: Regression (design page grilling T2). The footnote returns: "Panels and fasteners not included in estimate. Please contact us for any help." (link "contact us" to /contact), without the leading asterisk since the kit sentence it marked is gone under rule 2 ([[9033e178e57c]]). Template.
