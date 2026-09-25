---
title: "Radius token scale: Chakra v2's sm 0.125rem and base 0.25rem to v3's sm 0.25rem, xs, 2xs, 4xl and l1 to l3"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/theme.ts:13-16` at `fce357d`: `radii: { ...theme.radii, xl: '1rem' }`, Chakra v2's scale kept under the one override. `https://gridkit-landing-villagekit.vercel.app/` inline CSS: `--chakra-radii-none:0`, `sm:0.125rem`, `base:0.25rem`, `md:0.375rem`, `lg:0.5rem`, `xl:1rem`, `2xl:1rem`, `3xl:1.5rem`, `full:9999px`.

## Current

`@villagekit/ui@1.2.0 src/theme/index.ts` sets no radii and `app/theme.ts` sets `xl` alone, so Chakra v3's scale applies. `http://localhost:3000/` inline CSS: `2xs:0.0625rem`, `xs:0.125rem`, `sm:0.25rem`, `md:0.375rem`, `lg:0.5rem`, `xl:1rem`, `2xl:1rem`, `3xl:1.5rem`, `4xl:2rem`, `full:9999px`, and `l1`, `l2`, `l3` aliasing `xs`, `sm`, `md`; no `base`. The ui's sources and the site name only `md`, `lg` and `xl`, equal on both sides; Chakra v3's own recipes (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/{input,native-select,checkbox,select,...}.js`) read `l1` to `l3` and `sm`, so a control the ui leaves on a v3 recipe rounds to v3's scale.

## Verdict

## Log

- 2026-09-26: Found at the Parity review of the site theme slice (plan [[39b1a28bb0cc]]); pre-existing, not introduced there. The scale is the package's theme, so the fix is the ui's (the recipes slice [[45d6f5634a11]], whose input recipe item [[6b5488415a06]] already pins the input's radius to v2's md), or rule 4 judged on it; never a site-side spread of v2's values.
