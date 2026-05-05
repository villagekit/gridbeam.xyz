import {
  Badge,
  Box,
  HStack,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@villagekit/ui'
import NextLink from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import type { StoryMetadata } from '../_lib/stories'
import { StoryImage } from './story/StoryImage'

interface StoryCardProps {
  metadata: StoryMetadata
}

const categoryLabels: Record<StoryMetadata['category'], string> = {
  guide: 'Guide',
  newsletter: 'Newsletter',
  inspiration: 'Inspiration',
}

const categoryPalettes: Record<StoryMetadata['category'], string> = {
  guide: 'accentB',
  newsletter: 'accentA',
  inspiration: 'purple',
}

export function StoryCard(props: StoryCardProps) {
  const { metadata } = props
  const { slug, title, description, shortDescription, category, image, publishedAt, external } =
    metadata

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
      aria-label={title}
      css={{
        transitionDuration: 'fast',
        transitionProperty: 'transform',
        _hover: { cursor: 'pointer', transform: 'scale(1.02)' },
        _focusWithin: {
          '[data-story-image]': { boxShadow: 'outlineLarge' },
        },
      }}
    >
      <VStack alignItems="stretch" gap="4">
        <Box
          data-story-image
          borderRadius="xl"
          transitionDuration="fast"
          transitionProperty="box-shadow"
        >
          <StoryImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            aspectRatio="standard"
          />
        </Box>

        <HStack alignItems="flex-start" justifyContent="space-between" gap="4" px="2">
          <VStack alignItems="flex-start" gap="1" flex="1" minW="0">
            <Heading as="h2" size="md" lineHeight="1.2">
              {external != null ? (
                <LinkOverlay href={external.url} target="_blank" rel="noopener noreferrer">
                  {title}
                </LinkOverlay>
              ) : (
                <LinkOverlay as={NextLink} href={`/stories/${slug}`}>
                  {title}
                </LinkOverlay>
              )}
            </Heading>
            {summary != null && (
              <Text variant="tertiary" fontSize="sm" lineHeight="1.5">
                {summary.replace(/\.$/, '')}
              </Text>
            )}
          </VStack>

          <VStack alignItems="flex-end" gap="1" flexShrink={0}>
            <Badge colorPalette={palette} variant="subtle">
              {categoryLabels[category]}
            </Badge>
            <Text fontSize="xs" variant="tertiary" whiteSpace="nowrap">
              {formattedDate}
            </Text>
            {external != null && (
              <Icon color="gray.400" boxSize="3" mt="1" aria-hidden>
                <FaExternalLinkAlt />
              </Icon>
            )}
          </VStack>
        </HStack>
      </VStack>
    </LinkBox>
  )
}
