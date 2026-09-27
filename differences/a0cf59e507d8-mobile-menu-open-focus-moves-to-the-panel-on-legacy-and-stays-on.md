---
title: "Mobile menu open: focus moves to the panel on legacy and stays on the toggle here, which shows the toolbar variant's focus color gray.700 in place of gray.900 while the menu is open"
status: upstream
route: shell
axis: interaction
kind: changed
---
## Legacy

`packages/ui-nav/src/components/NavHeader.tsx:44-48,63-67` at `fce357d`: the header is wrapped in `react-focus-on`'s `<FocusOn enabled={isMobile && isMobileMenuOpen} autoFocus onEscapeKey={onHideMobileMenu} onActivation={handleActivation}>`, and `handleActivation` focuses the `[data-autofocus]` element, the menu panel (`NavMobileMenu.tsx:31-35`, `role="toolbar"`, `data-autofocus`, `tabIndex={-1}`). Verified live at 375 on `https://gridkit-landing-villagekit.vercel.app/`: after a click on `Toggle menu`, `document.activeElement` is the panel, `div#disclosure-:r1:` with `data-autofocus`, at 400 ms and at 1500 ms, and the toggle reads `rgb(23, 25, 35)` (`gray.900`) once the pointer leaves it (`audit/_probeea45/menu-focus-probe.mjs`, `audit/_probeea45/legacy.json`).

## Current

`../ui/src/components/nav/NavHeader.tsx:51-63` (1cf88ed and later): the same `FocusOn` with `autoFocus`, `onActivation` and the `[data-autofocus]` query; `NavMobileMenu.tsx:55-61`: the same panel with `data-autofocus` and `tabIndex={-1}`. Verified on `pnpm dev` under the `file:../ui` override at 375 on `/`: after a click on `Toggle menu`, `document.activeElement` stays the toggle button at 400 ms and at 1500 ms, so the toggle reads the `toolbar` variant's focus color, `rgb(46, 55, 72)` in the probe's frame (`gray.700` is `rgb(45, 55, 72)`), in place of `gray.900` while the menu is open and the pointer is away, until something else takes focus (`audit/_probeea45/before.json` and `after.json`, `restStillFocusedOpen`, the same before and after plan ea455fbe31c4's fix, which does not touch it). Found by plan ea455fbe31c4's focus probe over every `toolbar`-variant consumer; the mechanism (the activation callback not firing, or firing before the panel is focusable) is not diagnosed here.

## Verdict

## Log

- 2026-09-28: Filed by the implementing agent of plan ea455fbe31c4 from its focus probe over the toolbar-variant consumers, outside that slice's scope (the sandbox's off toggles). Regression by default (decision 2032533f), not sanctioned by the agent; not judged. A fix belongs in ../ui, the nav's focus activation; handed to a slice beside the shell record.

- 2026-09-28: Handed to the ../ui slice [[2c98d95396bf]], minted beside the shell record at plan ea455fbe31c4's finish (decision 40abdb2f222a): the nav header's mobile menu activation focuses the panel again, blocking the bump plan 99f2fe62c62f. The state stays regression until the slice moves it to upstream with the sibling commit.

- 2026-09-28: Fixed in ../ui by commit 6b18227 on its main over 748aeb5 (plan 2c98d95396bf): NavHeader passes react-focus-on a returnFocus predicate that refuses the return while the lock is enabled. Diagnosis: the activation did fire and did focus the panel (audit/_probe2c98/focus-trace.mjs, trace-current-dev-prefix.txt: handleActivation focuses the panel at 76.5 ms, then react-focus-lock's returnFocus focuses the toggle at 80.4 ms from a microtask with no caller frame). That return runs only when the trap leaves the trap list, and React StrictMode's development-only simulated unmount and remount of a newly mounted component (react-dom 19.2.6, react-dom-client.development.js:16559-16579, absent from the production build) unmounts and remounts the trap once right after it activates; the app router turns StrictMode on by default (next 15.5.18, dist/build/define-env.js:126-127), where legacy's pages router did not. The Current section above is therefore a development reading: the production build of the pre-fix sibling already read the panel active at 400 and 1500 ms and the toggle active after Escape, the live legacy site's readings (escape-current-prod-prefix.txt beside escape-legacy.txt). After the fix, pnpm dev under the override and the production build both read the panel at 400 and 1500 ms, the toggle rgb(23, 25, 35) with the menu open and the pointer away, and the toggle focused after Escape (escape-current-dev-postfix.txt, escape-current-prod-postfix.txt). Waits on the publish; the bump plan 99f2fe62c62f moves it to fixed.

- 2026-09-28: A correction to the note above, from the Standards and Spec reviews of plan 2c98d95396bf: the cited lines 16559-16579 are in Next's vendored React, next@15.5.18 dist/compiled/react-dom/cjs/react-dom-client.development.js (React 19.2.0-canary-0bdb9206-20250818, the copy the app router runs), not in react-dom@19.2.6, where the same functions sit at cjs/react-dom-client.development.js:18697-18717; the production file beside each has neither.
