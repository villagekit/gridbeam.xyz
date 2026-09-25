---
title: "Hero slides: fetchpriority high on the priority images, written by Next 14 and not by Next 15"
status: open
route: /
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/index.tsx:141` passes `priority` to the hero `ImageCarousel`, which spreads it onto every slide's `RasterImage` (`components/image-carousel.tsx:78`); on the live site every hero `<img>` (four slides and two loop clones) carries `fetchpriority="high"` beside its preload link, Next 14.2.5's rendering of a `priority` image (`apps/gridkit/package.json:65`).

## Current

`app/page.tsx:121` passes the same `priority` and `app/_components/ImageCarousel.tsx:84` spreads it the same way, and each slide gets its `<link rel="preload" as="image">`, but no hero `<img>` carries `fetchpriority` (`curl -s localhost:3000/ | grep -c fetchpriority` prints 0 against the legacy site's 10, six images and four preload links): Next 15.5.18's `next/image` passes `fetchPriority` through from the caller only and no longer derives it from `priority` (`node_modules/next/dist/shared/lib/get-img-props.js:130,530`, no `high` anywhere in the file). The same holds for every `priority` image on the site (`app/_components/story/StoryImage.tsx:52`). Found by the image carousel slice's probe (plan [[c92c235205f5]]), not introduced by it: the replaced `motion` carousel rendered `next/image` with `priority` under the same Next. Left for the rules: rule 4 if the upgrade forces it, or a `fetchPriority="high"` written on the slide by the site, which legacy never wrote.

## Verdict

## Log

- 2026-09-26: The preload count above is the server HTML's: four links on both sides. After hydration the legacy DOM holds six image preload links and the current four (the Parity review of plan [[c92c235205f5]]), the same Next 14 to 15 cause, so the item covers both.

- 2026-09-26: The design carousel slice (plan [[60cca8519469]]) adds two priority images on /, the design carousel's (app/_components/DesignCarousel.tsx:87-98) and the hidden next-design preload (app/_components/landing/TypingDesignSection.tsx:81-90); neither carries fetchpriority, the same cause, so this item covers them. Two observations from its probe, the same Next 15 and React 19 preload mechanism: after hydration the current DOM keeps one image preload link per design shown (two, then three, then four over three swaps) where legacy's stays at two, since React 19 hoists a link per priority src and never removes it; and on pnpm dev each design PNG is fetched again at its swap because next dev serves /_next/static/media/ with Cache-Control: no-store, must-revalidate, which a production build does not.
