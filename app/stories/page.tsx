import { Container, Main, Section, SkipNavContent, Title } from '@villagekit/ui'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { getAllStories } from '../_lib/stories'
import { StoriesBrowser } from './StoriesBrowser'
import { StoriesStatic } from './StoriesStatic'

const pageTitle = 'Stories'
const pageDescription =
  'Build logs, field reports, and explainers from people working with grid beam.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://gridbeam.xyz/stories',
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
}

export default function StoriesPage() {
  // The page is a server component; the metadata-only `Story[]` (no MDX
  // Content references) crosses the RSC boundary into the client browser.
  const stories = getAllStories().map((story) => ({ metadata: story.metadata }))

  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="5xl">
        <Title as="h1" description={pageDescription}>
          {pageTitle}
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
    </Main>
  )
}
