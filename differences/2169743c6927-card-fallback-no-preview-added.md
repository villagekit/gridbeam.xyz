---
title: Card fallback No preview added
status: open
route: /designs
axis: copy
kind: added
---
## Legacy

`apps/gridkit/components/catalogue/item.tsx:46-83` always renders the image; no fallback text.

## Current

`app/_components/catalogue/ItemCard.tsx:39-50` `No preview` in a gray box when `image` is null; unreachable today, every design has an image in `app/_lib/design-images.ts`.

## Verdict

## Log

- 2026-09-12: Found by the Parity review (plan cf52c388, round one).
