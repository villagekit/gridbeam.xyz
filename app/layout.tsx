import { MainLayout, NavContextProvider, Provider, SkipNavLink } from '@villagekit/ui'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { SiteBrand } from './_components/SiteBrand'
import { SiteFooter } from './_components/SiteFooter'
import { SiteHeaderAction } from './_components/SiteHeaderAction'
import { navItems } from './_lib/nav'

const description =
  'An open-source educational site about grid beam — modular construction made simple.'

export const metadata: Metadata = {
  metadataBase: new URL('https://gridbeam.xyz'),
  title: {
    default: 'gridbeam.xyz',
    template: '%s — gridbeam.xyz',
  },
  description,
  applicationName: 'gridbeam.xyz',
  openGraph: {
    type: 'website',
    siteName: 'gridbeam.xyz',
    title: 'gridbeam.xyz',
    description,
    url: 'https://gridbeam.xyz',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'gridbeam.xyz',
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fffbea',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
      </body>
    </html>
  )
}
