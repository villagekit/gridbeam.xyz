---
title: Visit website external link button
status: open
route: /suppliers
axis: interaction
kind: added
---
## Legacy

Absent: no legacy `/suppliers`. The legacy map's producers had no website link (`apps/gridkit/producers.ts:1-6`).

## Current

`app/suppliers/page.tsx:200-202` `LinkButton href={supplier.website} variant="secondary" size="sm" isExternal`: `target="_blank"`, `rel="noopener noreferrer"` (`@villagekit/ui@1.2.0 src/components/LinkButton.tsx:24-32`), no external-link glyph; hover and focus from the `Button` recipe (`src/components/Button.tsx:11-13,52-64`: dashed `primary.400` border to solid `primary.500` on `primary.50`, `scale(1.08)`, `boxShadow: 'outline'` on focus). Both cards' links share the same visible name (accessibility item).

## Verdict

## Log
