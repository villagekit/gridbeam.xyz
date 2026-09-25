---
title: "Site theme: the fonts, the xl radius and smooth scrolling on the ui system"
status: todo
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

## Log
