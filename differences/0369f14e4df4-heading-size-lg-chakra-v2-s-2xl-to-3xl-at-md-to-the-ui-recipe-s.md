---
title: "Heading size lg: Chakra v2's 2xl to 3xl at md to the ui recipe's xl to 2xl"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Heading.tsx:19-23`: `headingTheme` sets no sizes, so `size="lg"` is Chakra v2's (`@chakra-ui/theme@3.3.1` `dist/components/heading.js`: `fontSize: ['2xl', null, '3xl']`, `lineHeight: [1.33, null, 1.2]`). Rendered by the story pages' `h2` (`packages/ui-mdx/src/heading.tsx:15` `size="lg"`). Measured on the live legacy site on `/stories/whats-a-grid-unit`, the `Base Units` heading: 30px on a 36px line at 1280, 24px on a 31.92px line at 375.

## Current

`@villagekit/ui@1.2.0 src/components/Heading.tsx:33-37`: `headingRecipe` size `lg: { fontSize: { base: 'xl', md: '2xl' }, lineHeight: { base: '1.33', md: '1.2' } }`, one step below v2's, so the same `h2` (`../ui/src/mdx/heading.tsx:15` `size="lg"`) renders 24px on a 28.8px line at 1280 and 20px on a 26.6px line at 375 (the token sizes `2xl` 1.5rem and `xl` 1.25rem at the recipe's line heights). Every `Heading size="lg"` on the site, so filed on `shell`; `77cd1426ac65` records `md` beside it.

## Verdict

## Log

- 2026-09-26: Found by the recipes slice [[45d6f5634a11]] while re-porting the heading scale for [[77cd1426ac65]]; pre-existing. No rule covers a smaller heading, so regression; the fix is the ui Heading recipe's.

- 2026-09-26: Fixed in ../ui by the recipes and provider slice [[45d6f5634a11]], commit 540e9c3: src/components/Heading.tsx: headingRecipe size lg is fontSize 2xl to 3xl at md on lineHeight 1.33 to 1.2; measured on the story page's first h2, 30px on 36px at 1280 and 24px on 31.92px at 375, on both sides. Waits in upstream for the bump plan [[99f2fe62c62f]].
