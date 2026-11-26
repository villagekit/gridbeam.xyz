# gridbeam.xyz

The source of [gridbeam.xyz](https://gridbeam.xyz), a non-commercial, open-source educational site about grid beam: a modular construction system on a 40 mm grid of identical beams with regularly-spaced holes. It is a port of the closed [gridkit.nz](https://gridkit.nz) startup site, with the store and the startup plumbing removed. This repo is the Next.js site itself, with no nested `apps/`.

## Commands

`just --list` prints every recipe. `timeout 900 just check` is the gate: `pnpm lint` (Biome), `pnpm typecheck`, `pnpm test` (Vitest) and `pnpm build`, then the drift check of the generated designs data. `pnpm check` runs the same four scripts. CI runs the same steps from `.github/workflows/check.yml`, on a push to `main` and on every pull request.

| Command | Purpose |
|---|---|
| `pnpm dev` | The dev server on `http://localhost:3000`. It regenerates the designs data and copies MapLibre's worker to `public/maplibre/` first, as `pnpm build` does. |
| `pnpm test:watch` | Vitest in watch mode. |
| `pnpm audit:pages --routes <file>` | Screenshot pairs, legacy beside current, at 375, 768 and 1280, under `audit/<slug>/<width>/`. They are looked at, not asserted. |
| `pnpm audit:dom --routes <file>` | DOM extraction pairs under `audit/<slug>/dom/`: `{legacy,current}.txt`, the visible text in document order, to `diff` for the copy; `{legacy,current}.aria.yaml`, the accessibility tree; and `manifest.json`, each side's status. It takes the flags of `audit:pages` except `--widths`, skips the missing side of a route marked `legacy-only` or `current-only`, and exits non-zero if a declared side failed. |
| `pnpm preview` | The Cloudflare build, run locally. |
| `pnpm deploy` | The Cloudflare build, deployed. |

Both audit scripts need `pnpm dev` running.

If `next build` dies with `SQLITE_BUSY` from workerd, delete `.wrangler/state`, the local miniflare cache, and run it again.

## What a machine needs

- Node, at the version `.nvmrc` pins.
- pnpm, at the version the `packageManager` field of `package.json` pins.
- `just`, and `kipu` on the path.
- Playwright's Chromium, for the audit scripts: `pnpm exec playwright install chromium`, once per machine.
- For parity work, the legacy source checked out at `../node-modules`, at `fce357d`.

## Layout

- `app/`: the Next.js app router, one directory per route. The shell is `layout.tsx`, `theme.ts`, `not-found.tsx`, `icon.svg`, `robots.ts` and `sitemap.ts`. The shared components are under `app/_components/`, and the data and helpers under `app/_lib/`: the designs catalog, the generated designs data, the stories catalog, the nav, the site-wide Open Graph fields and the Cloudinary loader. The site's one route handler is `app/api/subscribe/route.ts`, which posts a subscriber to Buttondown.
- `content/`: the suppliers records.
- `public/`: the favicons, tiles, mask icon, `browserconfig.xml` and `site.webmanifest`, served by path. `public/maplibre/` holds MapLibre GL's tile worker and its shared chunk, copied from `node_modules` and gitignored.
- `products/`: the vendored design catalogue, one directory per product with its PNG, `villagekit.toml` and code-as-CAD `.ts`.
- `scripts/`: the designs data generator, the MapLibre worker copy, the parity tooling and `screenshot.sh`. Each script's header comment is its page.
- `decisions/`, `plans/`, `differences/`, `notes/`: the kipu collections, which `.kipu/` declares.
- `audit/`: the screenshot and DOM pairs, generated and gitignored.

## The siblings

The site takes `@villagekit/ui` and the `@villagekit/*` engine packages from npm, and reads the designs from `./products/`, so nothing else has to be checked out to build it. The sibling checkouts are reference material, under `repos/villagekit/`:

| Repo | What it is to this site | Public? |
|---|---|---|
| `villagekit/ui` (`../ui`) | The source of `@villagekit/ui`, an npm dependency. | Public |
| `villagekit/gridkit` (`../gridkit`) | The source of the engine packages, each an npm dependency: `@villagekit/parameters`, `part`, `part-fastener`, `part-gridbeam`, `part-gridpanel`, `plugin-smart-fasteners`, `product`, `product-kit` and `sandbox`. | Public |
| `villagekit/products` (`../products`) | The upstream of `./products`, the design catalogue, which is not published to npm. | Public |
| `villagekit/media` (`../media`) | The source images and the Cloudinary sync tooling, for each site under `media/<site>/`. The website imports nothing from it. | Public |
| `villagekit/node-modules` (`../node-modules`) | The legacy site's source, at `fce357d`: the ground truth for copy and code in parity work. It stays until the operator declares parity. | Private |

A fix that belongs in a package lands in `../ui` or `../gridkit` and reaches this site by a publish and a bump: `pnpm update <package> --latest`, then the gate, then a commit of `package.json` and `pnpm-lock.yaml`.

## The stack

Next.js 15 on the app router, React 19 and TypeScript. Chakra UI v3, for `@villagekit/ui`, the website and the engine alike. Three.js and `@react-three/fiber`, through `@villagekit/sandbox`, for the 3D viewer. MapLibre GL, through `@vis.gl/react-maplibre` with OpenFreeMap tiles, for the suppliers map. `motion`, the successor of framer-motion, for animation. Biome and Vitest. pnpm at the top level with no workspace.

The site is hosted on Cloudflare Workers through `@opennextjs/cloudflare`, since server components, dynamic routes and API handlers need a runtime, and a static export gives none. The legacy Vercel deploy is not carried over.

There is no e-commerce: the old store is replaced by a Suppliers page with a map that links out to suppliers of compatible hardware. The newsletter is hosted by Buttondown, and `/subscribe` is a real form.

## Vocabulary

- **Grid beam**: a 40 mm modular beam with regularly-spaced holes for fasteners, the basic building block.
- **Grid panel**: a flat panel on the 40 mm grid that bolts onto grid beams.
- **Grid Kit**: the closed NZ startup that sold grid-beam hardware. The name lives on for the design catalog, the engine code and the legacy site.
- **Village Kit**: the broader open-source initiative. `@villagekit/*` is its npm scope.
- **Part**: a parametric physical component (a grid beam, a grid panel, a fastener) with a 3D model and a Zod schema.
- **Product**: an assembly composed of parts. `@villagekit/product-kit` is the reference.
- **Design**: a saved configuration of a product, such as one desk or one shelf.
- **Sandbox**: `@villagekit/sandbox`, the WebGL renderer that draws products in 3D.
- **Studio**: `@villagekit/studio`, the Tauri-wrapped CAD-as-code editor, in `villagekit/gridkit` at `apps/studio`.
- **Route**: one page of the site, named by its path.
- **Shell**: the header, footer, nav, theme and layouts every route shares.

`differences/README.md` defines **difference**, **ledger**, **sanctioned** and **regression**, and `plans/README.md` defines **record** and the other process terms.
