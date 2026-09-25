---
title: "Home: the added sections, the second hero button and the per-page metadata removed"
status: done
parent: fd9a92bd8abd
derived_from: fd9a92bd8abd
blocked_by: ffe8e5d56f8e
tags:
  - "worker:sonnet"
priority: medium
---
The home page loses what the legacy page never had: the `For makers` and `Open and free to remix` sections, the second hero button and the per-page description; its title is the bare brand, `Grid Beam`, as legacy's was `Grid Kit` (rule 1). Sixteen items on `/`, every verdict the operator's from the copy grilling, each a stated deletion or a two-line metadata edit, so the diff is given and the work is Sonnet's. Record `fd9a92bd8abd`; decisions `ee86d68a`, `2032533f`, `ca677697`.

## Work

- `app/page.tsx`: delete the `LandingSection index={7}` block (`For makers`: the `Title` and the `SimpleGrid` of three `LinkCard`s) and the `LandingSection index={8}` block (`Open and free to remix`: the `Title`, the `Container` with the paragraph and the two buttons), and the imports only they used, which `pnpm lint` and `pnpm typecheck` name (`LinkCard`, `FaCut`, `FaTools` among them; `SimpleGrid`, `Container`, `Title` and `FaShoppingBag` stay in use by the earlier sections).
- The hero's second button, `What is grid beam?` (`app/page.tsx`, the `LinkButton` to `/about` with `variant="secondary"`), and the `HStack` around the two hero buttons: the remaining `Browse designs` button sits directly in the `LandingColumn`, as legacy's one button did (`../node-modules/apps/gridkit/pages/index.tsx:101-103` at `fce357d`); its label is the copy slice's.
- `metadata`: `title: { absolute: 'Grid Beam' }` and no `description`; delete `heroTitle` and `heroDescription`. The layout's default description then renders on `/`, which is the verdict of [[bfc81eb7197c]] (the default's own text is the shell item `1906af99b588`'s, not this slice's). Legacy: `<NextSeo title="Grid Kit" titleTemplate="%s" openGraph={{ title: 'Grid Kit' }} />` (`index.tsx:74`); `og:title` follows the page title since the document head slice `ffe8e5d56f8e`.
- The bump plan's LinkCard note (`99f2fe62c62f`, from `1cc03cfabcf2`) names `app/page.tsx:353,360,367` among the call sites its icons module serves; after this slice the home renders no `LinkCard`, so `kipu note 99f2fe62c62f` says so.
- Verify first: `grep -n 'index={7}\|index={8}\|What is grid beam' app/page.tsx` prints the two sections and the button; `grep -n 'description' app/layout.tsx` prints the site default the page inherits.
- Closes [[b1d7776f996d]], [[ac0985188582]], [[ab6adb51866a]], [[56c60f34ef43]], [[b37e6cd0d56f]], [[1bdc9e63ed76]], [[258dddf5f815]], [[55f606401ab8]], [[66e7da679656]], [[b3471287e97a]], [[fad5fdf81c4b]], [[4164ec6a2472]], [[c0cf44ccbc28]], [[5ebdc4a4f50c]] (the Suppliers card is gone with its section, so nothing clips), [[dd19bb3343bf]], [[bfc81eb7197c]].
- Not this slice: every other copy verdict on the page (the copy slice, `Home: the copy verdicts applied on the page and the typing section`); the section structure, the hooks and the helpers (`Home page re-ported from the legacy index page`).

## Seams under test

None pure; the proof is the served HTML and the DOM pair.

## Done when

- Against a running `pnpm dev`, `curl -s localhost:3000/ | grep -c 'For makers\|Open and free to remix\|What is grid beam'` prints 0
- `curl -s localhost:3000/ | grep -o '<title>[^<]*</title>'` prints `<title>Grid Beam</title>`, and the page's `<meta name="description"` carries the layout's default text
- `pnpm audit:dom --routes <a file naming />` against the same server: in `audit/_root/dom/current.txt` the last main-content line before the footer is `Join the community` (the copy slice renames it), as `legacy.txt`'s is `Join our community`
- The sixteen items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`) and the bump note is written, checked after the fixes
- `timeout 900 just check` is green

## Outcome

Shipped as scoped. app/page.tsx: deleted LandingSection index=7 (For makers) and index=8 (Open and free to remix), their now-unused imports (HStack, LinkCard, FaCut, FaTools), the hero's second button and its wrapping HStack (Browse designs now sits directly in LandingColumn, as legacy's one button does), and heroTitle/heroDescription; metadata is now title: { absolute: 'Grid Beam' } with no description, so the layout default (app/layout.tsx:25-26) renders on /, matching bfc81eb7197c's verdict. Corrected the bump plan's LinkCard note as the slice asked: 99f2fe62c62f now says the home page renders no LinkCard after this slice, and the bump's remaining call sites are the four other pages, not app/page.tsx.

Sixteen items on / moved to fixed, outcome "plan 4faefea8": bfc81eb7197c, b1d7776f996d, ac0985188582, ab6adb51866a, 56c60f34ef43, b37e6cd0d56f, 1bdc9e63ed76, 258dddf5f815, 55f606401ab8, 66e7da679656, b3471287e97a, fad5fdf81c4b, 4164ec6a2472, c0cf44ccbc28, 5ebdc4a4f50c, dd19bb3343bf.

Verified: pnpm exec biome check and tsc --noEmit clean before the gate; against a running pnpm dev, the / response has no "For makers", "Open and free to remix" or "What is grid beam" text, <title>Grid Beam</title>, and the meta description is the layout default; pnpm audit:dom --routes <a file naming /> shows current.txt's last main-content line before the footer as "Join the community" (legacy.txt's is "Join our community" at the same position, the copy slice's to rename); timeout 900 just check green (lint, typecheck, 78 tests, build, the generated-data drift check); kipu verify --warnings-as-errors clean (881 items, 0 errors).

Reviewed on three fresh Opus sub-agents (Standards, Spec, Parity, the brief in .claude/skills/parity/SKILL.md). Parity: no critical findings, no new visitor-facing copy beyond the plan's own 'Grid Beam', the sixteen items genuinely closed, nothing the change introduced left unrecorded. Standards and Spec both caught the same critical finding: the first draft of the bump-plan note carried stale line numbers (copied from the pre-edit files) and miscounted "five" call sites where only four remain once app/page.tsx drops out; fixed in place before this commit, current lines verified by rereading each of the four files. Standards' two minor notes taken: the note now cites the plan as [[4faefea81c76]], matching the file's other entries; the plan was moved to doing before this finish, so the board showed it in flight (moot once this closes it in the same commit's history, but done for the record).

Not settled by the plan and left as found: the Suppliers card item 5ebdc4a4f50c closes by removal (the section and its LinkCard are gone), consistent with the record's read that the section deleting it makes the clip moot; no separate LinkCard box-sizing fix was needed or made.

## Log
