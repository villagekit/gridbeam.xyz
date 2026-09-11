---
title: Mobile sort heading Sort by removed
status: open
route: /designs
axis: copy
kind: removed
---
## Legacy

`apps/gridkit/components/catalogue/sorting.tsx:14` `title="Sort by"`, rendered at every width by `selector.tsx:36-44` (`audit/designs/375/legacy.png`: `Sort by` above the dropdown).

## Current

`app/_components/catalogue/Catalogue.tsx:486-493` the below-`lg` sort `Select` has no heading, only `aria-label="Sort designs"` (`audit/designs/375/current.png`); the desktop `Sort by` heading at `Catalogue.tsx:276-283` is unchanged.

## Verdict

## Log
