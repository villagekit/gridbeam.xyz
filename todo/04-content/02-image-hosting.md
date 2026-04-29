# 02 — Image hosting decision + migration

**Status:** TODO

## Why
Every image on the legacy site lives at `https://res.cloudinary.com/villagekit/v1/gridkit.nz/...`. We need to decide where the images for the new site live, and migrate references.

## What
A clear hosting strategy and updated image references throughout the codebase.

## Steps
- [ ] Decide hosting:
  - **A**: Keep using Cloudinary, new path: `https://res.cloudinary.com/villagekit/v2/gridbeam.xyz/...`. Easiest. Cost: existing Cloudinary plan.
  - **B**: Self-host in `public/images/` of the website. Simplest, no third-party. Cost: Vercel storage / build size.
  - **C**: Different CDN (Imgix, Cloudflare Images, etc). New setup, different mental model.
  - Recommend **A** for v1 — keeps the responsive image hooks from `ui-media` working, just changes the cloud base path. If Cloudinary is going away (no longer paid), pivot to **B**.
- [ ] Audit which images are actually still relevant:
  - Hero photos of furniture made with grid beam → keep
  - Branded "Grid Kit" packaging photos → drop or replace
  - Founder photos / "about us" headshots → drop unless reframed as "this is one community member who makes things"
- [ ] Establish a naming convention: `gridbeam.xyz/[page]/[descriptor]-[size?]`.
- [ ] Re-upload chosen images under the new path. Tag them with a sensible Cloudinary tag for organisation.
- [ ] Update the `ui-media` Image component's default Cloudinary cloud-name handling (Stream 02 task 05) so it can be configured per consuming app.
- [ ] Bulk find-and-replace `cloudinary.com/villagekit/v1/gridkit.nz` → new path across the website's MDX and TSX files (only after all stories are ported).
- [ ] OG / social-card images: do they need new versions? Probably yes.
- [ ] Favicon — generate a new one for gridbeam.xyz (legacy uses `cli-real-favicon` config — see `node-modules/apps/gridbeam/faviconConfig.json`).

## Notes
- LFS: the repo has `*.png filter=lfs` etc. configured (`.gitattributes`). If images go into `public/`, they'll be LFS-tracked — that's fine.
- Decide if you want the source images committed (PNG masters in `assets/source-images/` LFS-tracked) for transformation or only the optimised CDN copies.

## Depends on
None.
