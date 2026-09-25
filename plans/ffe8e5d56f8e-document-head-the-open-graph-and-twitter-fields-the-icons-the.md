---
title: "Document head: the Open Graph and twitter fields, the icons, the title and description verdicts"
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
tags:
  - "worker:opus"
priority: medium
---
`app/layout.tsx` carries what legacy's `DefaultSeo` and `<Head>` carried, translated to the Metadata export: the record-shelf Open Graph image with its legacy alt text, the coffee-table video, `en_NZ`, `@villagekit`, the white theme colour, the Cloudinary preconnect, the manifest and favicon set, and the title template and description the grilling settled; the route pages stop overriding the layout's Open Graph and twitter objects. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`, `ca677697`, `6b7a97f83ce7`.

## Work

- Legacy source: `../node-modules/apps/gridkit/pages/_app.tsx:35-87` at `fce357d`; current: `app/layout.tsx:25-59`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`, every route's `metadata` export.
- Title and description: `title: { default: 'Grid Beam', template: 'Grid Beam: %s' }` (the verdict of `1c8b7461acb1`) and the description verbatim from the verdict of `1906af99b588`; `applicationName` follows the default title. Add a note on each of the two items that this slice shipped its verdict.
- `openGraph`: `type: 'website'`, `siteName: 'Grid Beam'` (legacy `Grid Kit`, rule 1), `locale: 'en_NZ'` (`6b2180907f41`), `url: 'https://gridbeam.xyz'`, `images: [{ url, alt }]` (`f8cca746b4bb`, `b416d67c2519`): the record-shelf photo as `gridbeam.xyz/home/record-shelf-hero` (the same picture re-hosted, `6b7a97f83ce7`) under legacy's transform `c_limit,dpr_auto,f_auto,fl_alpha,fl_lossy,w_1280,q_75`, the alt verbatim from the item's Legacy section; `videos: [{ url, alt }]` (`aa71d706e02b`): the coffee-table video under legacy's transform `c_limit,dpr_auto,f_auto,w_1280,q_40`, at the re-hosted id the home page's `LandingVideo` reads (`app/page.tsx`) if it is the same video, else the legacy `v1/gridkit.nz/gridkit-coffee-table-website_bqmjpv`, the alt `Assembly of a coffee table made from grid beam`, rule 1 applied literally to legacy's `made from Grid Kit` (the rule's own words: `Grid Kit` to `grid beam` in body copy); no verdict quotes this string, so add a note on `aa71d706e02b` quoting both and the operator may re-judge the form at the gate. No bare `openGraph.title` (`6f32ac5d51cb`): Next fills `og:title` from the resolved page title, template applied. `twitter: { card: 'summary_large_image', site: '@villagekit' }` (`f3c3cb53867d`). Delete `app/opengraph-image.tsx` and `app/twitter-image.tsx`.
- Route overrides (`f46533a8ae54`): remove the `openGraph` and `twitter` objects from every route's `metadata` (`grep -rl "openGraph" app`), leaving `title` and `description`; a route's own description is its record's item and stays as it is here. `app/page.tsx`'s `title: { absolute }` stays: it is the home route's item `dd19bb3343bf`.
- `viewport.themeColor: '#ffffff'` (`367294d78796`); a `<link rel="preconnect" href="https://res.cloudinary.com">` in the layout's head (`74dd586c4f9c`); `suppressHydrationWarning` off `<html>` (`1ef32a0328e6`, confirmed unneeded in its Log).
- Icons (`54c8b8390c40`): copy `favicon-32x32.png`, `favicon-16x16.png`, `favicon.ico`, `safari-pinned-tab.svg`, `browserconfig.xml`, `site.webmanifest` and every file those two reference (`android-chrome-192x192.png`, `android-chrome-512x512.png`, the five `mstile-*.png`) from `../node-modules/apps/gridkit/public/` into `public/`, byte-identical except the manifest's `start_url` `https://gridbeam.xyz` (rule 1); link them through `metadata.icons` (the two PNG sizes, `other` for `rel="mask-icon"` with `color: '#5bbad5'`), `metadata.manifest`, and `msapplication-TileColor: '#da532c'` through `metadata.other`. `app/icon.svg` and `app/apple-icon.png` stay as the conventions serve them.
- Closes `f8cca746b4bb`, `b416d67c2519`, `aa71d706e02b`, `6b2180907f41`, `6f32ac5d51cb`, `f46533a8ae54`, `f3c3cb53867d`, `367294d78796`, `74dd586c4f9c`, `54c8b8390c40`, `1ef32a0328e6`.
- Verify first: at the pinned Next, `openGraph.title` falls back to the page's resolved title when absent (`node_modules/next/dist/lib/metadata/resolve-metadata.js`); `metadata.icons.other` renders `rel="mask-icon"` with its `color` (read the rendered head, not the docs).
- Not this slice: per-route descriptions (each route's record); the 404 title and description (sanctioned as they are).

## Seams under test

None pure.

## Done when

- `curl -s localhost:3000/ | grep -o '<meta[^>]*>'` shows `og:type` `website`, `og:site_name` `Grid Beam`, `og:locale` `en_NZ`, `og:image` the record-shelf URL with `og:image:alt` the legacy alt, `og:video` with its alt, `twitter:card` `summary_large_image`, `twitter:site` `@villagekit`, `theme-color` `#ffffff`, and the description of `1906af99b588`'s verdict; the same fields on `/about` and on `/designs/shelf-tower`, whose `og:title` is `Grid Beam: Shelf Tower` and whose `<title>` is the same
- `curl -s localhost:3000/ | grep -c 'rel="preconnect" href="https://res.cloudinary.com"'` prints 1; the head links `site.webmanifest`, both PNG favicons and the mask icon; `curl -sI` on `/site.webmanifest`, `/favicon-32x32.png`, `/android-chrome-192x192.png` and `/mstile-150x150.png` is 200
- `grep -rl "openGraph\|twitter:" app | grep -v '^app/layout.tsx$'` is empty; `ls app/opengraph-image.tsx` fails
- `grep -c suppressHydrationWarning app/layout.tsx` prints 0
- the eleven items are `fixed`, checked after the fixes
- `timeout 900 just check` is green

## Outcome

## Log
