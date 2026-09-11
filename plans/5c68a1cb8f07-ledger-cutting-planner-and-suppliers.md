---
title: "Ledger: cutting planner and suppliers"
status: done
parent: c6182c6a8609
derived_from: c6182c6a8609
blocked_by:
  - 4465f31eea38
  - b2ed8f4c3f6e
priority: medium
---

The parity ledger holds every difference on the cutting planner and the suppliers page, cited on both sides and judged by rule, with copy and `added` items left `open` for the operator. Sliced from M1 (`c6182c6a`); decisions `ee86d68a`, `2032533f`, `ad5363e4`, `ca677697`, `bfa9a416`.

## Work

Run the `parity` skill on: `/tools/cutting-planner`, `/suppliers`. Capture first (`pnpm audit:pages` and `pnpm audit:dom` with a routes file listing exactly these routes, each carrying its side marker from `scripts/audit-routes.txt`, against the live legacy site and a local `pnpm dev`), then one Sonnet sub-agent per route per family (copy, visual and interaction, accessibility, code), then mint and judge every difference. `/suppliers` has no legacy route: one `added` item for the route itself, sanctioned under rule 5 by decision `8b5e51fc` (rule 2 covers the store's removal, not this addition), then a full run whose copy is one `open` item per visible text block (a heading, a paragraph, a label, an empty state). The legacy `/store` is one `removed` item under rule 2, not diffed. The cutting planner's rewritten labels and changed defaults from note `526d5330` are copy items, left `open`; the `CutBeamSvg` swap there is a `code` item if it still holds.
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

Shipped the parity ledger for `/tools/cutting-planner` (65 items: open 23, regression 36, sanctioned 6) and `/suppliers` (36 items: open 33, regression 2, sanctioned 1), plus the `/store` removal (1 item, rule: no e-commerce) and two shell items the shell run missed ([[dc60b9b9c1bf]], [[6a18067acb3b]]), 104 items in all, each cited on both sides and judged by the rules in [[2032533fbe92]]; copy and additions left open for the operator ([[ca677697d703]]). Counts per state, axis and kind and what the sub-agents found identical are on M1 ([[c6182c6a8609]]).

Run as the plan said: captures first (`pnpm audit:pages` and `pnpm audit:dom` on a routes file holding `/tools/cutting-planner` and `/suppliers current-only`), then eight Sonnet sub-agents (two routes, four families), then minting and judging. The sub-agents drove both sides with Playwright for the result state, the unit toggle, the add-row and clamp probes and the Tab order, which the captures alone lack.

Checked as the plan asked: the `CutBeamSvg` swap still holds and is [[7f2556a9ec9d]], a `code` regression blocked on a `@villagekit/part-gridbeam` publish (the registry has 0.10.0 with no `./svg`; the branch `stream-07/09-cutgridbeamsvg` is unmerged). The planner copy from note [[526d5330ef4e]] is filed open; of "its default rows and stock", the rows are identical and the top-up and add-row defaults differ ([[0db3cce2de84]], [[7622f099a13f]]). `/suppliers` is [[df7c8f7b0a80]] under rule 5 by [[8b5e51fcaf61]]; the map that decision names is not built, filed as [[f7ea0bf1394d]] (interaction) and [[36541273e623]] (code), regressions since no rule covers its absence. `/store` is [[8c78b2c12f47]].

Deviations from the plan: one, flagged. The plan calls the planner's "changed defaults from note 526d5330" copy items to leave open; a default value is behaviour, not visible text, so the top-up default ([[0db3cce2de84]]) and the add-row defaults ([[7622f099a13f]]) are filed on `interaction` as `changed`, which the rules judge as regression; the operator can sanction either by verdict in the grilling. The labels the note names are copy and open as the plan said. Two items landed on `shell` rather than a route because the ui wrappers and Chakra v3's focus-visible outline are the theme's; the shell ledger had neither. Legacy behaviour the current code corrects (a negative remainder for an over-long cut, [[15117950c2d4]]; a `colSpan` one more than the columns, [[a48cbfda8b03]]) is filed as regression by the rule's absence, with the note that the operator may sanction it under rule 5; that call is not the worker's.

Not this slice, left to the re-port plan: the stale citation at `app/tools/cutting-planner/algorithm.ts:3` (`src/lib.ts` does not exist at fce357d), noted on M1.

Gate: `timeout 900 pnpm check` green (lint, typecheck, test, build) and `kipu verify` green. No route code changed, so no screenshot pass beyond the captures the ledger itself is built on.

Review (three Opus axes, Standards, Spec, Parity, on the staged items). Acted on: the Parity review's seven missed differences filed ([[6ec723376c9e]], [[e72e07839c0b]], [[6262e248fa04]], [[af37ba3b1195]], [[91ab04d18791]], [[2320a37e2a41]], [[758e01571037]]), its two wrong items corrected ([[6db1fb31e995]] moved to regression with a note since Chakra v3 ships `Field.Root`; [[c6792d6e6ec8]] narrowed to the select chevron, the capture has no `img` under the Remove and Add buttons); the Spec review's five off-by-a-few line citations and the `/store` item's capture paths fixed, the M1 counts re-recorded in a second note. Rejected, with the reason: the Standards review's suggestion to split the drawing text item [[6064de3eb9b6]] into three copy items (the three strings are one component's text and vanish together with [[7f2556a9ec9d]]; three items would give the operator one call three times); the Parity review's doubt about `rule: operator` citing CLAUDE.md rather than a decision for [[fede2033572a]] and [[e17abab6ea0e]] (CLAUDE.md's "Key decisions" and "Tech stack" are the operator's writing, and the shell ledger sanctioned the hosting call the same way); the Standards review's note that six interaction items rest on live probes not in the repo (the parity skill allows it when the entry says so, and each does; the captures the tooling makes are the initial state only). The first Spec reviewer's other findings were the state before this round.

## Log
