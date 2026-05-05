// Server-rendered fallback for the `/stories` index. Rendered while
// `StoriesBrowser` (the interactive filter version) is suspended on the
// client — search engines, RSS readers, and no-JS users see the unfiltered
// grid immediately rather than an empty Suspense fallback.

import { SimpleGrid } from '@villagekit/ui'

import { StoryCard } from '../_components/StoryCard'
import type { StoryMetadata } from '../_lib/stories'

interface StoriesStaticProps {
  stories: ReadonlyArray<{ metadata: StoryMetadata }>
}

export function StoriesStatic(props: StoriesStaticProps) {
  const { stories } = props
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 10, md: 12 }}>
      {stories.map((story) => (
        <StoryCard key={story.metadata.slug} metadata={story.metadata} />
      ))}
    </SimpleGrid>
  )
}
