# 06 — Fold in `ui-mdx` (MDX component overrides)

**Status:** DONE (storybook story deferred)

## Why
The legacy `node-modules/packages/ui-mdx/` exports the MDX component override map (`a`, `blockquote`, `h1-h5`, `li`, `ol`, `p`, `ul`) plus content components like `Image`, `MediaContainer`, `Video`. Stories on the new site will use them. The current `./ui` has nothing for MDX.

## What
A reusable MDX components map exported from `@villagekit/ui` (e.g. `import { mdxComponents } from '@villagekit/ui/mdx'`), styled with the new theme.

## Steps
- [x] Copy from `node-modules/packages/ui-mdx/src/` into `./ui/src/mdx/` (separate sub-path to keep the main bundle from pulling MDX styles for non-MDX consumers).
- [x] The `Image` / `MediaContainer` / `Video` exports overlap with `ui-media`. **Decision:** Skip these in the fold. The website uses project-specific `StoryImage` wrappers; bare `Image` / `Video` from the main `@villagekit/ui` entry point cover the rest. If a future consumer needs MDX-specific media defaults, they can add their own thin wrappers — the legacy `useMediaMaxWidthBreakpoints` hook was a one-line `useConst({ base: 'md', md: 'lg' })` not worth re-exporting.
- [x] Update for Chakra v3 styling. (`List.Root`/`List.Item` instead of `UnorderedList`/`OrderedList`/`ListItem`; `target="_blank" rel="noopener noreferrer"` instead of v2's `isExternal` prop; `<Box as="blockquote">` to preserve the `<blockquote>` semantic that the legacy `BlockSection` lost.)
- [x] Add a sub-path export in `package.json` (mirrored in `publishConfig.exports`).
- [ ] Stories: `Mdx.stories.tsx` — **deferred** along with the other fold-task stories. Will be picked up in [./07-storybook-and-ci.md](./07-storybook-and-ci.md).
- [x] Website's `mdx-components.tsx` updated to delegate to `@villagekit/ui/mdx`.

## Notes
- Sub-path exports keep the main bundle small. Consumers who don't use MDX shouldn't pay for the styles.
- `@types/mdx` added as a devDep of `@villagekit/ui` so the `MDXComponents` type resolves at build time. Consumers using `@villagekit/ui/mdx` will need `@types/mdx` in their own dev deps too (the website already had it).
- Verified the rendered HTML on `/stories/how-to-cut-grid-beams`: `<blockquote>` element is preserved with chakra styles, headings have `id` + inner `<a href="#id">` for deep-linking, and external links pick up `target="_blank" rel="noopener noreferrer"`.
- `tsup` config update for sub-path bundle is now part of [./10-build-pkg-setup.md](./10-build-pkg-setup.md) — currently the package consumes from source so no bundle is emitted.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
- [./05-fold-ui-media.md](./05-fold-ui-media.md) (for re-exporting Image/Video)
