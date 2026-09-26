---
title: "Story Open Graph image type: image/jpeg removed"
status: regression
route: /stories/whats-a-grid-unit
axis: code
kind: removed
---
## Legacy

`apps/gridkit/components/layouts/stories.tsx:44-50` at `fce357d` writes the article's Open Graph image as `{ alt: image.alt, type: 'image/jpeg', url: getImageUrl({ image, width: 1200 }) }`, so the live page serves `<meta property="og:image:type" content="image/jpeg">` after `og:image` on each of the six story routes.

## Current

`app/stories/[slug]/page.tsx:37` writes `images: [{ url: ogImageUrl, alt: image.alt }]` with no `type`, so the served head of each story route carries `og:image`, `og:image:alt`, `og:image:width` and `og:image:height` and no `og:image:type`. Found by the Parity review of the fields slice (plan [[52adacea5b2f]]) on a route whose template the page re-port [[4331147cc118]] rewrites; its `getStoryPageMetadata` helper is where the line returns.

## Verdict

## Log

- 2026-09-26: Filed from the Parity review of the fields slice (plan [[52adacea5b2f]]); pre-existing on the [slug] page, not introduced by that slice. No rule covers it, so regression by default (decision 2032533f). The page re-port [[4331147cc118]] closes it: its helper writes legacy's type: image/jpeg on the article image (layouts/stories.tsx:47).
