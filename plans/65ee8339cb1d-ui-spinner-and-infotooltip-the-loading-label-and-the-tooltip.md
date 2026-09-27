---
title: "ui Spinner and InfoTooltip: the Loading... label and the tooltip trigger's name, Chakra v2's again, for the design pages"
status: todo
tags:
  - "worker:fable"
parent: 337e35d86920
derived_from: a78b167170b8
---
The ui `Spinner` carries Chakra v2's visually hidden `Loading...` label again, and the ui `InfoTooltip`'s icon is the named trigger it was, `img "Tooltip"` in the accessibility tree, where `@villagekit/ui@1.2.0` and the sibling render Chakra v3's bare spinner span and an icon v3 hides with `aria-hidden` ahead of the wrapper's `aria-label`. Closes [[44f3be6c7c33]] (accessibility) and [[2166f4f318af]] (accessibility), both `regression` on `/designs/bed-frame`, each a gap in `@villagekit/ui` that CLAUDE.md's Principles say is fought by a change in `../ui`, never a workaround here; a slice beside the shell record `a78b167170b8` (decision `40abdb2f222a`), minted at the split of the design pages record `0bc88eaf5493`. A fix in `../ui`, so it follows decision `28c1a536`: committed in the sibling by pathspec, never pushed from here; seen on this site through the uncommitted `pnpm.overrides["@villagekit/ui"] = "file:../ui"` beside the uncommitted `transpilePackages: ['@villagekit/ui']` in `next.config.ts` (CLAUDE.md's ui row), both reverted by path before the commit; the items moved to `upstream` with a note citing the sibling commit; the bump plan `99f2fe62c62f` is `blocked_by` this slice (the edge written at the mint). Two wrappers whose v3 form is read against v2's, so Fable.

## Work

`../ui` over `e3acb25`. The legacy readings from the packed v2 copies under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/` and the 0.9.0 ui at `../ui` commit `a5cbe36`.

- [[44f3be6c7c33]]: v2's `Spinner` rendered `label = "Loading..."` as a visually hidden span inside the spinning element (packed `spinner/dist/chunk-5PH6ULNP.mjs:24`, the `label &&` render below it), and the 0.9.0 ui wrapper passed it through (`a5cbe36:src/components/Spinner.tsx`); v3's `Spinner` is a bare recipe `span` (`node_modules/@chakra-ui/react/dist/esm/components/spinner/spinner.js:7`) and the ui wrapper (`src/components/Spinner.tsx`) passes nothing, so the design page's loading state (legacy's `components/loading.tsx:16`, the page re-port's `app/_components/Loading.tsx`) and the engine's own (`../gridkit/products/kit/src/view.tsx:30-36`, `Spinner` from `@villagekit/ui`) announce nothing. Write a `label` prop on `SpinnerProps` defaulting to v2's `'Loading...'`, rendered as a `VisuallyHidden` child of the span and omitted for an empty label, v2's `label &&` (the string is v2's own default, legacy's rendering, not copy written here, `ca677697`); the `ui/Spinner` story reads it.
- [[2166f4f318af]]: v3's `Icon` writes `focusable: false` and `"aria-hidden": "true"` before the spread of its props (`components/icon/icon.js:17-25`), so the ui's `aria-label="Tooltip"` (`src/components/InfoTooltip.tsx:23-31`) sits on a hidden svg and the trigger and its `Width x Depth x Height` tooltip text leave the tree (`audit/designs__bed-frame/dom/current.aria.yaml`: no img in `region "Assembled dimensions"`; `legacy.aria.yaml`: `img "Tooltip"`). Write what returns v2's tree (`aria-hidden={false}` on the `Icon`, the spread landing after v3's attribute, and whatever role the live legacy svg exposes, read from the tree on both sides), keeping the `Box` trigger, the color, the hover and the transition as they are; the `ui/InfoTooltip` story reads it. The `Tooltip`'s portal container (`0779d04c037d`) is not this slice's: the tooltip portal slice beside the shell record (`Tooltip portal container restored in ../ui and ../gridkit, for the engine's tooltips in the sandbox's fullscreen mode`) lands after this one in the same files.
- Verify first: `grep -n "label\|VisuallyHidden" ../ui/src/components/Spinner.tsx` prints nothing; `grep -n "aria-hidden" ../ui/src/components/InfoTooltip.tsx` prints nothing; on `pnpm dev` under the override at the sibling's HEAD (`e3acb25` at the mint), the aria snapshot of `/designs/bed-frame` holds no `img "Tooltip"`.
- Docs: `../ui/CHANGELOG.md`, two lines under Unreleased Fixed.
- Not this slice: the switch, slider and tabs recipes (`ui recipes: the switch's checked track, the slider's width and the tabs' unstyled variant, Chakra v2's theme again, for the design pages`); the tooltip portal's `containerRef` (the tooltip portal slice, `blocked_by` this one); the icon's `role="presentation"` family on the shell and the home (`89301ca8a1fc`, `1ea1f9eda079`), the operator's on their verdicts plans, since those icons are decorative where this one is a trigger.

## Seams under test

None pure; the proof is the aria snapshot on `pnpm dev` under the override against the live legacy page, and the built Storybook.

## Done when

- A Playwright aria snapshot on `pnpm dev` under the override, `/designs/bed-frame` at 1280: `region "Assembled dimensions"` holds `img "Tooltip"` as `audit/designs__bed-frame/dom/legacy.aria.yaml` does, and hovering it shows the `Width x Depth x Height` tooltip; a capture during the viewer's loading state (a throttled network, or the `loading` render forced) shows a `Loading...` text node inside the spinner, hidden visually, as legacy's `Loading` rendered it
- In `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` green, the `ui/Spinner` and `ui/InfoTooltip` stories read in the built Storybook; the change committed by pathspec on its `main` (`src/components/Spinner.tsx`, `src/components/InfoTooltip.tsx`, `CHANGELOG.md`), not pushed
- [[44f3be6c7c33]] and [[2166f4f318af]] are `upstream` with a note citing the sibling commit; `99f2fe62c62f` is `blocked_by` this slice (checked at the finish) and carries a note naming what the bump's repeat snapshot reads on the published package
- The override and the `transpilePackages` entry reverted by path (`git restore -- package.json pnpm-lock.yaml next.config.ts`, `pnpm install --frozen-lockfile`); `timeout 900 just check` is green

## Outcome

## Log
