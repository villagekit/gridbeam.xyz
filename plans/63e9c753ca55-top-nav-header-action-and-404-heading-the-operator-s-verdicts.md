---
title: "Top nav, header action and 404 heading: the operator's verdicts"
status: done
parent: a78b167170b8
derived_from: a78b167170b8
tags:
  - "worker:sonnet"
priority: medium
---
The shell's nav data and header action ship what the copy grilling decided: the top nav is `Designs`, `Tools`, `About`, `Stories`, so Contact and Suppliers leave it, the header button becomes "Find a supplier", and the 404 heading loses its em dash. Record `a78b167170b8`; decisions `c21b7e35f0c7`, `dc1a7a98373f`, `ca677697`, `2032533f`.

## Work

- `app/_lib/nav.ts`: `navItems` becomes exactly the list decision `c21b7e35f0c7` states, in its order: `Designs`, `Tools`, `About`, `Stories`. Contact's entry goes (`df63dc24c8aa`). Suppliers' entry goes too: the decision is the operator's latest explicit call on the top nav and names four items, and the sanctioned header action `e48df8d1ce98` ("Find a supplier" to `/suppliers`) and footer link `703c2d78a721` carry Suppliers in the header and footer. That closes `92ee49a8071a` (the position of an item that no longer exists) and leaves `191e28561c6d`'s verdict (Store replaced by Suppliers, rule 2) standing for the page, so add a note on `191e28561c6d` that the nav entry went with decision `c21b7e35f0c7`, and say so in the Outcome. The mobile list follows the same array.
- `app/_components/SiteHeaderAction.tsx`: the label `Find a supplier` and the href `/suppliers`, the verdict of `e48df8d1ce98` (sanctioned; add a note on the item that this slice shipped its verdict).
- `app/not-found.tsx`: the heading `404: page not found`, the verdict of `fb5b26b56721` and decision `dc1a7a98373f` (a note on the item). Nothing else on the page changes.
- Copy is the verdicts' text verbatim (`ca677697`); no other string on these files changes.
- Closes `df63dc24c8aa` and `92ee49a8071a` with `kipu fix <id> --outcome "plan <prefix>"`.
- Not this slice: the wordmark and logo (the header brand slice); the mobile menu panel (the ui nav slice); the footer sections (the site footer slice).

## Seams under test

None pure.

## Done when

- `pnpm audit:dom --routes <file>` over `/` shows in `audit/_root/dom/current.aria.yaml` the top nav links `Designs`, `Tools`, `About`, `Stories` in that order, no `Contact` or `Suppliers` link in the banner's toolbar, and `link "Find a supplier"` to `/suppliers`
- `curl -s localhost:3000/no-such-page | grep -o '<h1[^>]*>[^<]*'` shows `404: page not found` and no other `page not found` heading
- `kipu list --collection difference --filter route=shell --status regression` no longer lists `df63dc24c8aa` or `92ee49a8071a`, and `191e28561c6d`, `e48df8d1ce98` and `fb5b26b56721` carry their notes, checked after the fixes
- `timeout 900 just check` is green

## Outcome

Shipped exactly what the Work section asked. `app/_lib/nav.ts`: `navItems` is now `Designs`, `Tools`, `About`, `Stories`, in decision `c21b7e35f0c7`'s order; Contact's and Suppliers' top entries are gone, so the mobile list (which follows the same array) drops them too. `app/_components/SiteHeaderAction.tsx`: label "Find a supplier", href `/suppliers`, the verdict of `e48df8d1ce98`. `app/not-found.tsx`: heading "404: page not found", the verdict of `fb5b26b56721` and decision `dc1a7a98373f`; nothing else on the page changed. `footerSections` is untouched.

Closed `df63dc24c8aa` and `92ee49a8071a` with `kipu fix ... --outcome "plan 63e9c753"`. Notes added per the Work section: `191e28561c6d` (Suppliers left the top nav with `c21b7e35f0c7`, its own sanctioned Verdict on the Suppliers page still stands, its Current section is now historical), `e48df8d1ce98` and `fb5b26b56721` (each notes this slice shipped its verdict).

Verified: `pnpm audit:dom --routes <root-only file>` over `/` shows `current.aria.yaml`'s banner toolbar as `Designs`, `Tools`, `About`, `Stories` with no `Contact` or `Suppliers` link, and `link "Find a supplier"` to `/suppliers`; `curl localhost:3000/no-such-page` shows exactly one `<h1>404: page not found</h1>`. `timeout 900 just check` green (run twice: once before the reviews, once after, since the Parity reviewer found that running the gate while `pnpm dev` was live had corrupted the dev server with HTTP 500s on every route, a process interaction now recorded under CLAUDE.md's Gotchas, not a defect in this change; the second run had no dev server up and passed clean). `kipu verify --warnings-as-errors` clean at 830 items, 0 errors, 0 warnings.

Reviewed on three fresh Opus sub-agents before the commit: Standards found no hard violation; Spec found nothing missing, partial or extra; Parity recaptured the `/` screenshot and DOM pairs at 375/768/1280 and confirmed `df63dc24c8aa`, `92ee49a8071a`, `e48df8d1ce98` and `fb5b26b56721` all closed in the code and no new unrecorded difference. No critical finding from any axis; nothing fixed beyond the code already written.

Flags for a later iteration, left untouched since they are outside this slice's scope: the Standards and Parity reviewers found three already-`sanctioned` items whose Current sections now read stale prose against the reordered `nav.ts` and the renamed header action: `9d1f2b7ae565` (About, cites a shifted line number), `71dcfc2bdf8a` (Tools, cites a shifted line number) and `3a2b674677f9` (cart button removed, its Current section still calls the header action "a Subscribe button"). None of these were cited by this plan, so no note was added; a future slice or `/parity` refresh can add one. `fb033121d164` (shell overflows the viewport at 768) is still `regression` and still visible on the recaptured pair, narrower than before (about 928 px against the prior 1018 px) but still overflowing; the item's own Log already says the nav count, wordmark size, column gap and footer sections each have their own item, and closing it is not this slice's job.

## Log
