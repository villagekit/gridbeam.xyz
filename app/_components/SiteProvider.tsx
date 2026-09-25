'use client'

import { ChakraProvider } from '@villagekit/ui'
import type { ReactNode } from 'react'
import { QueryParamProvider } from 'use-query-params'

import system from '@/app/theme'

import { NextQueryParamAdapter } from './NextQueryParamAdapter'

/**
 * Mounts Chakra with the site's system and the query-param provider inside it, the way legacy's
 * `_app.tsx` nested them. A client component because the system holds functions and cannot cross
 * the server boundary as a prop.
 */
export function SiteProvider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <QueryParamProvider adapter={NextQueryParamAdapter}>{children}</QueryParamProvider>
    </ChakraProvider>
  )
}
