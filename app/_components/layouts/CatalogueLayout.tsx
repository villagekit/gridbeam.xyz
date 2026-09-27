// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/layouts/catalogue.tsx
'use client'

import { Box, useBreakpointValue } from '@villagekit/ui'
import type React from 'react'

type CatalogueLayoutProps = React.PropsWithChildren<{}>

/** The margins around both designs pages: 32px above at base and 64px from `md`, 32px each side from `md`. */
export function CatalogueLayout(props: CatalogueLayoutProps) {
  const { children } = props

  const marginTop = useBreakpointValue<number>({ base: 8, md: 16 })
  const marginX = useBreakpointValue<number>({ base: 0, md: 8 })

  return <Box css={{ marginTop, marginX }}>{children}</Box>
}
