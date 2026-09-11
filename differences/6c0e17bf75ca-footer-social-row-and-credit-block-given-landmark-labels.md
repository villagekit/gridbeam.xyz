---
title: Footer social row and credit block given landmark labels
status: open
route: shell
axis: accessibility
kind: added
---
## Legacy

`packages/ui-brand/src/components/Social.tsx:26`: `<HStack as="section">` with no label; `packages/ui-brand/src/components/Footer.tsx:55`: `<VStack as="section">` with no label. Neither is a landmark in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/SiteFooter.tsx:79-84`: `<HStack as="nav" aria-label="Village Kit on social media">`; `:92`: `<VStack as="section" aria-label="Site credit">`. `navigation "Village Kit on social media"` and `region "Site credit"` in `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log
