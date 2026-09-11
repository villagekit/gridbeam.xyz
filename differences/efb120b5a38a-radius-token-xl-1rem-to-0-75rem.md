---
title: "Radius token xl: 1rem to 0.75rem"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/theme.ts:13-16`: `radii: { ...theme.radii, xl: '1rem' }`. `https://gridkit-landing-villagekit.vercel.app/` inline CSS: `--chakra-radii-xl:1rem`. Buttons use it (`@villagekit/ui@0.9.0 src/components/Button.tsx`, `borderRadius: 'xl'`).

## Current

No `radii` override in `@villagekit/ui@1.2.0 src/theme/index.ts` or `app/layout.tsx`; Chakra v3's default applies. `http://localhost:3000/` inline CSS: `--chakra-radii-xl:0.75rem`. Buttons still use `borderRadius: 'xl'` (`@villagekit/ui@1.2.0 src/components/Button.tsx`).

## Verdict

## Log
