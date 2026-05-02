# 07 — Wire engine into gridbeam.xyz website (designs catalog)

**Status:** DONE (build/types/lint clean; runtime canvas verification deferred to a real browser session)

## Why
The designs catalog page (Stream 01 task 06) needs to render 3D previews of designs and let users tweak parameters. That's exactly what the engine does. This task is the integration glue.

## What
The website at the top level can import `@villagekit/sandbox`, `@villagekit/parameters`, `@villagekit/product-kit`, etc., and render a working design page with 3D preview + parameter controls.

## Steps
- [x] Confirm the website's package.json has dependencies on the engine packages. Took the workspace path: `@villagekit/{sandbox,parameters,product,product-kit,part-gridbeam,part-gridpanel,part-fastener,plugin-smart-fasteners}` are all `workspace:*` against `./gridkit`. Engine peer deps (`@react-three/fiber@^9`, `@xstate/react@^6`, `xstate@^5`, `three@^0.165`) added explicitly. `smol-toml` added for reading product `villagekit.toml` files.
- [x] `pnpm-workspace.yaml` already includes `gridkit/core/*`, `gridkit/parts/*`, `gridkit/products/*`, `gridkit/util/*`, `gridkit/kit-plugins/*`, `gridkit/apps/*`, `gridkit/commands/*`, `gridkit/dev/*` — no change needed.
- [x] Designs are read from `./gridkit-products/products/<id>/{villagekit.toml,*.ts}` directly via Node fs in `app/_lib/designs.ts` (server-side). The TS code is sent as a string to the engine, which handles its own swc-wasm transform in the browser. No need to add `@villagekit/products` as a workspace package since it has no exports.
- [x] Built a `<DesignViewer>` client component (`app/_components/design/DesignViewer.tsx`) wired to `ProductProvider` + `ProductKitModule`, with `ParamControls` + `ProductView` + `ProductInfo`, and a `next/router.replace`-based `onLocationUpdate` so xstate's query-string sync uses the App Router. A side-effect-only module `registerParts.ts` registers all part modules + the smart-fasteners plugin.
- [x] Canvas SSR handled via `app/_components/design/DesignViewerDynamic.tsx` — `next/dynamic` with `ssr: false`, Spinner loading state.
- [x] Engine bundle is lazy-loaded by virtue of the dynamic import. Production build shows `/designs/[id]` First Load JS at 222 kB (only 3 kB above the shared baseline) — the engine + three.js + r3f all live behind the dynamic import.
- [x] Mobile/tablet: canvas height is responsive (`{ base: '320px', md: '480px', lg: '560px' }`).
- [x] Loading state present (Spinner). Static preview image deferred — design `<id>.png` files exist in `gridkit-products`, but plumbing image serving belongs to Stream 01 task 06.

## Verification
- [x] `pnpm typecheck` — clean
- [x] `pnpm lint` — clean
- [x] `pnpm build` — clean; 37 design pages prerendered via `generateStaticParams`
- [x] `pnpm dev` — `/designs` lists 37 cards; `/designs/baby-chair`, `/designs/hanging-shelves` render with correct titles + descriptions; `/designs/does-not-exist` returns 404. WebGL canvas itself only renders in a real browser, so the live 3D preview + parameter reactivity remains to be checked in-session.

## Notes
- `core/sandbox` already has GPU-aware LOD logic — verify it kicks in on lower-end devices.
- `core/parameters` uses xState + Zod + query-string serialization. The query-string state means linking to a configured design Just Works in app router (URLs already update).
- Don't use the Tauri studio app's UI here — that's desktop-only. Reuse the lower-level parameter components from `core/parameters`.
- `next.config.ts` `transpilePackages` was extended to cover all `@villagekit/*` engine packages — Turbopack needs that for workspace-linked sources to be transformed correctly.

## Follow-ups
- The `r3f-perf@7.x` transitive dep pins `@react-three/drei@^9` / `react@^18` and surfaces peer warnings under React 19. Sandbox itself depends on `@react-three/drei@^10` directly so the actual resolved version is fine, but the warning is noisy. Either upgrade `r3f-perf` upstream in `./gridkit` or wrap the perf overlay behind a feature flag.
- `@curvenote/ansi-to-react@7` (transitive of `@villagekit/product`) also still pegs React 18 in its peer deps.

## Depends on
- [./05-publish-npm.md](./05-publish-npm.md) — at least the workspace setup needs to be working
- [../01-website/06-designs-catalog.md](../01-website/06-designs-catalog.md) — the consuming task
