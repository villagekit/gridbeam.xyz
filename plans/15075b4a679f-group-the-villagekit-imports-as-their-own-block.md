---
title: Group the @villagekit/* imports as their own block
status: todo
tags:
  - "worker:sonnet"
blocked_by:
  - target: 337e35d86920
    note: the re-ports rewrite most of these files; the bulk pass covers what stays
---
The audit at the adoption of the shared agentic set (plan `0448bc2d`) found the internal import group merged with the external one across the site.

## Work

Rule: `CLAUDE.md, Conventions`, "Imports: the internal group is `@villagekit/*`", and the `typescript` skill, "Imports": built-ins, external packages, workspace packages, relative paths, a blank line between groups.

Places: `app/layout.tsx:1`, `app/page.tsx:1`, `app/about/page.tsx:1`, `app/faq/page.tsx:1`, `app/designs/[id]/page.tsx:1`, `app/designs/page.tsx:1`, `app/stories/[slug]/page.tsx:1`, `app/stories/StoriesBrowser.tsx:3`, `app/tools/cutting-planner/CuttingPlanner.tsx:3`, `app/_components/SiteFooter.tsx:3`, `app/_components/catalogue/Catalogue.tsx:3`, `app/_components/design/DesignCuttingPlan.tsx:3`, `app/_components/design/required-beams.test.ts:1`, `app/_lib/designs.ts:1`, `mdx-components.tsx:1`, and 26 more: every file whose leading import block mixes `@villagekit/*` with other packages. Biome's organizeImports sorts within a block and never splits one, so the gate does not catch it.

Fix: move every `@villagekit/*` import into its own blank-line-separated block after the external packages and before the relative paths, as `app/_components/design/DesignViewer.tsx` already does. Mechanical work for a Sonnet sub-agent.

## Seams under test

None.

## Done when

- No file under `app/`, `content/`, `scripts/` or the root has a `@villagekit/*` import in the same blank-line block as an external package, checked by a grep over the leading import blocks
- `timeout 900 just check` is green

## Outcome

## Log
