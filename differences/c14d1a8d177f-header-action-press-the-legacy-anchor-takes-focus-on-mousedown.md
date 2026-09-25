---
title: "Header action press: the legacy anchor takes focus on mousedown and shows the outline ring, the current one does not"
status: open
route: shell
axis: interaction
kind: changed
---
## Legacy

The header action at 1280 is the Cart, a Chakra v2 button rendered as an anchor (`apps/gridkit/components/layouts/main.tsx:99-107` at `fce357d`, a `LinkIconButton` of `@villagekit/ui@0.9.0`). On the live site it takes focus on mousedown: while the pointer is down on it `document.activeElement` is the anchor and its computed `box-shadow` is the theme's `outline` ring, `rgba(0, 163, 196, 0.5) 0px 0px 0px 2px` (the scratchpad's `press-legacy.json`, `action1280.press`, and `press-shot.mjs`, `focused: true`, read on 2026-09-26 with Playwright's Chromium). A plain anchor, the footer's `Designs` link, takes no focus on mousedown on the same site (`focus-press.mjs`).

## Current

The header action at 1280 is `Find a supplier`, a `LinkButton` of `@villagekit/ui` (`app/_components/SiteHeaderAction.tsx`), an anchor with the classes `chakra-link chakra-button`. On `pnpm dev` under the `file:../ui` override at the sibling's `d736bfe` plus the press-transform fix it takes no focus on mousedown: `document.activeElement` stays `body` and no ring shows while pressed (`press-override-after.json`, `action1280.press.shadow: none`; `press-shot.mjs`, `focused: false`). The mobile menu toggle at 375, a `button`, takes focus and shows the ring on press on both sites. What in Chakra v2's button made the anchor mouse-focusable, and what in Chakra v3's or the framework link does not, was not read; found beside the scope of `8a869061bce7`, which changes only the press transform.

## Verdict

## Log
