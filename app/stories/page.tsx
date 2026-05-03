import { Container, Main, Section, SimpleGrid, SkipNavContent, Title } from '@villagekit/ui'
import type { Metadata } from 'next'

import { StoryCard } from '../_components/StoryCard'
import { getAllStories } from '../_lib/stories'

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
  const stories = getAllStories()

  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="5xl">
        <Title as="h1" description={pageDescription}>
          {pageTitle}
        </Title>

        <Container maxW="4xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 10, md: 12 }}>
            {stories.map(({ metadata: storyMetadata }) => (
              <StoryCard key={storyMetadata.slug} metadata={storyMetadata} />
            ))}
          </SimpleGrid>
        </Container>
      </Section>
    </Main>
  )
}
