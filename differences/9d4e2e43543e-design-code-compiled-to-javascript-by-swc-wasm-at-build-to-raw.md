---
title: "Design code: compiled to JavaScript by @swc/wasm at build to raw TypeScript compiled in the browser"
status: regression
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`packages/designs/src/index.ts:44-66` `getDesign` runs the design's `.ts` through `@swc/wasm` `transform()` (`syntax: 'typescript'`, inline source maps) and rewrites `meta.exports` to `.js`, so the page receives JavaScript.

## Current

`scripts/generate-designs-data.mjs:48-56` embeds the `.ts` text verbatim (`designs-data.generated.ts`, `exports: './bed-frame.ts'` unchanged); compilation happens on every visit in `@villagekit/product-kit@0.10.0 src/renders/typescript.tsx:24-70` (`@swc/wasm-web`, byte-identical to v0.9.0), a path the legacy page never took.

## Verdict

## Log

- 2026-09-12: Template.

- 2026-09-12: Visible effect measured on both sides (probe, plan cf52c388): the page first paints `0 x 0 x 0mm` with no preset controls while the design loads, on the legacy site from about 0.2 s to 1.7 s after commit, on the current dev server from about 3.3 s to 8.8 s; the placeholder state is the same, its length differs (dev-server timings, not production). A networkidle capture taken during the 44-route `audit:dom` run caught the placeholder on the current side.

- 2026-09-27: By the library slice [[79cec2c9c850]]: app/_lib/designs.ts is legacy's packages/designs/src/index.ts in shape, and getDesign is where the swc compile of a design's .ts code lands when the design pages record [[0bc88eaf5493]] closes this item; the function carries a one-line comment naming it.

- 2026-09-28: The generator this item cites as `scripts/generate-designs-data.mjs` is now `scripts/generate-designs-data.ts`, ported to TypeScript with the same behavior (plan d04ec0d664be); read its line numbers against the new file.
