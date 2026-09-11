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
