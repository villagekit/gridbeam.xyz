---
title: "ui: the nav header's mobile menu activation focuses the panel again, as legacy's react-focus-on onActivation did, for the shell"
status: todo
parent: 337e35d86920
priority: medium
worker: fable
derived_from: a78b167170b8
---
When the mobile menu opens, focus moves onto the menu panel, as the live site does: at 375, after a click on `Toggle menu`, `document.activeElement` is the panel (`role="toolbar"`, `data-autofocus`, `tabIndex={-1}`), so the toggle shows its `gray.900` rest color while the menu is open and a keyboard user starts inside the menu. Today focus stays on the toggle, which then shows the `toolbar` variant's focus color, `gray.700`, until something else takes focus. Closes [[a0cf59e507d8]] (interaction, `regression`) on `shell`, filed by the focus probe of plan ea455fbe31c4. A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec on top of its HEAD, never pushed from here; seen here through the uncommitted `file:../ui` override with its `transpilePackages` entry (CLAUDE.md's ui row), reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice. A change in `../ui` that decides a shape, so Fable.

## Work

- Legacy: `packages/ui-nav/src/components/NavHeader.tsx:44-48,63-67` at `fce357d`, `<FocusOn enabled={isMobile && isMobileMenuOpen} autoFocus onEscapeKey={onHideMobileMenu} onActivation={handleActivation}>`, where `handleActivation` queries `[data-autofocus]` inside the activated element and focuses it; `react-focus-on` `^3.7.0`. Current: `../ui/src/components/nav/NavHeader.tsx:51-63` carries the same lines on `react-focus-on` `^3.10.2`, and `NavMobileMenu.tsx:55-61` the same panel attributes, yet the panel never takes focus.
- Diagnose first, then fix in place: whether `onActivation` fires (a `console.debug` in `handleActivation` on `pnpm dev`), whether it fires before the panel is displayed (the panel is `display: none` and `hidden` until `show`, and the `motion` slide layer may mount it a frame later than Chakra v2's `Slide`), or whether the newer `react-focus-on` needs another prop. Read `node_modules/react-focus-on` at the version `../ui`'s lockfile pins for `onActivation`'s timing, never from memory. The fix is the smallest that restores legacy's behavior, in `NavHeader.tsx` or `NavMobileMenu.tsx`.
- Verify first: `audit/_probeea45/menu-focus-probe.mjs http://localhost:3000` under the `file:../ui` override prints the toggle as the active element at 400 and 1500 ms; against `https://gridkit-landing-villagekit.vercel.app` it prints the panel.
- The sibling's checks: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green in `../ui`; the commit by pathspec (the nav files it touches and `CHANGELOG.md`) on the sibling's `main`, its working tree otherwise untouched.
- Not this slice: the toggle's own focus color (the `toolbar` variant's `_focus`, plan ea455fbe31c4); the header action's focus on mousedown ([[c14d1a8d177f]]).

## Seams under test

None pure; the proof is `audit/_probeea45/menu-focus-probe.mjs` on both sides.

## Done when

- On `pnpm dev` under the `file:../ui` override, `audit/_probeea45/menu-focus-probe.mjs http://localhost:3000` prints the panel (`[data-autofocus]`) as the active element at 400 and 1500 ms after the click, as it does against the live legacy site; Escape still closes the menu and returns focus to the toggle; the toggle reads `rgb(23, 25, 35)` at rest with the menu open and the pointer away
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green
- [[a0cf59e507d8]] is `upstream` with a note citing the sibling commit
- `99f2fe62c62f` carries a note naming what the repeat probe reads
- `timeout 900 just check` is green

## Outcome

## Log
