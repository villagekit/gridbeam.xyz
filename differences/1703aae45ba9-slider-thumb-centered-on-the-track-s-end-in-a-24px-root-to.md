---
title: "Slider thumb: centered on the track's end in a 24px root to contained inside it in a 20px root"
status: upstream
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

Chakra v2's slider thumb sits centered on the track's end, its box overhanging the root (the packed `@chakra-ui/theme` `dist/components` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`, `slider.js:74-117`, `position: absolute` at `left` per value with `translateY(-50%)`), and the root's height is the thumb's: the `Size` slider's thumb at max spans 1188 to 1212 on a root ending at 1200, the root 24px tall (read by the Parity review of plan eba62a497d77 (its `scratchpad/review/p.mjs`, `legacy.json` and `current.json`) on the live `/designs/5-12-13-triangle-desk` and the page under the ui override, the `Custom` preset selected, at 1280).

## Current

zag's slider defaults `thumbAlignment` to `contain` (`node_modules/.pnpm/@zag-js+slider@1.40.0/node_modules/@zag-js/slider/dist/slider.machine.js:66`), which keeps the thumb inside the root, and Chakra v3's horizontal control has `minHeight: var(--slider-thumb-size)`, v3's 20px at `md` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/slider.js:166-170,82-89`), where the engine's thumb is 24px (`boxSize="6"`, `@villagekit/parameters` `dist/values/number.js`): the thumb at max spans 1176 to 1200, the root 20px tall (read by the Parity review of plan eba62a497d77 (its `scratchpad/review/p.mjs`, `legacy.json` and `current.json`) on the live `/designs/5-12-13-triangle-desk` and the page under the ui override, the `Custom` preset selected, at 1280). Read beside the width plan eba62a497d77 restores, hidden until then by the zero-width root; its ui recipe (`../ui/src/components/Slider.recipe.ts`) leaves it. `b8eb35a5578e` reads the track and the thumb's look.

## Verdict

## Log

- 2026-09-27: Fixed in ../ui 47c6ffb (plan 402430831b29, the ui switch, slider and tabs recipes, Chakra v2 theme again), not pushed; seen on pnpm dev under the ui override, legacy and current readings saved in the plan scratchpad probe. Waits on the operator publish and the bump plan 99f2fe62c62f (decision 28c1a536).
