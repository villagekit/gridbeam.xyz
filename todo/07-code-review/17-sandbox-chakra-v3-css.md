# 17 — Sandbox controls are invisible (Chakra v3 CSS regressions)

**Status:** TODO — decision-gated (needs a `villagekit/gridkit` release), touches `../gridkit`

## Why

Found on 2026-08-03 while verifying [task 05](./05-design-viewer-url-state.md) in real Chrome.
Two Chakra v2 → v3 migration artifacts in the engine packages, both live on every design page:

1. **Every sandbox control sits at `opacity: 0`, permanently.** `@villagekit/sandbox`
   (`core/sandbox/src/index.tsx:82`) fades the control layer in on hover with a nested
   comma-selector:

   ```ts
   css={{
     ':hover, :focus-within': {
       '.sandbox-controls': { opacity: 1 },
     },
     …
   }}
   ```

   Chakra v3's `css` prop doesn't compile that. The emitted rules are literally
   `.css-1kl79jw .sandbox-controls { }` and `.css-1kl79jw .sandbox-controls opacity { }` —
   the `:hover` is dropped and the declaration is mangled into a selector. `Control`
   (`core/sandbox/src/controls/control.tsx:19`) hard-codes `opacity: 0`, so nothing ever
   raises it. Zoom in/out, auto-rotate, grid toggle, reset view, enter/exit fullscreen, the
   assembled-dimensions info panel, and the in-canvas param panel are all invisible. They
   still occupy layout and still respond to clicks — so the 3D viewer looks like it has no
   controls at all, and a user only finds them by accident.

   Confirmed by injecting the corrected selector at runtime — all four controls go to
   `opacity: 1` on hover and render exactly like the legacy site.

2. **Number-param sliders render without a track.** In both the sidebar `ParamControls` and
   the fullscreen panel, each slider shows only the round thumb with its value; no track, no
   filled range. Same class of bug (`Slider.Track` / `Slider.Range` styling not landing under
   Chakra v3) but not yet diagnosed to a specific selector. Legacy sliders had a visible
   track — without one there's nothing to aim at, so params effectively only respond to
   keyboard arrows.

Neither is caused by anything in this repo; both need fixes upstream in `villagekit/gridkit`
and a republish, same shape as [task 16](./16-self-host-gpu-benchmarks.md).

## What

Sandbox controls visible on hover/focus again, and sliders with a track.

## Steps

- [ ] Reproduce in `../gridkit` directly (Storybook or the studio app) so the fix can be
      verified without going through this repo's `node_modules`.
- [ ] Fix the hover selector — flatten it rather than nesting, e.g.
      `'&:hover .sandbox-controls, &:focus-within .sandbox-controls': { opacity: 1 }`.
      Check the emitted CSS, not just the visual: the failure mode here was silent.
- [ ] Grep the engine packages for other nested comma-selectors in `css` props — this is a
      whole class of bug, and two instances (`sandbox`, plus whatever is eating the slider
      track) suggest there are more. Note that `sx` → `css` was a mechanical migration.
- [ ] Diagnose the missing slider track (`@villagekit/parameters` `src/values/number.tsx`
      renders `Slider.Root/Control/Track/Range`; the recipe may not be registered in the
      `@villagekit/ui` v3 theme).
- [ ] **Ask Mikey before publishing.** Needs a `@villagekit/sandbox` (+ likely
      `@villagekit/parameters` / `@villagekit/ui`) release; batch with tasks 06 and 16 if
      they're ready.
- [ ] Bump the deps here, `pnpm typecheck && pnpm build`, re-verify in Chrome (hover the
      viewer; enter fullscreen; drag a slider by mouse).

## Notes

- Verification recipe that caught it, in case it regresses: load a parametric design, then
  `document.querySelectorAll('.sandbox-controls')` → check `getComputedStyle(el).opacity`
  while hovering `#sandbox-container`. A screenshot alone is ambiguous; the controls are
  invisible but present, so DOM-based assertions pass while the page looks broken.
- The legacy site is the ground truth for what these controls should look like:
  https://gridkit-landing-villagekit.vercel.app/designs/shelving-unit

## Depends on

- Nothing. Independent of the rest of this stream, but shares a release with 06 / 16.

## Files

- `../gridkit/core/sandbox/src/index.tsx`, `../gridkit/core/sandbox/src/controls/control.tsx`
- `../gridkit/core/parameters/src/values/number.tsx`
