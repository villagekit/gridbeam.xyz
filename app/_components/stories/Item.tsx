// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/stories/item.tsx
'use client'

import {
  Badge,
  Container,
  HStack,
  Heading,
  HoverCardContainer,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
  chakra,
} from '@villagekit/ui'
import { capitalize } from 'lodash-es'
import NextLink from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { StoryCategoryColors, type StoryMetadata } from '../../_lib/stories'

interface ItemProps {
  metadata: StoryMetadata
  showDate?: boolean
}

/**
 * One story card: the cover, the title and description, the category badge and, unless
 * `showDate` is off, the published date, the whole card one link named by the title.
 */
export function Item(props: ItemProps) {
  const { metadata, showDate = true } = props

  const { title, category, url, isExternal, image, publishedAt } = metadata

  const description = metadata.shortDescription || metadata.description

  return (
    <HoverCardContainer as="section" aria-label={title}>
      <LinkBox key={title}>
        <Container
          maxW="md"
          css={{
            _focusWithin: {
              '& .stories-item-image': {
                boxShadow: 'outlineLarge',
              },
            },
          }}
        >
          <Image
            {...image}
            className="stories-item-image"
            sizes={{ base: 'md' }}
            css={{
              aspectRatio: '4 / 3',
              borderRadius: 'xl',
              boxShadow: 'md',
              marginBottom: 4,
              objectFit: 'cover',
              width: '100%',
            }}
          />

          <HStack
            alignItems="flex-start"
            justifyContent="space-between"
            gap="4"
            css={{ paddingX: 4 }}
          >
            <VStack alignItems="flex-start">
              <Heading size="md">{title}</Heading>

              {description != null && (
                <Text variant="tertiary">{description.replace(/\.$/, '')}</Text>
              )}
            </VStack>

            <VStack alignItems="flex-end">
              <Badge
                css={{
                  backgroundColor: `${StoryCategoryColors[category]}.100`,
                  fontSize: 'sm',
                  fontWeight: 'normal',
                }}
              >
                {capitalize(category)}
              </Badge>

              {showDate && (
                <Text fontSize="sm" variant="tertiary" css={{ marginLeft: 2 }}>
                  {publishedAt.toLocaleDateString('en-NZ', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              )}

              {isExternal && (
                <Icon as={FaExternalLinkAlt} css={{ color: 'gray.300' }} boxSize="4" />
              )}
            </VStack>
          </HStack>

          {isExternal ? (
            <LinkOverlay asChild>
              {/* biome-ignore lint/a11y/useAnchorContent: the overlay is named by its aria-label, the way legacy's empty LinkOverlay was */}
              <chakra.a href={url} target="_blank" rel="noopener noreferrer" aria-label={title} />
            </LinkOverlay>
          ) : (
            <LinkOverlay as={NextLink} href={`/stories${url}`} aria-label={title} />
          )}
        </Container>
      </LinkBox>
    </HoverCardContainer>
  )
}
