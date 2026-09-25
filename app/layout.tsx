import { MainLayout, NavContextProvider, Provider, SkipNavLink } from '@villagekit/ui'
import type { Metadata, Viewport } from 'next'
import { Bitter, Fredoka } from 'next/font/google'
import type { ReactNode } from 'react'

import { EmotionRegistry } from './_components/EmotionRegistry'
import { SiteBrand } from './_components/SiteBrand'
import { SiteFooter } from './_components/SiteFooter'
import { SiteHeaderAction } from './_components/SiteHeaderAction'
import { navItems } from './_lib/nav'
import { siteOpenGraph } from './_lib/open-graph'

const bodyFont = Bitter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const headingFont = Fredoka({
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
  variable: '--font-heading',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gridbeam.xyz'),
  title: {
    default: 'Grid Beam',
    template: 'Grid Beam: %s',
  },
  description:
    'Anyone can be a maker with Grid Beam: life-size building blocks. Eco-friendly, adaptable, and fun for the whole family.',
  applicationName: 'Grid Beam',
  openGraph: siteOpenGraph,
  twitter: {
    card: 'summary_large_image',
    site: '@villagekit',
  },
  robots: {
    index: true,
    follow: true,
  },
  // favicon assets generated with https://realfavicongenerator.net/
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#da532c',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <head>
        {/* https://web.dev/uses-rel-preconnect/ */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body>
        <EmotionRegistry>
          <Provider>
            <SkipNavLink>Skip to main content</SkipNavLink>
            <NavContextProvider items={navItems}>
              <MainLayout
                HeaderBrand={SiteBrand}
                HeaderAction={SiteHeaderAction}
                Footer={SiteFooter}
                headerColorPalette="accentB"
              >
                {children}
              </MainLayout>
            </NavContextProvider>
          </Provider>
        </EmotionRegistry>
      </body>
    </html>
  )
}
