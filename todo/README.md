# Plan: gridbeam.xyz revival

Hierarchical task tree for reviving gridkit.nz as gridbeam.xyz — a non-commercial, open-source educational site about grid beam.

Five parallel streams. Within each stream, tasks are roughly ordered. Across streams, there are a handful of cross-cutting dependencies (see below).

## Streams

### [01 — Website](./01-website/README.md)
Bootstrap a fresh Next.js (latest, app router) + Chakra v3 site at the top level of this repo. Port pages from the legacy gridkit.nz site, stripping startup / e-commerce code. Replace the store with a Suppliers page.

### [02 — UI library](./02-ui-library/README.md)
Migrate `./ui` (`@villagekit/ui`) to Chakra v3. Fold reusable components from `node-modules/packages/ui-{page,nav,media,mdx}` into it. Polish for public release: Storybook, CI, CHANGELOG, npm publish.

### [03 — Engine](./03-engine/README.md)
Clean up `./gridkit` for open-source publication: add EUPL-1.2 LICENSE file, fix all `UNLICENSED` package.json fields, drop "legacy/superseded" framing in the README, rename the GitHub repo, publish to npm. Wire it into the website for the designs catalog.

### [04 — Content migration](./04-content/README.md)
Audit every page of copy and imagery. Rebrand gridkit.nz → gridbeam.xyz. Re-host images out of `cloudinary.com/villagekit/v1/gridkit.nz/...`. Rewrite MDX stories for the new framing.

### [05 — Cleanup](./05-cleanup/README.md)
Once the website doesn't depend on `node-modules` anymore, retire the legacy submodule. Archive the old gridkit.nz Vercel deploy. Point gridbeam.xyz DNS at the new deployment.

## Cross-stream dependencies

```
       [02 UI library on Chakra v3]
                  │
                  ▼
            [01 Website] ◄────── [04 Content]
                  ▲
                  │
       [03 Engine] (only for designs catalog page)
                  │
                  ▼
            [05 Cleanup]
```

- **02 blocks 01** if you want to avoid double-migrating Chakra. (Alternative: bootstrap 01 on Chakra v2 first, migrate later. Default plan: do 02 first.)
- **03 blocks** the *designs catalog* page in 01 (and only that page). Other pages can ship without the engine.
- **04** runs in parallel with 01; some bits (image hosting decision) feed into 01 deployment.
- **05** is the final stream — runs after 01-04 are functionally done.

## Conventions

Every task file uses this structure:

```markdown
# Title

**Status:** TODO | DOING | BLOCKED | DONE

## Why
1-3 sentences of motivation.

## What
1-3 sentences of concrete deliverable.

## Steps
- [ ] step 1
- [ ] step 2

## Notes
- references, gotchas, decisions

## Depends on
- ../other-stream/other-task.md
```

- **Status** is updated in-place as work progresses. Don't delete completed tasks; let them serve as a record.
- **Steps** are intentionally fine-grained. If a step grows into its own task, promote it to a new file and link.
- Cross-task references use **relative paths**.
- New tasks that surface during work get added — don't try to plan everything up front.

## Open questions tracked elsewhere

A few decisions are deferred until the relevant task picks them up:

- Whether the website needs a database for the suppliers page or can be flat JSON / MDX — see `01-website/08-suppliers.md`.
- New image-hosting destination (keep Cloudinary on a new path? Vercel-hosted? Self-hosted?) — see `04-content/02-image-hosting.md`.
- Whether to keep the studio Tauri app or sunset it — see `03-engine/06-studio-app-future.md`.
- Hosting target for the website (Vercel assumed, but could be other) — see `01-website/11-deployment-and-seo.md`.

(Settled since first draft: ~~designs catalog data source~~ → `./gridkit-products` submodule.)
