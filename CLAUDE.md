# gridbeam.xyz

Reviving the dead [gridkit.nz](https://gridkit.nz) startup as **[gridbeam.xyz](https://gridbeam.xyz)** — a non-commercial, open-source educational site about **grid beam**, a modular construction system based on a 40 mm grid of identical aluminium beams with regularly-spaced holes.

This top-level repo IS the website. It consumes two open-source submodules (`./ui`, `./gridkit`) and temporarily depends on a private legacy submodule (`./node-modules`) as source material for extraction.

## Repo shape

| Path | Role | Public? |
|------|------|---------|
| `/` (this repo) | The gridbeam.xyz Next.js site | Public — EUPL-1.2 |
| `./ui` | `@villagekit/ui` — open-source React component library on Chakra UI | Public — `villagekit/ui` |
| `./gridkit` | The grid-kit engine — code-as-CAD, parts library, sandbox renderer | Public — currently `villagekit/gridkit-legacy`, being renamed |
| `./node-modules` | Legacy private monorepo. Source material for extraction. **Retired by stream 05.** | Private — `villagekit/node-modules` |

## Tech stack (target)

- **Next.js**: latest (15.x app router)
- **React**: 19.x
- **Chakra UI v3** — full migration from v2 (`createSystem`, new multipart APIs)
- **Three.js + @react-three/fiber** for the 3D engine work
- **TypeScript** everywhere
- **Biome** for lint/format
- **pnpm** + **turbo** in the monorepo submodules

## Glossary

- **Grid beam** — a 40 mm extruded modular beam with regularly-spaced holes for fasteners. The basic building block.
- **Grid panel** — a 40 mm-grid flat panel that bolts onto grid beams.
- **Grid Kit** — the (now-closed) NZ startup that sold grid-beam hardware. Lives on as a name for the design catalog and the engine code.
- **Village Kit** — the broader open-source initiative; `@villagekit/*` is the npm scope.
- **Part** — a parametric physical component (gridbeam, gridpanel, fastener) with a 3D model and a Zod schema.
- **Product** — an assembly composed of parts; `@villagekit/product-kit` is the reference.
- **Design** — a saved configuration of a product (a specific desk, shelf, etc).
- **Sandbox** — `@villagekit/sandbox`, the WebGL renderer that draws products in 3D.
- **Studio** — `@villagekit/studio`, the Tauri-wrapped CAD-as-code editor app (lives in `./gridkit/apps/studio`).

## Source material

The legacy site at `node-modules/apps/gridkit/` (Next.js 14 + Chakra 2) is the source of:

- Page structure: about, faq, stories, designs, tools, contact, subscribe, legal
- Five MDX stories under `pages/stories/*.mdx`
- The cutting planner applet (`@villagekit-private/applet-cutting-planner`)
- The designs catalog logic
- A stub already exists at `node-modules/apps/gridbeam/` — useful reference, not a starting point

The legacy `node-modules/packages/ui-{page,nav,media,mdx}` packages are being merged into the public `./ui` library. `ui-brand` and `ui-cookies` stay startup-specific and won't be folded in.

## Key decisions

- **Chakra v3** for the open-source `./ui` library, the website, AND the engine. The migration in `./ui` happens **before** bootstrapping the website (no double-migration).
- **Top-level repo IS the site** — no nested `apps/` directory. Do **not** start from the existing abandoned stub at `node-modules/apps/gridbeam/`; it didn't get far.
- **EUPL-1.2** for everything — both the open-source submodules and the top-level website. The website repo will be public.
- **No e-commerce.** The old store is replaced by a "Suppliers" page that links out to any suppliers selling compatible hardware. Same browse mechanic as the old store, no cart / Stripe / checkout.
- **Engine repo** stays at the `./gridkit` submodule path; `villagekit/gridkit-legacy` will be renamed and the "superseded" framing dropped from the README. Note that a separate `villagekit/villagekit` repo exists as a newer/better engine effort — not in scope here; `./gridkit` is reclaimed specifically to power gridbeam.xyz.
- **`./gridkit/core/ui` is being removed.** It overlaps with the standalone `./ui` library. Engine consumers will depend on `@villagekit/ui` directly. This resolves the otherwise-conflicting `@villagekit/ui` package name.
- **`@villagekit` npm scope** retained.

## Out of scope

- Matomo / Sentry — those configs were startup-specific.
- Embedding the Tauri studio app inside the website — the engine itself ships, but the desktop editor stays a separate downloadable app.
- villagekit.com and supplykit.com — those live in `node-modules` but are not part of this project.

## In scope but worth flagging

- **Hosted email newsletter** via Buttondown or similar (~$10/mo). The /subscribe page is a real form, not just an RSS link. Requires the API key in env vars and someone (the user) writing actual newsletters.

## Working in this repo

The full plan lives at [`./todo/README.md`](./todo/README.md) as a hierarchical task tree:

- [`todo/01-website/`](./todo/01-website/README.md) — the new gridbeam.xyz Next.js site
- [`todo/02-ui-library/`](./todo/02-ui-library/README.md) — fold `ui-*` packages into `./ui`, migrate to Chakra v3
- [`todo/03-engine/`](./todo/03-engine/README.md) — clean `./gridkit` for open-source publication
- [`todo/04-content/`](./todo/04-content/README.md) — copy, imagery, rebrand from gridkit.nz to gridbeam.xyz
- [`todo/05-cleanup/`](./todo/05-cleanup/README.md) — retire `node-modules` submodule, archive old site, point DNS

Each subdirectory has its own `README.md` summarising the stream; individual task files inside detail steps and dependencies.

## License

All open-source pieces target **EUPL-1.2**. The website itself is TBD; default likely the same.
