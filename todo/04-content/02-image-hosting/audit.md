# Image audit — gridkit.nz Cloudinary → gridbeam.xyz Cloudinary

Source: every Cloudinary image / video reference currently in the new site code under `app/` and `content/`. All paths today resolve to `https://res.cloudinary.com/villagekit/image/upload/.../v1/gridkit.nz/...` (or `/video/upload/.../`).

Decision in `02-image-hosting.md` is **D** — host under a new `media.gridbeam.xyz` CNAME on Cloudinary, source images committed to the repo, an idempotent script syncs them to Cloudinary.

This doc enumerates every reference and classifies it; produces the proposed target asset IDs; flags the load-bearing decisions still pending Mikey input.

## Legend

- **KEEP** — re-host as-is at the new path; no content change
- **REPLACE** — re-host but produce a new image (re-shoot, re-render, retitle)
- **DROP** — not used in the new site, no migration needed

## Naming convention proposal

- Drop the random Cloudinary suffix (`_x6zscs` etc). The upload script controls IDs, so they should be deterministic and human-readable.
- Drop the `v1/gridkit.nz/` prefix. The new cloud (or path) is the namespace.
- Use slash-separated paths that mirror the page structure: `<page>/<descriptor>` for page-specific imagery; `shared/<descriptor>` for site-wide imagery used in multiple places.
- Preserve the third-level grouping (`updates/`, `creations/`) when the source story already used one — keeps related imagery clustered.
- Lowercase, hyphen-separated, no extension (Cloudinary's `f_auto` picks the best format per request).

Examples:

| Old | Proposed |
|-----|----------|
| `v1/gridkit.nz/grid_yvn1om` | `about/grid` |
| `v1/gridkit.nz/beams_czf9hb` | `about/beams` |
| `v1/gridkit.nz/grid-example_vezsvx` | `shared/grid-example` (used on `/` and `/about`) |
| `v1/gridkit.nz/made-with-grid-kit/record-shelf_x6zscs` | `home/record-shelf-hero` |
| `v1/gridkit.nz/stories/2021-winter-newsletter/the-team_gy2f0k` | `stories/2021-winter-newsletter/the-team` |

The rest of the audit uses these proposed IDs.

## Page: home (`app/page.tsx`)

| Old asset | New asset ID | Action | Notes |
|-----------|--------------|--------|-------|
| `v1/gridkit.nz/made-with-grid-kit/record-shelf_x6zscs` | `home/record-shelf-hero` | **KEEP** | Hero photo: a record-shelf grid-beam build. Already alt-described as a build, not as Grid Kit branding. Per rebrand audit row "Homepage hero — image carousel". |
| `v1/gridkit.nz/grid-example_vezsvx` | `shared/grid-example` | **KEEP** | Diagram of 40 mm grid overlaid on a beam + panel. Universal. Shared with `/about`. |

## Page: about (`app/about/page.tsx`)

| Old asset | New asset ID | Action | Notes |
|-----------|--------------|--------|-------|
| `v1/gridkit.nz/grid_yvn1om` | `about/grid` | **KEEP** | Generic grid square diagram. |
| `v1/gridkit.nz/grid-example_vezsvx` | `shared/grid-example` | **KEEP** | Same asset as on home; one upload, two refs. |
| `v1/gridkit.nz/beams_czf9hb` | `about/beams` | **KEEP** | Photo of a row of grid beams. |
| `v1/gridkit.nz/panels_rs1ea1` | `about/panels` | **KEEP** | Photo of a grid panel. |
| `v1/gridkit.nz/fasteners_ctuejz` | `about/fasteners` | **KEEP** | Photo of hex-key bolts and nuts. |
| `v1/gridkit.nz/tri-joint_lqtzvf` | `about/tri-joint` | **KEEP** | Photo of three beams in a tri-joint. |

## Story: building-with-grid-kit (`content/stories/building-with-grid-kit.mdx`)

7 images. All KEEP — story is `KEEP as historical` per rebrand audit row.

| Old asset | New asset ID |
|-----------|--------------|
| `v1/gridkit.nz/stories/building-with-grid-kit/counting_jioqcm.jpg` | `stories/building-with-grid-kit/counting` |
| `v1/gridkit.nz/stories/building-with-grid-kit/planning_vvenh7.jpg` | `stories/building-with-grid-kit/planning` |
| `v1/gridkit.nz/stories/building-with-grid-kit/cutting_ery9nf.jpg` | `stories/building-with-grid-kit/cutting` |
| `v1/gridkit.nz/stories/building-with-grid-kit/sanding_sm9wnf.jpg` | `stories/building-with-grid-kit/sanding` |
| `v1/gridkit.nz/stories/building-with-grid-kit/join_wwd7yj.jpg` | `stories/building-with-grid-kit/join` |
| `v1/gridkit.nz/stories/building-with-grid-kit/subcomponent_znybfu.jpg` | `stories/building-with-grid-kit/subcomponent` |
| `v1/gridkit.nz/stories/building-with-grid-kit/completion_nsvx41.jpg` | `stories/building-with-grid-kit/completion` |

## Story: how-to-cut-grid-beams (`content/stories/how-to-cut-grid-beams.mdx`)

14 images. All KEEP — pure tutorial content.

| Old asset | New asset ID |
|-----------|--------------|
| `.../cutting-a-gridbeam-with-a-handsaw_ltuy0z` | `stories/how-to-cut-grid-beams/cutting-a-gridbeam-with-a-handsaw` |
| `.../pencil-and-cut-alignment-tool_dgvv0d` | `stories/how-to-cut-grid-beams/pencil-and-cut-alignment-tool` |
| `.../placing-cut-alignment-tool-into-beam-holes_hhgdtf` | `stories/how-to-cut-grid-beams/placing-cut-alignment-tool-into-beam-holes` |
| `.../tracing-edge-of-cut-alignment-tool-with-pencil_nlub7c` | `stories/how-to-cut-grid-beams/tracing-edge-of-cut-alignment-tool-with-pencil` |
| `.../tracing-edge-of-cut-alignment-tool-with-pencil-rotated-90-degrees_bvlo8e` | `stories/how-to-cut-grid-beams/tracing-edge-of-cut-alignment-tool-with-pencil-rotated-90-degrees` |
| `.../preparing-a-workspace-with-enough-space-for-material-and-on-a-table-below-the-waist_b3fsul` | `stories/how-to-cut-grid-beams/preparing-a-workspace` |
| `.../cutting-a-grid-beam-on-the-garage-floor-using-timber-as-support_d7mhvw` | `stories/how-to-cut-grid-beams/cutting-on-garage-floor` |
| `.../lining-the-saw-blade-up-with-the-cut-line_zscrr4` | `stories/how-to-cut-grid-beams/lining-saw-blade-with-cut-line` |
| `.../starting-to-saw-at-an-angle-to-get-the-cut-started_hgfsa2` | `stories/how-to-cut-grid-beams/starting-saw-at-angle` |
| `.../saw-blade-straight-on-as-cutting-through-a-beam-making-a-visible-kerf_o0eabl` | `stories/how-to-cut-grid-beams/saw-cutting-through-beam-with-kerf` |
| `.../measuring-saw-teeth-with-calipers_ckueek` | `stories/how-to-cut-grid-beams/measuring-saw-teeth-with-calipers` |
| `.../cut-alignment-tool-in-replicad_gv0quv` | `stories/how-to-cut-grid-beams/cut-alignment-tool-in-replicad` |
| `.../slicing-3d-model_ntpmbd` | `stories/how-to-cut-grid-beams/slicing-3d-model` |
| `.../custom-cut-alignment-tool-with-the-offset-from-the-original-cut-line_fykisl` | `stories/how-to-cut-grid-beams/custom-cut-alignment-tool` |
| `.../cut-using-saw-and-custom-cut-alignment-tool_rkqj2t` | `stories/how-to-cut-grid-beams/cut-using-custom-alignment-tool` |

The shorter IDs (e.g. dropping "preparing-a-workspace-with-enough-space-for-material-and-on-a-table-below-the-waist") are a one-time chance to trim. Open question for Mikey if he prefers verbatim names.

## Story: how-to-furniture-bolts (`content/stories/how-to-furniture-bolts.mdx`)

9 images. All KEEP — pure tutorial.

| Old asset | New asset ID |
|-----------|--------------|
| `.../how-to-connect-furniture-bolts-hero_kaxnwl.jpg` | `stories/how-to-furniture-bolts/hero` |
| `.../how-to-connect-furniture-bolts-hex-key_wx8bdx.jpg` | `stories/how-to-furniture-bolts/hex-key` |
| `.../how-to-connect-furniture-bolts-all-hardware_ehkjqj.jpg` | `stories/how-to-furniture-bolts/all-hardware` |
| `.../how-to-connect-furniture-bolts-beam-to-beam-connection_uub0mj.jpg` | `stories/how-to-furniture-bolts/beam-to-beam-connection` |
| `.../how-to-connect-furniture-bolts-1beam-12mm-panel-connection_ltq4ho.jpg` | `stories/how-to-furniture-bolts/1beam-12mm-panel-connection` |
| `.../how-to-connect-furniture-bolts-2beam-12mm-panel-connection_v0co6l.jpg` | `stories/how-to-furniture-bolts/2beam-12mm-panel-connection` |
| `.../how-to-connect-furniture-bolts-1beam-18mm-panel-connection_goxpdt.jpg` | `stories/how-to-furniture-bolts/1beam-18mm-panel-connection` |
| `.../how-to-connect-furniture-bolts-2beam-18mm-panel-connection_rbguk5.jpg` | `stories/how-to-furniture-bolts/2beam-18mm-panel-connection` |
| `.../how-to-connect-furniture-bolts-decision-tree_n0jaic` | `stories/how-to-furniture-bolts/decision-tree` |

## Story: whats-a-grid-unit (`content/stories/whats-a-grid-unit.mdx`)

14 images. All KEEP. Note: 6 of these are user submissions under `madewithgridkit-N` — alt text frames them as community builds; rename for clarity.

| Old asset | New asset ID |
|-----------|--------------|
| `.../grid-unit-cube_fndokk` | `stories/whats-a-grid-unit/grid-unit-cube` |
| `.../brick-dimensions_s0qj2d.jpg` | `stories/whats-a-grid-unit/brick-dimensions` |
| `.../lego-dimensions_ipuhws.jpg` | `stories/whats-a-grid-unit/lego-dimensions` |
| `.../grid-beam-composite-numbers_fqsj3t.jpg` | `stories/whats-a-grid-unit/grid-beam-composite-numbers` |
| `.../grid-panel-composite-numbers_ke3cbo.jpg` | `stories/whats-a-grid-unit/grid-panel-composite-numbers` |
| `.../madewithgridkit-0_idbwz0.jpg` | `stories/whats-a-grid-unit/community-build-0` |
| `.../madewithgridkit-1_izasbg.jpg` | `stories/whats-a-grid-unit/community-build-1` |
| `.../madewithgridkit-2_nvvgne.jpg` | `stories/whats-a-grid-unit/community-build-2` |
| `.../madewithgridkit-3_kiagqw.jpg` | `stories/whats-a-grid-unit/community-build-3` |
| `.../madewithgridkit-4_baq4cq.jpg` | `stories/whats-a-grid-unit/community-build-4` |
| `.../madewithgridkit-5_itvjxv.jpg` | `stories/whats-a-grid-unit/community-build-5` |
| `.../telephone-rack-1923_tieg5o.jpg` | `stories/whats-a-grid-unit/telephone-rack-1923` |
| `.../computer-rack-with-units_o2twra.jpg` | `stories/whats-a-grid-unit/computer-rack-with-units` |
| `.../synth-rack-unit_hxint7.jpg` | `stories/whats-a-grid-unit/synth-rack-unit` |
| `.../xkcd-rack-unit_ewzu0d` | `stories/whats-a-grid-unit/xkcd-rack-unit` |

## Story: 2021-winter-newsletter (`content/stories/2021-winter-newsletter.mdx`)

12 images + 4 videos. All KEEP — historical newsletter. Drop the `_xxxxx` suffix.

Images:

| Old asset | New asset ID |
|-----------|--------------|
| `.../the-team_gy2f0k` | `stories/2021-winter-newsletter/the-team` |
| `.../grid-beam-video-thumbnail-with-play-button_no80fj` | `stories/2021-winter-newsletter/grid-beam-video-thumbnail` (drops `with-play-button` — see Q5 long-name shortening) |
| `.../dish-rack_nhiv8n` | `stories/2021-winter-newsletter/dish-rack` |
| `.../temporary-kitchen_f3qch4` | `stories/2021-winter-newsletter/temporary-kitchen` |
| `.../compost-toilet_gnbeiz` | `stories/2021-winter-newsletter/compost-toilet` |
| `.../lazy-tortoise_h7ggve` | `stories/2021-winter-newsletter/lazy-tortoise` |
| `.../sun-bed_hqvwhm` | `stories/2021-winter-newsletter/sun-bed` |
| `.../shoe-rack_fb5cnf` | `stories/2021-winter-newsletter/shoe-rack` |
| `.../dining-table_qvjfy3` | `stories/2021-winter-newsletter/dining-table` |
| `.../automated-factory-machine-sketch_ow6rzh` | `stories/2021-winter-newsletter/automated-factory-machine-sketch` |

Videos (note: `gridkit.nz/...` without the `v1/` prefix — Cloudinary auto-resolved to `v1`):

| Old asset | New asset ID |
|-----------|--------------|
| `gridkit.nz/stories/2021-winter-newsletter/gridcraft-playground_kepuvr` | `stories/2021-winter-newsletter/gridcraft-playground` |
| `gridkit.nz/stories/2021-winter-newsletter/robot-drilling-holes_sfmsyn` | `stories/2021-winter-newsletter/robot-drilling-holes` |
| `gridkit.nz/stories/2021-winter-newsletter/creation-parameter-controls_pcramv` | `stories/2021-winter-newsletter/creation-parameter-controls` |

## Story: 2022-newsletter (`content/stories/2022-newsletter.mdx`)

47 unique image refs. All KEEP — historical newsletter. The tables below collapse number-suffixed ranges (`hanging-lights-{1..5}`, `gridbot-hex-{1..8}`, etc) into single rows; the bulk find-replace step needs to expand these.

Top-level:

| Old asset | New asset ID |
|-----------|--------------|
| `.../xmas-tree_hvcswn` | `stories/2022-newsletter/xmas-tree` |
| `.../team-robot_qngp4v` | `stories/2022-newsletter/team-robot` |

`updates/` (12 images):

| Old asset | New asset ID |
|-----------|--------------|
| `.../updates/team-lunch_uk3hrn` | `stories/2022-newsletter/updates/team-lunch` |
| `.../updates/farm-ducks_n3nzoe` | `stories/2022-newsletter/updates/farm-ducks` |
| `.../updates/gridbot-tahi_nf4gwb` | `stories/2022-newsletter/updates/gridbot-tahi` |
| `.../updates/new-gridbot_mnq1zo` | `stories/2022-newsletter/updates/new-gridbot` |
| `.../updates/gridbot-hex-1_mlepqm` … `gridbot-hex-8_b15nzr` | `stories/2022-newsletter/updates/gridbot-hex-1` … `gridbot-hex-8` |
| `.../updates/gridbot-hex-test-drilling_zgcnu3` | `stories/2022-newsletter/updates/gridbot-hex-test-drilling` |
| `.../updates/landing-screenshot_czbm7x` | `stories/2022-newsletter/updates/landing-screenshot` |
| `.../updates/products-screenshot_bnnich` | `stories/2022-newsletter/updates/products-screenshot` |
| `.../updates/parts-breakdown-screenshot_tngztw` | `stories/2022-newsletter/updates/parts-breakdown-screenshot` |
| `.../updates/shoe-rack-screenshot_konqys` | `stories/2022-newsletter/updates/shoe-rack-screenshot` |
| `.../updates/stories-screenshot_qql0kf` | `stories/2022-newsletter/updates/stories-screenshot` |
| `.../updates/discuss-screenshot_q1smw8` | `stories/2022-newsletter/updates/discuss-screenshot` |
| `.../updates/phil-jergenson_mlnmvc` | `stories/2022-newsletter/updates/phil-jergenson` |

`creations/` (~25 images):

| Old asset | New asset ID |
|-----------|--------------|
| `.../creations/insert-nuts_dbnygd` | `stories/2022-newsletter/creations/insert-nuts` |
| `.../creations/castor-wheels_g2d7o8` | `stories/2022-newsletter/creations/castor-wheels` |
| `.../creations/simple-tool-holder_wrpgta` | `stories/2022-newsletter/creations/simple-tool-holder` |
| `.../creations/hanging-lights-{1..5}_*` | `stories/2022-newsletter/creations/hanging-lights-{1..5}` |
| `.../creations/kitchen-island-{1..4}_*` | `stories/2022-newsletter/creations/kitchen-island-{1..4}` |
| `.../creations/kitchen-unit-{1..2}_*` | `stories/2022-newsletter/creations/kitchen-unit-{1..2}` |
| `.../creations/peacock-truck-{1..5}_*` | `stories/2022-newsletter/creations/peacock-truck-{1..5}` |
| `.../creations/record-player-{1..4}_*` | `stories/2022-newsletter/creations/record-player-{1..4}` |
| `.../creations/server-rack-{1..2}_*` | `stories/2022-newsletter/creations/server-rack-{1..2}` |

## Site-wide

- **Favicon.** `app/icon.svg` and `app/apple-icon.tsx` are already in place — both are SVG/CSS-generated, not Cloudinary-hosted. No migration needed unless we commission a logo-based favicon (decision item below).
- **OG / social-card images.** `app/opengraph-image.tsx` and `app/twitter-image.tsx` (re-export) are dynamic CSS-rendered. No Cloudinary needed unless we commission a real photo-based card (decision item below).
- The legacy `node-modules/apps/gridbeam/faviconConfig.json` is the old `cli-real-favicon` config — useful only if we commission a multi-size favicon set.

## Drops

These are referenced in the rebrand audit but are NOT used in the new site code:

- `gridkit.nz/douglas-fir-forest_etzvle` — flagged DROP/TWEAK in rebrand audit (`/home` "A future without waste" section was rewritten without this image). Not in new code; no migration needed.
- The "Closing-down sale" banner — banner removed entirely; no image.

## Open questions for Mikey (load-bearing)

1. **Cloudinary cloud name.** Stay on the existing `villagekit` cloud (in which case the new images live alongside the old, just under different paths), or create a new `gridbeam` cloud? Trade-off: same cloud is simpler and the old paths keep working as a fallback; a new cloud cleanly separates the old startup namespace from the new community site. Default: stay on `villagekit`.
2. **CNAME `media.gridbeam.xyz`.** Has the CNAME been set up at Cloudinary yet, or is this still TBD? Cloudinary supports private CDN distribution — if so, the URL builder needs to emit `https://media.gridbeam.xyz/.../` instead of `https://res.cloudinary.com/villagekit/.../`. Cloudinary doc: <https://support.cloudinary.com/hc/en-us/articles/202520242-Can-I-use-a-CNAME-to-create-a-custom-Cloudinary-sub-domain-CDN-prefix>. Note: when this lands, **two** URL builders need updating — `getCloudinaryImageUrl` in `@villagekit/ui` (used by the loader and `getCloudinaryUrl`) and the local `getCloudinaryVideoUrl` in `app/_lib/cloudinary.ts` (which independently hardcodes `https://res.cloudinary.com/${CLOUDINARY_NAME}`).
3. **Source images in repo.** Where do the PNG/JPG masters live? Proposed: `media/` at the repo root (LFS-tracked per existing `.gitattributes`). Alternative: a separate `villagekit/gridbeam-media` repo. Default: in-repo `media/`.
4. **Upload script — three sub-questions.**
    - **(a) SDK.** Cloudinary's official Node SDK (`cloudinary` on npm) is the default. OK?
    - **(b) Idempotency strategy.** Hash content + compare with Cloudinary's `etag` field via `api.resource(public_id)` — only upload when missing or hash mismatched. OK?
    - **(c) Script location.** Proposed: `scripts/sync-media.ts` at the repo root, runnable via `pnpm run sync-media`. OK?
5. **Asset-ID rename.** Some legacy IDs are very long (e.g. `preparing-a-workspace-with-enough-space-for-material-and-on-a-table-below-the-waist`). This audit shortens them. Confirm the shortenings are OK, or keep verbatim?
6. **`madewithgridkit-N` rename.** This audit renames them to `community-build-N`. Confirm the rebrand makes sense, or keep the old slug?
7. **Real favicon + OG image.** Current generated artwork is functional but minimal. Commission proper artwork (logo-based favicon, photographed OG image), or ship as-is?
8. **Cloudinary credential management.**
    - **(a) Where stored.** Default: 1Password vault Mikey controls; mirrored into Vercel + GitHub Actions repo secrets when needed.
    - **(b) Run target.** Local-only (Mikey runs `pnpm run sync-media` from his machine when adding/changing images), or CI-driven (GitHub Action syncs on push to `main`)? Default: local-only for v1, CI later.

## Steps to execute (after decisions land)

1. Create `media/` source directory (or wherever decided).
2. Download legacy assets from `https://res.cloudinary.com/villagekit/image/upload/v1/gridkit.nz/...` to local masters.
3. Re-upload under the new asset IDs via the idempotent script (or commit and let CI sync).
4. Update `getCloudinaryImageUrl` in `@villagekit/ui` (and its consumers) to emit the new base URL — env-var driven. Also update `getCloudinaryVideoUrl` in `app/_lib/cloudinary.ts`.
5. Bulk find-replace `v1/gridkit.nz/<old>_<suffix>` → new asset ID across `app/` + `content/`. **Watch for dual-form references**: e.g. `whats-a-grid-unit/grid-unit-cube_fndokk` is used both with and without `.jpg` extension — both forms need to map to the same target (`stories/whats-a-grid-unit/grid-unit-cube`). Same pattern likely for any `<id>_<suffix>` vs `<id>_<suffix>.jpg` pairs in the MDX files.
6. Verify every page renders the new images via `pnpm dev` + `pnpm build`.
