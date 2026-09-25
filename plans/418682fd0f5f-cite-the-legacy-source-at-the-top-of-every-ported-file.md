---
title: Cite the legacy source at the top of every ported file
status: todo
tags:
  - "worker:opus"
blocked_by:
  - target: 337e35d86920
    note: the re-ports rewrite most of these files; the bulk pass covers what stays
---
The audit at the adoption of the shared agentic set (plan `0448bc2d`) found ported files without their citation, and one citation that points nowhere.

## Work

Rule: `CLAUDE.md, Working style`, "Ported code cites its source as a GitHub URL pinned to a commit SHA, in the commit message and as a comment at the top of the new file", and the `typescript` skill, "Upstream packages".

Places: 22 files ported from the legacy site with no `// ported from` header: `app/faq/page.tsx`, `app/about/page.tsx`, `app/page.tsx`, `app/tools/cutting-planner/CuttingPlanner.tsx`, `app/_lib/nav.ts`, `app/_components/SiteFooter.tsx`, `app/_components/catalogue/Catalogue.tsx`, `app/_components/catalogue/CatalogueItem.tsx`, `app/_components/design/DesignViewer.tsx`, `app/_components/design/PartsBreakdown.tsx`, `app/_components/landing/ImageCarousel.tsx`, `app/_components/landing/Testimonial.tsx`, `app/_components/story/StoryRow.tsx`, `app/_components/story/StoryImage.tsx`, `app/_components/story/StoryVideo.tsx`, `app/legal/page.tsx`, `app/legal/privacy-policy/page.tsx`, `app/tools-and-resources/page.tsx`, `app/_components/design/DesignViewerDynamic.tsx` and three more found by `rg -L "ported from" app`; and `app/tools/cutting-planner/algorithm.ts:3`, which cites `packages/applet-cutting-planner/src/lib.ts`, a path that does not exist at `fce357d` (the applet's sources are `src/shared.ts` and `src/algorithms/`).

Fix: a route the M2 route records re-port from the legacy source gets its citation in that re-port, so this plan closes only what those records leave: the faithful files fixed in place, cited to the legacy file each was ported from, and the planner's citation pointed at the paths that exist. The planner's file collapse is difference `1da20b256e35`; its citation is corrected here or when that item is closed, whichever comes first.

## Seams under test

None.

## Done when

- `rg -L "ported from" app` lists no file that was ported from `../node-modules`, checked against the route records' Outcomes
- Every `ported from` URL resolves at `fce357d`, checked by `ls` in `../node-modules`
- `timeout 900 just check` is green

## Outcome

## Log

- 2026-09-26: The Places list names app/_components/landing/Testimonial.tsx, which plan 0bb6cc8ab1ad moved to app/_components/Testimonial.tsx with its ported from header in place; that entry is closed.
