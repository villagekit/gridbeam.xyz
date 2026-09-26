---
title: Story catalog re-ported from the legacy stories module
status: todo
parent: ca353de8b645
derived_from: ca353de8b645
blocked_by:
  - 3ef459e66cfb
  - e332105c3b52
tags:
  - "worker:fable"
---
The story catalog is legacy's `stories.ts` again: `app/_lib/stories.ts` exports the `StoryCategory` and `StoryMetadata` types, `StoryCategoryColors`, and `allStories`, one array of every story's metadata in legacy's order, the four linked stories written inline as legacy's `linkedStories` and the six hosted ones imported from their MDX files; no `Story` wrapper, no slug-keyed record, no `getAllStories`, no `isExternalStory`, and no sort in the module (legacy sorted in the context, the page re-port's). What stays beside legacy's exports is the story pages' own mechanism, which is not this record's to judge: the field names and types on `StoryMetadata` (`slug` for legacy's `url`, `external` for `isExternal`, the ISO date strings, the dropped `image.type`) are `82762f6b27de` on the story page template, extended by a note at the split to the four linked stories the module writes; `originallyPublishedOn` is `c983ec56248e`; and the `[slug]` route's lookup of a story's MDX `Content` is `9c48718ec6f8`, all three the story pages record's (`56e6eb197e6c`). One item on `/stories`, a shape decision at a module three routes and the sitemap read, so Fable. Record `ca353de8b645`; decisions `ee86d68a`, `2032533f`.

## Work

- Legacy: `../node-modules/apps/gridkit/stories.ts` at `fce357d` (109 lines: the types `:10-25`, `StoryCategoryColors` `:27-32`, `linkedStories` `:34-99`, `allStories` `:101-109`). Current: `app/_lib/stories.ts` as the copy slice leaves it (the alts settled there).
- `app/_lib/stories.ts` under the header `// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/stories.ts`, in legacy's order: the six MDX `metadata` imports; `StoryCategory`; `StoryMetadata` as legacy's `export type StoryMetadata = { ... }` alias (`:14`), not an `interface`: `app/_lib/mdx.d.ts` types every MDX `metadata` as `Record<string, unknown>`, to which a type alias is assignable and an interface is not, which is why the current code casts `as unknown as`, and legacy's one cast then compiles; `StoryCategoryColors` (already legacy's, the card slice's); `const linkedStories: Array<StoryMetadata>` with the four inspiration stories in legacy's order (`:35-98`) and legacy's per-story field order, each carrying the site's field names for legacy's `url` and `isExternal` (`slug` and `external: { url }`, as they are now, the note on [[82762f6b27de]]) and its ISO date strings, and each with `updatedAt: '2021-09-29'`, legacy's date on all four (`:48,64,80,96`) where the current module repeats `publishedAt`; `export const allStories = [buildingWithGridKit, winterNewsletter, twentyTwentyTwoNewsletter, whatsAGridUnit, howToFurnitureBolts, howToCutGridBeams, ...linkedStories] as Array<StoryMetadata>` (`:101-109`), the six imports named as legacy's `:3-8` name them. The `Story` interface, `internalStoriesBySlug`, `externalStories`, `getAllStories` and `isExternalStory` go.
- The story pages' lookup stays, as the smallest residue and below legacy's exports: `STORY_SLUGS` and `getStory(slug)`, returning the story's metadata and its MDX `Content` for `app/stories/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata` and the page), which this slice does not change. A one-line comment names it as [[9c48718ec6f8]]'s, the story pages record's to remove with the `[slug]` route. The MDX default imports it needs stay for it alone.
- `StoryMetadata` keeps the site's field names and types (`slug`, `external?: { url }`, `publishedAt` and `updatedAt` as strings, `originallyPublishedOn?`, `image` without `type`): each is a story pages item ([[82762f6b27de]], whose note from the split covers the four linked stories' `slug`, `external` and dropped `image.type` too; [[c983ec56248e]]), filed on the story page template where first met, so this slice neither renames nor retypes them and the six MDX files are untouched. The `src` values of the four covers stay as they are (no item names them; the card slice read every cover URL 200).
- Consumers, each the smallest edit that reads `allStories`: `app/stories/page.tsx` passes the browser a copy sorted newest first, as `getAllStories` did (`[...allStories].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))`), mapped to the `{ metadata }` shape `StoriesBrowser` and `StoriesStatic` take today, a transient line the page re-port deletes; `app/sitemap.ts` filters `allStories` on `story.external == null` in place of `isExternalStory` over `getAllStories()`. `app/page.tsx`, `app/HomePage.tsx` and `app/_components/stories/Item.tsx` import the type only and do not change.
- Interfaces: produces `allStories: Array<StoryMetadata>` and `StoryCategoryColors` for the page re-port (`Stories index re-ported from the legacy stories page, its context, filters, option and list`), which sorts `allStories` at module scope in the context as legacy's `context/stories.tsx:32` did; keeps `STORY_SLUGS` and `getStory` for the `[slug]` route.
- Verify first: `grep -rn 'getAllStories\|isExternalStory\|getStory\|STORY_SLUGS' app --include='*.ts' --include='*.tsx' | grep -v '^app/_lib/stories.ts'` prints the two `getAllStories` callers (`app/stories/page.tsx`, `app/sitemap.ts`), the one `isExternalStory` caller (`app/sitemap.ts`) and the `[slug]` page's `STORY_SLUGS` and `getStory`, and nothing else; `grep -c 'alt:' app/_lib/stories.ts` prints 4 with legacy's four strings (the copy slice's).
- Docs: none; CLAUDE.md's Structure names `app/_lib/` and the stories loader already.
- Not this slice: the field names and date types (`82762f6b27de`), the `[slug]` route and its lookup (`9c48718ec6f8`), the editorial field (`c983ec56248e`), every one the story pages record's; the sort's place, the page, the context and the components (the page re-port).

## Seams under test

None pure: `allStories` is data, read by the page, the home and the sitemap; the proof is the build's route table and the served pages.

## Done when

- `head -1 app/_lib/stories.ts` prints the `// ported from` line; `grep -c 'export const allStories\|const linkedStories\|export const StoryCategoryColors' app/_lib/stories.ts` prints 3; `grep -rn 'getAllStories\|isExternalStory\|internalStoriesBySlug\|externalStories' app | wc -l` prints 0
- Against a running `pnpm dev`: `pnpm audit:dom --routes <a file naming /stories>` shows `audit/stories/dom/current.txt` holding the ten cards (six hosted, four linked) newest first, `How to Mark and Cut Grid Beams` (29/11/2024) first and `Shelter: Documenting a personal quest for non-toxic housing` (11/3/2003) last, the order `legacy.txt` has, with the copy slice's strings; `curl -s localhost:3000/ | grep -c 'What'"'"'s a Grid Unit'` prints at least 1; `curl -s localhost:3000/stories/<slug> -o /dev/null -w '%{http_code}'` prints 200 for each of the six slugs; `curl -s localhost:3000/sitemap.xml | grep -c '<loc>[^<]*/stories/'` prints 6 (the six hosted stories, one `<loc>` per line; the index is `/stories` with no trailing slash, and none of the four linked is listed)
- `next build`'s route table still lists the six `/stories/[slug]` pages as SSG
- [[753b16d28130]] is `fixed` (`kipu fix 753b16d28130 --outcome "plan <this prefix>"`), its outcome naming the residue left for the story pages record, checked after the fix
- `timeout 900 just check` is green

## Outcome

## Log
