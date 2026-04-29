# 05 — Fold in `ui-media` (Image, Video, hooks)

**Status:** TODO

## Why
The legacy `node-modules/packages/ui-media/` has a smart `Image` component that handles responsive sizes + Cloudinary URL building, a `Video` component, and helper hooks `useImageSizes`, `useAspectRatio`. The new site needs all of this. **But** the current implementation hardcodes `https://res.cloudinary.com/villagekit` as the Cloudinary base — needs abstracting.

## What
`Image`, `Video`, and the hooks land in `./ui/src/components/media/`. The Cloudinary integration is parameterised so consumers can configure the cloud name (or use a different CDN entirely).

## Steps
- [ ] Copy components from `node-modules/packages/ui-media/src/` into `./ui/src/components/media/`.
- [ ] Read the existing `Image` implementation. It supports `type: 'svg' | 'local' | 'cloudinary'`. Keep the interface.
- [ ] Abstract the Cloudinary base URL: pass it via a context provider, or as a prop, or read from a configurable global. Recommend a `<MediaProvider cloudinaryName="..." />` context at the top of the consuming app.
- [ ] Default fallback: if no provider is set, treat all `cloudinary` URLs as `local` (or fail loudly).
- [ ] Verify Next.js `Image` integration still works — `next/image` is a peer dep concern; document it in `peerDependencies`.
- [ ] Update for Chakra v3 (any internal styling).
- [ ] Stories: `Image.stories.tsx`, `Video.stories.tsx`, `useAspectRatio.stories.tsx`.
- [ ] Add to `src/index.ts` exports.

## Notes
- The Cloudinary cloud name will eventually change for gridbeam.xyz (Stream 04 task 02 settles where images live). Keeping the URL configurable means we don't have to ship a `@villagekit/ui` update when it does.
- `next-image` is the Next.js peer; specifying it as a peer dep is correct.
- The hooks (`useImageSizes`, `useAspectRatio`) are the workhorses — these run on every image render and need to be efficient.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
