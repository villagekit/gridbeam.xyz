---
title: "Stories index: the operator's verdicts"
status: todo
parent: 337e35d86920
derived_from: ca353de8b645
tags:
  - attended
---
The two differences on `/stories` that the stories index record `ca353de8b645` cannot close by rule: one `regression` whose M1 note asks for the operator's call, and one `open` code item the split filed, a rule 4 candidate where the upgrade changed a shape. Decision `40abdb2f222a`: the record's split minted this plan beside it, so that a verdict given before the page re-port runs shapes it; an item a slice's review files later for the operator is added to the list below by the finish, which mints no second plan; the parity gate `f7a700a3e482` is `blocked_by` this plan, so the operator's review of the site comes after their verdicts. Each item keeps its state until the operator judges it.

wants: the operator's verdicts on the items below.

## Work

For each item, read it (`kipu show <id>`), then: `kipu sanction <id> --outcome -` or `kipu dismiss <id> --outcome -` with the verdict naming the rule or the call; or leave it `regression` (moving an `open` one with `kipu move <id> regression --from open`) and mint a slice for the fix beside the stories index record (`--parent 337e35d86920`, `derived_from ca353de8b645`, tagged `worker:<model>`; a fix in `../ui` follows decision `28c1a536` and blocks the bump plan `99f2fe62c62f`). No verdict text is written by an agent (`2032533f`, `ca677697`).

- [[2c38c9e6a5da]] (`regression`, accessibility, changed): Chakra v3's `Icon` writes `aria-hidden="true"` before the caller's props (`node_modules/@chakra-ui/react/dist/esm/components/icon/icon.js:22`), so the card's port of legacy's `item.tsx:98` line for line (`app/_components/stories/Item.tsx`, the home's slice `e332105c3b52`) hides the external-link icon that legacy exposed as a bare unnamed `img` after each of the four inspiration cards' dates (`audit/stories/dom/legacy.aria.yaml:84,93,102,111`). Unlike `1ea1f9eda079` on `/` and `89301ca8a1fc` on the shell (both on verdicts plans), the accessibility tree differs between the two sides here. Sanctioned (rule 4, or rule 5 as the item's M1 note suggests), or `aria-hidden={false}` written on the card's `Icon`, a prop legacy never wrote, to restore the exposed image?
- [[e3a2d4d66691]] (`open`, code, changed): the stories page is two files, the server `app/stories/page.tsx` (the `metadata`, rendering the page) and the client `app/stories/StoriesPage.tsx` (legacy's page body line for line), where legacy's `pages/stories.tsx` was one, because the app router exports `metadata` from a server component only and the page's `useBreakpointValue` and its context provider need a client one. Filed at the split; the page re-port slice meets it. Sanctioned under rule 4, the same answer as `091a47cb93e7` on `/` (the home's verdicts plan `8bb4a4380264`), or is another shape of the split wanted?

## Seams under test

None.

## Done when

- Every item above is `sanctioned`, `dismissed` or `regression` with a slice minted for its fix; `kipu list --collection difference --filter route=/stories --status open` prints nothing (checked when this plan is finished)
- `kipu verify --warnings-as-errors` is green

## Outcome

## Log
