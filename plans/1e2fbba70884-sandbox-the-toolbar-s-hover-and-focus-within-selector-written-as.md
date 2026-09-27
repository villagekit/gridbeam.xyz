---
title: "sandbox: the toolbar's hover and focus-within selector written as Chakra v3's condition in ../gridkit, for the design pages"
status: todo
tags:
  - "worker:fable"
parent: 337e35d86920
derived_from: a78b167170b8
---
The sandbox's toolbar appears on hover and on focus within the 3D view again: `@villagekit/sandbox@0.10.0` writes the selector `':hover, :focus-within'` under Chakra v3's `css`, which rejects the key (the console's `Using kebab-case for css properties in objects is not supported` line) and emits nothing, so the zoom, auto-rotate, grid, reset and fullscreen buttons never become visible on any design page, where the live legacy page raises them from opacity 0 to 1 under the pointer. Closes [[941bd045b043]] (interaction, `regression` on `/designs/bed-frame`), a gap in the `@villagekit/*` engine that CLAUDE.md's Principles say is fought by a change in `../gridkit`, never a workaround here (note `526d5330ef4e` carried it forward as the sandbox's); a slice beside the shell record `a78b167170b8` (decision `40abdb2f222a`), minted at the split of the design pages record `0bc88eaf5493`. A fix in `../gridkit`, so it follows decision `28c1a536`: committed in the sibling by pathspec on top of the operator's own commits there (`e58d700`, three ahead of origin), never pushed from here; seen on this site through an uncommitted override of `@villagekit/sandbox` to the sibling package, reverted by path before the commit; the item moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint). The first engine fix of M2 and the form of its override are a shape, so Fable.

## Work

- Legacy: `../gridkit` at the `v0.9.0` tag, `core/sandbox/src/index.tsx:85-90`: `sx={{ ':hover, :focus-within': { '.sandbox-controls': { opacity: 1 } } }}`, a key Chakra v2 accepted; on the live legacy page hovering the preview raises the four `.sandbox-controls` groups to opacity 1 (the item's probe). Current: `../gridkit/core/sandbox/src/index.tsx:81-86` at `e58d700`, the same key under `css`, byte-identical in `node_modules/@villagekit/sandbox/src/index.tsx:82`; hovering leaves opacity 0 and the console logs the kebab-case line; the buttons still work when reached by Tab.
- The fix in `core/sandbox/src/index.tsx`: the selector written as Chakra v3 accepts it, the shell's `7877c267268c` mechanism and the home's `150c408aba5a` fix in `app/_components/StoryCard.tsx` (the `HoverCardContainer` slice `8235bd4bea81` in `../ui` is the other precedent): the two conditions (`_hover`, `_focusWithin`) each nesting `'& .sandbox-controls': { opacity: 1 }`, or the one raw selector `'&:hover, &:focus-within': { '& .sandbox-controls': { opacity: 1 } }`; the worker reads Chakra v3's condition handling (`node_modules/@chakra-ui/react/dist/esm/styled-system/`, the nested selector rules) and the two precedents, and names the form taken. The pointer cursor the item reads on legacy (`cursor: pointer`) is the `HoverCard` frame's (`catalogue-item.tsx:104-115`), the page re-port's ([[9d5af9f80912]]), not the sandbox's; the Outcome says so.
- The sibling's checks (`../gridkit`: its `pnpm lint`, `pnpm types` and the sandbox package's build, as its `package.json` and `turbo.json` name them; read them first) green; the commit by pathspec (`core/sandbox/src/index.tsx`, and the package's changelog if it keeps one) on the sibling's `main`, its working tree otherwise untouched; where the sibling's paths hold changes that are not yours, stop and ask.
- Seen here: `pnpm.overrides["@villagekit/sandbox"] = "file:../gridkit/core/sandbox"` after the sandbox package's build (the package's `.` resolves to `dist/index.js`, so no `transpilePackages`), `pnpm install`, then `pnpm dev`; the override reverted by path (`git restore -- package.json pnpm-lock.yaml`, `pnpm install --frozen-lockfile`) before the commit. This is the first engine override on this site unless the tooltip portal slice or the design pages' diagnosis slice lands first: where CLAUDE.md's gridkit row does not yet name the form, the form that worked, and any dependency of the sandbox the copy needed (its `peerDependencies` on `three`, `@react-three/fiber`, `@villagekit/ui`), goes in the Outcome and the row takes one sentence naming it beside the ui row's.
- Verify first: `grep -n "focus-within" ../gridkit/core/sandbox/src/index.tsx` prints line 82; on `pnpm dev` at 1280, hovering `#sandbox-container` on `/designs/bed-frame` leaves `.sandbox-controls` at opacity 0 and the console prints the kebab-case line once.
- Docs: CLAUDE.md's gridkit row (the override sentence); the sandbox package's changelog if it keeps one.
- Not this slice: the `memo` console line ([[505a856301b8]], the diagnosis slice of the design pages record); the drei context bridge (`55c931eca5f5`) and the tooltip portal (`0779d04c037d`), the operator's on the design pages' verdicts plan; the `CutGridBeamSvg` fixes already in the sibling (`7f2556a9ec9d`, the planner's, waiting on the same publish).

## Seams under test

None pure; the proof is a Playwright probe of `.sandbox-controls` opacity under the pointer and under focus on `pnpm dev` under the override, against the live legacy page, and the console listener.

## Done when

- A Playwright probe on `pnpm dev` under the override, `/designs/bed-frame` at 1280 and 375: the four `.sandbox-controls` groups read opacity 1 while the pointer is over `#sandbox-container` and while a control inside it has focus, and 0 otherwise, the live legacy readings saved beside; the console holds no kebab-case line for the sandbox; each toolbar button still works
- `pnpm audit:pages --routes <a file naming /designs/bed-frame>` at 375, 768 and 1280 under the override, looked at: no element moved at rest, and a capture with the pointer over the preview shows the toolbar as legacy's does
- In `../gridkit`: the sibling's lint, types and the sandbox build green; the change committed by pathspec on its `main`, not pushed, on top of the sibling's HEAD (`e58d700` at the mint; the tooltip portal slice beside the shell record commits there too)
- [[941bd045b043]] is `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish) and carries a note that the engine's `@villagekit/sandbox` needs its own publish and what the bump's repeat probe reads
- The override reverted by path; `timeout 900 just check` is green

## Outcome

## Log
