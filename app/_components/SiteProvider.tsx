'use client'

import { ChakraProvider, MediaProvider } from '@villagekit/ui'
import type { ReactNode } from 'react'
import { QueryParamProvider } from 'use-query-params'

import { CLOUDINARY_NAME } from '@/app/_lib/cloudinary'
import system from '@/app/theme'

import { NextQueryParamAdapter } from './NextQueryParamAdapter'

/**
 * Mounts Chakra with the site's system and the query-param provider inside it, the way legacy's
 * `_app.tsx` nested them, and the ui media context between them, which the ui `Image` and `Video`
 * read for the Cloudinary cloud name (legacy's `ui-media` hard-coded it, so `_app.tsx` mounted no
 * such provider). A client component because the system holds functions and cannot cross the
 * server boundary as a prop.
 */
export function SiteProvider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <MediaProvider cloudinaryName={CLOUDINARY_NAME}>
        <QueryParamProvider adapter={NextQueryParamAdapter}>{children}</QueryParamProvider>
      </MediaProvider>
    </ChakraProvider>
  )
}
