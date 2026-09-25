---
title: "ui recipes and provider: heading weight, input size, focus ring, field focus colour, accordion, Link isExternal, the Toaster"
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
Eight small fixes to `@villagekit/ui`'s recipes and wrappers restore what its 0.9.0 theme did under Chakra v2: the normal heading weight, the 48 px `lg` input, one cyan focus ring with no gray outline over it, the focus border colour on `Select` and `NumberInput`, the accordion's hover fill and uniform dashed separators, `Link`'s `isExternal`, and the toast regions mounted by the provider. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`, `28c1a536`.

## Work

- Legacy source: `@villagekit/ui@0.9.0` (`npm pack` into the scratchpad) `src/components/{Heading,Button,Select,NumberInput,Accordion,Link}.tsx`, and Chakra v2's input sizes and accordion theme in `@chakra-ui/theme@3.3.1`. Current: `../ui/src/components/{Heading,Input,Select,NumberInput,Accordion.recipe,Link,Button}.tsx`, `src/theme/index.ts`, `src/Provider.tsx`.
- `7124898563eb`: `headingRecipe.base.fontWeight: 'normal'`; the rendered weight stays the 600 face, the only one loaded.
- `6b5488415a06`: an `input` recipe (shared by the native select and the number input where v3 shares it) whose `lg` matches v2's: height 12 (48 px), font size lg, padding x 4, radius md; measured on `/designs`' search bar.
- `6a18067acb3b`: the global `:focus-visible` outline Chakra v3 adds is neutralised for the ui's controls, so buttons, icon buttons, selects and inputs show only the `outline` shadow (`rgba(0,163,196,0.5) 0 0 0 2px` on buttons), measured by Tab-focusing each control on `/tools/cutting-planner`.
- `dc60b9b9c1bf`: `Select` and `NumberInput` set the focused field's border to the theme's `outlineColor` as 0.9.0's `focusBorderColor` did (v3: the field's focus ring colour).
- `cb528cbc05e6`, `cb9dce13acba`: `itemTrigger._hover.bg: 'blackAlpha.50'` with the common transition; the item's border as one declaration, v3's `outline` variant neutralised so the 2 px dashed top rule and the last item's bottom rule are the only borders (`audit/faq/1280/legacy.png` against the current capture).
- `ecfa31cea5a0`: `LinkProps.isExternal` back on `Link`, rendering `target="_blank" rel="noopener noreferrer"` (the ui `MdxLink` computes its own; no story MDX passes the prop today, so a Link story or a scratch render is the check).
- `f93e37cf6ef4`: `Provider` mounts a `Toaster` (Chakra v3's `createToaster`) and exports the toaster so a route can create toasts; the regions appear in the tree as legacy's did. `Provider` also takes an optional `system` prop (default the package's), legacy's shape where the site passed its extended theme to the ui's `ChakraProvider`: the site theme slice mounts a bare `ChakraProvider value={system}` today because 1.2.0's `Provider` takes none, so `kipu note 99f2fe62c62f` that the bump swaps `app/layout.tsx`'s `ChakraProvider value={system}` for `Provider system={system}`, which is what brings the toast regions back on the site.
- Sibling steps (decision `28c1a536`): the change lands in `../ui` (`src/...`, and `stories/` where a story renders the component), verified there by `pnpm lint`, `pnpm types` and `pnpm build:pkg`, committed there by pathspec (`git -C ../ui add <paths>` then `git -C ../ui commit -- <paths>`, the message citing the legacy source by its SHA-pinned URL where code is ported) and not pushed; seen on this site through an uncommitted override (`pnpm.overrides` `"@villagekit/ui": "link:../ui"` in `package.json`, then `pnpm install`; the sibling's top-level `exports` point at `src/`, so no build is needed for the override), reverted by path before the commit here (`git restore -- package.json pnpm-lock.yaml`, then `pnpm install --frozen-lockfile`) so the commit never carries it; each item this slice closes moves to `upstream` (`kipu move <id> upstream --from regression`) with a note citing the sibling commit; then `kipu relate 99f2fe62c62f blocked_by <this slice>`. The package version stays: the publish is the operator's.
- Verify on this site through the override: the `/faq` accordion at 1280, `/designs`' input height, `/tools/cutting-planner`'s focus rings, and the notification regions in `audit/_root/dom/current.aria.yaml` (with `app/layout.tsx` probed to `Provider system={system}` if the site theme slice has shipped, the probe reverted with the override).
- Closes (to `upstream`) `7124898563eb`, `6b5488415a06`, `6a18067acb3b`, `dc60b9b9c1bf`, `cb528cbc05e6`, `cb9dce13acba`, `ecfa31cea5a0`, `f93e37cf6ef4`.
- Not this slice: the palette literals (its own ui slice); the mobile menu (the ui nav slice).

## Seams under test

None pure.

## Done when

- with the override in place: the `/designs` search input is 48 px tall; a Tab-focused button on `/tools/cutting-planner` has `outline` none and the cyan `box-shadow`, and its select and number inputs show the cyan focus border; a `Link isExternal` rendered in `../ui`'s storybook or a scratch page carries `target="_blank" rel="noopener noreferrer"`; the accordion rows on `/faq` show one 2 px dashed rule between items and a `blackAlpha.50` fill on hover; `audit/_root/dom/current.aria.yaml` lists the notification regions; the override then reverted
- in `../ui`: `pnpm lint`, `pnpm types` and `pnpm build:pkg` are green and the commit there is by pathspec, its hash in each item's note
- the eight items are `upstream`, `99f2fe62c62f` is `blocked_by` this slice and carries the bump note, checked after the moves
- `timeout 900 just check` is green on this site, without the override

## Outcome

## Log

- 2026-09-26: From the framework boundary slice (plan 1c74a465996d, ui commit 4e11d57): the mechanism to follow is the framework context in ../ui/src/framework.tsx, filled by NavContextProvider({ items, usePathname?, linkComponent? }) and read through useFramework() by every composite that renders its own anchors; the leaf link components keep the explicit `as`. The override that shows a sibling change on this site is pnpm.overrides["@villagekit/ui"] = "file:../ui" (link: fails under next dev --turbopack), with pnpm install after each sibling edit, reverted by `git restore -- package.json pnpm-lock.yaml` and `pnpm install --frozen-lockfile` before the commit.

- 2026-09-26: The site theme slice [[39b1a28bb0cc]] filed [[f40107b60034]] (Chakra v3's radius scale where legacy kept v2's) for this slice's theme change.

- 2026-09-26: Found by the Spec review of the site theme slice [[39b1a28bb0cc]]: with the site's families written into the tokens, the ui's `var(--font-body, Bitter)` and `var(--font-heading, Fredoka)` tokens and the comment above them in `src/theme/index.ts` (consumers expose the fonts as CSS variables on html) are dead for this site; the package's theme is this slice's to reword.
