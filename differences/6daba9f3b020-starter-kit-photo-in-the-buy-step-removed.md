---
title: Starter-kit photo in the Buy step removed
status: sanctioned
route: /
axis: visual
kind: removed
---
## Legacy

`apps/gridkit/pages/index.tsx:243-254` `<Link as={NextLink} href="/store/starter_kit"><LandingImage src="v1/gridkit.nz/store/starter-kit_eabcok" alt="A wooden table displaying a stack of perforated wooden beams and an assortment of metal fasteners and bolts arranged in organized rows. The background shows a workshop with corrugated metal walls and tools." .../></Link>` inside the step; `audit/_root/1280/legacy.png`.

## Current

No image in the step (`app/page.tsx:233-239`).

## Verdict

rule: no e-commerce (a store product photo linking to /store/starter_kit)

## Log
