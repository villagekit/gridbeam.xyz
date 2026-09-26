import { Container, Section, Title } from '@villagekit/ui'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { getAllStories } from '../_lib/stories'
import { StoriesBrowser } from './StoriesBrowser'
import { StoriesStatic } from './StoriesStatic'

export const metadata: Metadata = {
  title: 'Stories',
}

export default function StoriesPage() {
  // The page is a server component; the metadata-only `Story[]` (no MDX
  // Content references) crosses the RSC boundary into the client browser.
  const stories = getAllStories().map((story) => ({ metadata: story.metadata }))

  return (
    <>
      <Section index={0} maxW="5xl">
        <Title
          as="h1"
          description="Discover all things grid beam in our collection of articles, guides, and newsletters."
        >
          Stories
        </Title>

        <Container maxW="4xl">
          {/* Suspense boundary needed because StoriesBrowser uses
              `useSearchParams`. The static grid acts as the SSR fallback so
              search engines and no-JS readers see the full unfiltered list
              before client-side hydration. */}
          <Suspense fallback={<StoriesStatic stories={stories} />}>
            <StoriesBrowser stories={stories} />
          </Suspense>
        </Container>
      </Section>
    </>
  )
}
