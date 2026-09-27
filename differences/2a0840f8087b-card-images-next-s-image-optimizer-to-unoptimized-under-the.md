---
title: "Card images: Next's image optimizer to unoptimized under the Cloudinary loaderFile"
status: open
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/item.tsx:49-62` at `fce357d` renders the ui-media `Image` with the design's `{ type: 'local', src, alt }` object and `sizes={{ base: ['full', 2], lg: ['8xl', 3] }}`, no `unoptimized`; `apps/gridkit/next.config.mjs` sets no `images.loader`, so each card's PNG goes through Next's default optimizer. The live site's card `img` carries `src` and a sixteen-entry `srcset` of `/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbed-frame.3ee28811.png&w=...` URLs and `sizes="(min-width: 992px) 480.00px, 50.00vw"` (a curl of `https://gridkit-landing-villagekit.vercel.app/designs`, 2026-09-27).

## Current

`app/_components/catalogue/ItemCard.tsx:31-38`: `NextImage` with `fill`, `unoptimized` and a static `sizes` string. After the card re-port, the ui `Image` of `@villagekit/ui@1.2.0` with `unoptimized` kept: a `local` `Image` passes no loader of its own (`node_modules/@villagekit/ui/dist/components/media/Image.js:65-74`) and falls through to `next.config.ts`'s `images.loaderFile` (`app/_lib/cloudinary-loader.ts`), which rewrites a `/_next/static/media/` path into a Cloudinary URL that answers 404; with `unoptimized`, Next writes the static file's path as `src`, no `srcset` and no `sizes` attribute (`node_modules/next/dist/shared/lib/get-img-props.js:98-104`), so the 37 PNGs are served whole at every width. The twin of `a704be5b8765` on `/` (the home's verdicts plan `8bb4a4380264`); a consequence of the sanctioned global loader `6c566c2715e0`, not of the re-port, which writes the same prop the current card carries.

## Verdict

## Log

- 2026-09-27: Filed open at the designs index record's split (plan f901cf9f724d), the twin of [[a704be5b8765]] on /, put to the operator on the verdicts plan [[549ec777422c]] to be judged with it; the card re-port [[e22f84fa6e1a]] ships unoptimized by default and notes the line.

- 2026-09-27: The card re-port (plan e22f84fa6e1a) ships unoptimized by default on both Image branches of legacy item.tsx, app/_components/catalogue/Item.tsx:52 and :70, the first under a one-line comment naming this item; the served img carries src /_next/static/media/<design>.<hash>.png, no srcset and no sizes (audit/designs/card-probe.txt, 37 of 37 answering 200). The state stays open for the operator. If the verdict is a regression, the fix removes the two lines and the loader question is the ui or the loaderFile, as the Current says.
