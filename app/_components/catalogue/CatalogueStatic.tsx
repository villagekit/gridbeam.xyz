import { SimpleGrid, VStack } from '@villagekit/ui'

import { ItemCard } from './ItemCard'
import type { CatalogueItemData } from './types'

// Server-renderable initial paint of the catalogue. Used as the
// `<Suspense>` fallback for the interactive `Catalogue` (which calls
// `useSearchParams()` and forces dynamic rendering of its subtree).
//
// Renders the same A-Z grid the client would on first mount with no URL
// state, so users see real cards immediately and search engines can crawl
// item links from the static HTML.
export interface CatalogueStaticProps {
  items: ReadonlyArray<CatalogueItemData>
  basePath: string
}

export function CatalogueStatic(props: CatalogueStaticProps) {
  const { items, basePath } = props
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name))
  return (
    <VStack alignItems="stretch" gap="6" w="full">
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={{ base: 6, md: 8 }}>
        {sorted.map((item) => (
          <ItemCard key={item.id} item={item} basePath={basePath} />
        ))}
      </SimpleGrid>
    </VStack>
  )
}
