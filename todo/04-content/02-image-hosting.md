# 02 — Image hosting decision + migration

**Status:** BLOCKED — awaiting Mikey's answers to the open questions in [`./02-image-hosting/audit.md`](./02-image-hosting/audit.md). Audit + naming convention + env-var refactor of the cloud name are landed; the rest of the steps (re-upload, find-replace, OG/favicon decisions) need those answers before proceeding.

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
  - Mikey's **D**: Create a new `media.gridbeam.xyz` with all the media, to be hosted on Cloudinary via idempotent scripts that update Cloudinary based on the contents in the repo.
  - Decision: **D**
- [x] Audit which images are actually still relevant — see [`./02-image-hosting/audit.md`](./02-image-hosting/audit.md). Result: ~100 references across `/`, `/about`, and 6 stories. All KEEP (no DROP, no REPLACE in current code). The "Grid Kit packaging" / "founder headshot" categories from the original prompt aren't actually referenced in new code.
- [x] Establish a naming convention — see audit. Drop the random Cloudinary suffix; use deterministic `<page>/<descriptor>` paths (or `shared/<descriptor>` for cross-page assets).
- [ ] **BLOCKED — open questions for Mikey** (see audit § "Open questions for Mikey"):
  - cloud name (stay `villagekit` or new `gridbeam`?),
  - `media.gridbeam.xyz` CNAME setup status,
  - source-image directory choice,
  - upload-script runtime / CI access,
  - asset-ID shortening confirmations (long story IDs, `madewithgridkit-N` → `community-build-N`),
  - real favicon / OG image commissioning.
- [ ] Re-upload chosen images under the new path. Tag them with a sensible Cloudinary tag for organisation.
- [ ] Update the `getCloudinaryImageUrl` URL builder (in `@villagekit/ui` and the site's wrappers `app/_lib/cloudinary.ts` + `app/_lib/cloudinary-loader.ts`) to support a configurable base URL — env-var driven, defaulting to `https://res.cloudinary.com/<cloudinaryName>` so existing behavior is preserved when no override is set.
- [ ] Bulk find-and-replace `v1/gridkit.nz/<old>_<suffix>` → new asset ID across the website's MDX and TSX files (per the table in the audit).
- [ ] OG / social-card images: confirm whether the existing dynamic `app/opengraph-image.tsx` is enough, or commission a real image.
- [ ] Favicon: confirm whether the existing `app/icon.svg` + `app/apple-icon.tsx` is enough, or commission a logo-based favicon set (the legacy `node-modules/apps/gridbeam/faviconConfig.json` is the `cli-real-favicon` template if so).

## Notes
- LFS: the repo has `*.png filter=lfs` etc. configured (`.gitattributes`). If images go into `media/` (or `public/`), they'll be LFS-tracked — that's fine.
- Decide if you want the source images committed (PNG masters in `media/` LFS-tracked) for transformation or only the optimised CDN copies. Default plan: in-repo masters so the upload script is fully reproducible from a clone.
- Cloudinary CNAME doc for reference when wiring `media.gridbeam.xyz`: <https://support.cloudinary.com/hc/en-us/articles/202520242-Can-I-use-a-CNAME-to-create-a-custom-Cloudinary-sub-domain-CDN-prefix>.

## Depends on
None.
