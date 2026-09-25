---
title: Footer WebGL logo cube
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
blocked_by:
  - target: 5e4529a6aeac
    strength: soft
  - target: f8c93eaf4922
    strength: soft
tags:
  - "worker:fable"
priority: medium
---
The footer shows legacy's rotating WebGL cube again between the social row and the credit block: `logo/gl.tsx` re-ported onto `@react-three/fiber` 9 and `three` 0.165, loaded on the client only. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`, `ad5363e4`.

## Work

- Legacy source: `../node-modules/apps/gridkit/components/logo/gl.tsx` (220 lines) and `components/footer.tsx:19,126` at `fce357d`. Current: `app/_components/SiteFooter.tsx`; `@react-three/fiber` and `three` are dependencies already (`package.json`).
- `app/_components/logo/gl.tsx`: the same scene (six instanced faces, the holes, `useFrame` rotation, an orthographic camera fitted to the group's bounding box, events off), translated: r3f 8 to 9 (`resize.polyfill` and `@juggle/resize-observer` only if r3f 9 still takes them, else dropped, since every target browser has `ResizeObserver`); `@react-three/drei`'s `RoundedBox` at the drei version that pairs with r3f 9 (MIT), or `RoundedBoxGeometry` from `three/examples` if drei's footprint is not worth one box (say which in the Outcome); the face colours from the theme tokens (`useChakraContext().token('colors.cyan.400')`, pink and yellow) so the palette slice's literals flow through at the bump; `role="img" aria-label="Grid Beam logo"` (rule 1). The file opens with its `// ported from https://github.com/villagekit/node-modules/blob/fce357d/...` citation.
- `SiteFooter.tsx`: `const LogoGl = dynamic(() => import('./logo/gl'), { ssr: false })`, rendered as `<LogoGl size="12" />` between the social row and the credit block, where legacy's brand footer placed its children. The cube rotates as legacy's did; a reduced-motion preference is not legacy's and not this slice's.
- Closes `625a06dd5951`.
- Verify first: r3f 9's `Canvas` props at the pinned version (`node_modules/@react-three/fiber`): `orthographic`, `onCreated`, `resize`.
- Not this slice: the header logo (the brand slice, the same directory); the ui footer fold-in (at the bump the site passes the cube as the brand footer's children).

## Seams under test

None pure.

## Done when

- `audit/_root/1280/current.png` and `375/current.png` show the cube in the footer where `legacy.png` shows it, and `audit/_root/dom/current.aria.yaml` has `img "Grid Beam logo"` in the footer
- on `pnpm dev` at `/` the cube rotates and the browser console shows no r3f or three warning
- the item is `fixed`, checked after the fix
- `timeout 900 just check` is green

## Outcome

## Log
