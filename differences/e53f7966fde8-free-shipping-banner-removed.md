---
title: Free shipping banner removed
status: sanctioned
route: shell
axis: visual
kind: removed
---
## Legacy

`apps/gridkit/components/layouts/main.tsx:28-73`: `Banner` shows `Free shipping within New Zealand!` (uppercase via `textTransform`, `accentA.100` background, `accentA.400` dashed border) on `/`, `/store*` and `/cart`. Under the header in `audit/_root/375/legacy.png` and `audit/_root/1280/legacy.png`; `paragraph: Free shipping within New Zealand!` in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/layout.tsx:73-78` passes no `Banner` to `MainLayout`; `@villagekit/ui@1.2.0 src/components/layouts/MainLayout.tsx:11,25` made the slot optional (`{Banner && <Banner />}`). Nothing renders in the slot.

## Verdict

rule: no e-commerce (a store promotion)

## Log

- 2026-09-12: Review asked whether rule 2 reaches a banner. It does as the rule is meant: the banner advertises a shipping term of the store and shows on the store and cart routes; it is a store surface. The operator can overrule by note.
