---
title: ImageCarousel re-ported onto react-responsive-carousel
status: todo
parent: fd9a92bd8abd
derived_from: fd9a92bd8abd
blocked_by:
  - 6f90e7e24ca6
  - 2de4b709bb36
tags:
  - "worker:fable"
priority: medium
---
The hero carousel is legacy's `components/image-carousel.tsx` again: `react-responsive-carousel`'s `Carousel` with its stylesheet, `infiniteLoop`, a 4000 ms `autoPlay`, the library's translate slide transition, `RasterImage` slides from the ui media package, and the arrows and indicators that only an interactive carousel (no autoplay, more than one slide) renders, in place of the hand-written `motion` carousel whose interactive half nothing calls. The hero then exposes what legacy's tree exposes (a list of slides with the loop's clones, no region, no live text), keeps one height across slides, has no backdrop, and animates whatever the visitor's motion preference. The file moves to `app/_components/ImageCarousel.tsx`, legacy's module location. A re-port on a library under React 19, so Fable. Seven items on `/`, plus the carousel half of the reduced-motion item and the first of the three `sizes` call sites. Record `fd9a92bd8abd`; decisions `ee86d68a`, `2032533f`, `28c1a536`.

## Work

- Legacy: `../node-modules/apps/gridkit/components/image-carousel.tsx` at `fce357d` (146 lines); the call site `pages/index.tsx:107-142`. Current: `app/_components/landing/ImageCarousel.tsx`, `app/page.tsx` (`HERO_SLIDES` and the `ImageCarousel` element).
- [[081bb0ea7651]]: `react-responsive-carousel` (MIT, `^3.2.23`, legacy's `apps/gridkit/package.json:74`; no `peerDependencies` declared, so it installs under React 19) added, the import of `react-responsive-carousel/lib/styles/carousel.min.css` at the top of the client module, `ImageCarouselProps` as legacy's (`ariaLabel`, `slides: Array<RasterImagePropsWithOptionalSizes>`, `autoPlayEnabled`, `slideSx` as `slideCss`, `sizes`, `priority`, the type names from `@villagekit/ui`, which `1.2.0` exports with `RasterImage`), `isInteractive`, the `Carousel` props line for line (`autoPlay`, `ariaLabel`, `emulateTouch`, `infiniteLoop`, `interval={4000}`, `renderArrowPrev`, `renderArrowNext`, `renderIndicator`, `showArrows`, `showStatus={false}`, `showThumbs={false}`, `showIndicators`, `swipeable`), the `Indicator` and `ArrowButton` helpers with `IconButton variant="tertiary"`; the wrapper's `sx` class selectors (`.carousel`, `.carousel-root, .carousel, .slider-wrapper, .slider, .slide`) written in Chakra v3's nested form (`'& .carousel'`). The `index.ts` exports of `CarouselSlide` and `ImageCarouselProps` go with the module.
- [[780e17e5fe2b]], [[d39c2d7084cc]], [[edccbd498f7f]], [[e87be1434e6b]], [[eb165877f8f1]], [[6f9b6d9162de]] close with the rewrite: no `AnimatePresence`, no `section`/`aria-roledescription`, no `VisuallyHidden` live region, no `aspectRatio` on the wrapper, no `bg`. [[c7d1f28fcea1]]'s carousel half: no `useReducedMotion`; the item closes in the design carousel slice once the typing section's half is gone too.
- The call site in `app/page.tsx`: `slides` as legacy's objects (`type: 'cloudinary'`, `src`, `alt`, `width`, `height`, `priority: true` on the first), the first slide's `src` staying `gridbeam.xyz/home/record-shelf-hero` (`bea4a6b2871b`, sanctioned), `priority`, `autoPlayEnabled`, and `sizes={{ base: '100%', md: ['1500px', 2] }}`: the record's Log says why `'100%'` stands where legacy wrote `'full'` (`index.tsx:109`) until the bump, and this slice files that difference: one item on `/` (code, `changed`) with the legacy line, the `1.2.0` hook that throws on `full` (`node_modules/@villagekit/ui/dist/components/media/hooks.js`, `Unexpected size value`) and the rendered `sizes` attribute being identical (`100.00vw`), moved to `upstream` (`kipu move <id> upstream --from regression`) with a note citing ui commit `1c3e3e8` (`252edab16c7a`), and a note on `99f2fe62c62f` naming the call site to swap back to `'full'` at the bump, which the later slices extend. The wrapping `Flex` and the `Box flex="1"` are the page re-port's.
- Interfaces: consumes the mounted `MediaProvider`; produces `ImageCarousel` with legacy's props for the page re-port, and for the story pages record's newsletters (`story-image-carousel.tsx`, the interactive mode).
- Verify first: `timeout 60 pnpm view react-responsive-carousel@3.2.23 peerDependencies` prints nothing; on `pnpm dev` the library renders under React 19 with no error (a deprecation warning for a legacy lifecycle, if any, is named in the Outcome, not fixed here); `next build` accepts the global stylesheet import from a client component under `app/` (Next 15 allows it anywhere under `app/`).
- Not this slice: the hero's copy (the copy slice's, which this slice is blocked by, so the four alts and the label are carried as found); the `Flex justifyContent="flex-end"` wrapper and the inlining of the slides into the JSX (the page re-port).

## Seams under test

None pure; the proof is the aria tree, the pairs and the eye on `pnpm dev`.

## Done when

- `pnpm audit:dom --routes <a file naming />` against a running `pnpm dev`: `audit/_root/dom/current.aria.yaml` shows the hero as `legacy.aria.yaml` does, a `list` of six `listitem` and `img` nodes for four slides, no `region` named by the label and no `Slide 1 of 4` text
- On `pnpm dev` at 1280 the slides advance every 4 s with the library's horizontal slide, the box keeps one height across the four slides, and the wrapper's computed `background-color` is transparent; the pairs at 375, 768 and 1280 looked at against legacy
- `grep -rn 'useReducedMotion\|AnimatePresence\|motion/react' app/_components/ImageCarousel.tsx` prints nothing; `ls app/_components/landing/ImageCarousel.tsx` fails
- The seven items are `fixed`; the `sizes` item is filed and `upstream` with its notes; the reduced-motion item carries a note that its carousel half is done, checked after the moves
- `timeout 900 just check` is green

## Outcome

## Log
