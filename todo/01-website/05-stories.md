# 05 — MDX stories / guides

**Status:** DONE

## Why
The legacy site has 6 well-written MDX stories that explain how to use the system: cutting beams, using furniture bolts, what a grid unit is, building with grid kit, plus two newsletters (4 guides + 2 newsletters). These are exactly the kind of educational content the new site exists for.

## What
- `app/stories/page.tsx` — listing of all stories with hero image + title + date, sorted by publishedAt desc
- `app/stories/[slug]/page.tsx` — individual story page rendered from MDX, with TOC sidebar via `ContentMainTocLayout`, OG metadata wired to the story's hero image
- `content/stories/*.mdx` — six ported stories, each exporting `metadata`
- `mdx-components.tsx` — typography overrides (a, h1–h5, p, ul/ol/li, blockquote)
- `app/_components/story/*` — `StorySection`, `StoryRow`, `StoryColumn`, `StoryImage`, `StoryImageGrid`, `StoryVideo`, `StoryEditorialNote`
- `app/_lib/cloudinary.ts` + `app/_lib/cloudinary-loader.ts` — temporary Cloudinary URL helpers (loaderFile drives Next/Image responsive srcsets)
- `app/_lib/stories.ts` — typed manifest (static map by slug, sorted accessor)
- `app/_lib/mdx.d.ts` — module declaration so `metadata` and default export from `*.mdx` are typed

## Steps
- [x] **Decide MDX strategy.** `@next/mdx` with file-based imports + `export const metadata` in each `.mdx`. `content/stories/*.mdx` live outside `app/`; imported into `app/stories/[slug]/page.tsx` via a static map in `app/_lib/stories.ts`. Avoids `contentlayer` complexity; matches the legacy pattern; keeps build statically analyzable.
- [x] **Set up MDX components map at `mdx-components.tsx`.** Inlined the typography overrides locally rather than waiting on Stream 02 task 06 (`@villagekit/ui/mdx`). When 02-06 lands, this file becomes a one-line `import { mdxComponents } from '@villagekit/ui/mdx'`.
- [x] **Custom MDX components.** All 7 (incl. new `<StoryEditorialNote>` for the historical-banner pattern) under `app/_components/story/`. `StoryImageCarousel` deliberately downgraded to `StoryImageGrid` to avoid pulling in `react-responsive-carousel` — carousel UX isn't load-bearing for the two newsletters that used it.
- [x] **Port the 6 stories.** All in `content/stories/`. Slug for `building-with-grid-kit` kept (per the port plan recommendation: editor's banner + URL preservation > rename).
- [x] **Rebrand each story per port plan.** `whats-a-grid-unit.mdx` (3 edits), `how-to-cut-grid-beams.mdx` (1 link), `how-to-furniture-bolts.mdx` (4 edits), historical banners on the 3 historical pieces. Verified at port time.
- [x] **`app/stories/page.tsx` — story discovery.** Uses static manifest in `app/_lib/stories.ts` rather than disk-glob. Sort by `publishedAt` desc via `getAllStories()`.
- [x] **Story page TOC.** Used `ContentMainTocLayout` from `@villagekit/ui` — wraps `usePageHeadingsTree` automatically.
- [x] **OG image per story.** `getCloudinaryUrl({ src, width: 1200 })` from each story's `image.src`.

## Notes
- **MDX strategy.** `@next/mdx` with `pageExtensions: ['ts', 'tsx', 'mdx']` already in `next.config.ts`. Each `.mdx` exports `metadata` + default React component; `app/_lib/stories.ts` imports both per slug into a typed `Record<slug, Story>`. `as unknown as StoryMetadata` casts mark the trust boundary; future cleanup is to swap them for a Zod parser (recorded as follow-up).
- **`'use client'` decision.** Initially `StoryImage` was forced to `'use client'` because Next 15 won't serialize a `loader` function across the RSC boundary. After review feedback, switched to `images.loaderFile` in `next.config.ts` pointing at `app/_lib/cloudinary-loader.ts` — `StoryImage` is now a server component and Cloudinary URL building is centralized.
- **Carousel → grid downgrade.** The two historical newsletters used `<StoryImageCarousel>` heavily. Replaced with `<StoryImageGrid>` (same images, vertical/horizontal grid). Avoids ~25kB of `react-responsive-carousel` JS for content nobody is going to swipe through. Carousel can be added back as a real component if there's demand.
- **YouTube embed.** The legacy `@u-wave/react-youtube` dependency was avoided. `how-to-furniture-bolts` inlines a plain `<iframe src="youtube-nocookie.com/embed/..." />` in MDX — server-rendered, no extra JS, privacy-friendly.
- **Cloudinary helpers stay temporary.** `app/_lib/cloudinary.ts` has `getCloudinaryUrl` + `getCloudinaryVideoUrl`; `app/_lib/cloudinary-loader.ts` is the next/image loaderFile. Both will move to `@villagekit/ui/media` when Stream 02 task 05 lands.
- **`mdx-components.tsx` is global.** Currently only stories render MDX; if FAQ/legal go MDX later they'll inherit these styles too. Likely desirable.
- **Image rebrand handled by Stream 04 task 02.** All `v1/gridkit.nz/...` Cloudinary URLs preserved; the planned global find-and-replace can run in one pass when image hosting is decided.
- **External URLs.** `discuss.villagekit.com` is up + valid TLS (verified 2026-04-30, see memory `External URL status`). `play.gridbeam.xyz` returns 200 (verified during this work). `gridkit.nz` is a listed supplier and returns 200.

## Verification
- `pnpm typecheck` — clean.
- `pnpm lint` — clean (one Biome `useMediaCaption` ignore on `StoryVideo` for the silent process-demo videos, with explanatory comment).
- `pnpm build` — clean. All 6 story routes generated as `●` SSG, plus `/stories` listing as `○` static.
- Dev server `pnpm dev` + curl per route:
  - `/stories` HTTP 200, h1 "Stories", 6 cards with correct titles + URLs in publishedAt-desc order.
  - All 6 `/stories/<slug>` HTTP 200, h1 with anchor, TOC sidebar present.
  - Editorial banner (`role="note"` + "Originally published") visible on `building-with-grid-kit`, `2021-winter-newsletter`, `2022-newsletter` only.
  - "originally on gridkit.nz" subtitle visible on the 3 historical pieces.
  - OG metadata: `og:image` resolves to `https://res.cloudinary.com/villagekit/image/upload/.../w_1200/...` per story.
  - `next/image` srcsets emit Cloudinary URLs at 384/640/750/828/1080/1200/1920/2048/3840 widths via `loaderFile`.
- Existing pages still 200: `/`, `/about`, `/faq`, `/tools-and-resources`, `/suppliers`, `/contact`, `/subscribe`, `/tools/cutting-planner`.

## Follow-ups
- **Replace metadata `as unknown as StoryMetadata` casts with a Zod parser** — CLAUDE.md recommends Zod at trust boundaries; the MDX export is exactly that. ~20 lines.
- **Consolidate inline SVG icons.** `StoryEditorialNote` and `mdx-components.tsx` blockquote each inline a small SVG. Once `@villagekit/ui` re-exports an icon set (or once `react-icons` is taken as a website-level dep), replace.
- **Stream 02 task 05 (`ui-media`) fold-in.** Then drop `app/_lib/cloudinary.ts` + `cloudinary-loader.ts`; swap `StoryImage`/`StoryVideo` to consume `@villagekit/ui/media` primitives.
- **Stream 02 task 06 (`ui-mdx`) fold-in.** Then collapse the inlined typography overrides in `mdx-components.tsx` into a single `mdxComponents` import.
- **Stream 04 task 02 (image hosting).** Global find-and-replace `v1/gridkit.nz/` → new path prefix in all 6 `.mdx` files + the `image.src` in each `metadata`.
- **Real-browser visual QA at base/md/lg widths** — same caveat as previous tasks; SSR-only verified for now. Roll into Stream 05 pre-launch QA.
- **Optional carousel re-introduction** — only if newsletter readers ask for it.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md) — DONE
- [../02-ui-library/06-fold-ui-mdx.md](../02-ui-library/06-fold-ui-mdx.md) — TODO; worked around by inlining temporarily.
- [../04-content/03-stories-port.md](../04-content/03-stories-port.md) — DONE; port plan applied verbatim.
