---
title: "Body text and headings: Chakra v2's gray.800 body text to Chakra v3's fg on black"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's global styles set the body text to `chakra-body-text`, `gray.800` in light mode (`@chakra-ui/theme@3.3.1`: the token in `src/semantic-tokens.ts`, the `body` rule in `src/styles.ts`); `apps/gridkit/theme.ts` at `fce357d` does not touch it. Live legacy site, `/faq` and `/stories/how-to-cut-grid-beams` at 1280: the inline CSS prints `--chakra-colors-chakra-body-text:var(--chakra-colors-gray-800)` and `--chakra-colors-gray-800:#1A202C`, and the computed `color` of `body`, the `h1` and the first `h2` is `rgb(26, 32, 44)`: headings and any text outside a `Text` variant inherit it.

## Current

Chakra v3's global styles set the body text to the semantic token `fg`, `{colors.black}` in light mode (`node_modules/@chakra-ui/react@3.35.0/dist/esm/theme/semantic-tokens/colors.js:39`), and `black` is `#09090B` (`dist/esm/theme/tokens/colors.js`); `@villagekit/ui@1.2.0 src/theme/colors.ts` defines no `fg`. `pnpm dev` on 1.2.0, `/faq` at 1280: the inline CSS prints `--chakra-colors-fg:var(--chakra-colors-black)` and `--chakra-colors-black:#09090B`, so `body`, the `h1` and every `h2` render `rgb(9, 9, 11)` where legacy renders `rgb(26, 32, 44)`. The palette item `72b776cb0d3f` covers the `gray` literals the `Text` variants read, not the inherited body color.

## Verdict

## Log

- 2026-09-26: Filed and fixed by the palette slice c14505b76b6a, in ../ui as commit 9642114 (src/theme/colors.ts: fg.DEFAULT is Chakra v2's chakra-body-text, gray.800 in light and whiteAlpha.900 in dark), waiting on the operator's publish; the bump plan 99f2fe62c62f moves it to fixed. Measured on /faq at 1280 under the override: body, h1 and h2 compute to rgb(26, 32, 44) on both sides.
