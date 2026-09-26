---
title: "Stories: the per-page meta description removed and the copy verdicts applied on the title description and the inspiration alts"
status: done
parent: ca353de8b645
derived_from: ca353de8b645
blocked_by: ffe8e5d56f8e
tags:
  - "worker:sonnet"
---
The stories index loses the per-page meta description the legacy page never had, and carries the copy the stories grilling settled: the title's description as legacy wrote it with the rule 1 swap, and the four inspiration cards' cover alts as legacy wrote them. Six items on `/stories`, every verdict the operator's from the stories grilling (I1 and I2), each a stated string or a two-line metadata edit, so the diff is given and the work is Sonnet's. Applied on the current page and the current catalog module before either is re-ported, so the re-ports carry settled text and their reviews are structure only. Record `ca353de8b645`; decisions `ee86d68a`, `2032533f`, `ca677697`, `6fce53c0`.

## Work

Read each item (`kipu show <id>`) and write exactly the text its last Log line gives; where the line says `legacy verbatim`, the string is the legacy source's, `../node-modules/apps/gridkit/stories.ts` at `fce357d`, character for character. In `app/stories/page.tsx` and `app/_lib/stories.ts` as they are now (search by the current text, not by line).

- `app/stories/page.tsx`: `metadata` becomes `{ title: 'Stories' }` and nothing else; the `pageDescription` const goes, and the `pageTitle` const with it, the two literals written where they are used. Legacy: `<NextSeo title="Stories" />` (`../node-modules/apps/gridkit/pages/stories.tsx:15` at `fce357d`), no description, so the site default from `apps/gridkit/pages/_app.tsx:47-49` rendered. The layout's template renders `Grid Beam: Stories` (`app/layout.tsx`, `1c8b7461acb1`) and its default description renders on `/stories` (`1906af99b588`, the default's own text being the shell's, not this slice's): the verdict of [[39bf8c100615]].
- The `Title`'s `description` prop becomes `Discover all things grid beam in our collection of articles, guides, and newsletters.` on one line: legacy's `stories.tsx:18-19` with `Grid Kit` to `grid beam` (rule 1), the verdict of [[cea94daa1b77]]. The `as="h1"` and the surrounding `Section` and `Container` stay as they are; they are the re-port's (`Stories index re-ported from the legacy stories page, its context, filters, option and list`).
- `app/_lib/stories.ts`, the four `alt` strings in `externalStories`, each legacy's `stories.ts` line verbatim: `Modular system for DIY builds` (`:39`, [[cef251754b6e]]); `Ken Isaacs, Beach Matrix, installation view in Westport, Connecticut, c. 1967. Photo courtesy the artist` with no closing period (`:55`, [[f50a60375633]]); `Open source consumer goods` (`:71`, [[46a9ea2b1eb2]]); `Castles in West Africa` (`:87`, [[045b9541f486]]). Nothing else in the module changes: its shape is the catalog slice's (`Story catalog re-ported from the legacy stories module`), and the six MDX files' metadata is the story pages record's.
- Verify first: `grep -n 'pageDescription\|description' app/stories/page.tsx` prints the const, its use in `metadata` and the `Title` prop, every one changed here; `grep -c "alt: '" app/_lib/stories.ts` prints 4 and `grep -c 'Mud-brick\|Kirsten Dirksen’s\|interchangeable modular\|the artist\.' app/_lib/stories.ts` prints 4 before and 0 after; `grep -n 'template' app/layout.tsx` prints `Grid Beam: %s`.
- Closes [[39bf8c100615]], [[cea94daa1b77]], [[cef251754b6e]], [[f50a60375633]], [[46a9ea2b1eb2]], [[045b9541f486]].
- Not this slice: the page's width, spacing and wrappers, the filter row, the chips, the grid and the state (the page re-port); the catalog module's shape (the catalog slice); the story pages' MDX metadata (record `56e6eb197e6c`).

## Seams under test

None pure; the proof is the copy diff of the DOM pair and the served HTML.

## Done when

- Against a running `pnpm dev`, `curl -s localhost:3000/stories | grep -o '<title>[^<]*</title>'` prints `<title>Grid Beam: Stories</title>`, and the page's `<meta name="description"` carries the layout's default text, not `Build logs`
- `pnpm audit:dom --routes <a file naming /stories>` against the same server: `audit/stories/dom/current.txt` holds `Discover all things grid beam in our collection of articles, guides, and newsletters.` under `Stories`, and `diff` against `legacy.txt` shows that line differing from legacy's only by `Grid Kit` to `grid beam`; `current.aria.yaml` holds the four inspiration covers' `img` names as legacy's `legacy.aria.yaml` has them, `Modular system for DIY builds`, `Ken Isaacs, Beach Matrix, installation view in Westport, Connecticut, c. 1967. Photo courtesy the artist`, `Open source consumer goods` and `Castles in West Africa`
- `grep -c 'Mud-brick\|Kirsten Dirksen’s\|interchangeable modular\|the artist\.' app/_lib/stories.ts` prints 0 and `grep -c 'Build logs' app/stories/page.tsx` prints 0
- The six items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`), checked after the fixes
- `timeout 900 just check` is green

## Outcome

Shipped as scoped. app/stories/page.tsx: metadata is title: 'Stories' with no description, the pageTitle and pageDescription consts removed, the Title's description is legacy's line with Grid Kit to grid beam (rule 1). app/_lib/stories.ts: the four inspiration alts are legacy's stories.ts strings verbatim (Modular system for DIY builds; the Ken Isaacs caption with no closing period; Open source consumer goods; Castles in West Africa). The six items on /stories are fixed with outcome "plan 3ef459e6".

Proof, against a running pnpm dev: the title is Grid Beam: Stories and the meta description is the layout default; pnpm audit:dom shows the description line differing from legacy only by Grid Kit to grid beam, and current.aria.yaml holds the four cover img names as legacy has them; the grep for the old alts printed 0. Dev stopped by pid, then timeout 900 just check exited 0; kipu verify --warnings-as-errors green. No visual gate: the copy diff of the DOM pair covers the change.

## Log
