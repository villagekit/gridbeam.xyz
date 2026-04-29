# 06 — Fold in `ui-mdx` (MDX component overrides)

**Status:** TODO

## Why
The legacy `node-modules/packages/ui-mdx/` exports the MDX component override map (`a`, `blockquote`, `h1-h5`, `li`, `ol`, `p`, `ul`) plus content components like `Image`, `MediaContainer`, `Video`. Stories on the new site will use them. The current `./ui` has nothing for MDX.

## What
A reusable MDX components map exported from `@villagekit/ui` (e.g. `import { mdxComponents } from '@villagekit/ui/mdx'`), styled with the new theme.

## Steps
- [ ] Copy from `node-modules/packages/ui-mdx/src/` into `./ui/src/mdx/` (separate sub-path to keep the main bundle from pulling MDX styles for non-MDX consumers).
- [ ] The `Image` / `MediaContainer` / `Video` exports overlap with `ui-media`. Decide: re-export from `ui-media`, or delete the duplicates here. Recommend re-exporting from media — single source of truth.
- [ ] Update for Chakra v3 styling.
- [ ] Add a sub-path export in `package.json`:
  ```json
  "exports": {
    ".": { ... },
    "./mdx": { "import": "./dist/mdx/index.js", "types": "./dist/mdx/index.d.ts" }
  }
  ```
- [ ] Stories: `Mdx.stories.tsx` showing all heading levels, lists, blockquotes, links, code blocks.
- [ ] Document usage: how to wire `mdxComponents` into a Next app's `mdx-components.tsx`.

## Notes
- Sub-path exports keep the main bundle small. Consumers who don't use MDX shouldn't pay for the styles.
- `tsup` config will need updating to emit the sub-path bundle. Check that Storybook's resolver still works after that.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
- [./05-fold-ui-media.md](./05-fold-ui-media.md) (for re-exporting Image/Video)
