---
title: "LandingSection: forwardRef dropped, the in-view ref moved to an inner Box"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:464-477` `forwardRef<HTMLDivElement>`; `:410` `<LandingSection index={index} ref={typingDesignRef}>`.

## Current

`app/_components/landing/LandingSection.tsx:14-26` a plain function; `TypingDesignSection.tsx:22,43` attaches `useInView`'s ref to `<Box ref={ref} w="full">` inside the row.

## Verdict

## Log
