---
title: "DesignCarousel: Web Animations API component to a private motion DesignCarouselImage"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/carousel.tsx:1-99` an exported `DesignCarousel` driving `fadeBoxRef.animate` and `zoomBoxRef.animate` from `useEffect` and `onLoad`.

## Current

`app/_components/landing/TypingDesignSection.tsx:96-145` an unexported `DesignCarouselImage` with `motion.div key={src}` and a `prefersReducedMotion` branch.

## Verdict

## Log
