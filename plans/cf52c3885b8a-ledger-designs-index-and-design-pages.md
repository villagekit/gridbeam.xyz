---
title: "Ledger: designs index and design pages"
status: done
parent: c6182c6a8609
derived_from: c6182c6a8609
blocked_by:
  - 4465f31eea38
  - b2ed8f4c3f6e
priority: medium
---

The parity ledger holds every difference on the designs index and the design pages, cited on both sides and judged by rule, with copy and `added` items left `open` for the operator. Sliced from M1 (`c6182c6a`); decisions `ee86d68a`, `2032533f`, `ad5363e4`, `ca677697`, `bfa9a416`.

## Work

Run the `parity` skill on: `/designs`, `/designs/bed-frame`, `/designs/shelf-tower`, `/designs/5-12-13-triangle-desk`. Capture first (`pnpm audit:pages` and `pnpm audit:dom` with a routes file listing exactly these routes, each carrying its side marker from `scripts/audit-routes.txt`, against the live legacy site and a local `pnpm dev`), then one Sonnet sub-agent per route per family (copy, visual and interaction, accessibility, code), then mint and judge every difference. The 3D viewer and its controls are read from the code and the screenshots at 1280 (the `networkidle` fallback applies). Check the sibling-repo findings on the viewer in note `526d5330` (`detect-gpu`'s unpkg request, the sandbox's Chakra v3 CSS, `utility-workbench`'s 0 gu beams) and file each that still holds, on `/designs/bed-frame` (the sampled slug that stands for every design page); the catalogue empty-state copy rewrite in that note is a copy item on `/designs`.
Interfaces: the `difference` items, by route, for the route records under M2 (`337e35d8`).
Verify first: `audit/<slug>/dom/` exists for each route (the tooling slice `4465f31e` shipped) and the shell ledger (`b2ed8f4c`) is filed.
Not this slice: fixing anything; judging copy.

## Seams under test

None pure.

## Done when

- For each of these routes, `kipu list --collection difference --filter route=<route> --json` has items, or the note below records that the sub-agents found the route identical on every family
- Every `open` item among them is on the `copy` axis or has `kind: added`
- Every `sanctioned` item's Verdict names a rule or a lock
- A `kipu note` on M1 (`c6182c6a`) records the counts per state, axis and kind for these routes and what the sub-agents found identical
- `kipu verify` is green
- `pnpm check` is green

## Outcome

Shipped: the parity ledger for `/designs`, `/designs/bed-frame` (the template every design page shares), `/designs/shelf-tower` (no items of its own) and `/designs/5-12-13-triangle-desk`: 122 `difference` items on the four routes (open 38, every one copy or `added`; regression 72; sanctioned 11, each naming a rule; dismissed 1), plus 2 on `shell` and log lines on six existing items. Counts per state, axis and kind, what was found identical, the note 526d5330 dispositions and the caveats are the note on M1 (c6182c6a8609). Captured with `pnpm audit:pages` and `pnpm audit:dom` for the four routes; 16 Sonnet diffs, one per route per family, all reported; the contested viewer findings (the hover toolbar, the toggles, the `Custom` preset, the Parts tab, the CutBeamSvg labels, the sliders, the triangle desk's load pose) re-probed by the worker with Playwright on both sides before judging.

Conventions chosen, flags for M2: (1) template-level differences of the design page are filed once on `/designs/bed-frame` with a "Template." log line; `/designs/shelf-tower` and `/designs/5-12-13-triangle-desk` carry only what is theirs. (2) The `CatalogueLayout` removal is filed once on `/designs` with a log naming the design page. (3) The engine's 0.9.0 to 0.10.0 changes this route consumes are filed on `/designs/bed-frame` (the fixes belong to the sibling `../gridkit` and wait for a publish, like [[7f2556a9ec9d]]). (4) The `audit:dom` capture of the design pages is unreliable on this machine (the `0 x 0 x 0mm` placeholder); a settle knob on the tooling would help M2.

Review round one (Standards, Spec, Parity on Opus), applied: the `getDesign` item re-kinded to `changed`/regression and its runtime checks split out ([[7699d9193d61]], [[7c075b85aa8f]]); the `biome.json` item dropped (on no route); six bare legacy anchors cited; the dropped-keystroke item folded into the debounce item ([[651ccc51018f]]); the og:title item's reason corrected to the layout's bare-string `openGraph.title`; the switch-colour log corrected (the ui recipe does not reach either switch); four items minted from the Parity findings (option-list rhythm, grid gap, empty-state layout, `No preview`); the `Controls` switch item's mechanism restated (the v3 field context's `aria-labelledby`); seven citations corrected. Round two, applied: two anchors and one `[[id]]` form; three citations; the `lg` input height filed on `shell` ([[6b5488415a06]]); the Field.Root item given its probe evidence. Rejected: (1) a new item for the `0 x 0 x 0mm` load placeholder: both sides show it (probe: legacy about 0.2 s to 1.7 s, current dev about 3.3 s to 8.8 s), so it is the in-browser compile item's effect, logged on [[9d4e2e43543e]]; (2) [[2cfe3a3c50e6]] stays sanctioned under rule 2 as one sentence about kits for sale; the `grid unit` link it carries is logged for the grilling; (3) [[9033e178e57c]] keeps the Starter Kit photo's alt with its sentence as one removed block; (4) [[c39bdf5ade05]] and [[0779d04c037d]] each record one restructure; (5) [[2166f4f318af]] stays a regression beside the rule-4 [[13eb42f29349]]: the engine's switch is identical source whose name the v3 field context produces, the parts switch is the app's own rewrite that skipped `Field.Root`.

Verify: `pnpm check` green twice (before and after the review edits); `kipu verify` green; `pnpm audit:dom` over the whole routes file exited 0 (44 captures). The change touches no route, so no screenshots were re-taken after filing. Not this slice: fixing anything; judging copy. This was the last open child of M1; M1's exit demo was run by the worker and M1 is finished in the same commit.

## Log
