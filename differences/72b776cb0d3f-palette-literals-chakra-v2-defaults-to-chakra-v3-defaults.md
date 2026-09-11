---
title: "Palette literals: Chakra v2 defaults to Chakra v3 defaults"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/theme/colors.ts` maps `primary`, `accentA`, `accentB` to Chakra v2's `pink`, `cyan`, `yellow` and leaves `gray` to Chakra v2 (`@chakra-ui/theme@3.3.1` in the legacy lockfile): `gray.700 #2D3748`, `gray.900 #171923`, `pink.400 #ED64A6`, `cyan.400 #0BC5EA`, `yellow.400 #ECC94B`. `Text` variant `secondary` is `gray.700` (`src/components/Text.tsx`).

## Current

`@villagekit/ui@1.2.0 src/theme/colors.ts` maps the same roles with `definePalette('pink' | 'cyan' | 'yellow')` over Chakra v3's tokens (`@chakra-ui/react@3.35.0 dist/esm/theme/tokens/colors.js`): `gray.700 #3f3f46`, `gray.900 #18181b`, `pink.400 #f472b6`, `cyan.400 #22d3ee`, `yellow.400 #facc15`. Same `secondary` to `gray.700` mapping (`src/components/Text.tsx`). `definePalette` (`src/theme/colors.ts:25-39`) also adds the Chakra v3 semantic slots `contrast`, `fg`, `subtle`, `muted`, `emphasized`, `solid`, `border`, `focusRing`, and `outlineColor` becomes `{colors.cyan.600/50}` (`:52`) where 0.9.0 used `transparentize`; those follow the `colorPalette` mechanism (rule 4), the literals do not. The May 2026 audit's observation that the site reads greyer than legacy (note `526d5330`): body and secondary text render in the neutral v3 grays beside the accents instead of the cool v2 grays.

## Verdict

## Log

- 2026-09-12: Rule 4 does not cover it: Chakra v3 ships a new default palette but does not force it; `definePalette` can carry the v2 literals.
