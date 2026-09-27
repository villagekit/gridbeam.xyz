---
title: "Viewer toolbar off toggles under the pointer: the toolbar variant's hover pink to gray.400, the css color beats the recipe in Chakra v3"
status: regression
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
