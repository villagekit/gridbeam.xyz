---
paths:
  - "scripts/**"
---

# The scripts

- The scripts are TypeScript under the root `tsconfig.json`, so `pnpm typecheck` reads them. Node runs them by type stripping, 22.18 or later: no enums, no parameter properties, `import type` for a type, and the `.ts` extension on a relative import.
- A script writes its output under `audit/` or `app/_lib/`, never to stdout as data. `scripts/screenshot.sh` writes to the path it is given. Its progress lines go through `console.log`: a script is its own process, with no log viewer.
- `generate-designs-data.ts` and `copy-maplibre-worker.ts` are run by `prebuild` and `predev`.
- The parity tooling: `audit-pages.ts`; `audit-dom.ts`, with its normalizer under `audit-dom/`; `audit-shared.ts`; the pure route helpers `audit-routes.ts`, with their test; `rebuild-audit-index.ts`; and `audit-routes.txt`.
- Each script's header comment is its page, and changes in the same commit as the script.
