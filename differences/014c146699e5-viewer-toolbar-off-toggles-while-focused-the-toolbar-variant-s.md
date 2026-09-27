---
title: "Viewer toolbar off toggles while focused: the toolbar variant's own _focus color to the --toolbar-color variable, an empty _focus override does nothing in Chakra v3"
status: regression
route: /designs/bed-frame
axis: interaction
kind: changed
---
## Legacy

`gridkit@v0.9.0 core/sandbox/src/controls/index.tsx:169,178`: the same `sx={shouldAutoRotate ? {} : { _focus: {}, color: 'gray.400' }}` this slice's own item ([[d09f95feb1b1]]) cites. Under Chakra v2, `sx` merges into the component's style object at the top level, so an explicit `_focus: {}` in `sx` replaces the theme's `_focus: { color: 'gray.700' }` mapping for the `toolbar` variant wholesale (`../ui` `src/components/Button.tsx:120` ports that literal), leaving no focus-specific rule at all; the top-level `color: 'gray.400'` then applies in every state, focused included. Verified live: `https://gridkit-landing-villagekit.vercel.app/designs/bed-frame` at 1280, clicking "Toggle auto-rotate" (which focuses the button, Chromium's default on a mouse click) and moving the pointer away reads `rgb(160, 174, 192)` while `document.activeElement` is still the button (the slice's `audit/_probeb574/legacy-focus-probe.mjs`, its readings alongside this note).

## Current

`@villagekit/sandbox` at `../gridkit` `bf58a1f` (this slice's commit) `core/sandbox/src/controls/index.tsx:172,181`: the toggles now set `--toolbar-color` in place of `color`, per [[b574a94092bf]], with `_focus: {}` kept as legacy's line. Chakra v3 keeps the `toolbar` variant's own `_focus: { color: 'gray.700' }` in the `recipes` cascade layer (`../ui` `src/components/Button.tsx:120`), a literal that never reads `--toolbar-color`; an empty `_focus: {}` in the unlayered `css` prop emits no CSS rule at all, so there is nothing in the unlayered layer to beat the recipe's layered one, unlike the base `color` property, where the unlayered `--toolbar-color` write does reach the recipe's `color: var(--toolbar-color, ...)` read. Verified on `pnpm dev` under the sandbox tarball and `file:../ui` overrides: after a click that turns the toggle off (native Chromium focus retained), moving the pointer away while still focused reads `rgb(45, 55, 72)` (`gray.700`); calling `element.blur()` then reads `rgb(160, 174, 192)` (`gray.400`) as intended (`audit/_probeb574/blur-probe.mjs`). Introduced by this slice's own fix, not merely revealed by it: rebuilding `../gridkit` at `188536d` (the parent of `bf58a1f`, this slice's own pre-image) and re-running the same probe shows the unconditional literal `color: 'gray.400'` correctly winning over the recipe's layered `_focus` too, since it is unconditional and unlayered regardless of pseudo-class, so the click-then-look-away state read `rgb(160, 174, 192)` even before this slice, matching legacy, while the hover state stayed broken (the bug [[d09f95feb1b1]] records). This slice trades that: hover now matches legacy, and the click-then-look-away state, the more common one, now reads the toggle's on color until the button loses focus. The same literal `_focus` rule catches keyboard (Tab) focus on an off toggle, not only a mouse click. [[ea455fbe31c4]] is minted for the `../ui` fix this needs, a shape this slice's implementing agent did not decide.

## Verdict

## Log

- 2026-09-28: Filed by the implementing agent of plan [[b574a94092bf]] from its own verification: the toggle's off color now correctly follows the pointer and press states, but a click leaves the button natively focused in Chromium, and the toolbar variant's own `_focus: { color: 'gray.700' }` (../ui, untouched by that slice) wins over the --toolbar-color variable at rest while focused, unlike legacy where sx's shallow merge erased the theme's _focus mapping outright. Regression by default (decision 2032533f), not sanctioned by the agent; not judged.

- 2026-09-28: Corrected by the fresh Standards, Spec and Parity reviews of plan b574a94092bf: the ../ui Button.tsx line was :120, not :136-137; the ../gridkit line numbers on the fix commit were :172,181, not :169,178 (legacy's v0.9.0 cite stays :169,178); and, the Parity review's finding, this gap is introduced by this slice's own fix, not merely made visible by it, verified by rebuilding the sibling's pre-image (188536d) and re-probing. ea455fbe31c4 minted for the ../ui candidate fix, blocking the bump plan 99f2fe62c62f.
