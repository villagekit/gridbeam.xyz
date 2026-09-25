---
title: "Heading weight: normal to semibold, both rendered by the one Fredoka 600 face"
status: upstream
route: shell
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Heading.tsx:21` `headingTheme.baseStyle.fontWeight: 'normal'`. The site loads `Fredoka({ weight: '600' })` only (`apps/gridkit/theme.ts:5`, the shell item cffa8a82f020), so the browser renders the 600 face for a 400 request: headings read semibold.

## Current

`@villagekit/ui@1.2.0 src/components/Heading.tsx:23-28` `headingRecipe.base.fontWeight: 'semibold'`, with the same `Fredoka` at weight 600 through `next/font` (`app/layout.tsx:18`); the source comment says semibold matches the only weight the sites load. The rendered weight is the same on both sides.

## Verdict

## Log

- 2026-09-12: Found by the Parity review of plan 848b026f and filed on shell. A code difference with no rendered outcome, since both sides load only the 600 face; regression by the rule's absence, for the operator to weigh under rule 5. The family mechanism is cffa8a82f020.

- 2026-09-26: Fixed in ../ui by the recipes and provider slice [[45d6f5634a11]], commit 540e9c3: src/components/Heading.tsx: headingRecipe.base.fontWeight is normal, as 0.9.0's headingTheme set it; the rendered face stays the one the site loads. Waits in upstream for the bump plan [[99f2fe62c62f]].
