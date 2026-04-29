# 06 — Decide future of the studio Tauri app

**Status:** DONE (decision)

## Why
`./gridkit/apps/studio/` is a fully-built Tauri-wrapped CAD-as-code editor. It's substantial — CodeMirror 6, react-three-fiber preview, xState workspace state. We need to decide what role it plays going forward.

## What
A one-paragraph decision logged into CLAUDE.md (and back into the engine's README) about whether the studio app is:
- **Actively maintained** — it's the recommended way to author designs locally
- **Maintenance mode** — keep the source, no new features
- **Deprecated** — design authoring will move into the website, studio gets archived
- **Embedded** — fold studio's UI into a `/studio` page on gridbeam.xyz so authoring can happen in-browser

## Steps
- [-] Run the studio locally (`pnpm run dev:app:studio`) and assess: is it usable? What's missing? Any obvious bugs? *(Skipped — not load-bearing for the decision; running Tauri dev requires Rust toolchain set-up. Mikey can validate runtime separately.)*
- [x] Consider use cases:
  - Designers authoring new products → studio gives them code editor + 3D preview
  - End users configuring an existing design → website handles it via parameters UI
- [x] Could the studio's UI be moved to a /studio web page? Pros: zero install for users. Cons: file-system access is harder; Tauri's local-app workflow is genuinely useful for a CAD-ish tool.
- [x] Decision options + recommendation:
  - **Decision: Maintain studio as a separate downloadable desktop app.** Don't embed in gridbeam.xyz initially. Link to releases from gridbeam.xyz. Matches what serious CAD tools (FreeCAD, OnShape clients) do, and avoids a big web-port effort that would block other streams.
- [x] Document the decision in the engine's README (a "Studio app" section) and in this repo's CLAUDE.md. *(README updated. CLAUDE.md already covered this under "Out of scope": "the engine itself ships, but the desktop editor stays a separate downloadable app".)*
- [ ] If keeping: ensure GitHub releases pipeline is set up for Tauri builds (Mac/Windows/Linux). Currently the README points at a `villagekit/villagekit` releases page — that needs updating to `villagekit/gridkit/releases` (post-rename). *(Follow-up: spin out into its own task — covered as part of Stream 03 task 03 (rename) + a new "studio releases CI" follow-up. See Notes.)*
- [ ] If deprecating: archive cleanly (note in README, lock the directory, don't delete). *(N/A — decision is to keep, not deprecate.)*

## Notes
- Tauri 2 builds are non-trivial to set up CI for (notarisation on Mac, signing on Windows). Worth knowing the cost before committing.
- The `apps/storybook/` is a separate concern — it's a developer tool for engine contributors, not an end-user app. Keep it as-is.
- **Follow-up task:** "Set up Tauri release CI for the studio app." Lives under Stream 03 once the repo rename (task 03) lands and we have a stable URL. The README already links at `gridkit-legacy/releases`; update with the rename.

## Depends on
None — pure decision task.
