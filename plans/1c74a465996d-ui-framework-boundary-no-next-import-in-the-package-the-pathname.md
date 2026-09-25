---
title: "ui framework boundary: no next/* import in the package, the pathname and link component supplied by the app"
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
`@villagekit/ui` stops importing `next/link`, `next/navigation` and `next/image`: the app supplies its pathname hook, link component and image component, the way legacy's `NavContextProvider` took `usePathname`, so the package's optional `next` peer is true and the Next-bound composition lives in the site. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`, `28c1a536`.

## Work

- Legacy source: `../node-modules/packages/ui-nav/src/context.ts` (`NavContextProvider({ items, usePathname })`) and `apps/gridkit/pages/_app.tsx:96,108-112` at `fce357d`; `@villagekit/ui@0.9.0`'s `package.json` (no `next`). Current: `../ui/src/components/nav/context.tsx`, `NavBar.tsx`, `NavList.tsx`, `layouts/Footer.tsx`, `mdx/link.tsx`, `media/Image.tsx`, `package.json` (`next` an optional peer, `next` a devDependency for storybook).
- The mechanism, decided here once and followed by the ui nav, brand footer, mdx and LinkCard slices; an open unknown, so a Phase 0 with an Opus review of the candidates: (a) props, `NavContextProvider` taking `usePathname` (legacy's prop) and a `linkComponent`, with `Footer`, `MdxLink`, `LinkCard` and the link buttons taking the link component the same way (1.2.0's `linkComponent` on `LinkCard` is the start); (b) one small framework context the nav provider fills that the others read; (c) a `@villagekit/ui/next` subpath re-exporting Next-wired presets over a framework-free root. `media/Image` takes its image component through `MediaProvider` or falls back to an `<img>` on the Cloudinary URL. The simplest that survives the review wins; the Outcome records the candidates and the reason.
- `next` leaves `peerDependencies` and `peerDependenciesMeta`; `grep -rn "from 'next" ../ui/src` is empty; the stories under `../ui/stories` render nav and footer without Next.
- Source compatibility: keep this site's call sites at `@villagekit/ui@1.2.0` type-checking and rendering with the override in place and no site change wherever the legacy shape allows (the new props optional; absent, links render as plain anchors and no item is selected), so the bump's gate stays close to green; where the legacy shape does not allow it, the bump adapts. Either way, `kipu note 99f2fe62c62f` with the exact site edits (file, prop, value: `app/layout.tsx` passing `usePathname` from `next/navigation`, `NextLink`, and the image component) so the bump commit carries them: a bump is the commit that adapts to what it buys.
- Sibling steps (decision `28c1a536`): the change lands in `../ui` (`src/...`, and `stories/` where a story renders the component), verified there by `pnpm lint`, `pnpm types` and `pnpm build:pkg`, committed there by pathspec (`git -C ../ui add <paths>` then `git -C ../ui commit -- <paths>`, the message citing the legacy source by its SHA-pinned URL where code is ported) and not pushed; seen on this site through an uncommitted override (`pnpm.overrides` `"@villagekit/ui": "link:../ui"` in `package.json`, then `pnpm install`; the sibling's top-level `exports` point at `src/`, so no build is needed for the override), reverted by path before the commit here (`git restore -- package.json pnpm-lock.yaml`, then `pnpm install --frozen-lockfile`) so the commit never carries it; each item this slice closes moves to `upstream` (`kipu move <id> upstream --from regression`) with a note citing the sibling commit; then `kipu relate 99f2fe62c62f blocked_by <this slice>`. The package version stays: the publish is the operator's.
- Closes (to `upstream`) `5b4ef6aaa80c`, `80c1e70fea46` (its site half lands at the bump; the note on the item says so).
- Interfaces: produces the mechanism the ui nav, brand footer, mdx and LinkCard slices follow, named in each of their notes.
- Verify first: what `../ui`'s storybook renders for nav and footer today (`stories/`), so the stories keep building without Next.

## Seams under test

None pure.

## Done when

- `grep -rn "from 'next" ../ui/src` is empty and `../ui/package.json` has no `next` in `peerDependencies`
- with the override in place on this site: `pnpm typecheck` is green with no site change (or the Outcome lists each error and the bump note names its edit), `/` renders the nav and its links navigate, and `/about` shows the footer links; the override then reverted
- in `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` are green and the commit there is by pathspec, its hash in each item's note
- `5b4ef6aaa80c` and `80c1e70fea46` are `upstream`, `99f2fe62c62f` is `blocked_by` this slice and carries the bump note, checked after the moves
- `timeout 900 just check` is green on this site, without the override

## Outcome

## Log
