import { Container, Section, Title } from '@villagekit/ui'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { allStories } from '../_lib/stories'
import { StoriesBrowser } from './StoriesBrowser'
import { StoriesStatic } from './StoriesStatic'

export const metadata: Metadata = {
  title: 'Stories',
}

export default function StoriesPage() {
  // Sorted newest first here until the page re-port sorts in the context, as legacy did.
  const stories = [...allStories]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .map((metadata) => ({ metadata }))

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
