---
title: "Site theme: the fonts, the xl radius and smooth scrolling on the ui system"
status: done
parent: a78b167170b8
derived_from: a78b167170b8
blocked_by:
  - target: ffe8e5d56f8e
    strength: soft
tags:
  - "worker:fable"
priority: medium
---
The site extends the ui's theme the way legacy's `theme.ts` extended it: the two `next/font` families written into the font tokens, `radii.xl` at `1rem`, and `html { scroll-behavior: smooth }` as a global style, composed with the ui's config into the system the provider mounts. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`.

## Work

- Legacy source: `../node-modules/apps/gridkit/theme.ts` and `pages/_app.tsx:45` at `fce357d`. Current: `app/layout.tsx:12-23` (the fonts as CSS variables on `<html>`), `@villagekit/ui@1.2.0 src/theme/index.ts` (the package reads `var(--font-body, Bitter)` and sets `--global-font-body`), `src/Provider.tsx` (a bare `ChakraProvider` with the package's `system`).
- `app/theme.ts`, at the app root as legacy's was: `createSystem(defaultConfig, config, siteConfig)` from `@villagekit/ui@1.2.0`'s exports (`config`, `createSystem`, `defaultConfig`, `defineConfig`); `siteConfig` writes `theme.tokens.fonts.body` and `.heading` from `bitter.style.fontFamily` and `fredoka.style.fontFamily` (`cffa8a82f020`: the site writes the families into the theme, and the `--font-body` and `--font-heading` variables on `<html>` go), `theme.tokens.radii.xl` `1rem` (`efb120b5a38a`) and `globalCss.html.scrollBehavior: 'smooth'` (`d70e4a99216a`). The ui's `--global-font-body` keeps pointing at the body token, so the reset reads the site's value.
- `app/layout.tsx` mounts `<ChakraProvider value={system}>` (re-exported by the ui) in place of the ui's `Provider`, inside `EmotionRegistry`, through a small client component if the server layout cannot hold it.
- Closes `cffa8a82f020`, `efb120b5a38a`, `d70e4a99216a`.
- Verify first: `createSystem(defaultConfig, config, siteConfig)` merges with the later config winning on tokens (Chakra v3's `mergeConfigs` in `node_modules/@chakra-ui/react`); the `style.fontFamily` strings `next/font` returns are safe as token values (their quoting).
- Not this slice: the palette and recipes (the ui slices); `QueryParamProvider` and the content layout (the layout composition slice, which follows this one on `app/layout.tsx`). The ui recipes slice gives the ui `Provider` a `system` prop and the Toaster; at the bump the site swaps this slice's `ChakraProvider value={system}` for `Provider system={system}` (that slice's bump note), so the toast regions return with the publish.

## Seams under test

None pure.

## Done when

- `curl -s localhost:3000/ | grep -o -- '--chakra-radii-xl:[^;]*'` prints `1rem`
- `getComputedStyle(document.documentElement).scrollBehavior` is `smooth` on `/` (a Playwright snippet in the scratchpad against `pnpm dev`), and an in-page anchor on `/faq` scrolls instead of snapping
- the computed `font-family` on `body` and on an `h1` name Bitter and Fredoka, the same faces as before the change; `grep -c -- '--font-body' app/layout.tsx` prints 0
- the three items are `fixed`, checked after the fixes
- `timeout 900 just check` is green

## Outcome

Shipped: the site extends the ui's theme the way legacy's `theme.ts` did. `app/theme.ts` is `apps/gridkit/theme.ts` at `fce357d` translated from Chakra v2's `extendTheme(overrides, theme)` to v3's `createSystem(defaultConfig, config, defineConfig(overrides))` on `@villagekit/ui@1.2.0`'s exports: `Bitter({ subsets: ['latin'] })` and `Fredoka({ subsets: ['latin'], weight: '600' })` as legacy wrote them, their `style.fontFamily` in `theme.tokens.fonts.body` and `.heading`, `radii.xl` at `1rem`, and `globalCss.html.scrollBehavior: 'smooth'`; the default export as legacy's. `app/_components/SiteProvider.tsx` is legacy's `<ChakraProvider theme={theme}>` from `_app.tsx`, a client component because Chakra's system holds functions and cannot cross the server layout's boundary as a prop; `app/layout.tsx` mounts it inside `EmotionRegistry` in place of the ui's `Provider`, and loses the `next/font` calls, the `display: 'swap'` (next/font's default, `validate-google-font-function-call.js:12`) and the `--font-body` and `--font-heading` variables on `<html>`. The ui's `--global-font-body: {fonts.body}` deep-merges with the site's `html` global style (`merge-config.js`, `utils/merge.js`: a later config wins on a leaf, objects merge), so Chakra's reset reads the site's family. Closed: `cffa8a82f020`, `efb120b5a38a`, `d70e4a99216a`. CLAUDE.md's Conventions and Structure name `app/theme.ts` in the shell.

Proof: on `pnpm dev`, `curl -s localhost:3000/ | grep -o -- '--chakra-radii-xl:[^;]*'` prints `--chakra-radii-xl:1rem` (was `0.75rem`; legacy's live home prints `1rem`); the served tokens are `--chakra-fonts-body:'Bitter','Bitter Fallback'` and `--chakra-fonts-heading:'Fredoka','Fredoka Fallback'` against legacy's `'__Bitter_61f0f1','__Bitter_Fallback_61f0f1'` and the Fredoka pair (the same faces; Next 15's `next/font` names the family plainly where legacy's Next hashed it), and `--global-font-body:var(--chakra-fonts-body)`; a Playwright probe before and after the change reads the computed `font-family` on `body` as Bitter and on the `h1` as Fredoka both times, `document.fonts` with Bitter 100 to 900 and Fredoka 600 loaded both times, and `scrollBehavior` on the document element `auto` before and `smooth` after; on `/faq`, setting `location.hash` to `#faq-other` (the route has ids and no in-page links) snapped to 1449 px before and after the change sampled `0, 10, 48, 140, 508, 788, 1035, 1139, 1216, 1299, 1340, 1385` at 40 ms; the `<html>` element carries no class; after `next build`, `.next/server/app/index.html` carries the two `<link rel="preload" as="font">` in its static head as legacy's home does, with `--chakra-radii-xl:1rem`, the Bitter token and `scroll-behavior:smooth` inline; `grep -c -- '--font-body' app/layout.tsx` prints 0; the screenshot pairs for `/`, `/faq` and `/tools/cutting-planner` at 375, 768 and 1280 looked at, the faces the same on both sides and the buttons' rounding legacy's; `timeout 900 just check` green; `kipu verify --warnings-as-errors` green.

Deviations and facts found in flight:
- Legacy's `radii: { ...theme.radii, xl: '1rem' }` spread is dropped: v3's `mergeConfigs` deep-merges the token tree, so `radii: { xl: { value: '1rem' } }` keeps every other radius, where v2's `extendTheme` needed the spread to keep them.
- The site's font tokens no longer carry the ui's system-font fallback chain (`-apple-system, ...`): legacy's tokens were `next/font`'s family and its size-adjusted fallback alone, and the port is legacy's shape.
- The recipes and provider slice `45d6f5634a11` gives the ui `Provider` a `system` prop; at the bump, `SiteProvider` swaps `ChakraProvider value={system}` for `Provider system={system}`, which is what brings the toast regions back (that slice's note on `99f2fe62c62f`).
- The layout composition slice `a7bf623f885c` mounts `QueryParamProvider` in a client component the layout renders: `SiteProvider` is that component if its worker wants one boundary.
- Filed `f40107b60034`, `regression`, found by the Parity review and pre-existing: Chakra v3's radius scale (`sm` 0.25rem, `xs`, `2xs`, `4xl`, `l1` to `l3`, no `base`) where legacy's spread kept v2's (`sm` 0.125rem, `base` 0.25rem). The ui's sources and the site name only `md`, `lg` and `xl`, equal on both sides; v3's own recipes read the changed scale, so the fix is the package theme's (the recipes slice `45d6f5634a11`, noted there), never a site-side spread.
- The Spec review found the ui's `var(--font-body, Bitter)` tokens and the comment above them dead for this site now: noted on `45d6f5634a11`, the package theme's slice.

Findings applied: the Standards review's rename of the provider's local import from `theme` to `system`, the ui's word for a v3 system and the plan's, and its rewording of `SiteProvider`'s doc comment. Findings dropped: none. The plan's Done-when line for an in-page anchor on `/faq` ran as a `location.hash` jump, since the route has no in-page link; the proof above says so.

## Log
