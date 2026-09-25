---
title: Footer WebGL logo cube
status: done
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

Shipped: the footer shows legacy's rotating WebGL cube again. `app/_components/logo/gl.tsx` is `logo/gl.tsx` at `fce357d` on `@react-three/fiber@9.6.1` and `three@0.165.0`: the same six instanced faces, four holes, `useFrame` rotation, orthographic camera fitted to the group's bounding box, events off in `onCreated`, `Object3D.DEFAULT_UP` set as legacy set it (the same value `@villagekit/sandbox`'s `globals.js` sets). `@react-three/drei@10.7.7` (MIT, the drei that pairs with r3f 9, already in the store as `@villagekit/sandbox`'s dependency, so the install grows by nothing) keeps legacy's `RoundedBox` with `radius` and `smoothness={4}`; `three/examples`'s `RoundedBoxGeometry` was not taken because it changes the geometry (a subdivided box, not drei's extruded bevel) for no gain. r3f 9's `Canvas` still takes `resize.polyfill` (`react-use-measure@2.1.7`'s `Options`), so `@juggle/resize-observer@3.4.0` (Apache-2.0) stays as legacy's dependency and the `resize={{ polyfill: ResizeObserver }}` prop stays. The face colours read `useChakraContext().token('colors.cyan.400')`, `pink.400` and `yellow.400` (Chakra v3's `token()` returns the hex value), so the palette slice's literals flow through at the bump (`72b776cb0d3f`); `role="img" aria-label="Grid Beam logo"` by rule 1. `app/_components/SiteFooter.tsx` is legacy's `footer.tsx:19,126`: `dynamic(() => import('./logo/gl'), { ssr: false })` rendered as `<LogoGl size="12" />` between the social row's Container and the slogan, where ui-brand's Footer placed its children. Closed: `625a06dd5951`.

Translations forced by the upgrade: the six `// @ts-ignore` on `InstancedMesh.setColorAt` are gone, `@types/three@0.165` types it; `useEffect(() => () => mesh.dispose(), [mesh])` becomes a block body, since `InstancedMesh.dispose` returns the mesh and React 19's effect destructor type is `void`; `useTheme().colors.cyan[400]` becomes the `token()` read. `logo/index.tsx` keeps the brand slice's `export * from './svg'` alone where legacy's barrel also re-exported `gl` and the brand slice's plan expected `gl` to join it here: `SiteBrand` imports the barrel from the layout, so re-exporting `gl` would evaluate three, drei and the polyfill in every route's server render and put them in every route's client bundle through the header, against the client-only `ssr: false` import legacy's footer wrote for it; the footer imports `./logo/gl` by path, as legacy's did. Legacy paid that cost, so the reason is an agent's and covers no rule: filed at the Parity review as `2f91880a9f4a`, `regression`, code axis, for the operator to judge (the one-line re-export or a rule 5 sanction).

Proof: on `pnpm dev`, a Playwright probe (`chromium.launch()` headless, whose default WebGL is ANGLE on SwiftShader Vulkan, no flag needed) at `/` finds `footer [role="img"][aria-label="Grid Beam logo"]` 48 by 48 with a 48 by 48 canvas between the social row's `chakra-container` and the credit `section`, two canvas captures 600 ms apart differ (the cube rotates), and the console carries no r3f or three message (the page's messages are the pre-existing kebab-case css error and the LCP image warning, and the GPU-stall warnings the probe's own `readPixels` raised); `audit/_root/{375,768,1280}/current.png` show the cube in the footer where `legacy.png` shows it, the same size, the faces at Chakra v3's cyan, pink and yellow (`72b776cb0d3f`); `audit/_root/dom/current.aria.yaml:184` has `img "Grid Beam logo"` after the social row as `legacy.aria.yaml:173` has `img "Grid Kit logo"`.

Gate: `timeout 900 just check` green; `kipu verify --warnings-as-errors` green.

Findings dropped: TSDoc on `LogoGl` and `LogoGlProps` (the Standards review; legacy and the neighboring logo and shell components have none, and the audit slice `b209e5941cdd` owns TSDoc on every export); the six repeated `setMatrixAt` and `setColorAt` blocks named as duplicated code (the port rule keeps legacy's shape). The Spec review's note that the brand plan's line `gl joins it in the cube slice` is not met stands, recorded above with the item.

## Log
