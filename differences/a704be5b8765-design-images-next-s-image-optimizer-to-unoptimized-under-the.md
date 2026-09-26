---
title: "Design images: Next's image optimizer to unoptimized under the Cloudinary loaderFile"
status: open
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/carousel.tsx:83-95` and `pages/index.tsx:449-457` render the ui-media `Image` with `type: 'local'` and no `unoptimized`; `apps/gridkit/next.config.mjs` sets no `images.loader`, so a local design PNG goes through Next's default optimizer. The live site's design image carries `src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmakers-workbench.f9034165.png&w=3840&q=75"`, a sixteen-entry `srcset` of `/_next/image` URLs from `w=16` to `w=3840`, and `sizes="(min-width: 768px) 750.00px, 100.00vw"`, and the browser requests the `w=750` derivative at 1280 (a Playwright probe of the live site, 2026-09-26); the hidden next-design image is the same.

## Current

`app/_components/DesignCarousel.tsx:90` and `app/_components/landing/TypingDesignSection.tsx:84` pass `unoptimized` to the ui `Image`. At `@villagekit/ui@1.2.0` the `Image` passes its own loader for `type="cloudinary"` only (`node_modules/@villagekit/ui/dist/components/media/Image.js:65-74`), so a `local` image falls through to `next.config.ts`'s `images.loaderFile` (`app/_lib/cloudinary-loader.ts`), which rewrites the `/_next/static/media/` path into a Cloudinary URL that answers 404. With `unoptimized`, Next writes the static file's path as `src`, no `srcset` and no `sizes` attribute, so the 1600 by 1200 PNG is served whole from `/_next/static/media/` (200 on `pnpm dev`, the same probe). A consequence of the sanctioned global loader (`6c566c2715e0`), not of the re-port: the replaced `motion` component passed `unoptimized` to `next/image` the same way.

## Verdict

## Log

- 2026-09-26: Filed open by the design carousel slice (plan [[60cca8519469]]) for the rules: rule 4 if the operator reads the global loader's consequence as upgrade-forced, else a regression whose fix is a loader for local images in ../ui or a loaderFile that passes /_next/static/media/ paths through. Goes on the home's verdicts plan at the record's finish (the record's Log). The unoptimized half of [[1501ee97ed24]] lives here; the two call sites' sizes objects render no attribute while unoptimized stays, so the 100% for full swap of [[152511f71ef4]] has no rendered effect on them.

- 2026-09-26: At the home record's finish (plan [[fd9a92bd8abd]]): named on the home's verdicts plan [[8bb4a4380264]] for the operator (decision 40abdb2f222a); the state stays open until judged there. No verdict written.

- 2026-09-26: At the home record's finish (plan [[fd9a92bd8abd]]), the Current lines after the page re-port: the DesignCarousel's image is unoptimized at app/_components/DesignCarousel.tsx and the hidden next-design Image at app/HomePage.tsx:442-443 (priority, unoptimized); app/_components/landing/TypingDesignSection.tsx is deleted.
