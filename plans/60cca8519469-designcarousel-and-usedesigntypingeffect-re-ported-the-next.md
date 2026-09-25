---
title: DesignCarousel and useDesignTypingEffect re-ported, the next design preloaded
status: todo
parent: fd9a92bd8abd
derived_from: fd9a92bd8abd
blocked_by:
  - 6f90e7e24ca6
  - c92c235205f5
  - 2de4b709bb36
tags:
  - "worker:fable"
priority: medium
---
The typing section's picture is legacy's `components/carousel.tsx` again, `DesignCarousel` on the Web Animations API: the old image fades out over 100 ms, and when the new one loads it fades in over 1500 ms while scaling from 0.8 over 2000 ms, mirrored by `shouldMirror`, the ui media `Image` inside; the hook is legacy's `hooks/useDesignTypingEffect.tsx` again (lodash `shuffle`, the timer effect on `[designs, pause]`, the three-tuple), and the section reads all three elements so the next design's image is loaded hidden before the swap. No `motion`, no reduced-motion branch. The modules move to `app/_components/DesignCarousel.tsx` and `app/_lib/useDesignTypingEffect.ts` (CLAUDE.md, Structure: helpers under `app/_lib/`). A re-port, so Fable. Five items on `/` and the second `sizes` call site. Record `fd9a92bd8abd`; decisions `ee86d68a`, `2032533f`, `83b6c8ceb5d0`.

## Work

- Legacy: `../node-modules/apps/gridkit/components/carousel.tsx` at `fce357d` (99 lines), `apps/gridkit/hooks/useDesignTypingEffect.tsx` (89 lines), the section's use at `pages/index.tsx:398-404,440-457`. Current: `app/_components/landing/TypingDesignSection.tsx` (`DesignCarouselImage`, the two-element destructure, the reduced-motion branch), `app/_components/landing/useDesignTypingEffect.ts`.
- [[97fd4a76d9f1]], [[6a093c343640]]: `DesignCarousel` with `fadeBoxRef`, `zoomBoxRef`, the `useEffect` on `design.image` running `fadeBox.animate({ opacity: [1, 0] }, { duration: 100, easing: 'ease-in', fill: 'forwards' })` and setting the image when it finishes, `handleImageLoaded` running the 1500 ms `ease-out` fade-in and the 2000 ms `cubic-bezier(0.33, 1, 0.68, 1)` scale from 0.8, `fill: 'forwards'` on each; the outer `Box` `display: flex, justifyContent: center, height: 100%`, the inner `Box` `aspectRatio: '4 / 3'`; `<Image type="local" priority src={image} alt={...} sizes={sizes} css={shouldMirror ? { transform: 'scaleX(-1)' } : {}} onLoad={handleImageLoaded} />` from `@villagekit/ui`. The site's `DesignIndexEntry.image` is a `StaticImageData | null` where legacy's `DesignIndex.image` was a `LocalImageProps` object with `alt` (`packages/designs/src/index.ts:10-15` and `getDesignImage`, which the worker reads for the alt legacy gave a design); the props type takes a non-null image, the page's `image !== null` filter staying with [[272613135119]] (left for the designs record, the record's Log).
- [[2c82682942d8]]: the hook with `shuffle` from `lodash-es` (the story card slice adds the dependency; if this slice lands first, it adds it), the effect's deps `[designs, pause]` under legacy's `biome-ignore` line, the port citation at the top; the current file's null guards inside `emulateKeyStroke` stay only where `strict` needs them, named in the Outcome.
- [[fbd34de5c07d]]: the section renders `nextDesign`'s image hidden, `<Image priority type="local" src={nextDesign.image} alt sizes css={{ display: 'none' }} />` (`index.tsx:449-457`). [[c7d1f28fcea1]]: `useReducedMotion`, `prefersReducedMotion` and `displayLabel` gone from the section; with the carousel slice's half done the item closes here.
- The `sizes` on both images: `{ base: '100%', md: ['1500px', 2] }`, the record's Log rule; add the two call sites to the note on the `sizes` item the carousel slice filed and to its bump note. The static string goes with them (the third call site and [[1501ee97ed24]]'s closure are the page re-port's). `unoptimized` stays on both local images: at `1.2.0` the ui `Image` passes its own loader for `type="cloudinary"` only (`dist/components/media/Image.js:65-72`), so a `local` image falls through to `next.config.ts`'s `images.loaderFile`, which rewrites the `/_next/static/media/` path into a Cloudinary URL that answers 404 (`app/_lib/design-images.ts:1-7`); legacy's images went through Next's default optimizer. That is a consequence of the sanctioned global loader (`6c566c2715e0`), so this slice files it as one code item on `/` (`changed`, `open`, for rule 4), notes on `1501ee97ed24` that its `unoptimized` half moved there, and writes a bump note on `99f2fe62c62f` that a local ui `Image` keeps `unoptimized` under `imageComponent={NextImage}` too.
- Until the page re-port inlines the section, `TypingDesignSection.tsx` stays a module and consumes the two new modules; its heading, paragraph and button are untouched here (the heading's exposure and size are the page re-port's [[878e1bbba4a9]] and [[ce0ba1ecc47a]]).
- Interfaces: consumes the mounted `MediaProvider`; produces `DesignCarousel` (`design`, `sizes`, `shouldMirror`) and `useDesignTypingEffect` (`designs`, `pause`, `loop`, `playbackRate`) for the page re-port.
- Verify first: `grep -n 'nextDesign\|useReducedMotion' app/_components/landing/TypingDesignSection.tsx` shows the dropped element and the branch; `motion/react`'s `useInView` stays (sanctioned `83b6c8ceb5d0`).
- Not this slice: the section's markup and its inlining into the page (the page re-port); the label sort and the nullable image of `app/_lib/designs.ts`.

## Seams under test

None pure: the hook is timers and state, which legacy left untested, and the animation is the eye's.

## Done when

- On `pnpm dev` at 1280 the design swap fades out, then fades in and zooms from 0.8 after the new image loads, timed as the live legacy site's (`https://gridkit-landing-villagekit.vercel.app/`), and the network panel shows the next design's image requested before its swap
- On `pnpm dev`, the design image and the hidden preload request `/_next/static/media/` URLs that answer 200 (the network panel or `curl -sI` on one)
- `grep -rn 'useReducedMotion\|prefersReducedMotion' app` prints nothing; `grep -rn 'motion.div' app/_components/DesignCarousel.tsx app/_components/landing` prints nothing
- `ls app/_components/DesignCarousel.tsx app/_lib/useDesignTypingEffect.ts` succeeds and `ls app/_components/landing/useDesignTypingEffect.ts` fails
- The five items are `fixed`; the `sizes` item's note and the bump note name the two call sites; the `unoptimized` item is filed `open` with its notes; checked after the fixes
- `timeout 900 just check` is green

## Outcome

## Log
