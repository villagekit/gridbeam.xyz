---
title: "Hero carousel sizes: base full to 100% until the ui publish restores the name"
status: upstream
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:109` `sizes={{ base: 'full', md: ['1500px', 2] }}` on the hero `ImageCarousel`; `@villagekit/ui@0.9.0` `src/hooks/useSizeWidths.ts` holds `full` as `100%`, and `packages/ui-media/src/hooks.ts:86-96` at `fce357d` resolves it to `100.00vw`.

## Current

`app/page.tsx:119` `sizes={{ base: '100%', md: ['1500px', 2] }}`: the published `@villagekit/ui@1.2.0` `useSizeWidths` names `3xs` to `8xl` only, so `full` throws `Unexpected size value: full` (`node_modules/@villagekit/ui/dist/components/media/hooks.js:52`), and `100%` is the value legacy's own hook resolved `full` to. The rendered attribute is identical on both sides, `sizes="(min-width: 768px) 750.00px, 100.00vw"` (a curl of the legacy site and of `pnpm dev`, 2026-09-26). The later home slices write the same value at the design carousel's and the landing photos' call sites (`pages/index.tsx:334,365,444,454`).

## Verdict

## Log

- 2026-09-26: Fixed in ../ui commit 1c3e3e8 (plan [[bc0407533650]]): src/hooks/useSizeWidths.ts names full as 100% again, the shell item [[252edab16c7a]]. Filed by the image carousel slice (plan [[c92c235205f5]]). Waits on the operator's publish; the bump plan [[99f2fe62c62f]] swaps the call site back to full and moves this to fixed.

- 2026-09-26: The design carousel slice (plan [[60cca8519469]]) writes the same base: '100%' at two more call sites, app/_components/landing/TypingDesignSection.tsx:72,87 (the DesignCarousel and the hidden next-design Image, legacy pages/index.tsx:444,454). Both images are unoptimized ([[a704be5b8765]]), so Next writes no sizes attribute for them and the swap back to full changes nothing rendered; the check stays the grep. The page re-port inlines the section and moves the two lines into app/page.tsx.

- 2026-09-26: The page re-port (plan [[159c621d8a1a]]) inlines every call site into app/HomePage.tsx: the hero ImageCarousel at :110 (legacy pages/index.tsx:109), the two LandingImage photos at :333 and :369 (legacy :334,365), the DesignCarousel at :433 and the hidden next-design Image at :446 (legacy :444,454), each sizes={{ base: '100%', md: ['1500px', 2] }}; the two photos render sizes="(min-width: 768px) 750.00px, 100.00vw" on both sides, the same attribute as the hero. The check for the swap back to full is grep -rn "base: '100%'" app printing nothing.
