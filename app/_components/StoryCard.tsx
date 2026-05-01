import { Badge, Box, HStack, Heading, LinkBox, LinkOverlay, Text, VStack } from '@villagekit/ui'

import type { StoryMetadata } from '../_lib/stories'
import { StoryImage } from './story/StoryImage'

interface StoryCardProps {
  metadata: StoryMetadata
}

const categoryLabels: Record<StoryMetadata['category'], string> = {
  guide: 'Guide',
  newsletter: 'Newsletter',
}

const categoryPalettes: Record<StoryMetadata['category'], string> = {
  guide: 'accentB',
  newsletter: 'accentA',
}

export function StoryCard(props: StoryCardProps) {
  const { metadata } = props
  const { slug, title, description, shortDescription, category, image, publishedAt } = metadata

  const summary = shortDescription ?? description
  const palette = categoryPalettes[category]

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <LinkBox
      as="article"
      borderRadius="xl"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={`${palette}.300`}
      bg="white"
      overflow="hidden"
      transition="border-color 0.15s ease"
      _hover={{ borderColor: `${palette}.500` }}
      _focusWithin={{ borderColor: `${palette}.500`, boxShadow: 'outline' }}
    >
      <Box bg={`${palette}.50`}>
        <StoryImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          aspectRatio="standard"
        />
      </Box>

      <VStack alignItems="flex-start" gap="3" p="5">
        <HStack justifyContent="space-between" width="100%">
          <Badge colorPalette={palette} variant="subtle">
            {categoryLabels[category]}
          </Badge>
          <Text fontSize="xs" variant="tertiary">
            {formattedDate}
          </Text>
        </HStack>

        <Heading as="h3" size="md" lineHeight="1.2">
          <LinkOverlay href={`/stories/${slug}`}>{title}</LinkOverlay>
        </Heading>

        {summary != null && (
          <Text variant="secondary" fontSize="sm" lineHeight="1.5">
            {summary}
          </Text>
        )}
      </VStack>
    </LinkBox>
  )
}
