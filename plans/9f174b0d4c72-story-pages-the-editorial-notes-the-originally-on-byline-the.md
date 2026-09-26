---
title: "Story pages: the editorial notes, the originally-on byline, the publish date and their component and field removed"
status: todo
parent: 56e6eb197e6c
derived_from: 56e6eb197e6c
tags:
  - "worker:sonnet"
---
The three historical posts (Building with Grid Kit, the 2021 winter newsletter, the 2022 newsletter) lose the editorial note the first port added, and every story page loses the byline under its title: the publish date and the `originally on gridkit.nz` clause. `StoryEditorialNote` and the `originallyPublishedOn` field go with them. Nine items on four story routes, every verdict the operator's from the stories grilling (P2 and P3) under decision `dcd8df79`: the text is the record, as legacy published it. Each is a deletion the item names, so the diff is given and the work is Sonnet's. Applied on the current MDX, component set and page before the components and the page are re-ported, so the re-ports carry settled text. Record `56e6eb197e6c`; decisions `ee86d68a`, `2032533f`, `ca677697`, `dcd8df79`.

## Work

Read each item (`kipu show <id>`). The files, as they are now (search by text, not by line): `content/stories/building-with-grid-kit.mdx`, `content/stories/2021-winter-newsletter.mdx`, `content/stories/2022-newsletter.mdx`, `app/_components/story/StoryEditorialNote.tsx`, `app/_components/story/index.ts`, `app/_lib/stories.ts`, `app/stories/[slug]/page.tsx`. Legacy, `../node-modules/apps/gridkit/pages/stories/*.mdx` at `fce357d`, has none of the three devices: each body begins at `<StorySection index={0}>` after `export default withStoriesLayout(metadata)` (that line is the page re-port's, not this slice's), and `apps/gridkit/components/layouts/stories.tsx:56-64` renders the `Title` and then the cover, no date.

- The three MDX files: the `<StoryEditorialNote>...</StoryEditorialNote>` block and its blank line go ([[d30c02d49d97]], [[bf7e1a1934ac]], [[ca028cdfb6b7]]), `StoryEditorialNote` leaves the import list, and the `originallyPublishedOn: 'gridkit.nz',` line leaves `metadata` ([[d1e0a048c853]]'s field, [[c983ec56248e]]). No other character in the three files changes: the historical posts keep `Grid Kit` in their text (`dcd8df79`).
- `app/_components/story/StoryEditorialNote.tsx` deleted and its line removed from `app/_components/story/index.ts` ([[c983ec56248e]], [[5577373dbaad]] the `role="note"` landmark, [[6be26304713a]] the `<p>` inside a `<p>` that fails hydration on the three routes; both go with the component).
- `app/_lib/stories.ts`: the `originallyPublishedOn?: 'gridkit.nz'` line leaves `StoryMetadata`. Nothing else in the module changes: its other field names and types are [[82762f6b27de]], the fields slice's (`Story metadata re-ported to legacy's fields: url and isExternal, image.type and Date values, on the six exports, the linked stories and their readers`).
- `app/stories/[slug]/page.tsx`: the `<HStack justifyContent="center" gap="2" mb="4">` block with its two `Text` nodes goes ([[c3a9fa723309]] the date, [[99ca564d160a]] the two paragraphs, [[d1e0a048c853]] the clause), with the `formattedPublished` const, `originallyPublishedOn` in the destructuring, and the imports the page no longer uses (`HStack`, `Span`, `Text`). The `Container`, the `article` box, the cover and the TOC layout stay: they are the page re-port's (`Story pages re-ported as six page.mdx routes under legacy's StoriesLayout, the [slug] route, the catalog lookup and content/stories gone`).
- Verify first: `grep -rn 'StoryEditorialNote\|originallyPublishedOn' app content | wc -l` prints 19 (the component's own lines, its barrel line, the type's field, the page's three lines, and the three MDX files' import, block and field), every one removed here; `grep -c 'toLocaleDateString' 'app/stories/[slug]/page.tsx'` prints 1 before and 0 after (the card's own `toLocaleDateString` in `app/_components/stories/Item.tsx` is legacy's line and stays).
- Docs: none; CLAUDE.md's Structure names `content/` and `app/_components/` already.
- Not this slice: the copy verdicts on the guides (`Story pages: the copy verdicts applied on the guides' paragraphs, alts, labels, links and headings`); the components, the page, the fields (the re-ports).

## Seams under test

None pure; the proof is the copy diff of the DOM pairs and the browser console.

## Done when

- Against a running `pnpm dev`, `pnpm audit:dom --routes <a file naming the six story routes>`: no `audit/stories__*/dom/current.txt` holds `originally on gridkit.nz`, `Republished here as a historical record` or any of the six dates [[c3a9fa723309]] lists (`10 October 2024`, `29 November 2024`, `30 October 2024`, `23 August 2021`, `15 September 2021`, `13 December 2022`); no `current.aria.yaml` holds a `note` landmark; on `/stories/building-with-grid-kit` `diff legacy.txt current.txt` shows no added line between the title's description and `Contents`
- The browser console on `/stories/building-with-grid-kit`, `/stories/2021-winter-newsletter` and `/stories/2022-newsletter` prints no `<p> cannot be a descendant of <p>` line and no hydration error
- `grep -rn 'StoryEditorialNote\|originallyPublishedOn' app content | wc -l` prints 0 and `grep -rn 'toLocaleDateString' app/stories content | wc -l` prints 0; `ls app/_components/story/StoryEditorialNote.tsx` fails
- The nine items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`), checked after the fixes
- `timeout 900 just check` is green

## Outcome

## Log
