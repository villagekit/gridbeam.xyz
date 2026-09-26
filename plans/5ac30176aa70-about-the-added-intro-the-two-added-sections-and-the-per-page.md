---
title: "About: the added intro, the two added sections and the per-page metadata removed"
status: done
parent: 40179ab9e779
derived_from: 40179ab9e779
blocked_by:
  - ffe8e5d56f8e
  - 4faefea81c76
tags:
  - "worker:sonnet"
priority: medium
---
The about page loses what the legacy page never had: the three-paragraph intro above the captions, the `Where it came from` and `Start building` sections, the description line under the heading and the per-page meta description; its title is `About`, templated by the shell to `Grid Beam: About` as legacy's `NextSeo title="About"` was templated to `Grid Kit: About` (rule 1, `1c8b7461acb1`). Twenty-one items on `/about`, every verdict the operator's from the copy grilling, each a stated deletion or a two-line metadata edit, so the diff is given and the work is Sonnet's. Record `40179ab9e779`; decisions `ee86d68a`, `2032533f`, `ca677697`.

## Work

- `app/about/page.tsx`: delete the `Section index={1}` block (`Where it came from`: the `Title`, the `Container` with the `Note(cc)` comment and its three paragraphs), the `Section index={2}` block (`Start building`: the `Title`, the `SimpleGrid` of three `LinkCard`s and the `Flex` holding the two `LinkButton`s), the intro `VStack alignItems="flex-start" gap="5"` with its three `Text fontSize="lg"` paragraphs above the first `AboutText`, and the `description` prop on the remaining `Title`; then the imports only they used, which `pnpm lint` and `pnpm typecheck` name (`Flex`, `HStack`, `LinkButton`, `LinkCard`, `SimpleGrid`, `NextLink`, `FaCubes`, `FaShoppingBag`, `FaTools` among them; `Box`, `Container`, `Section`, `Span`, `Text`, `Title`, `VStack` and `NextImage` stay in use). The `Section index={0}` wrapper, the `Container maxW="3xl"`, `AboutPhoto` and `AboutText` stay until the page re-port (`About page re-ported from the legacy about page`).
- `metadata`: `title: 'About'` and no `description`; delete the `title` and `description` consts. The layout's template renders `Grid Beam: About` (`1c8b7461acb1`) and its default description renders on `/about` (`1906af99b588`, the default's own text being the shell's, not this slice's), the verdicts of [[f6ebf1620bad]] and [[494cc9baa8bd]]. Legacy: `<NextSeo title="About" />` (`../node-modules/apps/gridkit/pages/about.tsx:12` at `fce357d`), no `description` on the `Title` (`about.tsx:14`).
- The bump plan's LinkCard notes (`99f2fe62c62f`, from `1cc03cfabcf2` and the home's removals slice `4faefea81c76`) name `app/about/page.tsx:178,185,192` among the four remaining call sites the icon swap serves; after this slice `/about` renders no `LinkCard`, so `kipu note 99f2fe62c62f` says the three remaining call sites are `app/legal/page.tsx`, `app/subscribe/page.tsx` and `app/tools-and-resources/page.tsx` at their current lines, so the `LinkCard` icon boundary no longer applies to `/about`. The same note corrects two more lines of that plan's Log this slice makes stale: the links note (from `9e54dca30d48`) expects a `LinkButton` with `isExternal` on `/about` to render `target="_blank"`, and the GitHub button is deleted here, so `/about` leaves that list; the `Section` note (from `2de775cb197b`) lists `/about` among the pages with a gray band, and the gray `Section index={1}` is deleted here, so `/about` leaves that list too.
- Verify first: `grep -n 'index={1}\|index={2}\|gap="5"' app/about/page.tsx` prints the two sections' opening lines and the intro stack; `grep -n 'description' app/about/page.tsx` prints the `description` const and its use in `metadata`, the three `Title` descriptions (the first `Title`'s stays after this slice only as a deleted prop) and the three `LinkCard` descriptions, every one of them deleted here; `grep -n 'template' app/layout.tsx` prints `Grid Beam: %s`.
- Closes [[f6ebf1620bad]], [[494cc9baa8bd]], [[fb23903a3c70]], [[5d2c47f5c255]], [[4613624745c4]], [[54acd326d718]], [[5ee924ad245e]], [[473fb083a0e7]], [[e6071f319f08]], [[88cde35fe693]], [[24c7ab53652c]], [[00b6bb04683c]], [[49b374146247]], [[d9ced6913e2b]], [[ca856b1fae92]], [[f40c010ea9c4]], [[1b8f98bd363b]], [[d5bc3b1abc0f]], [[d0caa4bf0339]], [[cae5306ea71e]], [[e66dbbbf6d1f]].
- Not this slice: the captions and the alts (the copy slice, `About: the copy verdicts applied on the captions and the alts`); the section wrapper, the images' component and sizes, the text helper and every visual item on the captions (the page re-port).

## Seams under test

None pure; the proof is the served HTML and the DOM pair.

## Done when

- Against a running `pnpm dev`, `curl -s localhost:3000/about | grep -c 'Where it came from\|Start building\|The lineage begins\|Grid beam is a beam\|anyone can build, modify, or fork'` prints 0
- `curl -s localhost:3000/about | grep -o '<title>[^<]*</title>'` prints `<title>Grid Beam: About</title>`, and the page's `<meta name="description"` carries the layout's default text
- `pnpm audit:dom --routes <a file naming /about>` against the same server: between the nav and the footer, `audit/about/dom/current.txt` holds the heading and six caption lines and nothing else, the same count as `legacy.txt` (the strings differ until the copy slice)
- `grep -c 'LinkCard' app/about/page.tsx` prints 0
- The twenty-one items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`) and the bump note is written, checked after the fixes
- `timeout 900 just check` is green

## Outcome

Shipped as scoped. app/about/page.tsx: deleted the intro VStack and its three paragraphs, Section index=1 (Where it came from) and Section index=2 (Start building), the Title description prop, the title and description consts and the imports only they used (Flex, HStack, LinkButton, LinkCard, SimpleGrid, NextLink, FaCubes, FaShoppingBag, FaTools); metadata is title: 'About' with no description, so the layout renders Grid Beam: About and its default description. The twenty-one items on /about are fixed with outcome "plan 5ac30176". The bump plan 99f2fe62c62f has the note: LinkCard's remaining call sites are in legal, subscribe and tools-and-resources, and /about leaves the isExternal and gray band lists. A note on bfe876779ed0 says its Current text is stale on the section count.

Proof, against a running pnpm dev: /about returned 200; the grep for the removed copy printed 0; the title is Grid Beam: About and the meta description is the layout default; pnpm audit:dom shows current.txt between nav and footer as the heading and six captions, the same count as legacy.txt; grep -c LinkCard prints 0. timeout 900 just check green (dev stopped first); kipu verify run before the commit. No visual gate: the removals are covered by the DOM pair, and the layout and image items belong to the re-port.

Reviewed on a fresh Opus sub-agent (Standards, Spec, Parity): no critical or major findings. Minor taken: the bump note wrongly gave one set of line numbers for both earlier notes; now each note has its own. Nit taken: the note on bfe876779ed0. Dropped: stale line numbers cited in other /about items, which the re-port rewrites.

## Log
