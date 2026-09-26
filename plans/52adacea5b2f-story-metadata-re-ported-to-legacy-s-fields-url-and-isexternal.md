---
title: "Story metadata re-ported to legacy's fields: url and isExternal, image.type and Date values, on the six exports, the linked stories and their readers"
status: todo
parent: 56e6eb197e6c
derived_from: 56e6eb197e6c
blocked_by:
  - 9f174b0d4c72
  - 373320c95e55
  - e332105c3b52
  - target: eeeb3813939b
    strength: soft
    note: "the same MDX files: the inline JSX first"
tags:
  - "worker:fable"
---
The story metadata is legacy's shape again on all ten stories: `url` (the path under `/stories`, or the external address) and `isExternal` in place of `slug` and `external`, `image.type: 'cloudinary'` on every cover, and `publishedAt` and `updatedAt` as `Date` values built with legacy's slash form (`new Date('2024/10/10')`, parsed as local time, so a card's date reads the same day in every timezone and the hydration text mismatch west of UTC goes). `StoryMetadata` in `app/_lib/stories.ts` takes legacy's fields, the four linked stories legacy's `url` and `isExternal: true`, and every reader takes legacy's lines: the card's href, icon and date, the stories context's sort, the sitemap, and the story page's metadata and static params until the page re-port replaces them. One item, [[82762f6b27de]], whose notes extend it to the linked stories; a shape decision at a module three routes and the sitemap read, whose `Date` values cross a server boundary, so Fable. Record `56e6eb197e6c`; decisions `ee86d68a`, `2032533f`.

## Work

- Legacy at `fce357d`: `../node-modules/apps/gridkit/stories.ts:1,10-25,34-99` (the type, `image: RasterImagePropsWithOptionalSizes`, `linkedStories`), the six `pages/stories/*.mdx` metadata blocks (`whats-a-grid-unit.mdx:5-19` and the other five, `type: 'cloudinary'` before `src`, `publishedAt: new Date('2024/10/10')`), `components/stories/item.tsx:30,49,90-94,98,101-105`, `context/stories.tsx:32`, `components/layouts/stories.tsx:40-41,62`. Current: `app/_lib/stories.ts` (the catalog re-port `48c8cbdb206a` kept the site's names for this record), `content/stories/*.mdx` as the earlier slices leave them, `app/_components/stories/Item.tsx`, `app/_lib/context/stories.tsx`, `app/sitemap.ts`, `app/stories/[slug]/page.tsx`, `app/page.tsx`, `app/HomePage.tsx`.
- `app/_lib/stories.ts`: `StoryMetadata` as legacy `:14-25`, `url: string`, `image: RasterImagePropsWithOptionalSizes` (from `@villagekit/ui`, which 1.2.0 exports), `isExternal?: boolean`, `publishedAt: Date`, `updatedAt: Date`, the field order legacy's; `linkedStories` with `url` (the external address) and `isExternal: true` in legacy's per-story field order (`:35-98`), `type: 'cloudinary'` on each `image`, `new Date('2017/09/17')` and the other dates as legacy wrote them; the made-up slugs and the `external` objects go. The residue below `allStories` (`hostedStories`, `STORY_SLUGS`, `getStory`) takes `url.slice(1)` as the slug until the page re-port removes it.
- The six MDX `metadata` blocks: `url: '/<slug>'` where `slug` stood, `type: 'cloudinary'` as the first key of `image`, `publishedAt` and `updatedAt` as `new Date('YYYY/MM/DD')` with legacy's values; the ids stay re-hosted ([[01a2acd9e8af]]).
- The readers, each legacy's line: `app/_components/stories/Item.tsx` destructures `url, isExternal` (`:30`), spreads `{...image}` on the ui `Image` with the explicit `type="cloudinary"` gone (`:49`), prints `publishedAt.toLocaleDateString(...)` (`:90-94`), shows the icon on `isExternal` (`:98`), and renders the overlays as `isExternal ? ... href={url} ... : <LinkOverlay as={NextLink} href={`/stories${url}`} ...>` (`:101-105`; the external overlay keeps the `asChild` shape the card slice wrote, `ed16aad27638`); `app/_lib/context/stories.tsx` sorts on `b.publishedAt.getTime() - a.publishedAt.getTime()` (`:32`); `app/sitemap.ts` filters on `!story.isExternal`, writes `${SITE_URL}/stories${story.url}` and `lastModified: story.updatedAt`; `app/stories/[slug]/page.tsx` writes `publishedTime: publishedAt.toISOString()` and `modifiedTime: updatedAt.toISOString()` (legacy `layouts/stories.tsx:40-41`) and renders the cover as legacy's `<StoryImage {...image} priority />` (`:62`), the `type="cloudinary"` the components slice wrote on the call now coming from the spread; `app/page.tsx` and `app/HomePage.tsx` change nothing but what compiles (the two `as unknown as StoryMetadata` casts stay; `mdx.d.ts` is untouched). The `Date` values cross the server-to-client boundary as props of `HomePage`, which React 19's Flight serializes; see `/` render its two cards on `pnpm dev`.
- Interfaces: consumes `StoryImage` reading `type` from its props (the components slice) and `Item` (`e332105c3b52`); produces legacy's `StoryMetadata` for the page re-port (`publishedAt.toISOString()`, `{...image}` with `type`, `url`).
- Verify first: `grep -rln 'slug\|external' app/_lib/stories.ts app/_components/stories/Item.tsx app/sitemap.ts 'app/stories/[slug]/page.tsx' content/stories` prints those files (the three modules, the page and the six MDX files) and no other; `grep -c 'Date.parse' app/_lib/context/stories.tsx` prints 1; `grep -rn "slug: '\|external: {\|publishedAt: '" content/stories app/_lib/stories.ts | wc -l` prints 24; `grep -n 'RasterImagePropsWithOptionalSizes' node_modules/@villagekit/ui/dist/index.d.ts` prints the export.
- Docs: none.
- Not this slice: the route and the page (the page re-port, which consumes this); `originallyPublishedOn` (gone with the removals slice); the covers' ids.

## Seams under test

None pure: the module is data and the readers are one line each; the proof is the DOM pair of `/stories`, the sitemap and a timezone probe.

## Done when

- Against a running `pnpm dev`, `pnpm audit:dom --routes <a file naming /stories and />`: every card's date on `/stories` reads as `legacy.txt` has it (`29/11/2024` first, `11/03/2003` last), the four linked cards' overlays carry legacy's external `href`s and the six hosted ones `/stories/<slug>`, and `/` renders its two story cards; a Playwright probe with the browser west of UTC (`timezoneId: 'America/Los_Angeles'`) reads the same ten dates on `/stories` and no hydration mismatch in the console, where the ISO strings printed the previous day (the note on the item)
- `curl -s localhost:3000/sitemap.xml | grep -c '<loc>[^<]*/stories/'` prints 6; each of the six story routes and `/` serve 200; `curl -s localhost:3000/stories/whats-a-grid-unit | grep -o 'article:published_time" content="[^"]*"'` prints an ISO instant (local midnight of the build machine as UTC, legacy's `toISOString()` reading; before the change it printed the bare date string `2024-10-10`)
- `grep -rn "slug: '\|external: {\|publishedAt: '" content/stories app/_lib/stories.ts | wc -l` prints 0; `grep -c "type: 'cloudinary'" app/_lib/stories.ts` prints 4 and each of the six MDX files 1 in its metadata; `grep -c 'Date.parse' app/_lib/context/stories.tsx` prints 0; `grep -c 'type="cloudinary"' app/_components/stories/Item.tsx` prints 0
- [[82762f6b27de]] is `fixed` (`kipu fix 82762f6b27de --outcome "plan <this prefix>"`), its outcome naming the linked stories' fields and the readers changed; checked after the fix
- `timeout 900 just check` is green

## Outcome

## Log
