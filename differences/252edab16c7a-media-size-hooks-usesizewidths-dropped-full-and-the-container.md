---
title: "Media size hooks: useSizeWidths dropped full and the container sizes, useBreakpointWidths' base 480px to 0, a story image sized full throws"
status: upstream
route: shell
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0` `src/hooks/useSizeWidths.ts:4-54` names `full` and the `3xs` to `8xl` sizes (its `sizeNames` lists `container.md` twice and `container.lg` and `container.xl` once) and its widths hold `full` as `100%` and `container.sm` to `container.xl` as pixel widths (640, 768, 1024, 1280); `src/hooks/useBreakpointWidth.ts:8-21` gives `base` the `sm` breakpoint's width (480px). `packages/ui-media/src/hooks.ts:86-96` at `fce357d` throws `Unexpected size value` for a name it does not know, and `useVideoSizes` multiplies a `%` width by the breakpoint's width. The legacy caller is `apps/gridkit/components/story/story-image.tsx:24-34`, which spreads `sizes={{ base: 'full', md: ['container.lg', 2] }}` onto the ui-mdx `Image` in a column (`story-video.tsx:11-19` builds the same object and never spreads it).

## Current

`@villagekit/ui@1.2.0` `src/hooks/useSizeWidths.ts:6-22` names `3xs` to `8xl` only, and `src/hooks/useBreakpointWidth.ts:15` sets `base: 0`. `useSizes` (`src/components/media/hooks.ts:72-87`) is legacy's, so a story image sized `full` throws `Error: Unexpected size value: full` (seen as a 500 on `/stories/2021-winter-newsletter` and `/stories/2022-newsletter` under a probe of the mdx and media slice that spread those sizes onto `StoryVideo`), and with `full` known a `%` size at `base` is `0.01 * 100 * 0`, a `w_0` transformation Cloudinary answers with 400.

## Verdict

## Log

- 2026-09-26: Fixed in ../ui commit 1c3e3e8 (plan [[bc0407533650]]): src/hooks/useSizeWidths.ts names full and container.sm to container.xl again (full as 100% from sizes.full, the containers from sizes.breakpoint-md to xl, container.sm as v2's 640px since v3 has no token for it) and src/hooks/useBreakpointWidth.ts gives base the sm width, as the 0.9.0 hooks did. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed.
