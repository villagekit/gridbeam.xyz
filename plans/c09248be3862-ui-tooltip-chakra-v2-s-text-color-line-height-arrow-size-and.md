---
title: "ui Tooltip: Chakra v2's text color, line height, arrow size and arrow padding, and the InfoTooltip's style with the engine's dimensions tooltip line, for the design pages"
status: todo
parent: 337e35d86920
tags:
  - "worker:fable"
derived_from: a78b167170b8
blocked_by: 4f55a829c726
priority: medium
---
The ui `Tooltip` is Chakra v2's tooltip again on its text and its arrow, and the engine's dimensions tooltip carries its 0.9.0 style: the text `whiteAlpha.900` on the body's line height, the arrow 10px with 8px of padding from the corners, and the `Assembled Dimensions` tooltip at `sm` font size and `4` padding, where `@villagekit/ui@1.2.0` writes `color="white"` and `fontSize="md"` over Chakra v3's recipe (`textStyle: 'xs'`, a 1rem line height, an 8px arrow, zag's 4px arrow padding) and `InfoTooltip` takes no style for the engine to pass. Closes [[0c510c0f5f43]], [[f5501f74966e]], [[470ff140ad66]] and [[7b3ab8ca5e52]] (visual, the ui wrapper's) and [[d25c25b8bbb3]] (visual, the `InfoTooltip`'s props and the engine's `products/kit/src/info.tsx` line), all `open` on `/designs/bed-frame`, filed by the Parity review of the tooltip portal slice [[4f55a829c726]], which read them beside the portal container it restored; a slice beside the shell record `a78b167170b8` (decision `40abdb2f222a`), taken without a verdict because each item's mechanism is the package's tooltip or the engine's line and CLAUDE.md's Principles say a gap in `@villagekit/ui` or the engine is fought by a change in `../ui` or `../gridkit`; the operator may still overturn any by a note and a new state. The portal wrapper reading [[9e2f5f220c5b]] (code, no visible effect) is not this slice's: it is the operator's on the verdicts plan `8512c5e9cc98`. Fixes in both siblings, so decision `28c1a536` twice: each committed in its sibling by pathspec, never pushed from here; seen on this site through the uncommitted overrides (CLAUDE.md's ui and gridkit rows), reverted by path before the commit; the items moved to `upstream` with a note citing the sibling commits; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint). After the portal slice in the same ui files. A change that decides a shape (a recipe or wrapper props in `../ui`, a style prop's v3 form on `InfoTooltip`), so Fable.

## Work

- Legacy: Chakra v2's tooltip theme (the packed `@chakra-ui/theme` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/components/tooltip.js:31-48`: `--tooltip-fg: colors.whiteAlpha.900`, `px: 2`, `py: 0.5`, `borderRadius: sm`, `fontWeight: medium`, `fontSize: sm`, `boxShadow: md`, `maxW: xs`, no line height) and the component's `arrowSize = 10` (`tooltip/dist/chunk-P7BNLW77.mjs:39`); the 0.9.0 wrapper (`../ui` at `a5cbe36`, `src/components/Tooltip.tsx`) passes `hasArrow`, `arrowPadding={8}`, `bg="primary.400"` and `sx` with `borderRadius: md`, `fontSize: md`, `paddingX: 2`, `paddingY: 1`, a caller's `sx` merged after; `InfoTooltip.tsx:7` extends `Partial<TooltipProps>` and spreads the rest; gridkit `v0.9.0 products/kit/src/info.tsx:64` passes `sx={{ fontSize: 'sm', padding: 4 }}`. Current: `../ui/src/components/Tooltip.tsx` at `0d23b49` writes `color="white"`, `borderRadius="md"`, `fontSize="md"`, `paddingX="2"`, `paddingY="1"` and `--tooltip-bg` on `BaseTooltip.Content` and renders `BaseTooltip.Arrow` with no size, over Chakra v3's recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/tooltip.js`: `textStyle: xs`, `--arrow-size: sizes.2`) and zag's positioning defaults (`@zag-js/popper` `get-placement.js:44`, `arrowPadding: 4`); `InfoTooltip.tsx` takes `label`, `pointerTimeout` and `portalProps`; `../gridkit` `products/kit/src/info.tsx` at `7b9df26` passes `label`, `pointerTimeout` and `portalProps`.
- In `../ui`: the wrapper reads v2's text color and line height (a `color` of `whiteAlpha.900` and the body's line height, by prop or by a `tooltip` recipe in `src/theme/index.ts`, the form the Spinner slice took, the worker choosing and saying why), the arrow at 10px (`--arrow-size`) and `positioning={{ arrowPadding: 8 }}`; `InfoTooltip` takes a style for its `Tooltip` again, in the v3 form (`css` on the content, or the props a caller needs), the worker naming the shape; the `ui/Tooltip` and `ui/InfoTooltip` stories read; `CHANGELOG.md` Unreleased.
- In `../gridkit`: `products/kit/src/info.tsx` passes the dimensions tooltip's `sm` font size and `4` padding through the prop `InfoTooltip` takes, legacy's values; the sibling type-checks against the ui with the prop through the packed-tarball override of `@villagekit/ui` in the sibling's root `package.json` (the form the portal slice's Outcome records), reverted by path; the commit by pathspec on the sibling's `main`.
- Seen here: the ui override (`file:../ui` and `transpilePackages`, CLAUDE.md's ui row) and the `@villagekit/product-kit` tarball override (CLAUDE.md's gridkit row), reverted by path before the commit.
- Verify first: the scratchpad's `style-probe.mjs` from the portal slice on `pnpm dev` at 1280 reads, on `/designs/makers-desk`, the slider tooltip at `color: rgb(255, 255, 255)`, `line-height: 16px`, an 8px arrow, and the `Width x Depth x Height` tooltip at `font-size: 16px`, `padding: 4px 8px`, where the live legacy page reads `rgba(255, 255, 255, 0.92)`, `24px`, a 10px arrow wrapper, `14px` and `16px`.
- Docs: `../ui/CHANGELOG.md`; the engine keeps no changelog.
- Not this slice: the slider tooltip's flip below the first thumb in fullscreen on the desk (legacy flips, current does not), read by the portal slice's Parity review and left on the design pages record's Log to re-read after the slider width slice `eba62a497d77`; the portal wrapper [[9e2f5f220c5b]].

## Seams under test

None pure; the proof is the style probe on both sides.

## Done when

- The style probe on `pnpm dev` under the overrides reads legacy's values on the desk's slider tooltip and the dimensions tooltip: text `rgba(255, 255, 255, 0.92)`, line height 24px at 16px and 21px at 14px, a 10px arrow, the dimensions tooltip at 14px and 16px padding, 320px by 124px
- In `../ui` and `../gridkit`: lint, types, builds and the ui's Storybook green; each change committed by pathspec on its `main`, not pushed
- The five items `upstream` with a note citing the sibling commits; `99f2fe62c62f` `blocked_by` this slice (checked at the finish) and carrying a note naming what the bump's repeat probe reads
- Every override reverted by path in both repos; `timeout 900 just check` green

## Outcome

## Log
