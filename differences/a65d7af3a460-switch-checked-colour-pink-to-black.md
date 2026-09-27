---
title: "Switch checked colour: pink to black"
status: upstream
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

The `Controls` switch (`gridkit@v0.9.0 core/parameters/src/index.tsx:52-63`) and the parts switches render pink when checked (Custom-preset controls capture, plan cf52c388 probe; `audit/designs__bed-frame/1280/legacy.png` shows the unchecked track).

## Current

`@villagekit/parameters@0.10.0 src/index.tsx` `Switch.Root` and `app/_components/design/PartsBreakdown.tsx:38-56` render black when checked (Chakra v3 default palette).

## Verdict

## Log

- 2026-09-12: Template. The ui's `switchRecipe` sets `primary.300` on the checked control (`node_modules/@villagekit/ui/src/components/Switch.recipe.ts`) as the legacy `switchTheme` did (`@villagekit/ui@0.9.0 src/components/Switch.tsx`), yet both switches render `rgb(24, 24, 27)` when checked (probe on the Parts tab), so the recipe reaches neither; the engine's switch is Chakra's own. Cause for the re-port slice.

- 2026-09-27: Fixed in ../ui 986ae02 (plan eba62a497d77): the checked bg primary.300 written under variants.variant.solid.control._checked in switchRecipe, where Chakra v3 writes colorPalette.solid and merges the variant over the base. The Controls, Top panel, Group same size parts and planner switches read rgb(246, 135, 179) when checked under the override, the live legacy page's value (pink.300, #F687B3; the plan's rgb(213, 63, 140) was wrong). Waits on the publish; the bump plan 99f2fe62c62f moves it to fixed.
