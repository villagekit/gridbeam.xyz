---
title: "Contact: the operator's verdicts"
status: todo
tags:
  - attended
parent: 337e35d86920
derived_from: 1a3ab91a9640
---
The one difference on `/contact` that the contact record `1a3ab91a9640` cannot close by rule: an `open` code item the split filed, the legacy factory folded into its one caller, which no rule of `2032533f` covers and an agent cannot sanction. Decision `40abdb2f222a`: the record's split minted this plan beside it, so that a verdict given before the page re-port runs shapes it; an item a slice's review files later for the operator is added to the list below by the finish, which mints no second plan; the parity gate `f7a700a3e482` is `blocked_by` this plan, so the operator's review of the site comes after their verdicts. Each item keeps its state until the operator judges it.

wants: the operator's verdict on the item below.

## Work

For each item, read it (`kipu show <id>`), then: `kipu sanction <id> --outcome -` or `kipu dismiss <id> --outcome -` with the verdict naming the rule or the call; or leave it `regression` (moving an `open` one with `kipu move <id> regression --from open`) and mint a slice for the fix beside the contact record (`--parent 337e35d86920`, `derived_from 1a3ab91a9640`, with its `worker` field; a fix in `../ui` follows decision `28c1a536` and blocks the bump plan `99f2fe62c62f`), unless the page re-port slice of the record is still open, in which case the fix is that slice's (its Work says so) and no slice is minted. No verdict text is written by an agent (`2032533f`, `ca677697`).

- [[0c7f344ccb34]] (`open`, code, changed): legacy's page is a five-line call of `createContactPage({ Layout, contactEmail })` from the private, never published `@villagekit-private/applet-contact`; the re-port writes the factory's body as the page's own default export, the `Layout` option being the root layout (rule 4, [[1c05b1d0d3db]]) and `contactEmail` a module constant, since this repo has no packages and one site. The parallel call already made is [[fede2033572a]] on `/tools/cutting-planner`, the applet as an in-app module (rule 5, that route's alone); the same question stands on `/legal` ([[7a2ff790e460]], `createLegalPage` with its policy flags) and `/subscribe` ([[f60ba42d1e34]], `createSubscribePage`), which one call could settle for all three. Sanctioned under rule 5 as the planner's was, the inline body kept, or is a `createContactPage` function kept in the route directory wanted, with the page calling it as legacy's did?

## Seams under test

None.

## Done when

- Every item above is `sanctioned`, `dismissed` or `regression` with a slice minted for its fix; `kipu list --collection difference --filter route=/contact --status open` prints nothing (checked when this plan is finished)
- `kipu verify --warnings-as-errors` is green

## Outcome

## Log

- 2026-09-28: From the legal record split (plan e710087c8961): the /legal factory item the body names by 7a2ff790e460 is f77473dea927 now, on the legal verdicts plan d2beea2f9659; the same call answers both.
