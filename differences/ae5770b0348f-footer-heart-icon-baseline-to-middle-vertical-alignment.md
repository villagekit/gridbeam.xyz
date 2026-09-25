---
title: "Footer heart icon: baseline to middle vertical alignment"
status: fixed
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-brand/src/components/Footer.tsx:57`: `<Icon as={FaHeart} title="love" sx={{ color: 'primary.400' }} />` inline in the credit paragraph; Chakra v2's `Icon` (`@chakra-ui/icon@3.2.0` `dist/chunk-2GBDXOMA.mjs`, the version legacy's lock pins) styles `w`, `h`, `display: inline-block`, `lineHeight` and `flexShrink` and sets no `verticalAlign`, so the svg sits on the baseline: measured on the live legacy site at 1280, the heart's top 1px below the paragraph's top in a 21px line (`audit/_root/1280/legacy.png`, footer).

## Current

`app/_components/SiteFooter.tsx`, the credit paragraph's `<Icon>` from `@villagekit/ui@1.2.0`, Chakra v3's; its icon recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/icon.js`) adds `verticalAlign: middle`, so the heart drops to 4.3px below the paragraph's top in the same 21px line, measured on `pnpm dev` at 1280 before the fix (`audit/_root/1280/current.png`, footer).

## Verdict

plan 5e4529a6

## Log

- 2026-09-26: Found at the Spec review of the site footer slice (plan [[5e4529a6aeac]]), which closes it in place: `verticalAlign="baseline"` on the heart, the one change Chakra v3's recipe forces, with a comment naming the constraint.
