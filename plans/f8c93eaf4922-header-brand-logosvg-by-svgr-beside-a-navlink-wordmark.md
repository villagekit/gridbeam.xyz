---
title: "Header brand: LogoSvg by svgr beside a NavLink wordmark"
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
blocked_by: ffe8e5d56f8e
tags:
  - "worker:fable"
priority: medium
---
The header brand is legacy's again: `icon.svg` imported as a React component through svgr, a named image beside a `NavLink size="xl"` wordmark with legacy's gap, replacing the hand-authored `CubeLogo`. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`, `ad5363e4` (the header lock).

## Work

- Legacy source: `../node-modules/apps/gridkit/components/logo/{svg,index}.tsx`, `custom.d.ts`, `components/layouts/main.tsx:77-89` (`Brand`) and `packages/dev-next-config/src/index.mjs` (the svgr piece) at `fce357d`. Current: `app/_components/CubeLogo.tsx`, `app/_components/SiteBrand.tsx`, `next.config.ts`.
- svgr under Turbopack: `next.config.ts` gains a `turbopack.rules` entry running `@svgr/webpack` (MIT, a pinned devDependency) for `*.svg` imports, scoped so `app/icon.svg`'s metadata route and any `next/image` use of an svg keep working (a resource query or a narrower glob if the plain rule breaks either; the build says); `svg.d.ts` declares the module as legacy's `custom.d.ts` did. Every ported file opens with `// ported from https://github.com/villagekit/node-modules/blob/fce357d/...`.
- `app/_components/logo/svg.tsx` and `index.tsx` (exporting `svg` now; `gl` joins it in the cube slice): `LogoSvg` as legacy's, `role="img" aria-label="Grid Beam logo"` (rule 1 on `Grid Kit logo`), importing `app/icon.svg`, the byte-identical file (`4753de6f23c4`, `a05e17fde479`). Delete `app/_components/CubeLogo.tsx`; its other consumer, the generated Open Graph image, went with the document head slice.
- `app/_components/SiteBrand.tsx`: `<LogoSvg size="10" marginRight={2} />` as a sibling of `<NavLink as={NextLink} href="/" size="xl" onClick={onHideMobileMenu}>Grid Beam</NavLink>` (`722094a550f2`, `a342fd4b112a`, `14b82199f156`): no `HStack`, no `Heading`, no right padding. `@villagekit/ui@1.2.0`'s `NavLink` carries the `xl` size (`src/components/NavLink.tsx`).
- Closes `722094a550f2`, `a342fd4b112a`, `14b82199f156`, `4753de6f23c4`, `a05e17fde479`.
- Interfaces: produces the svgr rule the next.config slice's pipeline item cites.
- Verify first: Next 15.5's `turbopack.rules` accepts a loader for `*.svg` (the config schema in `node_modules/next/dist/server/config-schema.js`); `app/icon.svg` still serves as the favicon with the rule on (`curl -sI localhost:3000/icon.svg`).
- Docs: CLAUDE.md, Structure, names the shared components directory; add `logo/` to its list of what `app/_components/` holds if the sentence enumerates them.
- Not this slice: the WebGL cube (its own slice, the same directory); the CSP, redirects and flags (the next.config slice).

## Seams under test

None pure.

## Done when

- `audit/_root/dom/current.aria.yaml` (after `pnpm audit:dom`) shows `img "Grid Beam logo"` then `link "Grid Beam"` as siblings at the head of the banner, as `legacy.aria.yaml:3-4` shows `img "Grid Kit logo"` then `link "Grid Kit"`
- the wordmark's computed `font-size` is `30px` at 1280 and at 375 (a Playwright snippet in the scratchpad against `pnpm dev`), and `audit/_root/1280/current.png` beside `legacy.png` shows the same header height
- `ls app/_components/CubeLogo.tsx` fails and `grep -rn CubeLogo app` is empty
- `curl -sI localhost:3000/icon.svg` is 200 with `image/svg+xml`
- the five items are `fixed`, checked after the fixes
- `timeout 900 just check` is green

## Outcome

## Log
