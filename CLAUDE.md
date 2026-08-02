# gridbeam.xyz

Reviving the dead [gridkit.nz](https://gridkit.nz) startup as **[gridbeam.xyz](https://gridbeam.xyz)** — a non-commercial, open-source educational site about **grid beam**, a modular construction system based on a 40 mm grid of identical aluminium beams with regularly-spaced holes.

This top-level repo IS the website. It depends on `@villagekit/ui` and the `@villagekit/*` engine packages (all open-source) as regular npm dependencies, so CI can build the site without checking out anything else. The legacy `villagekit/node-modules` monorepo, the `villagekit/media` repo, and the upstream `villagekit/products` design catalogue are reference material — they live on disk as **sibling checkouts** during development but aren't pulled in by `pnpm install`.

## Repo shape

| Repo | How this site consumes it | Public? |
|------|--------------------------|---------|
| `villagekit/ui` (`@villagekit/ui`) | **npm dependency** in `package.json`. Resolved from the registry; transpiled by Next.js (see `transpilePackages` in `next.config.ts` — the package ships TypeScript sources at its top-level `exports`). To bump: `pnpm update @villagekit/ui --latest`, then `pnpm typecheck && pnpm build`, commit `package.json` + `pnpm-lock.yaml`. | Public — `villagekit/ui` |
| `villagekit/gridkit` (`@villagekit/parameters`, `part`, `part-fastener`, `part-gridbeam`, `part-gridpanel`, `plugin-smart-fasteners`, `product`, `product-kit`, `sandbox`) | **npm dependencies** in `package.json`. Same transpile + bump flow as `@villagekit/ui`. | Public — `villagekit/gridkit` |
| `./products` (in-repo) | **Vendored design catalogue.** Sources of truth for the per-product PNG, `villagekit.toml`, and code-as-CAD `.ts` files consumed by the designs page. Upstream is `villagekit/products`; pull updates by rsyncing from `../products/products/` and committing. | Public — `villagekit/products` |
| `villagekit/media` (`../media`) | **Sibling checkout, dev-only.** Holds source images + Cloudinary sync tooling. Cross-site (each site under `media/<site>/...`). LFS-tracked. The website doesn't import from it; run `pnpm sync-media` from inside `../media` directly to publish new assets. | Public — `villagekit/media` |
| `villagekit/node-modules` (`../node-modules`) | **Sibling checkout, dev-only.** Legacy private monorepo — source material for the parity work (Stream 06). Not a build-time dependency. | Private — `villagekit/node-modules` |

Expected on-disk layout for local dev:

```
repos/villagekit/
├── gridbeam.xyz/        (this repo — the Next.js site)
├── ui/                  (sibling — @villagekit/ui source; for parallel work)
├── gridkit/             (sibling — @villagekit/* engine packages; for parallel work)
├── products/            (sibling — upstream design catalogue; for rsyncing new designs)
├── media/               (sibling — for `pnpm sync-media`)
└── node-modules/        (sibling — legacy reference; for parity audits)
```

None of `../ui`, `../gridkit`, `../products`, `../media`, or `../node-modules` has to exist on disk: the build resolves `@villagekit/*` from the npm registry and reads designs from this repo's `./products/` directory. The siblings are for development reference and for pulling updates.

## Tech stack (target)

- **Next.js**: latest (15.x app router)
- **React**: 19.x
- **Chakra UI v3** via `@villagekit/ui` (already migrated)
- **Three.js + @react-three/fiber** for the 3D engine work
- **TypeScript** everywhere
- **Biome** for lint/format
- **pnpm** at the top level. No workspace setup: `@villagekit/*` packages come from npm; `../media`, `../products`, `../node-modules` are dev-only siblings and run their own `pnpm install` separately

## Principles

- Premature optimization is the root of all evil.
- Don't second-guess or make assumptions. When in doubt, verify or ask.
- Prefer robustness over performance.
- Achieve performance with simple fit-for-purpose abstractions, not clever hacks.

### Legacy gridkit.nz is the baseline

This rebuild was meant to **upgrade dependencies and strip startup / e-commerce references** — not to redesign every page, rewrite every paragraph, or invent new code patterns. The legacy site was made by experienced people:

- A real **designer** thought about the visual / interaction design.
- A senior **developer** wrote the code with deliberate practices.
- The **copy** was written more carefully than its rewrite.

References for parity work:

- **Live legacy site (visual + interaction ground truth):** https://gridkit-landing-villagekit.vercel.app/
- **Legacy source code (code patterns, structure, copy ground truth):** `../node-modules/apps/gridkit/`

Rules:

1. Before changing any page or component, compare against the legacy reference on **all five axes**: visual design, interaction, accessibility, copy, code patterns. The legacy version is the **default**; deviations need a stated reason.
2. **Change only when it improves.** Convenience of the new framework / library is not by itself an improvement. "The new way is easier to write" is not a reason.
3. When fixing a regression, two acceptable modes — and only two:
   - **Restore / closely match the legacy approach** — the usual answer.
   - **Re-think from first principles** — only when that produces something genuinely better, with a stated reason.
   Never settle for "slightly adapt the current broken thing" because adaptation is easier.
4. Same rule for **code patterns** as for design — prefer the legacy author's approach unless there's a concrete reason a different one is better.
5. The `../node-modules` legacy checkout **stays** until parity is reached. Only a human can say when parity is reached.

Full statement and per-page workflow: [`./todo/06-design-parity/README.md`](./todo/06-design-parity/README.md).

### Complexity check

Before adding significant amounts of code, verify:

1. The approach is solid — not just the first thing that came to mind.
2. No simpler alternative achieves the same goal.
3. Compare to industry-standard patterns where relevant (Next.js conventions, Chakra recipes, react-three-fiber idioms).
4. Check if a good library already handles the task — npm is large; the right answer is often "use this".

Complexity is fine when warranted. The point is to be deliberate.

## Conventions

- **TypeScript** everywhere, `strict: true`.
- **Biome** for lint + format. No ESLint, no Prettier.
- **ESM-only** modules.
- **Imports** grouped, in order: built-ins → external packages → `@villagekit/*` packages → relative paths (`./`, `../`). Blank line between groups.
- **Errors:** typed errors via `zod` or discriminated unions. Don't swallow errors silently. Use `result`-style returns at boundaries; throw inside trusted internal code.
- **Comments:** only when the *why* is non-obvious — a hidden constraint, a workaround, a counter-intuitive choice. Names carry the *what*. No multi-paragraph docstrings.
- **Module exports:** think of a file like the intimacy gradient of a home. Public exports near the top (the entryway); private helpers further down (the bedrooms).
- **Documentation discipline:** when code changes, update affected `README.md` / CLAUDE.md / task files in the same commit.
- **Citing copied code:** when porting code from `../node-modules` (or any other source repo), reference the source GitHub URL — pinned to a specific commit SHA, not a branch — in the commit message and/or as a comment at the top of the new file. Example: `// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/faq.tsx`. Branch URLs rot; commit SHAs don't.
- **License posture:** EUPL-1.2 across the board. Library deps may be MIT/BSD/Apache-2.0/MPL/EUPL/LGPL. Avoid GPL deps unless intentional and justified (EUPL is GPL-compatible but inheriting GPL into our distribution carries weight).

## Reviews

- Think about long-term maintenance.
- Check correctness of any algorithms (cutting planner bin-packing, rendering math, parameter validation) against specifications or first principles where possible.
- Look for simpler expressions of the same idea.
- Imagine alternative abstractions; compare against the current one.
- For observations that don't lead to a change now: leave a `// Note(cc): xxx` comment for future readers, or `// TODO(cc): xxx` if a future change is intended.
- Update affected `README.md` / CLAUDE.md as part of the change.

## Testing

- Don't assume the current code is correct. Before "fixing" a failing test, verify the test isn't already correctly catching a real bug.
- Before adding tests, identify the specific edge cases worth covering. Don't add tests for coverage's sake.
- If a test is redundant, remove it.
- The cutting planner, designs catalog logic, and engine math are the highest-value test targets in this codebase. Layout / styling components rarely need unit tests — Storybook + visual review is enough.

## Logging

This site will be live for years. Logs are a first-class concern, even though the surface is small.

- Use levels deliberately: `console.error` for breakage, `console.warn` for degraded-but-recoverable, `console.info` for lifecycle events, `console.debug` for operational detail.
- Prefer structured fields (`console.info({ designId, parts: 12 }, 'design rendered')`) over interpolated strings.
- Write log messages as if you'll read them at 3 AM debugging a production issue two years from now.
- Never log sensitive data (Buttondown API keys, full email addresses in production).
- Server-side logs go to Cloudflare Workers Logs (dashboard) and stream to terminal via `wrangler tail`. Client-side `console.*` lands in the browser console; don't ship debug-level chatter to production.

## Glossary

- **Grid beam** — a 40 mm extruded modular beam with regularly-spaced holes for fasteners. The basic building block.
- **Grid panel** — a 40 mm-grid flat panel that bolts onto grid beams.
- **Grid Kit** — the (now-closed) NZ startup that sold grid-beam hardware. Lives on as a name for the design catalog and the engine code.
- **Village Kit** — the broader open-source initiative; `@villagekit/*` is the npm scope.
- **Part** — a parametric physical component (gridbeam, gridpanel, fastener) with a 3D model and a Zod schema.
- **Product** — an assembly composed of parts; `@villagekit/product-kit` is the reference.
- **Design** — a saved configuration of a product (a specific desk, shelf, etc).
- **Sandbox** — `@villagekit/sandbox`, the WebGL renderer that draws products in 3D.
- **Studio** — `@villagekit/studio`, the Tauri-wrapped CAD-as-code editor app (lives in the `villagekit/gridkit` repo at `apps/studio`).

## Source material

The legacy site at `../node-modules/apps/gridkit/` (Next.js 14 + Chakra 2) is the source of:

- Page structure: about, faq, stories, designs, tools, contact, subscribe, legal
- Six MDX stories under `pages/stories/*.mdx` (4 guides + 2 newsletters)
- The cutting planner applet (`@villagekit-private/applet-cutting-planner`)
- The designs catalog logic
- A stub already exists at `../node-modules/apps/gridbeam/` — useful reference, not a starting point

The legacy `../node-modules/packages/ui-{page,nav,media,mdx}` packages have been folded into the public `@villagekit/ui` library. `ui-brand` and `ui-cookies` stay startup-specific and won't be folded in.

## Key decisions

- **Chakra v3** for `@villagekit/ui`, the website, AND the engine. All published packages are already on Chakra v3.
- **Top-level repo IS the site** — no nested `apps/` directory. Do **not** start from the existing abandoned stub at `../node-modules/apps/gridbeam/`; it didn't get far.
- **EUPL-1.2** for the website. The open-source `@villagekit/*` packages each ship with their own license — see their respective repos.
- **No e-commerce.** The old store is replaced by a "Suppliers" page that links out to any suppliers selling compatible hardware. Same browse mechanic as the old store, no cart / Stripe / checkout.
- **Engine packages on npm.** All `@villagekit/*` engine packages (`parameters`, `part`, `part-fastener`, `part-gridbeam`, `part-gridpanel`, `plugin-smart-fasteners`, `product`, `product-kit`, `sandbox`) live in the `villagekit/gridkit` repo and publish to npm. This site consumes them as regular dependencies.
- **Products vendored.** The `villagekit/products` design catalogue is **not** published to npm; instead, the per-product PNG / TOML / `.ts` files are vendored into this repo's `./products/` directory. Pull updates by rsyncing from `../products/products/` and committing.
- **`@villagekit` npm scope** retained.
- **Hosting: Cloudflare Workers via `@opennextjs/cloudflare`.** The legacy site was on Vercel; the rebuild uses Cloudflare for consistency with `villagekit.com`. Static export is not an option — server components, dynamic routes, and future API handlers all need a real runtime. See `./todo/01-website/11-deployment-and-seo.md`.

## Out of scope

- Matomo / Sentry — those configs were startup-specific.
- Embedding the Tauri studio app inside the website — the engine itself ships, but the desktop editor stays a separate downloadable app.
- villagekit.com and supplykit.com — those live in `../node-modules` but are not part of this project.

## In scope but worth flagging

- **Hosted email newsletter** via Buttondown or similar (~$10/mo). The /subscribe page is a real form, not just an RSS link. Requires the API key in env vars and someone (the user) writing actual newsletters.

## Development workflow

When working on tasks in this repo, follow this loop:

1. **Read CLAUDE.md** for current state, principles, and decisions.
2. **Find the next actionable task** in `./todo/`. Walk the stream READMEs; pick the topmost `Status: TODO` task whose dependencies are met.
3. **Research the details** beyond what the task file describes. Things may have changed since `./todo` was written — trust the current state of the code over the task's notes when they conflict.
4. **Ask the user for decisions or advice** if anything is genuinely unclear or has multiple reasonable paths. Don't guess on load-bearing choices. A task file's "Recommend X" line is **not** authorization — always confirm before relicensing, publishing, archiving, DNS changes, or deployments. Same applies to anything irreversible or that affects shared / production systems.
5. **Complete the task.** Set `Status: DOING` in the task file when starting.
6. **Update relevant documentation** (CLAUDE.md, READMEs, related task files) as part of the same change.
7. **Review with fresh sub-agents** via the Agent tool. Iterate until no critical feedback remains. Each review starts fresh — give the reviewer the context it needs.
8. **Update the task board.** Set `Status: DONE`, check off the step boxes, add any follow-ups discovered during the work as new tasks.
9. **Commit** with a clear, concise message. Less is more. Don't mention Claude, Anthropic, AI assistance, or co-authorship.
10. **Continue with the next actionable task.**

## Working in this repo

The full plan lives at [`./todo/README.md`](./todo/README.md) as a hierarchical task tree:

- [`todo/01-website/`](./todo/01-website/README.md) — the new gridbeam.xyz Next.js site
- [`todo/02-ui-library/`](./todo/02-ui-library/README.md) — historical: folded `ui-*` packages into `@villagekit/ui` and migrated to Chakra v3 (now upstream in `villagekit/ui`)
- [`todo/03-engine/`](./todo/03-engine/README.md) — historical: cleaned `villagekit/gridkit` for open-source publication
- [`todo/04-content/`](./todo/04-content/README.md) — copy, imagery, rebrand from gridkit.nz to gridbeam.xyz
- [`todo/05-cleanup/`](./todo/05-cleanup/README.md) — archive old site, point DNS
- [`todo/06-design-parity/`](./todo/06-design-parity/README.md) — page-by-page audit + uplift to legacy gridkit.nz parity (visual / interaction / a11y / copy / code patterns)
- [`todo/07-code-review/`](./todo/07-code-review/README.md) — remediation of the 2026-08-03 code-level review vs the legacy baseline (content accuracy, dropped interaction behavior, tests, dead code, config)

Each subdirectory has its own `README.md` summarising the stream; individual task files inside detail steps and dependencies.

## License

The website is **EUPL-1.2**. Upstream `@villagekit/*` packages each ship with their own license.
