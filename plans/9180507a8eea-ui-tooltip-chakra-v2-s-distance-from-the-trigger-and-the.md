---
title: "ui Tooltip: Chakra v2's distance from the trigger and open animation, and the InfoTooltip icon at the baseline, for the design pages"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
blocked_by: c09248be3862
tags:
  - "worker:fable"
priority: medium
---
The ui `Tooltip` sits where Chakra v2's sat, its box 8px from the trigger with the arrow reaching 4px out of it, opens as Chakra v2's opened, a 0.85 scale with an overshoot over 0.2s and a 0.2s fade, and the `InfoTooltip`'s icon sits where Chakra v2's did, at the baseline, level with the text beside it, where `@villagekit/ui@1.2.0` on Chakra v3 leaves zag's offset (the 8px gutter plus half the arrow, 13px with the arrow 5px out), Chakra v3's `scale-fade-in` (0.95 and a fade over 150ms) and Chakra v3's `Icon` recipe's `vertical-align: middle` (the icon about 3px lower, its trigger box 24px tall against 27px). Closes [[9f61cf130d58]] and [[b4473fac17df]] (visual) and [[1597ab15cc5e]] (interaction), all `open` on `/designs/bed-frame`, read by the implementing agent and the Parity review of the tooltip style slice [[c09248be3862]] beside the arrow size it restored; a slice beside the shell record `a78b167170b8` (decision `40abdb2f222a`), taken without a verdict because each item's mechanism is the package's tooltip or icon and CLAUDE.md's Principles say a gap in `@villagekit/ui` is fought by a change in `../ui`; the operator may still overturn either by a note and a new state. A fix in `../ui` alone, so decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted ui override (CLAUDE.md's ui row), reverted by path before the commit; the items moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint). After the tooltip style slice in the same ui files. A change that decides a shape (zag's `gutter` against the arrow's offset variable, the icon's alignment on the `InfoTooltip` or on the package's `Icon`), so Fable.

## Work

- Legacy: Chakra v2's `usePopper` offsets the tooltip by `[0, gutter]`, `gutter` 8, and sits the arrow wrapper `calc(size / 2 - 1px)` outside the box (the packed `@chakra-ui/popper` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/popper/dist/chunk-LUYFNC5G.mjs:31,70` and `chunk-P4KPSAOW.mjs:60-61`); v2's `Icon` with a component as `as` writes no `verticalAlign` (`@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs:46-64`, the `middle` at line 67 being the other path), and the 0.9.0 `InfoTooltip` passed `as={FaInfoCircle}` (`../ui` at `a5cbe36`, `src/components/InfoTooltip.tsx:23`). Current: zag's `mainAxis = gutter + arrowOffset` with `gutter: 8` and the arrow's `--arrow-offset: calc(size / 2 * -1)` (`node_modules/.pnpm/@zag-js+popper@1.40.0/node_modules/@zag-js/popper/dist/get-placement.js:37,63-67`, `middleware.js:53-55,96`); Chakra v3's icon recipe writes `verticalAlign: "middle"` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/icon.js:11`) and `../ui/src/components/InfoTooltip.tsx` renders `FaInfoCircle` as `Icon`'s child. Legacy's open animation is framer-motion's `scale` variants (`@chakra-ui/tooltip/dist/chunk-XRZH7COS.mjs:4-21`: enter scale 0.85 to 1 over 0.2s on `[0.175, 0.885, 0.4, 1.1]`, opacity over 0.2s ease-out; exit scale to 0.85 over 0.2s, opacity over 0.15s ease-in-out); current's is Chakra v3's recipe (`theme/recipes/tooltip.js:22-29`, `scale-fade-in` and `scale-fade-out` at `fast`, 150ms, `tokens/keyframes.js:74-77,151-154`, `tokens/durations.js:7`).
- In `../ui`: the wrapper's `positioning` on `Tooltip.Root` reads v2's distance (a `gutter` of 3 against a 10px arrow puts the box 8px out; the arrow's 1px, `-4px` against `-5px`, by the arrow's `--arrow-offset` or left as a reading, the worker choosing and saying why); the content's `_open` and `_closed` states carry v2's keyframes and durations (keyframes in the package's theme with v2's scale and easings, the `animationName` and `animationDuration` on the content, the worker naming the shape); and the `InfoTooltip`'s icon sits at the baseline (`verticalAlign: 'baseline'` on the `Icon`, or the `as` form, the worker naming the shape); the `ui/Tooltip` and `ui/InfoTooltip` stories read; `CHANGELOG.md` Unreleased.
- Verify first: the scratchpad's `gap-probe.mjs`, `icon-pos-probe.mjs` and `rvw-tt.mjs` from the tooltip style slice on `pnpm dev` at 1280 read, on `/designs/bed-frame`, `gapBoxToContent: 13`, the arrow `bottom: -5px`, the svg 2.78px below the `Box`'s top and the text's top, the `Box` 24px tall, and `animation: scale-in, fade-in 0.15s` with no inline transform 40ms after the hover, where the live legacy page reads 8, `-4px`, 0, 27px, and `animation: none` with an inline `matrix(0.903, ...)` transform.
- Docs: `../ui/CHANGELOG.md`.
- Not this slice: the fullscreen slider flip on the desk, which follows the dropped HoverCard frame `9d5af9f80912` (the page re-port slice `3c448a379ad7`'s re-read, the design pages record's Log); the portal wrapper `9e2f5f220c5b` and the `InfoTooltip` props shape `1f0680aff2ae`, the operator's.

## Seams under test

None pure; the proof is the two probes on both sides.

## Done when

- The gap probe on `pnpm dev` under the override reads legacy's values on the bed frame's dimensions tooltip: the box 8px from the trigger box; the icon probe reads the svg's top level with the `Box`'s top and the text's top, the `Box` 27px tall; the animation probe reads a 0.2s scale from 0.85 on both sides
- In `../ui`: lint, types, `build:pkg` and Storybook green; the change committed by pathspec on its `main`, not pushed
- The three items `upstream` with a note citing the sibling commit; `99f2fe62c62f` `blocked_by` this slice (checked at the finish) and carrying a note naming what the bump's repeat probe reads
- The override reverted by path; `timeout 900 just check` green

## Outcome

## Log
