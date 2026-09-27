---
title: "Design pages: the operator's verdicts"
status: todo
tags:
  - attended
parent: 337e35d86920
derived_from: 0bc88eaf5493
---
The two differences on the design pages that the design pages record `0bc88eaf5493` cannot close by rule: one `open` code item the split filed, a rule 4 candidate where the app router changed a shape, and one `regression` code item in the engine whose restoration would duplicate what the upgraded renderer does. Decision `40abdb2f222a`: the record's split minted this plan beside it, so that a verdict given before the page re-port runs shapes it; an item a slice's review files later for the operator is added to the list below by the finish, which mints no second plan; the parity gate `f7a700a3e482` is `blocked_by` this plan, so the operator's review of the site comes after their verdicts. Each item keeps its state until the operator judges it.

wants: the operator's verdicts on the items below.

## Work

For each item, read it (`kipu show <id>`), then: `kipu sanction <id> --outcome -` or `kipu dismiss <id> --outcome -` with the verdict naming the rule or the call; or leave it `regression` (moving an `open` one with `kipu move <id> regression --from open`) and mint a slice for the fix beside the design pages record (`--parent 337e35d86920`, `derived_from 0bc88eaf5493`, tagged `worker:<model>`; a fix in `../ui` or `../gridkit` follows decision `28c1a536` and blocks the bump plan `99f2fe62c62f`). No verdict text is written by an agent (`2032533f`, `ca677697`).

- The two-file page item filed at the split (`open`, code, changed, `/designs/bed-frame`; its id in the record's Log): the design page is two files, the server `app/designs/[id]/page.tsx` (`generateStaticParams`, `generateMetadata`, the `notFound`) and the client `app/designs/[id]/DesignPage.tsx` (legacy's page body line for line), where legacy's `pages/designs/[id].tsx` was one, because the app router exports metadata from a server component only and legacy's page calls `useCallback`, `useEffect` and `useRef`. The same question as `091a47cb93e7` on `/`, `e3a2d4d66691` on `/stories` and `30847e0e3701` on `/designs`, all `open` on their verdicts plans: sanctioned under rule 4, or is another shape wanted?
- [[55c931eca5f5]] (`regression`, code, removed): engine 0.10.0's sandbox dropped drei's `useContextBridge` and its `bridgeContexts` prop (`../gridkit` `v0.9.0:core/sandbox/src/index.tsx:4,29,42,65,118-135`; `products/kit/src/view.tsx` passed `[ProductKitContext]`). `@react-three/fiber@9.6.1`, the version this site's lockfile pins under the engine's `^9.0.0`, bridges every React context into the canvas itself (`node_modules/@react-three/fiber/dist/events-b389eeca.esm.js` imports `useContextBridge` from `its-fine`, and `react-three-fiber.esm.js` wraps the canvas in it), so a restored bridge would be a second copy of what the canvas does; `@react-three/drei@10.7.7` still exports the hook (`core/useContextBridge.d.ts`), so drei did not force the removal; `PartsGlForAll` takes its data as props and the M1 run found no behavior change. Sanctioned under rule 4 as made redundant by the fiber 9 upgrade the engine's migration took (the sibling of the sanctioned `3d5241e4a4e1`), or `regression` with a `../gridkit` slice restoring the prop and the hook?

## Seams under test

None.

## Done when

- Every item above is `sanctioned`, `dismissed` or `regression` with a slice minted for its fix; `kipu list --collection difference --filter route=/designs/bed-frame --status open` prints nothing (checked when this plan is finished)
- `kipu verify --warnings-as-errors` is green

## Outcome

## Log

- 2026-09-27: From the split of the design pages record (plan 0bc88eaf5493): the two-file page item the body names by description is [[8aacd71da174]] (open, code, changed, /designs/bed-frame), filed at the split.

- 2026-09-27: From the ui Spinner and InfoTooltip slice (plan 65ee8339cb1d): its Parity review read one more code-axis reading on the design page's loading spinner, [[a6f5528f74e3]] (open, not judged): Chakra v2's Spinner rendered a div where Chakra v3's is a span, the ui wrapper forwarding a span ref. Whether rule 4 (upgrade-forced) covers the element is the operator's, beside this plan's other items; the size and speed readings from the same review are a ui slice's.

- 2026-09-27: From the tooltip portal slice (plan [[4f55a829c726]]): one more code reading for the operator, [[9e2f5f220c5b]] (open, code, removed): Chakra v2's Portal wrapped every tooltip in a div.chakra-portal, and Chakra v3's (Ark's) Portal mounts the tooltip's positioner straight into the body or the container with no wrapper, on every tooltip the engine renders on the design pages; no visible effect, the twin of the spinner's div to span ([[a6f5528f74e3]]) above. Whether rule 4 covers it is the operator's call.

- 2026-09-27: From the ui Tooltip style slice (plan [[c09248be3862]]): one more code reading on the tooltips for the operator, filed open and not judged, beside the portal wrapper [[9e2f5f220c5b]]: the ui InfoTooltip's props, the 0.9.0 Partial<TooltipProps> spread against the 1.2.0 wrapper's named pass-through props (label, pointerTimeout, portalProps, css), no visible effect ([[1f0680aff2ae]]). Whether rule 4 of 2032533f covers it is the operator's call.
