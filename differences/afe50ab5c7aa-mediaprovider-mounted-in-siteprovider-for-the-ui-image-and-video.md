---
title: MediaProvider mounted in SiteProvider for the ui Image and Video
status: open
route: shell
axis: code
kind: added
supersedes: 0efe45924dbe
---
## Legacy

`packages/ui-media/src/image.tsx:211-222` and `packages/ui-media/src/video.tsx:73-76` at `fce357d`: `getCloudinaryUrl` and `getCloudinaryVideoUrls` build every URL on the constant `https://res.cloudinary.com/villagekit`; no context, and `apps/gridkit/pages/_app.tsx:45-104` nests `ChakraProvider`, `DefaultSeo`, `Head`, the two `QueryClientProvider`s and the query-param provider with no media provider.

## Current

`app/_components/SiteProvider.tsx:22-24`: `<MediaProvider cloudinaryName={CLOUDINARY_NAME}>` mounted once, inside `ChakraProvider` and around `QueryParamProvider`, the name from `app/_lib/cloudinary.ts:11`. The reason: the published `@villagekit/ui@1.2.0` media components read the cloud name from context and throw without it (`node_modules/@villagekit/ui/dist/components/media/context.js`, `assertCloudinaryName`, read by `Video.js:12` and `Image.js:64-67`), and the home's re-ports of the story card, the image carousel and the design carousel render the ui `Image` and `Video`, legacy's `ui-media` components. The `images.loaderFile` loader (`app/_lib/cloudinary-loader.ts`) keeps reading the constant, since it runs outside the React tree, so the site now carries both mechanisms. At the bump the provider also takes `imageComponent={NextImage}` (the bump plan's note).

## Verdict

## Log
