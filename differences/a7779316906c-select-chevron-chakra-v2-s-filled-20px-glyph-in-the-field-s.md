---
title: "Select chevron: Chakra v2's filled 20px glyph in the field's color to v3's stroked 18px glyph in fg.muted"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's `Select` rendered its own icon: a `chakra-select__icon-wrapper` div 24px wide in the field's text color holding `ChevronDownIcon`, the filled Material chevron (`<path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>` on a `0 0 24 24` box) at `width: 1em; height: 1em` of the wrapper's `fontSize: xl`, 20px by 20px (`@chakra-ui/select@2.1.2`'s `SelectIcon`, `select/dist/chunk-3RSXBRAN.mjs:118-126`, and the v2 theme's `baseStyleIcon`, `theme/dist/components/select.js:254-267`, in the packed copies under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`): on the live site `/designs` at 375, either `role="menuitem"` select's chevron is a 20px filled glyph in `rgb(26, 32, 44)`, `fill` `currentColor`, `stroke: none`, in a 24px wrapper (the Parity review's probe of plan ad2f5e52f9d8, `scratchpad/verify-probe.mjs`, `legacy.indicator`; `audit/designs/375/legacy.png`, the two fields under Category and Sort by).

## Current

Chakra v3's `NativeSelect.Indicator` (`node_modules/@chakra-ui/react/dist/esm/components/native-select/native-select.js:56-72`) renders v3's `ChevronDownIcon` (`components/icons.js`), a stroked path `m6 9 6 6 6-6` with `fill: none`, at `_icon: { width: 1em, height: 1em }` of the indicator's `textStyle` per size (`theme/recipes/native-select.js:54-57,118`, `lg` at `md`, 18px) in `color: fg.muted` (`:47`, `rgb(74, 85, 104)` under the ui palette); the ui recipe (`../ui/src/components/Select.tsx` at `7ee04a9`) writes no `indicator` slot and the site's `Selector.tsx:59` renders `<Select.Indicator />` bare, legacy's markup rendering no icon of its own: on `pnpm dev` under the `file:../ui` override, `/designs` at 375, the chevron is an 18px stroked glyph in `rgb(74, 85, 104)` in an 18px wrapper (`verify-probe.mjs`, `current.indicator`; `audit/designs/375/current.png`), lighter and thinner than legacy's.

## Verdict

## Log

- 2026-09-27: Filed by the Parity review of the ui Select slice [[ad2f5e52f9d8]], which found it beside the background it fixed; not from that change (the readings hold before and after it). Not judged. The accordion's twin is [[2cc5b00fb582]], fixed in ../ui by a wrapped ItemIndicator with the filled path as its default child (the accordion slice [[aff1c5f9a5f2]]); the same shape fits the select's Indicator. Handed to [[6bc0d3ba08dc]].

- 2026-09-27: Fixed in ../ui at commit e3acb25 (plan [[6bc0d3ba08dc]]): Select.Indicator renders v2's filled chevron (the path ported from chakra-ui at 4e2df65, the select 2.1.2 tag) as its default child, and the recipe's indicator slot is v2's wrapper (width 6, currentColor, fontSize xl, insetEnd 2 and 1 at xs, v3's per-size text style blanked); on /designs at 375 under the file:../ui override both chevrons read 20px by 20px, filled, stroke none, rgb(26, 32, 44), in a 24px wrapper 10px from the field's edge, legacy's readings. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed.
