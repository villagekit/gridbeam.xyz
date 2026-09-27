// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/catalogue/results-count.tsx
'use client'

import { Text, useIsMobile } from '@villagekit/ui'

import { useCatalogueContext } from '@/app/_lib/context/catalogue'

/** The count of the items the filter, the search and the sort leave. */
export function ResultsCount() {
  const { items } = useCatalogueContext()

  const isMobile = useIsMobile()

  return (
    <Text
      variant="tertiary"
      css={{
        ...(isMobile ? { textAlign: 'center', width: '100%' } : {}),
      }}
    >
      {items.length} {items.length > 1 ? 'results' : 'result'} found
    </Text>
  )
}
