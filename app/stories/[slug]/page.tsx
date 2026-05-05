import {
  Box,
  Container,
  ContentMainTocLayout,
  HStack,
  Main,
  SkipNavContent,
  Span,
  Text,
  Title,
} from '@villagekit/ui'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StoryImage } from '../../_components/story/StoryImage'
import { getCloudinaryUrl } from '../../_lib/cloudinary'
import { STORY_SLUGS, getStory } from '../../_lib/stories'

interface StoryPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return STORY_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const story = getStory(slug)
  if (story == null) return {}

  const { title, description, shortDescription, image, publishedAt, updatedAt, category } =
    story.metadata
  const summary = shortDescription ?? description
  const ogImageUrl = getCloudinaryUrl({ src: image.src, width: 1200 })

  return {
    title,
    description: summary,
    openGraph: {
      type: 'article',
      title,
      description: summary,
      url: `https://gridbeam.xyz/stories/${slug}`,
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      tags: [category],
      images: [{ url: ogImageUrl, alt: image.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      images: [ogImageUrl],
    },
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const story = getStory(slug)
  // External stories don't carry MDX `Content` — but they're also not in
  // `STORY_SLUGS`, so they never reach this route. The `Content == null`
  // guard exists for TypeScript; in practice it's unreachable.
  if (story == null || story.Content == null) notFound()

  const { metadata, Content } = story
  const { title, description, image, showImageInStory, publishedAt, originallyPublishedOn } =
    metadata

  const formattedPublished = new Date(publishedAt).toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <ContentMainTocLayout>
      <Main>
        <SkipNavContent />

        <Container maxW="3xl" pt={{ base: 4, md: 8 }}>
          <Box as="article">
            <Title as="h1" hasAnchor description={description}>
              {title}
            </Title>

            <HStack justifyContent="center" gap="2" mb="4">
              <Text fontSize="sm" variant="tertiary">
                {formattedPublished}
              </Text>
              {originallyPublishedOn != null && (
                <Text fontSize="sm" variant="tertiary">
                  · originally on <Span fontWeight="medium">{originallyPublishedOn}</Span>
                </Text>
              )}
            </HStack>

            {showImageInStory && (
              <Box mt="4" mb="12" maxW="3xl" mx="auto">
                <StoryImage
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  priority
                />
              </Box>
            )}
          </Box>
        </Container>

        <Content />
      </Main>
    </ContentMainTocLayout>
  )
}
