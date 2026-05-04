# 02 — Image hosting decision + migration

**Status:** DOING — Mikey's answers landed (see audit § "Decisions"). Bootstrapping `villagekit-media` repo next.

## Why
Every image on the legacy site lives at `https://res.cloudinary.com/villagekit/v1/gridkit.nz/...`. We need to decide where the images for the new site live, and migrate references.

## What
A clear hosting strategy and updated image references throughout the codebase.

## Steps
- [x] Decide hosting:
  - **A**: Keep using Cloudinary, new path: `https://res.cloudinary.com/villagekit/v2/gridbeam.xyz/...`. Easiest. Cost: existing Cloudinary plan.
  - **B**: Self-host in `public/images/` of the website. Simplest, no third-party. Cost: Vercel storage / build size.
  - **C**: Different CDN (Imgix, Cloudflare Images, etc). New setup, different mental model.
  - Recommend **A** for v1 — keeps the responsive image hooks from `ui-media` working, just changes the cloud base path. If Cloudinary is going away (no longer paid), pivot to **B**.
  - Mikey's **D**: Source images live in a dedicated repo (`villagekit/villagekit-media`, LFS-tracked); an idempotent script in that repo syncs them to Cloudinary on the existing `villagekit` cloud (free plan, default `res.cloudinary.com` URL — no CNAME).
  - Decision: **D**
- [x] Audit which images are actually still relevant — see [`./02-image-hosting/audit.md`](./02-image-hosting/audit.md). Result: ~100 references across `/`, `/about`, and 6 stories. All KEEP (no DROP, no REPLACE in current code). The "Grid Kit packaging" / "founder headshot" categories from the original prompt aren't actually referenced in new code.
- [x] Establish a naming convention — see audit. Drop the random Cloudinary suffix; use deterministic `<page>/<descriptor>` paths (or `shared/<descriptor>` for cross-page assets).
- [x] Resolve open questions with Mikey (see audit § "Decisions"). Outcomes: stay on `villagekit` cloud, no CNAME, source masters in a new `villagekit/villagekit-media` repo with LFS, Cloudinary Node SDK + hash/etag idempotency, keep long descriptive names verbatim, rename `madewithgridkit-N` → `made-with-grid-beam-N`, reuse the original Grid Kit cube logo for favicon + OG, local-only sync via `.env`.
- [x] Wire the original Grid Kit cube logo into `app/icon.svg`, `app/apple-icon.png`, and `app/opengraph-image.tsx` (commit 493a568).
- [ ] Bootstrap `../villagekit-media` repo: `git init`, `git lfs install`, `.gitattributes` for `*.png|*.jpg|*.jpeg|*.svg|*.webp|*.gif|*.mp4|*.webm`, `package.json` with `cloudinary` dep, `.env.example`, README, LICENSE (EUPL-1.2).
- [ ] Add `scripts/fetch-legacy.ts` that downloads every legacy asset listed in the audit from `https://res.cloudinary.com/villagekit/{image,video}/upload/v1/gridkit.nz/...` into `media/<new-id>.<ext>`. No auth needed (public Cloudinary URLs). Run it; commit the masters into LFS.
- [ ] Add `scripts/sync-media.ts` — idempotent uploader using the Cloudinary Node SDK (hash content, compare with `etag` via `api.resource(public_id)`, upload only when missing or mismatched). Reads creds from `.env`.
- [ ] Hand off to Mikey: push `villagekit-media` to GitHub, run `pnpm run sync-media`, then add it as a submodule of this site repo.
- [ ] Bulk find-and-replace `v1/gridkit.nz/<old>_<suffix>(.<ext>)?` → new asset ID across the website's MDX and TSX files (per the table in the audit). Watch for dual-form references with/without extension.

## Notes
- Source masters live in a separate repo (`villagekit-media`), not this one. Cleaner separation: the site's git history doesn't get bloated by image churn, and the sync script + masters travel together.
- The site's existing `.gitattributes` already routes `*.png|*.jpg|...` through LFS — but with masters out of tree, we don't end up using LFS in this repo for the migrated images at all.
- The URL builder (`getCloudinaryImageUrl` in `@villagekit/ui`, `getCloudinaryVideoUrl` in `app/_lib/cloudinary.ts`) keeps emitting `https://res.cloudinary.com/${cloudName}/...`. No custom-CNAME wiring needed.

## Depends on
None.
