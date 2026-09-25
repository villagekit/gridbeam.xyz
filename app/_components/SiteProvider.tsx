'use client'

import { ChakraProvider } from '@villagekit/ui'
import type { ReactNode } from 'react'

import system from '@/app/theme'

/**
 * Mounts Chakra with the site's system, the way legacy's `_app.tsx` mounted its theme. A client
 * component because the system holds functions and cannot cross the server boundary as a prop.
 */
export function SiteProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>
}
