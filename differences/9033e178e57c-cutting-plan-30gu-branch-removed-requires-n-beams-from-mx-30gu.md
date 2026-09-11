---
title: "Cutting plan 30gu branch removed: Requires N beams from Mx 30gu Starter Kit, the Nx caption and the Starter Kit photo"
status: sanctioned
route: /designs/bed-frame
axis: copy
kind: removed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:183-213` `Requires {N} beams from {M}x <Link href="/store/starter_kit">30gu Starter Kit{s}</Link>*`, `{M}x` beside a linked Cloudinary photo `v1/gridkit.nz/store/starter-kit_eabcok` with alt `A wooden table displaying a stack of perforated wooden beams and an assortment of metal fasteners and bolts arranged in organized rows. The background shows a workshop with corrugated metal walls and tools.` (rendered on `/designs/shelf-tower`: `Requires 6 beams from 1x 30gu Starter Kit*`).

## Current

`app/_components/design/DesignCuttingPlan.tsx:70-119` has no kit branch, no store link, no photo.

## Verdict

rule: no e-commerce (the Starter Kit and its store link)

## Log

- 2026-09-12: Template. The replacement headline is its own open item.
