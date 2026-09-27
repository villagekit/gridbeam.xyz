---
title: "Mobile menu open: focus moves to the panel on legacy and stays on the toggle here, which shows the toolbar variant's focus color gray.700 in place of gray.900 while the menu is open"
status: regression
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
