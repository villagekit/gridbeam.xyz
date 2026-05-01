# 05 — Fold in `ui-media` (Image, Video, hooks)

**Status:** DONE (storybook stories deferred to task 07)

## Why
The legacy `node-modules/packages/ui-media/` has a smart `Image` component that handles responsive sizes + Cloudinary URL building, a `Video` component, and helper hooks `useImageSizes`, `useAspectRatio`. The new site needs all of this. **But** the current implementation hardcodes `https://res.cloudinary.com/villagekit` as the Cloudinary base — needs abstracting.

## What
`Image`, `Video`, and the hooks land in `./ui/src/components/media/`. The Cloudinary integration is parameterised so consumers can configure the cloud name (or use a different CDN entirely).

## Steps
- [x] Copy components from `node-modules/packages/ui-media/src/` into `./ui/src/components/media/`.
- [x] Read the existing `Image` implementation. It supports `type: 'svg' | 'local' | 'cloudinary'`. Keep the interface.
- [x] Abstract the Cloudinary base URL: pass it via a context provider, or as a prop, or read from a configurable global. Recommend a `<MediaProvider cloudinaryName="..." />` context at the top of the consuming app.
- [x] Default fallback: if no provider is set, treat all `cloudinary` URLs as `local` (or fail loudly). — fails loudly with a helpful error message via `useCloudinaryName()`.
- [x] Verify Next.js `Image` integration still works — `next/image` is a peer dep concern; document it in `peerDependencies`. — `next ^15.0.0` already in peerDependencies; no doc change needed.
- [x] Update for Chakra v3 (any internal styling). — `chakra(NextImage, {}, { forwardProps })` v3 syntax; `sx` → `css`; `<chakra.video>` instead of `<Box as="video">` for typed video element.
- [ ] Stories: `Image.stories.tsx`, `Video.stories.tsx`, `useAspectRatio.stories.tsx`. — deferred to task 07 (Storybook upgrade + Chakra integration), matching the precedent set by tasks 03 and 04.
- [x] Add to `src/index.ts` exports.

## Notes
- The Cloudinary cloud name will eventually change for gridbeam.xyz (Stream 04 task 02 settles where images live). Keeping the URL configurable means we don't have to ship a `@villagekit/ui` update when it does.
- `next-image` is the Next.js peer; specifying it as a peer dep is correct.
- The hooks (`useImageSizes`, `useAspectRatio`) are the workhorses — these run on every image render and need to be efficient.
- Dropped the re-export of Chakra's `Image` and `ImageProps` from `@villagekit/ui` — replaced by the smart media `Image` and its discriminated-union `ImageProps`. The Chakra `Image` is still imported directly from `@chakra-ui/react` by `Section.tsx` for its `backgroundImage` slot, where a plain styled `<img>` is the right primitive.
- Replaced `lodash-es`'s `fromPairs` with `Object.fromEntries` — one fewer runtime dep for the package.
- URL builders (`getCloudinaryImageUrl`, `getCloudinaryVideoUrls`) take `cloudinaryName` as a parameter, so they're pure and easy to test without provider setup.
- Wired the website's `app/_lib/cloudinary.ts` and `app/_lib/cloudinary-loader.ts` to consume `getCloudinaryImageUrl` from `@villagekit/ui` — proves the new export against a real consumer. The cloud name is still hardcoded as `'villagekit'`; Stream 04 task 02 will replace that with an env var.

## Follow-ups not done in this task
- Website's `app/_lib/cloudinary.ts` keeps a local `getCloudinaryVideoUrl` because the legacy `ui-media` `Video` component generates per-format `<source>` URLs from a shared transformations base, while the site's `StoryVideo` uses per-format full URLs without transformations. If the site ever switches to the new `Video`, that local helper goes away.
- `Section.tsx` (in this `./ui` library) still imports `Image` and `ImageProps` from `@chakra-ui/react` directly for its `backgroundImage` slot. Same name, different type as the public `@villagekit/ui` `Image` — could be confusing for future contributors. Worth either renaming `Section`'s slot type or migrating to the new `Image`. Defer to Stream 02 task 07 or later.
- The `chakra(NextImage, {}, { forwardProps: ['width', 'height', ...] })` JSX type still has `width`/`height` patched away by Chakra v3's `PatchHtmlProps`. Internally that's hidden by `{...rest}` spread on a loosely-typed component, but a future direct caller of `ChakraNextImage` would need `htmlWidth`/`htmlHeight`. Re-evaluate when a non-`fill` consumer lands.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
