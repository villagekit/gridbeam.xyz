# 07 — Wire engine into gridbeam.xyz website (designs catalog)

**Status:** TODO

## Why
The designs catalog page (Stream 01 task 06) needs to render 3D previews of designs and let users tweak parameters. That's exactly what the engine does. This task is the integration glue.

## What
The website at the top level can import `@villagekit/sandbox`, `@villagekit/parameters`, `@villagekit/product-kit`, etc., and render a working design page with 3D preview + parameter controls.

## Steps
- [ ] Confirm the website's package.json has dependencies on the engine packages. Two options:
  - **Workspace path** during dev: `"@villagekit/sandbox": "workspace:*"` if the top-level repo's `pnpm-workspace.yaml` includes `gridkit/core/*`. Fast iteration but couples local dev tightly.
  - **Published package** in production: `"@villagekit/sandbox": "^0.9.0"`. Clean, but requires a publish for every change.
  - Recommend **workspace path during dev, published in production** — same pattern Next.js workspaces use.
- [ ] Update top-level `pnpm-workspace.yaml` to include `gridkit/core/*`, `gridkit/parts/*`, `gridkit/products/*`, `gridkit/util/*` if going the workspace route.
- [ ] Decide where designs live (also a decision in Stream 01 task 06): inside `./gridkit/products/kit/designs/` or a sibling.
- [ ] Build a `<DesignPage>` component that:
  1. Imports the design definition (server component)
  2. Imports `@villagekit/parameters` for the parameter UI (client component)
  3. Imports `@villagekit/sandbox` for the 3D preview (client component, ssr: false)
  4. Wires parameters → preview reactively
- [ ] Handle SSR: react-three-fiber's `Canvas` cannot SSR. Use `next/dynamic` with `ssr: false`.
- [ ] Verify performance: lazy-load the engine bundle (it's large — three.js + react-three-fiber + xstate + the parts library).
- [ ] Mobile/tablet behaviour — the canvas should be a reasonable height; controls should fit.
- [ ] Loading states: while the design is loading, show a skeleton. While the canvas is mounting, show a static preview image (or just the loading state).

## Notes
- `core/sandbox` already has GPU-aware LOD logic — verify it kicks in on lower-end devices.
- `core/parameters` uses xState + Zod + query-string serialization. The query-string state means linking to a configured design Just Works in app router (URLs already update).
- Don't use the Tauri studio app's UI here — that's desktop-only. Reuse the lower-level parameter components from `core/parameters`.

## Depends on
- [./05-publish-npm.md](./05-publish-npm.md) — at least the workspace setup needs to be working
- [../01-website/06-designs-catalog.md](../01-website/06-designs-catalog.md) — the consuming task
