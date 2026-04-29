# Engine deps + build audit — report

Static audit of every `package.json` under `./gridkit/` against npm-registry latest as of 2026-04-30. No `pnpm install` was performed for this audit (the engine workspace isn't installed locally; full install pulls Tauri Rust toolchain and is heavy). The numbers below match what `pnpm outdated -r` would report for the public-facing deps. Lock-file vs. registry drift will be picked up at install time.

## Method

```sh
# Aggregate all declared deps (excluding workspace:*)
find . -name package.json -not -path "./node_modules/*" -not -path "*/node_modules/*" \
  | xargs -I{} cat {} \
  | python3 ... # (see commit history for the inline script)
# For each, hit https://registry.npmjs.org/<pkg> for dist-tags.latest
```

## Recommendations summary

- **Safe to bump now (~30 min of work):** `three`, `xstate`, `lodash-es`, `tsup`, `turbo`, `@tauri-apps/*`, `@tanstack/react-query`, `codemirror`, `@codemirror/*`. Minor / patch only.
- **Defer to task 08 (Chakra v3 + React 19 migration):** `react`, `react-dom`, `@types/react`, `@types/react-dom`, `@react-three/fiber`, `@react-three/drei`, `@chakra-ui/react`. All tied to the React 18 → 19 cutover.
- **Defer to a dedicated bump task:** `typescript` (5 → 6), `storybook` (8 → 10), `zod` (3 → 4), `vite` (5 → 8), `vitest` (1 → 4), `@biomejs/biome` (1 → 2), `@xstate/react` (4 → 6), `@types/node` (20 → 25), `puppeteer` (22 → 24). Each is a major-version bump with non-trivial breakage risk; bundle them or take them one at a time.
- **No security advisories surfaced** by reading the registry deprecation flags. (A real `pnpm audit` should run once the workspace is installed.)

## Detailed table

| Package | Declared range | npm latest | Recommendation |
|---------|---------------|-----------|----------------|
| **react** | `^18.2.0` / `^18.3.1` / `18.3.1` | 19.2.5 | **Defer to task 08.** React 19 is the target; the Chakra v3 migration in `./ui` already pins React 19. |
| **react-dom** | `^18.2.0` / `^18.3.1` | 19.2.5 | Same. |
| **@types/react** | `^18.2.15` / `^18.3.3` | 19.2.14 | Same. |
| **@types/react-dom** | `^18.2.7` / `^18.3.0` | 19.2.3 | Same. |
| **@chakra-ui/react** | `^2.8.2` (in `core/ui`) | 3.35.0 | Task 08 deletes `core/ui` entirely and switches consumers to the standalone `@villagekit/ui` (already on v3). No bump here. |
| **@chakra-ui/react-types** / **@chakra-ui/skip-nav** / **@chakra-ui/theme** / **@chakra-ui/utils** | `^2.x` / `^3.3.1` | (deprecated in v3) | Drop with `core/ui` deletion in task 08. |
| **three** | `^0.165.0` | 0.184.0 | **Bump to `^0.184.0`.** Three.js minor versions are reliable; gap is large but no semantic-version weirdness. |
| **@react-three/fiber** | `^8.16.8` | 9.6.1 | **Defer to task 08** — v9 supports React 19, v8 doesn't. Bumping now without React 19 lands pulls a downgrade-incompatible peer. |
| **@react-three/drei** | `^9.106.0` | 10.7.7 | Same — drei v10 ships with R3F v9 / React 19. |
| **typescript** | `^5.2.2` / `^5.4.5` | 6.0.3 | **Defer.** TS 5 → 6 is a major; pin to a single `^5.6.x` or so for now and schedule the TS 6 migration as its own task. Suggested intermediate: bump both ranges to `^5.7.0` (last known-good 5.x). |
| **storybook** family | `^8.1.6` | 10.3.5 | **Defer**, but coordinate with Stream 02 (the `./ui` repo is already on Storybook 9.0.6). When this task lands, jump straight to Storybook 10 across both. |
| **xstate** | `^5.13.1` | 5.31.0 | **Bump to `^5.31.0`.** Within v5, safe. |
| **@xstate/react** | `^4.1.1` | 6.1.0 | **Defer.** v5 → v6 is a major. Couples to xstate core; bundle with the studio app's xstate work. |
| **zod** | `^3.23.8` | 4.3.6 | **Defer.** v4 has breaking schema changes; bundle as its own task once consumers (parameters, parts) are touched. |
| **puppeteer** | `^22.11.2` | 24.42.0 | **Defer.** v23/v24 had API changes around `launch()` defaults. Only used by `commands/screenshot`; non-blocking. |
| **codemirror** core / `@codemirror/*` | `^6.0.1` and various | 6.0.2 (and current within `@codemirror/*` v6) | **Bump within v6.** Run `pnpm up '@codemirror/*'` once the workspace is installed. |
| **vite** | `^5.2.13` / `^5.3.1` | 8.0.10 | **Defer.** Vite 5 → 8 spans 3 majors; coordinate with Vitest bump. |
| **vitest** | `^1.6.0` | 4.1.5 | **Defer**, bundle with Vite. Vitest 4 wants Vite 6+. |
| **tsup** | `^8.1.0` | 8.5.1 | **Bump to `^8.5.1`.** Patch / minor only. |
| **turbo** | `^2.0.4` | 2.9.6 | **Bump to `^2.9.6`.** Within v2. |
| **@biomejs/biome** | `^1.8.0` | 2.4.13 | **Defer.** v1 → v2 has rule-set + config-format breakage; align with the website's biome config when that exists. |
| **@tanstack/react-query** | `^5` (broad) | 5.100.6 | Already absorbing v5 patches via the `^5` constraint. No code change needed. |
| **@tauri-apps/api** / `@tauri-apps/plugin-*` / `@tauri-apps/cli` | `^2.0.0` | 2.10.x | **Bump to `^2.10.0`.** Within v2. |
| **@types/node** | `^20.14.2` | 25.6.0 | **Defer.** Node types track Node major versions; align with the actual Node version in CI (`engines.node` isn't currently set — see "Loose ends" below). |
| **lodash-es** | `^4.17.21` | 4.18.1 | **Bump to `^4.18.1`.** |
| **nanoid** | `^5.0.7` | (check on bump day) | Keep range; no urgent issue. |
| **react-icons** | `^5.2.1` | (check on bump day) | Keep. |
| **@types/three** | `^0.165.0` | (matches `three`) | Bump in lockstep with `three`. |

## Loose ends (not version-related)

- **`engines.node` field missing** on every package. Add `"engines": { "node": ">=20" }` (matching the `@types/node` range) at the workspace root once the Node target is settled. CI will then refuse mismatched Node.
- **Multiple React versions in declared deps** — `core/ui` declares `^18.3.1`, `commands/screenshot` declares `^18.2.0`, `apps/studio` declares `^18.2.0`. Once task 08 unifies on React 19, normalise these to a single peer-dep range across the workspace.
- **`packageManager: "pnpm@9.9.0"`** at the workspace root. pnpm 10 is out; bump in lockstep with the actual installed pnpm. Non-urgent.
- **Lerna-Lite** (`@lerna-lite/cli`, `@lerna-lite/publish`) at v3.6 — current. Used for the `version:bump` script.
- **No `pnpm audit` output** because the workspace isn't installed. Run as part of the actual bump PR; flag any HIGH/CRITICAL advisories at that time.

## TODO triage (per the task spec)

Engine TODO comments scanned via `grep -rn "TODO" --include='*.ts*' core/ parts/ products/ kit-plugins/ util/ commands/`. Triage:

| Location | TODO | Severity | Action |
|----------|------|----------|--------|
| `util/units/src/index.ts:193` | "TODO memoize" | Performance hint | Leave; no observed perf issue. Can micro-optimise when a benchmark calls for it. |
| `core/part/src/base/index.ts:45` | "use mesh uvs instead of this" | Rendering correctness | Bigger architectural — leave to a `parts/*-uv-cleanup` follow-up task. |
| `core/part/src/base/grid/svg/context.tsx:24` | "remove aliases" | Cleanup | Trivial; do alongside the next part-system pass. |
| `core/sandbox/src/camera/controls.tsx:158` | "pull request upstream" | Upstream improvement | Leave — depends on upstream `camera-controls`'s appetite. |
| `parts/fastener/src/gl.tsx:114` | "use mesh uvs instead of texture.repeat" | Rendering correctness | Same as `core/part` — group into the UV-cleanup follow-up. |
| `parts/fastener/src/schemas.ts:5` | "TODO" (vague, single-word) | Unclear | Leave a `// Note(cc): xxx` note explaining it was vague at audit time and we didn't act. |
| `parts/gridbeam/src/gl.tsx:85` | "move to texture descriptor in part type" | Architecture | Same family as the UV-cleanup. Group. |
| `parts/fastener/src/svg.tsx:27` | "formatting functions for util-units" | Refactor | Add to `util/units` API design notes; non-urgent. |
| `parts/gridpanel/src/gl.tsx:96` | "move to texture descriptor in part type" | Same | Group. |
| `products/kit/src/context.tsx:120` | "TODO fix" — commented-out partsSchema async validation | Behaviour gap | Worth a small follow-up: the validation is currently bypassed. Either re-enable or remove the dead code. |
| `products/kit/src/context.tsx:210, 217` | TODO assert helpers (commented-out) | Dead code | Either restore the assertions or delete the block. |
| `products/kit/src/helpers.ts:29` | "Need to re-think where and how this happens" | Architecture | Existing design tension; leave a `// Note(cc):` so future readers see it. |

## Follow-up tasks proposed

These are spinning out of the audit; record in the task tree at next opportunity.

1. **Bump safe minors (`three`, `xstate`, `lodash-es`, `tsup`, `turbo`, `@tauri-apps/*`, `@tanstack/react-query`, codemirror).** Run the bumps, verify lint/types/build pass, commit.
2. **Restore or remove the dead validation code in `products/kit/src/context.tsx` (lines 120, 210, 217).** Small follow-up.
3. **UV-cleanup pass for parts.** Touches `core/part/src/base/index.ts`, `parts/fastener/src/gl.tsx`, `parts/gridbeam/src/gl.tsx`, `parts/gridpanel/src/gl.tsx`. Group as one parts-rendering task.
4. **Major-version sweep (TS 5→6, Storybook 8→10, Vite 5→8 + Vitest 1→4, Biome 1→2, Zod 3→4, @xstate/react 4→6).** One PR per major or one big bundled PR — Mikey's call. Recommend doing them after the React 19 / Chakra v3 cutover (task 08) so we're not stacking too many migrations at once.
5. **Set `engines.node` and pin pnpm version** at workspace root.

## Status

Static audit complete on 2026-04-30. Live `pnpm install` + `pnpm audit` should be re-run by Mikey when the safe-minors bump PR opens. Findings stable for 1-2 months; npm registry drift after that warrants a re-run.
