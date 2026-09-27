---
title: "Mobile select background: the ui 0.9.0 wrapper's white to Chakra v3's transparent NativeSelect"
status: open
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui` 0.9.0's `Select` (`../ui` at `a5cbe36`, `src/components/Select.tsx:17`) wrapped Chakra v2's `Select` with `background="white"`: the two native selects of the catalog's mobile layout compute `background-color` `rgb(255, 255, 255)` at 375 on the live site (`apps/gridkit/components/catalogue/selector.tsx:41-52` at `fce357d`; the probe of plan 8417428fd88a, `audit/designs/probe2.txt`).

## Current

`@villagekit/ui` 1.2.0's `Select` is Chakra v3's `NativeSelect` bare (`dist/components/Select.js:2`), whose `outline` field is `bg: transparent` (`@chakra-ui/react` 3.35.0 `dist/esm/theme/recipes/native-select.js`): the same two selects compute `rgba(0, 0, 0, 0)` on `/designs` at 375 (`app/_components/catalogue/Selector.tsx:47-60`), and the cutting planner's selects the same. Invisible on a white page; visible on any band.

## Verdict

## Log

- 2026-09-27: Filed by the catalog re-port (plan 8417428fd88a) from its probe at 375; not judged. A gap in @villagekit/ui, so a fix is a slice in ../ui beside the shell record (the Select wrapper's white background, or the native select recipe's), parked upstream until the publish; the same field on /tools/cutting-planner.
