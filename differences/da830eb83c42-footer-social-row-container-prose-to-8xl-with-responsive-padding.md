---
title: "Footer social row container: prose to 8xl with responsive padding"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-brand/src/components/Footer.tsx:26`: `<Container>` around the social row, the Chakra v2 default (`@chakra-ui/theme@3.3.1` `components/container.js`: `maxW: 'prose'`, `px: 4`). Measured on the live legacy site at 1280 and 768: the container 600px wide with 16px padding, the ten icons spanning 558px (`audit/_root/1280/legacy.png`, `audit/_root/768/legacy.png`, footer).

## Current

`app/_components/SiteFooter.tsx`: `<Container>` from `@villagekit/ui@1.2.0`, Chakra v3's re-export with no recipe override in the ui provider (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/container.js`: `maxWidth: '8xl'`, `px: { base: 4, md: 6, lg: 8 }`). Measured on `pnpm dev` at 1280: the container 1280px wide with 32px padding, the eight icons spanning 1110px; at 768: 768px wide, 676px span (`audit/_root/1280/current.png`, `audit/_root/768/current.png`, footer). At 375 both sides fill the viewport.

## Verdict

## Log

- 2026-09-26: Found by the site footer slice (plan [[5e4529a6aeac]]): no rule covers the wider row, so regression. The Container is the package's and the site's markup is legacy's bare Container, so the fix is the ui side's, not a site-side maxW: the brand footer slice [[1977c9af920c]] re-ports the Container around the social row, or the recipes slice [[45d6f5634a11]] gives the ui provider legacy's container default.
