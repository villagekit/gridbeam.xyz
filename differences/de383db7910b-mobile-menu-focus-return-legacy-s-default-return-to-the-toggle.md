---
title: "Mobile menu focus return: legacy's default return to the toggle on every lock release to a predicate that refuses it while the lock is enabled, for React StrictMode's development remount of the trap"
status: open
route: shell
axis: code
kind: changed
---
## Legacy

`packages/ui-nav/src/components/NavHeader.tsx:63-67` at `fce357d`: `<FocusOn enabled={isMobile && isMobileMenuOpen} autoFocus={true} onEscapeKey={onHideMobileMenu} onActivation={handleActivation}>`, no `returnFocus`, so react-focus-on's default `returnFocus = true` (`react-focus-on@3.9.3`, `dist/es2015/UI.js`, the version `../node-modules/pnpm-lock.yaml` pins) and react-focus-lock returns focus to the element that was focused at activation, the toggle, whenever the trap leaves the trap list (`react-focus-lock@2.12.1`, `dist/es2015/Trap.js`, `handleStateChangeOnClient`). The only release legacy's trap saw was the menu closing: the pages router ran without React StrictMode (`apps/gridkit/next.config.mjs` at `fce357d` sets no `reactStrictMode`, and Next's pages default is false).

## Current

`../ui/src/components/nav/NavHeader.tsx:57-66,71,73` at `6b18227`: `isFocusLockEnabled = isMobile && isMobileMenuOpen`, a ref written in render from it, `shouldReturnFocus = useCallback(() => !isFocusLockEnabledRef.current, [])`, and `returnFocus={shouldReturnFocus}` on the `FocusOn`, whose `enabled` reads the same const. The mechanism the predicate answers: Next's app router turns React StrictMode on by default (`next@15.5.18`, `dist/build/define-env.js:126-127`), and StrictMode's development-only simulated unmount and remount of a newly mounted component (`next@15.5.18`'s vendored React, `dist/compiled/react-dom/cjs/react-dom-client.development.js:16559-16579` (React `19.2.0-canary-0bdb9206-20250818`, the copy the app router runs; the same functions sit at `react-dom@19.2.6`'s `cjs/react-dom-client.development.js:18697-18717`), absent from the `react-dom-client.production.js` beside it) remounts react-focus-lock's trap once right after it activates, so the default return moved focus from the panel back to the toggle on `pnpm dev` ([[a0cf59e507d8]]). The predicate refuses the return while the lock is enabled and allows it when the menu closes, so the rendered behavior is legacy's in development and in production alike (`audit/_probe2c98/escape-current-dev-postfix.txt` and `escape-current-prod-postfix.txt` beside `escape-legacy.txt`); the production build read legacy's behavior before the change too (`escape-current-prod-prefix.txt`). This item records the code shape alone, filed by the implementing agent of plan 2c98d95396bf.

## Verdict

## Log

- 2026-09-28: Filed by the implementing agent of plan 2c98d95396bf for its own deviation from legacy's `FocusOn` line, a shape no item recorded. Left open for the operator's judgment, likely rule 4 (upgrade-forced: the app router's default StrictMode, which legacy's pages router did not run), which the agent does not sanction (decision 2032533f).
