---
title: "Engine 0.10.0: tooltip portal containerRef dropped from HelperTooltip, the slider tooltip and ProductKitInfo"
status: regression
route: /designs/bed-frame
axis: code
kind: removed
---
## Legacy

`gridkit@v0.9.0 core/parameters/src/components/helper-tooltip.tsx:2,10-12`, `values/number.tsx:33,49-53` and `products/kit/src/info.tsx:9-11,52-63` read `containerRef` from the internal context and pass `portalProps={{ containerRef }}`.

## Current

`node_modules/@villagekit/parameters/src/components/helper-tooltip.tsx`, `values/number.tsx:47` and `node_modules/@villagekit/product-kit/src/info.tsx:9-11` pass no `portalProps`; `ParamControls` still accepts `containerRef` and nothing reads it.

## Verdict

## Log

- 2026-09-12: Template. Inert on this route: neither side passes a `containerRef` (`[id].tsx:97`, `DesignViewer.tsx:56`).

- 2026-09-27: From the design pages record's split (plan 0bc88eaf5493): the inert reading above is wrong on both sides. The page passes no containerRef, but the sandbox passes its own to InfoComponent, to ParamControls and to its rotate-the-screen tooltip (gridkit v0.9.0 core/sandbox/src/controls/index.tsx:193,208,216; node_modules/@villagekit/sandbox/src/controls/index.tsx:193,208 still passes it and 0.10.0's consumers ignore it), and the fullscreen button sits in every design page's toolbar, so in fullscreen legacy's parameter and dimension tooltips render inside the fullscreen element and this site's portal to a body fullscreen hides. Owned by the sibling slice [[4f55a829c726]] beside the shell record, which restores portalProps on the ui Tooltip and InfoTooltip and the engine's four call sites under decision 28c1a536 and parks this item upstream.
