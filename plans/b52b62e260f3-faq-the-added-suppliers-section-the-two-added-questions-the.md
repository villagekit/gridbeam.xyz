---
title: "FAQ: the added Suppliers section, the two added questions, the description line and the per-page metadata removed"
status: done
parent: 7f0b60d948c5
derived_from: 7f0b60d948c5
blocked_by: ffe8e5d56f8e
tags:
  - "worker:sonnet"
priority: medium
---
The FAQ page loses what the legacy page never had: the `Suppliers` category with its four questions, the two questions added under `Other`, the description line under the heading and the per-page meta description; its title stays `FAQ`, templated by the shell to `Grid Beam: FAQ` as legacy's `NextSeo title="Faq"` was templated to `Grid Kit: Faq` (the sanctioned `63130f446c8d`, `1c8b7461acb1`). Nine items on `/faq`, every verdict the operator's from the FAQ grilling (F1 and F6), each a stated deletion or a two-line metadata edit, so the diff is given and the work is Sonnet's. Record `7f0b60d948c5`; decisions `ee86d68a`, `2032533f`, `ca677697`.

## Work

- `app/faq/page.tsx`: delete the `Suppliers` element of `categories` whole (`heading: 'Suppliers'`, `slug: 'suppliers'` and its four entries: `How do I find a supplier?`, `Why doesn't gridbeam.xyz sell parts?`, `Can I make my own beams and panels?`, `A supplier near me isn't listed. Can I add them?`); in the `Other` element delete the entries `How do I add a design or story to the site?` and `Where can I discuss grid beam with other builders?`, leaving the custom design question alone there; delete the `description` prop on the `Title`, so it reads `<Title>Frequently asked questions</Title>` as legacy's `faq.tsx:337`. The imports stay: `Link` and `NextLink` are still used by the remaining answers and the closing line, and `pnpm lint` names any that is not.
- `metadata`: `title: 'FAQ'` and no `description`; delete the `title` and `description` consts and write the literal. Legacy: `<NextSeo title="Faq" />` (`../node-modules/apps/gridkit/pages/faq.tsx:335` at `fce357d`), no description, so the site default from `apps/gridkit/pages/_app.tsx:49` rendered. The layout's template renders `Grid Beam: FAQ` (`app/layout.tsx:23`, `1c8b7461acb1`) and its default description renders on `/faq` (`1906af99b588`, the default's own text being the shell's, not this slice's), the verdicts of [[e91809d5069d]] and the sanctioned `63130f446c8d`.
- The bump plan's Description note (`99f2fe62c62f`, from `c06d8381c4b5`) names `/faq` among the routes its probe reads the `Description` container on (1024px). After this slice `/faq` renders no `Description`, as legacy's `Title` had none, so `kipu note 99f2fe62c62f` says `/faq` leaves that probe's list and the probe reads the three routes legacy renders a description on plus the three `CardsLayout` routes, as the note's own wording has them.
- Verify first: `grep -n "slug: 'suppliers'\|How do I add a design\|Where can I discuss\|description" app/faq/page.tsx` prints the `Suppliers` element's slug line, the two added questions, the `description` const, its use in `metadata` and the `Title` prop, every one of them deleted here; `grep -n 'template' app/layout.tsx` prints `Grid Beam: %s`.
- Closes [[e91809d5069d]], [[886bec463e1b]], [[ae7dd01512fb]], [[c8c20c62cde3]], [[8c0dd813f0a2]], [[d5226f4b1c1b]], [[033b62f084cf]], [[e8bfbfcee3b2]], [[317e8711ff84]].
- Not this slice: every remaining question's and answer's text, the section headings and their grouping (the copy slice, `FAQ: the copy verdicts applied on the sections, the questions, the answers and the closing line`); the section wrapper, the data shape, the trigger's label, the links' variants and the paddings (the page re-port, `FAQ page re-ported from the legacy faq page`).

## Seams under test

None pure; the proof is the served HTML and the DOM pair.

## Done when

- Against a running `pnpm dev`, `curl -s localhost:3000/faq | grep -c 'faq-suppliers\|How do I find a supplier\|sell parts?\|make my own beams\|Can I add them\|add a design or story\|other builders\|Common questions about grid beam'` prints 0
- `curl -s localhost:3000/faq | grep -o '<title>[^<]*</title>'` prints `<title>Grid Beam: FAQ</title>`, and the page's `<meta name="description"` carries the layout's default text
- `pnpm audit:dom --routes <a file naming /faq>` against the same server: between the nav and the footer, `audit/faq/dom/current.txt` holds the heading, three section headings, fourteen question lines and the closing line, nineteen lines and nothing else (the strings differ until the copy slice)
- The nine items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`) and the bump note is written, checked after the fixes
- `timeout 900 just check` is green

## Outcome

Shipped as scoped. app/faq/page.tsx: deleted the Suppliers category and its four questions, the two added Other questions (How do I add a design or story to the site?, Where can I discuss grid beam with other builders?), the Title description prop, and the title and description consts; metadata is title: 'FAQ' with no description, so the layout renders Grid Beam: FAQ and its default description. No import became unused. The nine items on /faq are fixed with outcome "plan b52b62e2". The bump plan 99f2fe62c62f has the note that /faq leaves the Description probe's list.

Proof, against a running pnpm dev: the grep for the removed copy printed 0; the title is Grid Beam: FAQ and the meta description is the layout default; pnpm audit:dom shows current.txt between nav and footer as the heading, three section headings, fourteen questions and the closing line, nineteen lines. Dev stopped by pid, then timeout 900 just check exited 0; kipu verify --warnings-as-errors green. No visual gate: the removals are covered by the DOM pair.

Reviewed on a fresh Opus sub-agent (Standards, Spec, Parity): no critical or major findings. Nit dropped: the bump note's "three CardsLayout routes" wording is the earlier note's own; the stale Current text of e91809d5069d about openGraph and twitter descriptions is moot now the item is fixed.

## Log
