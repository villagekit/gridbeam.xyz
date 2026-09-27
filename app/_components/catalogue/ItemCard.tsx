'use client'

import {
  Box,
  Heading,
  HoverCard,
  HoverCardContainer,
  LinkBox,
  LinkOverlay,
  VStack,
} from '@villagekit/ui'
import NextImage from 'next/image'
import NextLink from 'next/link'

import { type CatalogueItem, useCatalogueContext } from '@/app/_lib/context/catalogue'

export interface ItemCardProps {
  item: CatalogueItem<string>
  basePath: string
}

// the card until the card re-port (e22f84fa6e1a) writes legacy's Item on the ui Image
export function ItemCard(props: ItemCardProps) {
  const { item, basePath } = props
  const { id, name, image, active } = item
  const { inactiveItemMessage: inactiveMessage } = useCatalogueContext()
  const opacity = active ? 1 : 0.4

  return (
    <HoverCardContainer as="section" aria-labelledby={`catalogue-item-${id}-label`}>
      <LinkBox>
        <VStack alignItems="stretch" gap="4">
          <HoverCard position="relative" aspectRatio="4 / 3">
            {image != null ? (
              <NextImage
                src={image.src}
                alt={name}
                fill
                unoptimized
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                style={{ objectFit: 'contain', opacity, padding: '0.5rem' }}
              />
            ) : (
              <Box
                w="full"
                h="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="gray.400"
                fontSize="sm"
              >
                No preview
              </Box>
            )}
            {!active && inactiveMessage != null && (
              <Box
                position="absolute"
                inset="0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="blackAlpha.500"
                color="white"
                fontWeight="bold"
                textAlign="center"
                p="4"
              >
                {inactiveMessage}
              </Box>
            )}
          </HoverCard>

          <Heading
            id={`catalogue-item-${id}-label`}
            as="h2"
            size="md"
            textAlign="center"
            textTransform="capitalize"
            opacity={opacity}
          >
            <LinkOverlay
              as={NextLink}
              href={`/${basePath}/${id}`}
              aria-labelledby={`catalogue-item-${id}-label`}
            >
              {name}
            </LinkOverlay>
          </Heading>
        </VStack>
      </LinkBox>
    </HoverCardContainer>
  )
}
