// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/stories.tsx
'use client'

import { Box, Container, Title, VStack, useBreakpointValue } from '@villagekit/ui'

import { Filters, List } from '../_components/stories'
import { StoriesContextProvider } from '../_lib/context/stories'

export function StoriesPage() {
  const spacing = useBreakpointValue<number>({ base: 8, md: 16 })

  return (
    <StoriesContextProvider>
      <Title description="Discover all things grid beam in our collection of articles, guides, and newsletters.">
        Stories
      </Title>

      <Container maxW="8xl">
        {/* Here we manually create a menubar in the a11y tree, using explicit ids of the menu elements. */}
        <Box id="stories-menu" role="menubar" aria-owns="stories-menu-filters" />

        <VStack gap={spacing}>
          <Filters />

          <List />
        </VStack>
      </Container>
    </StoriesContextProvider>
  )
}
