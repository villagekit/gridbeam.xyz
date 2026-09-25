// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/_app.tsx
// The `openGraph` of legacy's `DefaultSeo`. next-seo merged a page's
// `openGraph` into the default tag by tag; Next replaces a layout's
// `openGraph` object whole, so a route that sets its own spreads this first.

import type { Metadata } from 'next'

// Next's `OGVideoDescriptor` has no `alt`, but it renders every key of a
// video descriptor as `og:video:<key>`, so `alt` still reaches the head as
// legacy's `og:video:alt`. Declared apart so the type check allows the key.
// Note(cc): the type no longer guards this key, so a Next upgrade re-checks
// that `og:video:alt` still renders.
const videos = [
  {
    alt: 'Assembly of a coffee table made from grid beam',
    url: 'https://res.cloudinary.com/villagekit/video/upload/c_limit,dpr_auto,f_auto,w_1280,q_40/v1/gridkit.nz/gridkit-coffee-table-website_bqmjpv',
  },
]

/** The site-wide Open Graph fields every route renders, as legacy's `DefaultSeo` set them. */
export const siteOpenGraph = {
  images: [
    {
      alt: 'A wooden shelving unit filled with vinyl records, books, and audio equipment. A speaker is positioned on the top left shelf. A small chair with carved woodwork sits to the left of the shelving unit, and a rotating wire rack holding more records stands on the right. The room has light teal walls and a decorative hanging artwork of a butterfly on the top left.',
      url: 'https://res.cloudinary.com/villagekit/image/upload/c_limit,dpr_auto,f_auto,fl_alpha,fl_lossy,w_1280,q_75/v1/gridbeam.xyz/home/record-shelf-hero',
    },
  ],
  locale: 'en_NZ',
  siteName: 'Grid Beam',
  type: 'website',
  url: 'https://gridbeam.xyz',
  videos,
} satisfies NonNullable<Metadata['openGraph']>
