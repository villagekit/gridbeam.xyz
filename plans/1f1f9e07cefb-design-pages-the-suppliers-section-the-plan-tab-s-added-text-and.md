---
title: "Design pages: the suppliers section, the Plan tab's added text and button, and the per-page meta description removed"
status: done
parent: 0bc88eaf5493
derived_from: 0bc88eaf5493
tags:
  - "worker:sonnet"
---
The design pages lose what the legacy page never had: the gray suppliers band below the tabs with its paragraph and its button, the Plan tab's empty state, its all-infeasible message, its summary line and its planner button, and the per-design meta description; the title stays `meta.label`, templated by the shell to `Grid Beam: Bed Frame` as legacy's `NextSeo title={meta.label}` was templated to `Grid Kit: Bed Frame` (rule 1, `1c8b7461acb1`). Eight items on `/designs/bed-frame`, the template for every design page, every verdict the operator's from the design page grilling (T1, T3, T4), each a stated deletion or a one-line metadata edit, so the diff is given and the work is Sonnet's. Record `0bc88eaf5493`; decisions `ee86d68a`, `2032533f`, `ca677697`.

## Work

- `app/designs/[id]/page.tsx`: delete the `Section index={1}` block (`:53-60`: the `VStack`, the `Text` `Find a supplier for the parts on the suppliers page.` and the `LinkButton` `Find suppliers`), then the imports only it used (`LinkButton`, `Text`, `VStack`, `NextLink`, which `pnpm lint` and `pnpm typecheck` name). The `Section index={0} maxW="6xl"` wrapper around `DesignViewerDynamic` stays until the page re-port (`Design page re-ported from the legacy design page, catalogue item, design components and loading component`, [[1fa8d8b40f64]]). Legacy: the page ends after the `CatalogueItem` (`../node-modules/apps/gridkit/pages/designs/[id].tsx:92-121` at `fce357d`). Closes [[7e28a0685fba]], [[4d64525337bc]], [[97260396edf4]].
- `generateMetadata` (`:22-33`): return `{ title: meta.label }` alone, no `description`, so the layout's default description renders on every design page (`1906af99b588`, the default's own text being the shell's, not this slice's), the verdict of [[ef74be52fb10]] (T1). The `catch` branch stays as it is. Legacy: `<NextSeo title={meta.label} />` (`[id].tsx:54`).
- `app/_components/design/DesignCuttingPlan.tsx`: delete the empty-state `Text` (`:72-73`, `This design has no grid-beam parts to cut.`, [[f67b11b69c74]]); the all-infeasible `Text` with its planner link (`:74-82`, [[07accc3cf3c2]]); the summary `Text` (`:90-94`, `Cuts placed total ...`, [[ef53ee76cfaa]]); the infeasible-cuts `Text` in `red.700` (`:103-109`, `Some cuts are too long for the ... stock`), which no item names on its own: it is Plan tab text the current page added and T3's verdict removes (`legacy's Plan tab shows the heading, the sentence, the engine drawings, the unit toggle and the footnote`, the Log of [[07accc3cf3c2]]), so it goes under that item and the Outcome says so; and the `HStack` holding the `Open in cutting planner` `LinkButton` (`:113-116`, [[1fd09da76a38]]). With them go `plannerHref` (`:61-68`), `totalPlaced`, `totalCut` and `totalWaste` (`:55-59`) and the imports only they used (`HStack`, `Link`, `LinkButton`, `NextLink`, `totalCutLength`, `totalPlacedLength`, `totalRemainderLength`), which lint and typecheck name; the ternary collapses to its one remaining branch, so the returned `VStack` holds the headline `Text` (`:85-89`) and the drawings' `VStack` (`:96-101`). The headline and `summariseRequired`, `plural` and `formatLength` stay: the headline is the copy slice's ([[facf2d13aa23]], `Design pages: the copy verdicts applied on the button, the tab, the Overview heading, the parts settings and the Plan tab's sentence, heading and footnote`), the drawings the page re-port's.
- Verify first: `grep -n 'index={1}\|Find suppliers\|description: meta.description' 'app/designs/[id]/page.tsx'` prints three lines; `grep -c 'no grid-beam parts\|custom-length\|Cuts placed total\|Open in cutting planner\|too long for the' app/_components/design/DesignCuttingPlan.tsx` prints 5; `grep -n 'template' app/layout.tsx` prints `Grid Beam: %s`.
- Not this slice: the button, tab, heading and toggle strings and the returning heading, footnote and sentence (the copy slice); the `Section` wrapper and every visual, accessibility, interaction and code item (the page re-port).

## Seams under test

None pure; the proof is the served HTML, the DOM pair and the Plan tab on `pnpm dev`.

## Done when

- Against a running `pnpm dev`, `curl -s localhost:3000/designs/bed-frame | grep -c 'Find a supplier\|Find suppliers'` prints 0, and `curl -s localhost:3000/designs/bed-frame | grep -o '<title>[^<]*</title>'` prints `<title>Grid Beam: Bed Frame</title>` with the page's `<meta name="description"` carrying the layout's default text, the same on `/designs/shelf-tower` and `/designs/5-12-13-triangle-desk`
- `pnpm audit:dom --routes <a file naming /designs/bed-frame>` against the same server: `audit/designs__bed-frame/dom/current.txt` holds no suppliers line after the tabs, as `legacy.txt` holds none
- On `pnpm dev`, the Plan tab of `/designs/bed-frame` (a Playwright click, since the tab mounts lazily and the DOM pair captures the Overview tab alone) shows the `Needs 9 stock beams ...` sentence and the nine drawings and nothing below them: no summary line, no red line, no button
- `grep -c 'Section index={1}' 'app/designs/[id]/page.tsx'` prints 0, and the grep of the five strings above prints 0
- The eight items are `fixed` (`kipu fix <id> --outcome "plan <this prefix>"`), checked after the fixes
- `timeout 900 just check` is green

## Outcome

Deleted the Section index={1} band, its imports, the meta description and the four Plan tab strings with their imports and the collapsed ternary, on pnpm dev: /designs/bed-frame, /designs/shelf-tower and /designs/5-12-13-triangle-desk all title Grid Beam: <Label> with the layout's default description, and the DOM pair (audit/designs__bed-frame/dom) shows the current side ending after the Overview tab with no suppliers band, matching legacy. A Playwright click on the Cutting plan tab shows the Needs 9 stock beams sentence and the nine drawings with nothing below them: no summary line, no red line, no button. One done-when grep needs a note: `grep -c 'Find a supplier\|Find suppliers'` on the rendered page prints 1, not 0, because the site header's own CTA text is literally Find a supplier (SiteHeaderAction.tsx), unrelated to this slice and present on every route; the page's own removed strings, Find a supplier for the parts on the suppliers page. and Find suppliers, do not appear anywhere in the response (verified with the exact strings and with `>Find a supplier<` and `>Find suppliers<` anchors). timeout 900 just check is green. The eight items closed with kipu fix, outcome plan 1f1f9e07cefb: 7e28a0685fba, 4d64525337bc, 97260396edf4, ef74be52fb10, f67b11b69c74, 07accc3cf3c2, ef53ee76cfaa, 1fd09da76a38.

## Log
