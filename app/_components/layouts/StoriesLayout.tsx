// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/layouts/stories.tsx
import { Center, Title } from '@villagekit/ui'
import type { Metadata } from 'next'
import type React from 'react'

import { StoryImage } from '@/app/_components/story'
import { getCloudinaryUrl } from '@/app/_lib/cloudinary'
import { siteOpenGraph } from '@/app/_lib/open-graph'
import type { StoryMetadata } from '@/app/_lib/stories'

interface StoriesLayoutProps {
  metadata: StoryMetadata
  children?: React.ReactNode | Array<React.ReactNode>
}

/** The story page: legacy's `StoriesLayout` less its `MainLayout` and `NextSeo`, which the root layout and the page `metadata` carry. */
export function StoriesLayout(props: StoriesLayoutProps) {
  const { metadata, children } = props

  const { title, description, image, showImageInStory } = metadata

  return (
    <article>
      <Title description={description} hasAnchor>
        {title}
      </Title>

      {showImageInStory && (
        <Center css={{ marginBottom: 16 }}>
          <StoryImage {...image} priority />
        </Center>
      )}

      {children}
    </article>
  )
}

/** The story MDX default export: wraps the body in `StoriesLayout` with the story's data. */
export function withStoriesLayout(metadata: StoryMetadata) {
  return function wrapLayout({
    children,
  }: {
    children: React.ReactNode | Array<React.ReactNode>
  }) {
    return <StoriesLayout metadata={metadata}>{children}</StoriesLayout>
  }
}

/**
 * The page `metadata` a story exports, built from its data: legacy's `NextSeo` block
 * in the app router's form, the article Open Graph spread over the site's fields.
 */
export function getStoryPageMetadata(metadata: StoryMetadata): Metadata {
  const { title, description, shortDescription, category, image, publishedAt, updatedAt } = metadata

  return {
    title,
    description: shortDescription || description,
    openGraph: {
      ...siteOpenGraph,
      type: 'article',
      publishedTime: publishedAt.toISOString(),
      modifiedTime: updatedAt.toISOString(),
      tags: [category],
      images: [
        {
          alt: image.alt,
          type: 'image/jpeg',
          url: getCloudinaryUrl({ src: image.src as string, width: 1200 }),
        },
      ],
    },
  }
}
