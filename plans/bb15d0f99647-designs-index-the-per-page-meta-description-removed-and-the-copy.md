---
title: "Designs index: the per-page meta description removed and the copy verdicts applied on the search placeholder, the results count and the empty state"
status: todo
parent: f901cf9f724d
derived_from: f901cf9f724d
tags:
  - "worker:sonnet"
---
The designs index carries the operator's copy verdicts from the designs grilling (D1 and D2, every one `regression` with its verdict in the item's Log) on the current files, so the catalog re-port that follows carries settled text and its review is structure only: no per-page meta description (the route inherits the site default, `1906af99b588`, as legacy's `<NextSeo title="Designs" />` did), the search placeholder `Search...` (three periods), the results count as `{n} results found` and `1 result found` on legacy's `> 1` test, and the empty state's three strings verbatim: `We couldn't find any designs that match your search criteria` (straight apostrophe, no period), `Try again using a different keyword or hit reset`, `Reset search`. Six items on `/designs`, each a string swap on a line the item cites; no structure changes, so Sonnet. Record `f901cf9f724d`; decisions `2032533f`, `ca677697`, `ee86d68a`.

## Work

- Legacy at `fce357d`, under `../node-modules/apps/gridkit/`: `pages/designs/index.tsx:69` (`<NextSeo title="Designs" />`, no description), `components/catalogue/search-bar.tsx:31` (`placeholder="Search..."`), `components/catalogue/results-count.tsx:18` (`{items.length} {items.length > 1 ? 'results' : 'result'} found`), `components/catalogue/list.tsx:58,62,71` (the three empty-state strings). Current: `app/designs/page.tsx` (the `description` constant and the `metadata` object), `app/_components/design/DesignsBrowser.tsx:26` (`searchPlaceholder="Search designs…"`) and `app/_components/catalogue/Catalogue.tsx` (the `searchPlaceholder` default `'Search…'`, `ResultsCount`, `EmptyState`).
- [[ee46802b453c]]: `app/designs/page.tsx` exports `metadata = { title: 'Designs' }` alone; the `description` constant goes. The served head then carries the site default from `app/layout.tsx` (`1906af99b588`'s verdict text) as `description` and `og:description`, the way `/about` and `/stories` do after their removals slices.
- [[5a9773d48b54]]: the placeholder is `Search...` at both current sites (`DesignsBrowser.tsx:26` and the `Catalogue` default); the re-port later writes it once on the ported `SearchBar`.
- [[d65d1957932c]]: `ResultsCount` renders `{count} {count > 1 ? 'results' : 'result'} found`, legacy's expression with the current `count` prop; `itemLabel` is no longer read there (the prop stays on the interface until the re-port deletes the file).
- [[8881ebddcf54]], [[867dbd39345d]], [[a817a0fd8667]]: `EmptyState`'s three strings are legacy's, the first with `&apos;` as legacy wrote it (`list.tsx:58`) and `{itemLabel}` in place of `designs`, the third `Reset search` beside the icon.
- No other line changes: the `aria-label` on the input ([[ed01d4c37533]], whose fix is the `role="search"` wrapper), the mobile headings, the list message and the filter labels are structural and belong to the catalog re-port (`Designs catalog re-ported from the legacy catalogue components and context, with the page and its layout`).
- Interfaces: produces the settled strings the re-port copies line for line.
- Verify first: `grep -c 'description' app/designs/page.tsx` prints at least 2; `grep -n "Search designs…\|Search…" app/_components/design/DesignsBrowser.tsx app/_components/catalogue/Catalogue.tsx` prints two lines; `grep -n "couldn’t\|Try a different keyword\|itemLabel.replace" app/_components/catalogue/Catalogue.tsx` prints three lines and `grep -n '^\s*Reset$' app/_components/catalogue/Catalogue.tsx` one (`:526`, the word on its own line); `kipu show <id>` on each of the six is `regression`.
- Docs: none.
- Not this slice: every structural item on the route; the search bar's landmark and name; the design page's own meta description ([[ef74be52fb10]], the design pages record's).

## Seams under test

None pure: six strings; the proof is the DOM pair's copy diff and a probe of the empty state.

## Done when

- Against a running `pnpm dev`, `pnpm audit:dom --routes <a file naming /designs>`: `audit/designs/dom/current.txt` reads `Search...` where the placeholder prints and `37 results found` where `legacy.txt` does; `diff legacy.txt current.txt` shows no line for the count or the placeholder
- `curl -s localhost:3000/designs | grep -o '<meta name="description" content="[^"]*"'` prints the site default (the text `1906af99b588`'s verdict gives), and `grep -c 'A catalogue of grid-beam designs'` on the same page prints 0
- A Playwright probe (or the eye on `pnpm dev`) with `zzz` typed in the search: the empty state reads `We couldn't find any designs that match your search criteria`, `Try again using a different keyword or hit reset` and a `Reset search` button, the live legacy site's three lines
- `grep -rn "Search designs…\|Search…\|couldn’t\|Try a different keyword\|itemLabel.replace" app/designs app/_components/catalogue app/_components/design | wc -l` prints 0, and `grep -rn '^\s*Reset$' app/_components/catalogue | wc -l` prints 0
- The six items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`), checked after the fixes
- `timeout 900 just check` is green

## Outcome

## Log
