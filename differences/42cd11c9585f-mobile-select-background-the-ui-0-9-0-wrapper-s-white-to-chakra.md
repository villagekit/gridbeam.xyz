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

- 2026-09-27: Handed to the ui slice [[ad2f5e52f9d8]], minted beside the shell record at the designs index record's finish (plan [[f901cf9f724d]], decision 40abdb2f222a): the native select recipe's outline field bg white in ../ui, the 0.9.0 wrapper's background, blocking the bump plan [[99f2fe62c62f]]. The state stays open until the slice moves it to upstream with the sibling commit. One correction to the Current, read at the finish: the cutting planner's select (app/tools/cutting-planner/CuttingPlanner.tsx:158-170) writes bg="white" itself as a prop on its Select.Field, current code with no legacy counterpart (legacy's pages/tools/cutting-planner.tsx renders no Select), so it reads white today and only the catalog's two mobile selects are transparent.
