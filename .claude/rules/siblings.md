---
paths:
  - "package.json"
  - "pnpm-lock.yaml"
  - "next.config.ts"
  - "products/**"
---

# The siblings and the packages

- The published `@villagekit/*` packages ship compiled ESM and resolve `.` to `dist/index.js`, so `next.config.ts` lists no `transpilePackages`. Only a sibling's top-level `exports` point at `src/`.
- **Seeing a `../ui` fix before its publish.** An uncommitted `pnpm.overrides` of `@villagekit/ui` to `file:../ui`. `link:../ui` does not resolve under `next dev --turbopack`. `file:` copies the sibling at install time, so each sibling edit needs a `pnpm install` before `pnpm dev` sees it. The copy resolves to `src/*.ts`, which needs an uncommitted `transpilePackages: ['@villagekit/ui']` in `next.config.ts` beside the override: without it `next build`'s worker dies with SIGILL, and `next dev` dies compiling the first route. Both edits are reverted by path before the commit.
- **Seeing a `../gridkit` fix before its publish.** An uncommitted `pnpm.overrides` of the package to a tarball packed from the sibling. `file:` on the package directory fails, because the sibling's `package.json` declares its workspace deps as `workspace:*`, which resolves only inside the monorepo. The steps:
  1. Run the package's `build:pkg`.
  2. From the package's directory in `../gridkit`, `pnpm pack --pack-destination ../../../gridbeam.xyz`. It writes `villagekit-<name>-<version>.tgz` at this repo's root, gitignored by `*.tgz`, with the specifiers rewritten to the sibling's current versions, so the tarball installs only while those versions are published.
  3. Set `pnpm.overrides` of `@villagekit/<name>` to `file:./villagekit-<name>-<version>.tgz`, then `pnpm install`.
  4. Each sibling edit needs a rebuild, a repack and a `pnpm install`.
  5. Before the commit, revert by path: `git restore -- package.json pnpm-lock.yaml`, delete the tarball, `pnpm install --frozen-lockfile`.
- The tarball's `.` resolves to `dist/index.js`, so it needs no `transpilePackages`. Never list an engine package the engine's workers import (the part packages, `product-kit`): a transpiled component evaluated in a worker logs `memo` received undefined in development (`505a856301b8`). Legacy's own list left `@villagekit/product-kit` out for that reason, as `// web worker`.
- A fix that belongs upstream lands in `../ui` or `../gridkit` and waits for the operator's publish. A sibling checkout is written as if another agent were in it: only the paths the plan names, committed there by pathspec.
- `./products` is pulled by rsync from `../products/products/` and committed whole.
