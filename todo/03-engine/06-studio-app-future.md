# 06 — Decide future of the studio Tauri app

**Status:** TODO (decision)

## Why
`./gridkit/apps/studio/` is a fully-built Tauri-wrapped CAD-as-code editor. It's substantial — CodeMirror 6, react-three-fiber preview, xState workspace state. We need to decide what role it plays going forward.

## What
A one-paragraph decision logged into CLAUDE.md (and back into the engine's README) about whether the studio app is:
- **Actively maintained** — it's the recommended way to author designs locally
- **Maintenance mode** — keep the source, no new features
- **Deprecated** — design authoring will move into the website, studio gets archived
- **Embedded** — fold studio's UI into a `/studio` page on gridbeam.xyz so authoring can happen in-browser

## Steps
- [ ] Run the studio locally (`pnpm run dev:app:studio`) and assess: is it usable? What's missing? Any obvious bugs?
- [ ] Consider use cases:
  - Designers authoring new products → studio gives them code editor + 3D preview
  - End users configuring an existing design → website handles it via parameters UI
- [ ] Could the studio's UI be moved to a /studio web page? Pros: zero install for users. Cons: file-system access is harder; Tauri's local-app workflow is genuinely useful for a CAD-ish tool.
- [ ] Decision options + recommendation:
  - **Recommended:** Maintain studio as a separate downloadable desktop app. Don't embed in gridbeam.xyz initially. Link to releases from gridbeam.xyz. This avoids a big web-port effort and matches what serious CAD tools do.
- [ ] Document the decision in the engine's README (a "Studio app" section) and in this repo's CLAUDE.md.
- [ ] If keeping: ensure GitHub releases pipeline is set up for Tauri builds (Mac/Windows/Linux). Currently the README points at a `villagekit/villagekit` releases page — that needs updating to `villagekit/gridkit/releases` (post-rename).
- [ ] If deprecating: archive cleanly (note in README, lock the directory, don't delete).

## Notes
- Tauri 2 builds are non-trivial to set up CI for (notarisation on Mac, signing on Windows). Worth knowing the cost before committing.
- The `apps/storybook/` is a separate concern — it's a developer tool for engine contributors, not an end-user app. Keep it as-is.

## Depends on
None — pure decision task.
