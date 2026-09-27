---
title: "Mobile select background: the ui 0.9.0 wrapper's white to Chakra v3's transparent NativeSelect"
status: upstream
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

- 2026-09-27: Fixed in ../ui at commit 6e4f482 by the ui slice [[ad2f5e52f9d8]]: nativeSelectRecipe writes bg white on the outline variant's field in src/components/Select.tsx, the 0.9.0 wrapper's background, replacing Chakra v3's transparent key for key through the theme merge; it sits in the variant because cva merges the chosen variant over the base. Under the file override on pnpm dev, /designs at 375 reads both menuitem selects at background-color rgb(255, 255, 255) at rest and focused, the live legacy site's reading, with width, height, border, radius, type and the focused border unchanged from before the edit; the package's ui/Select story reads the same in the built Storybook. Moved to upstream; the bump plan [[99f2fe62c62f]] repeats the probe on the published package and moves this to fixed. One correction to the note above: the live legacy planner does render a select, id unlimited-beams, from packages/applet-cutting-planner/src/components/cutting-planner.tsx:133-147 at fce357d, which pages/tools/cutting-planner.tsx imports; it reads white there as here, so the current planner's own bg prop, id and sm size are the planner record [[396c9af0cbd1]]'s to re-port. The Parity review of the slice filed five further select readings on shell, hover, transition, bottom padding, the chevron's glyph and its aria-hidden, handed to the ui slice [[6bc0d3ba08dc]].
