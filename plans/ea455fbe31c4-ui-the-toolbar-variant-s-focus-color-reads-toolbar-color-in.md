---
title: "ui: the toolbar variant's _focus color reads --toolbar-color in place of a literal, so a clicked-off sandbox toggle stays gray.400 while focused"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
worker: fable
priority: medium
---
The `toolbar` Button variant's own `_focus: { color: 'gray.700' }` (`../ui/src/components/Button.tsx:120`) reads the recipe's `recipes` cascade layer as a hardcoded literal; it never reads the `--toolbar-color` custom property the variant's base `color` reads (`Button.tsx:112`, `var(--toolbar-color, {colors.gray.700})`), the variable [[b574a94092bf]] taught the sandbox's off toggles to set. A real mouse click focuses the clicked button (Chromium's default), so after that slice's fix, an off toggle that is clicked and then left alone (mouse moved away, no further interaction) still reads `gray.700`, matching the toggle's ON appearance, until something else takes focus; only a hover or a blur reads the correct `gray.400`. [[014c146699e5]] records the reading. Closes [[014c146699e5]] (interaction, `regression`) on `/designs/bed-frame`.

## Work

- Candidate shape, not a mandate: `../ui/src/components/Button.tsx:120`, `_focus: { color: 'gray.700' }` to `_focus: { color: 'var(--toolbar-color, {colors.gray.700})' }`, the same expression the variant's base `color` already reads (`:112`). Verify first: does this leave every other `toolbar`-variant consumer unaffected? The nav toggle (`../ui/src/components/nav/NavHeader.tsx:84`) always sets `--toolbar-color: colors.gray.900`, at rest and at focus alike (it carries no on/off state), so its focus color would read `gray.900` under the candidate instead of the hardcoded `gray.700`; check live legacy (`https://gridkit-landing-villagekit.vercel.app`, the header's mobile menu toggle) for what its own focus color is meant to be before taking this as the fix, since the candidate changes the nav toggle's focus color too, not just the sandbox's. The sandbox's on toggles and the four other buttons pass no `--toolbar-color` (css `{}`), so they keep falling back to `gray.700` at focus, unaffected either way.
- If the candidate doesn't hold (the nav toggle's legacy focus color turns out to differ from gray.900, or another `toolbar`-variant consumer needs a focus color independent of its rest color), a second variable scoped to `_focus` alone is the fallback shape; this is exactly the judgment call this slice exists to make.
- Verify first: `grep -n "_focus" ../ui/src/components/Button.tsx` around the `toolbar` variant, and reproduce [[014c146699e5]]'s probe (`audit/_probeb574/blur-probe.mjs`'s shape: click a sandbox off toggle, move the pointer away, read `getComputedStyle(el).color` while `document.activeElement` is still the button) on `pnpm dev` under the `file:../ui` override (CLAUDE.md's ui row) before and after the change.
- Not this slice: the sandbox's own two lines ([[b574a94092bf]], shipped, `../gridkit` `bf58a1f`); the toolbar's visibility on hover ([[941bd045b043]]); the nav toggle's rest color ([[c440126f7064]]).

## Seams under test

None pure; the proof is a probe like [[014c146699e5]]'s (a sandbox off toggle clicked, the pointer moved away, the color read while still focused and again once blurred) against the live legacy site, plus the nav toggle's own focus color on both sides.

## Done when

- On `pnpm dev` under the `file:../ui` override, `/designs/bed-frame` at 1280: after a click that turns auto-rotate off, moving the pointer away reads `rgb(160, 174, 192)` while the button is still focused (not only once blurred); the on toggles, the other four buttons and the nav toggle's own focus color read as before, checked against the live legacy site
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green
- [[014c146699e5]] is `upstream` (or `fixed`, whichever the collection gives a sibling commit) with a note citing the sibling commit
- `99f2fe62c62f` carries a note naming the packages and what the repeat probe reads
- `timeout 900 just check` is green

## Outcome

## Log
