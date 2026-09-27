---
title: "Viewer toolbar off toggles under the pointer: the toolbar variant's hover pink to gray.400, the css color beats the recipe in Chakra v3"
status: upstream
route: /designs/bed-frame
axis: interaction
kind: changed
---
## Legacy

`gridkit@v0.9.0 core/sandbox/src/controls/index.tsx:169,178`: the auto-rotate and grid `IconButton`s carry `sx={shouldAutoRotate ? {} : { _focus: {}, color: 'gray.400' }}` (the same for `shouldDisplayGrid`), so an off toggle is `gray.400` at rest and the `toolbar` variant's hover color wins under the pointer: on the live site, after a click that turns the toggle off, the button under the pointer reads `rgb(213, 63, 140)` at 1280 and 375 (the toolbar probe of plan 1e2fbba70884, `clicks` 3 and 4 in `legacy-1280.json` and `legacy-375.json`).

## Current

`@villagekit/sandbox` at `../gridkit` 15dc73a `core/sandbox/src/controls/index.tsx:169,178`: the same object under `css`. Chakra v3 emits the recipe's styles inside a cascade layer and the `css` prop unlayered, so `color: 'gray.400'` beats the variant's `_hover`, `_active` and `_focus` colors whatever their specificity, the mechanism of the shell's [[c440126f7064]] (the nav toggle): after the click, the off toggle under the pointer reads `rgb(161, 161, 170)` at 1280 and 375 (`after-1280.json`, `after-375.json`), and the same before the selector fix (`before-1280.json`), when the toolbar sat at opacity 0 and the state could not be seen. Found by the Parity review of plan 1e2fbba70884, which made the toolbar reachable and neither widened nor narrowed this. The fix belongs in `../gridkit`: the two toggles set the `toolbar` variant's `--toolbar-color` variable (`../ui` d736bfe, parked upstream on [[c440126f7064]]) through `css` in place of `color`, which fights no state; it waits on the ui publish that carries the variable.

## Verdict

## Log

- 2026-09-27: Filed by the sandbox slice (plan [[1e2fbba70884]]) from its Parity review; pre-existing at 0.10.0 and made visible by the toolbar fix. Regression by default (decision 2032533f), not sanctioned by the agent. A residual in an engine component: the design pages record [[0bc88eaf5493]] carries a note handing it to a ../gridkit slice at its finish, after the ui publish that carries the toolbar variable.

- 2026-09-28: Handed to the ../gridkit slice [[b574a94092bf]], minted beside the shell record at the design pages record's finish (plan [[0bc88eaf5493]], decision 40abdb2f222a, the split's call 10): the two toggles set the toolbar variant's --toolbar-color variable through css in place of color, the NavHeader's form at ../ui d736bfe, seen under the sandbox tarball and the file:../ui overrides together, blocking the bump plan [[99f2fe62c62f]]. The state stays regression until the slice moves it to upstream with the sibling commit.

- 2026-09-28: Shipped in ../gridkit as commit bf58a1f on its main over 188536d (eight ahead of origin, not pushed), by pathspec: core/sandbox/src/controls/index.tsx alone. The two toggles set --toolbar-color through css in place of color, the NavHeader's form at ../ui d736bfe; _focus: {} kept as legacy's line, since it stays unless the worker reads that it does nothing under Chakra v3 and says so, which the worker did, filing [[014c146699e5]] for the residual (the recipe's own _focus color winning while a click leaves the button natively focused) rather than changing the shape. Verified on pnpm dev under the sandbox tarball and file:../ui overrides: /designs/bed-frame at 1280 and 375, the off toggle reads rgb(213, 63, 140) under the pointer and while pressed, matching legacy, this item's own concern, closed; at rest away from the pointer it reads rgb(160, 174, 192) only once the button loses the focus a real click leaves on it (rgb(45, 55, 72) while still focused, the gap [[014c146699e5]] records); the on toggles and the other four buttons unaffected; screenshot pairs under audit/_probeb574/ looked at, nothing else moved. 99f2fe62c62f is blocked_by this slice and carries a note naming the packages and the repeat probe.

- 2026-09-28: The Parity review of plan b574a94092bf found the rest-while-focused gap ([[014c146699e5]]) is introduced by this fix, not merely revealed: the sibling's pre-image (188536d) already read gray.400 there, matching legacy, since the unconditional literal color it replaces was unlayered and beat the recipe's _focus state too, not only its _hover and _active states. [[ea455fbe31c4]] is minted, beside this route's shell record, for the ../ui change this needs; it blocks the bump plan alongside this slice.
