# gridbeam.xyz

Reviving the dead [gridkit.nz](https://gridkit.nz) startup as **[gridbeam.xyz](https://gridbeam.xyz)** — a non-commercial, open-source educational site about **grid beam**, a modular construction system based on a 40 mm grid of identical aluminium beams with regularly-spaced holes.

This top-level repo IS the website. It consumes three open-source submodules (`./ui`, `./gridkit`, `./gridkit-products`) and temporarily depends on a private legacy submodule (`./node-modules`) as source material for extraction.

## Repo shape

| Path | Role | Public? |
|------|------|---------|
| `/` (this repo) | The gridbeam.xyz Next.js site | Public — EUPL-1.2 |
| `./ui` | `@villagekit/ui` — open-source React component library on Chakra UI | Public — `villagekit/ui` |
| `./gridkit` | The grid-kit engine — code-as-CAD, parts library, sandbox renderer | Public — `villagekit/gridkit` |
| `./gridkit-products` | The set of products (designs) authored with the `./gridkit` engine. Powered the original gridkit.nz catalog; powers the new gridbeam.xyz catalog too. Stays a separate repo (not folded into gridkit). | Public — `villagekit/gridkit-products` |
| `./node-modules` | Legacy private monorepo. Source material for extraction. **Retired by stream 05.** | Private — `villagekit/node-modules` |

## Tech stack (target)

- **Next.js**: latest (15.x app router)
- **React**: 19.x
- **Chakra UI v3** — full migration from v2 (`createSystem`, new multipart APIs)
- **Three.js + @react-three/fiber** for the 3D engine work
- **TypeScript** everywhere
- **Biome** for lint/format
- **pnpm** + **turbo** in the monorepo submodules

## Principles

- Premature optimization is the root of all evil.
- Don't second-guess or make assumptions. When in doubt, verify or ask.
- Prefer robustness over performance.
- Achieve performance with simple fit-for-purpose abstractions, not clever hacks.

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
- **Imports** grouped, in order: built-ins → external packages → workspace packages (`@villagekit/*`) → relative paths (`./`, `../`). Blank line between groups.
- **Errors:** typed errors via `zod` or discriminated unions. Don't swallow errors silently. Use `result`-style returns at boundaries; throw inside trusted internal code.
- **Comments:** only when the *why* is non-obvious — a hidden constraint, a workaround, a counter-intuitive choice. Names carry the *what*. No multi-paragraph docstrings.
- **Module exports:** think of a file like the intimacy gradient of a home. Public exports near the top (the entryway); private helpers further down (the bedrooms).
- **Documentation discipline:** when code changes, update affected `README.md` / CLAUDE.md / task files in the same commit.
- **Citing copied code:** when porting code from `./node-modules` (or any other source repo), reference the source GitHub URL — pinned to a specific commit SHA, not a branch — in the commit message and/or as a comment at the top of the new file. Example: `// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/faq.tsx`. Branch URLs rot; commit SHAs don't.
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
- Server-side logs go to whatever the deployment provider (likely Vercel) captures. Client-side `console.*` lands in the browser console; don't ship debug-level chatter to production.

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
- **Engine repo** stays at the `./gridkit` submodule path; renamed from `villagekit/gridkit-legacy` to `villagekit/gridkit` and the "superseded" framing dropped from the README. Note that a separate `villagekit/villagekit` repo exists as a newer/better engine effort — not in scope here; `./gridkit` is reclaimed specifically to power gridbeam.xyz.
- **`./gridkit/core/ui` is being removed.** It overlaps with the standalone `./ui` library. Engine consumers will depend on `@villagekit/ui` directly. This resolves the otherwise-conflicting `@villagekit/ui` package name.
- **`@villagekit` npm scope** retained.

## Out of scope

- Matomo / Sentry — those configs were startup-specific.
- Embedding the Tauri studio app inside the website — the engine itself ships, but the desktop editor stays a separate downloadable app.
- villagekit.com and supplykit.com — those live in `node-modules` but are not part of this project.

## In scope but worth flagging

- **Hosted email newsletter** via Buttondown or similar (~$10/mo). The /subscribe page is a real form, not just an RSS link. Requires the API key in env vars and someone (the user) writing actual newsletters.

## Development workflow

When working on tasks in this repo, follow this loop:

1. **Read CLAUDE.md** for current state, principles, and decisions.
2. **Find the next actionable task** in `./todo/`. Walk the stream READMEs; pick the topmost `Status: TODO` task whose dependencies are met.
3. **Research the details** beyond what the task file describes. Things may have changed since `./todo` was written — trust the current state of the code over the task's notes when they conflict.
4. **Ask the user for decisions or advice** if anything is genuinely unclear or has multiple reasonable paths. Don't guess on load-bearing choices.
5. **Complete the task.** Set `Status: DOING` in the task file when starting.
6. **Update relevant documentation** (CLAUDE.md, READMEs, related task files) as part of the same change.
7. **Review with fresh sub-agents** via the Agent tool. Iterate until no critical feedback remains. Each review starts fresh — give the reviewer the context it needs.
8. **Update the task board.** Set `Status: DONE`, check off the step boxes, add any follow-ups discovered during the work as new tasks.
9. **Commit** with a clear, concise message. Less is more. Don't mention Claude, Anthropic, AI assistance, or co-authorship.
10. **Continue with the next actionable task.**

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
