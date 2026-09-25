---
title: "Header brand: LogoSvg by svgr beside a NavLink wordmark"
status: done
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

Shipped: the header brand is legacy's `Brand` again. `app/_components/logo/svg.tsx` and `index.tsx` are `logo/svg.tsx` and `logo/index.tsx` at `fce357d` (the `gl` export waits for the cube slice), `LogoSvg` importing `@/app/icon.svg` through `@svgr/webpack@8.1.0` (the version legacy's `next-plugin-svgr` resolved, so the svgo pass and the emitted markup are the same), `role="img" aria-label="Grid Beam logo"` by rule 1. `app/_components/SiteBrand.tsx` is `main.tsx:77-89`: a fragment of `<LogoSvg size="10" marginRight={2} />` and `<NavLink as={NextLink} href="/" onClick={onHideMobileMenu} size="xl">Grid Beam</NavLink>`, `sx` to a style prop being the one Chakra v3 translation. `next.config.ts` carries the `turbopack.rules` entry for `*.svg` (`loaders: ['@svgr/webpack'], as: '*.js'`, the shape `config-schema.js` accepts) and `svg.d.ts` the module declaration. `app/_components/CubeLogo.tsx` is deleted. Closed: `722094a550f2`, `a342fd4b112a`, `14b82199f156`, `4753de6f23c4`, `a05e17fde479`.

Proof: on `pnpm dev`, `curl -sI localhost:3000/icon.svg` is 200 `image/svg+xml` with the raw file, so the plain `*.svg` rule leaves the metadata route alone and no narrower glob was needed; the rendered header on `/` is legacy's markup shape (`<div size="10">` around the svgo-optimized `<svg role="img" aria-label="Grid Beam logo" width="100%" height="100%">`, then the `chakra-link` wordmark); `audit/_root/dom/current.aria.yaml` shows `img "Grid Beam logo"` then `link "Grid Beam"` as siblings at the head of the banner as `legacy.aria.yaml:3-4` does; a Playwright measurement at 1280 and 375 gives the wordmark `30px` with line height `45px`, the logo box 40 by 40 with `margin-right: 8px`, an 8px gap and a 63px nav on both sides; the screenshot pairs at 375, 768 and 1280 looked at, the header strips matching at 375 and 1280; `timeout 900 just check` green (78 tests); `kipu verify --warnings-as-errors` green.

Deviations and facts found in flight:
- `svg.d.ts` types nothing: Next's `image-types/global` (referenced by `next-env.d.ts`) declares `*.svg` as `any` and wins, as it did on the legacy site, so `Content` is `any`. The file records the shape and its comment says so (the Standards review).
- `@svgr/webpack` is pinned exact (`8.1.0`) where the other entries carry a caret: the plan asked for a pinned devDependency. The lockfile diff is large (about 8,400 lines) because `next` has an optional peer on `@babel/core`, and every package keyed on `next` re-keys once babel is present; no version changed.
- The docs ask leads to no edit: CLAUDE.md, Structure, does not enumerate what `app/_components/` holds.
- Filed at the Parity review: `1d2562d6b3bc`, `regression`, the wordmark wrapping at 768 and the header growing to 108px against legacy's 63px. The brand is legacy's shape; the four-item nav, the `Find a supplier` action and the longer wordmark leave the brand column narrower than the wordmark at md, and the old `whiteSpace="nowrap"` helper was legacy's neither. The fix is the operator's call; a note on `fb033121d164` (the 768 overflow sum item) points at it and refreshes its stale Current.

Findings dropped: TSDoc on `LogoSvg`, `LogoSvgProps` and `SiteBrand` (legacy and the neighboring shell components have none; the audit slice `b209e5941cdd` owns TSDoc on every export); the Parity reviewer's call to fold the 768 wrap into `fb033121d164` as a note only, kept as its own item since it is a distinct visible difference a plan must close.

## Log
