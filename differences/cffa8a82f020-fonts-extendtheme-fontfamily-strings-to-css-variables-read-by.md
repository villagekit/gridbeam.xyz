---
title: "Fonts: extendTheme fontFamily strings to CSS variables read by the ui theme"
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/theme.ts:1-26`: `Bitter({ subsets: ['latin'] })`, `Fredoka({ subsets: ['latin'], weight: '600' })`, their `style.fontFamily` written into `extendTheme({ fonts: { body, heading } }, theme)` in the site.

## Current

`app/layout.tsx:12-23,66`: the same fonts with `display: 'swap'` and `variable: '--font-body'` / `'--font-heading'` on `<html>`; `@villagekit/ui@1.2.0 src/theme/index.ts:26-29`: `fonts.body = var(--font-body, Bitter), ...` and `fonts.heading = var(--font-heading, Fredoka), ...`, plus `:37-44` `globalCss.html['--global-font-body']` for Chakra v3's reset. The rendered fonts match on both sides.

## Verdict

## Log

- 2026-09-12: Rule 4 covers `extendTheme` to `createSystem` and the `--global-font-body` override, not the theme moving into the package and reading CSS variables with hard-coded fallbacks. Visually equivalent; the shape of the code differs from the legacy author's.
