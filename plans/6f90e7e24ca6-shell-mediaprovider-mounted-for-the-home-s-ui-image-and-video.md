---
title: "Shell: MediaProvider mounted for the home's ui Image and Video"
status: todo
parent: fd9a92bd8abd
derived_from: fd9a92bd8abd
blocked_by:
  - bc0407533650
  - 531b810f2dbd
tags:
  - "worker:fable"
priority: medium
---
The site mounts `@villagekit/ui`'s `MediaProvider` once, in `SiteProvider` inside `ChakraProvider`, so the home's re-ports can render the ui `Image` and `Video` (legacy's `@villagekit-private/ui-media` components, `../node-modules/packages/ui-media/src/` at `fce357d`) against the published `1.2.0`, whose media context throws without a cloud name (`node_modules/@villagekit/ui/dist/components/media/context.js`, `assertCloudinaryName`). A shell change, so the difference it makes is filed on `shell`; the site-side edit the bump needs is a note on the bump plan. A prefactor for the story card, carousel, design carousel and page slices, which consume it. Record `fd9a92bd8abd`; decisions `ee86d68a`, `2032533f`, `28c1a536`.

## Work

- `app/_components/SiteProvider.tsx`: `<MediaProvider cloudinaryName={CLOUDINARY_NAME}>` around the children, inside `ChakraProvider` (legacy's `_app.tsx` at `fce357d` nested no media provider, since `ui-media` hard-coded the cloud; the order inside the Chakra provider is this slice's call, stated in the Outcome), `CLOUDINARY_NAME` imported from `app/_lib/cloudinary.ts` so the cloud name keeps one home. `MediaProvider` is exported by `1.2.0` (`dist/index.d.ts`).
- The difference: one item on `shell` (code, `added`, `open`: an addition is the operator's to judge, `2032533f`) with Legacy (`packages/ui-media/src/image.tsx:211-222`, a constant, no context) and Current (the mount and its reason: the published media components need the context, and the home renders them); `kipu relate <new item> supersedes 0efe45924dbe`, and [[0efe45924dbe]] gets a note saying its verdict (not mounted, the loader file being the one call site) is overtaken now that the home renders the ui `Image` and `Video`, and a new state, `kipu move 0efe45924dbe open --from sanctioned` (`differences/README.md`: a wrong verdict is superseded by a note and a new state). Both items are the operator's: `kipu note 77cf83a1285a` names them for the shell's verdicts plan. No verdict written here.
- The bump note: `kipu note 99f2fe62c62f` saying that after the publish `MediaProvider` takes `imageComponent={NextImage}` (`next/image` imported in `SiteProvider.tsx`, a client module, so the component crosses no server boundary) or every ui `Image` renders a plain `<img>` on one URL (the mdx and media slice `bc0407533650`'s Outcome and the ui `CHANGELOG.md` Unreleased entry), and that `cloudinaryName` may stay. The note supersedes the mdx and media slice's clause (4) on the bump plan, which assumed the site renders no ui `Image`.
- Interfaces: produces the mounted context; the ui `Image` (`type: 'cloudinary' | 'local'`, `sizes` object) and `Video` (`src`, `posterSrc`, `title`, `sizes`, `css`) are then renderable from any component.
- Verify first: `grep -rn MediaProvider app` prints nothing; `node_modules/@villagekit/ui/dist/components/media/context.js` throws when `cloudinaryName` is null. Next's `images.loaderFile` (`6c566c2715e0`) applies to a `next/image` without a `loader` prop; the ui `Image` passes its own Cloudinary loader for `type="cloudinary"` only (`dist/components/media/Image.js:65-72`), so a `type="local"` image falls through to the site's loader and needs `unoptimized`, the design carousel slice's concern.
- Docs: none; CLAUDE.md's Structure names the shared components under `app/_components/` already.
- Not this slice: any consumer (the four slices blocked by this one); the size hooks' `full` name, which the sibling restores (`252edab16c7a`, `upstream`) and the consumers write around as the record's Log says.

## Seams under test

None pure; the proof is a rendered image and video URL.

## Done when

- `grep -c '<MediaProvider cloudinaryName={CLOUDINARY_NAME}>' app/_components/SiteProvider.tsx` prints 1
- A throwaway route under `app/` (not committed, removed by path) renders `<Image type="cloudinary" src="v1/gridkit.nz/douglas-fir-forest_etzvle" alt="probe" width={5120} height={3840} sizes={{ base: 'md' }} />` and `<Video src="gridkit.nz/gridkit-coffee-table-website_bqmjpv" posterSrc="gridkit.nz/gridkit-coffee-table-website_gyr39u" title="probe" sizes={{ base: '356px', md: '622px' }} />` from `@villagekit/ui` on `pnpm dev` at 200, every `res.cloudinary.com/villagekit/` URL in its HTML answering 200; the Outcome quotes the URLs
- `/`, `/stories` and a story page serve 200 with no new console error, and `pnpm audit:pages --routes <a file naming / and /stories>` shows no change against a capture of the same routes taken before the edit (no consumer yet)
- The shell item is filed `open` and supersedes `0efe45924dbe`, which is `open` with its note; the note on `77cf83a1285a` and the bump note are written; checked after the filing, before the commit
- `timeout 900 just check` is green

## Outcome

## Log
