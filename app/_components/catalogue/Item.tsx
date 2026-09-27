// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/catalogue/item.tsx
'use client'

import {
  Heading,
  HoverCard,
  HoverCardContainer,
  Image,
  LinkBox,
  LinkOverlay,
  VStack,
} from '@villagekit/ui'
import NextLink from 'next/link'

import { OverlayMessage } from '@/app/_components/OverlayMessage'
import { type CatalogueItem, useCatalogueContext } from '@/app/_lib/context/catalogue'

interface ItemProps<FilterOptionType> {
  item: CatalogueItem<FilterOptionType>
}

/** One catalogue card: the item's picture in a hover card, its name as the heading, and an overlay link to the item's page. */
export function Item<FilterOptionType>(props: ItemProps<FilterOptionType>) {
  const {
    item: { id, name, image, active },
  } = props

  const { listPath, itemImageMode, inactiveItemMessage } = useCatalogueContext()

  const opacity = active ? 1 : 0.4

  return (
    <HoverCardContainer as="section" aria-labelledby={`catalogue-item-${id}-label`}>
      <LinkBox>
        <VStack
          direction="column"
          gap="4"
          css={{
            _focusWithin: {
              // Chakra v3's css reads a bare class key as a property, not a selector, so the key carries `&`
              '& .catalogue-item-image': {
                boxShadow: 'outlineLarge',
              },
            },
          }}
        >
          <OverlayMessage showMessage={!active} message={inactiveItemMessage}>
            {itemImageMode === 'hover-card' ? (
              <HoverCard>
                <Image
                  // a local ui Image falls through to the site's Cloudinary loaderFile (difference 2a0840f8087b)
                  unoptimized
                  {...image}
                  sizes={{
                    // legacy's `full`, until the ui publish restores the name (difference fd48a49f469f)
                    base: ['100%', 2],
                    lg: ['8xl', 3],
                  }}
                  css={{
                    aspectRatio: '4 / 3',
                    objectFit: 'contain',
                    opacity,
                    paddingY: 2,
                    width: '100%',
                  }}
                />
              </HoverCard>
            ) : (
              <Image
                unoptimized
                {...image}
                sizes={{
                  base: ['100%', 2],
                  lg: ['8xl', 3],
                }}
                alt={name}
                className="catalogue-item-image"
                css={{
                  aspectRatio: '4 / 3',
                  borderRadius: 'xl',
                  boxShadow: 'md',
                  objectFit: 'cover',
                  opacity,
                  width: '100%',
                }}
              />
            )}
          </OverlayMessage>

          <Heading
            id={`catalogue-item-${id}-label`}
            size="md"
            css={{ opacity, textAlign: 'center', textTransform: 'capitalize' }}
          >
            {name}
          </Heading>

          <LinkOverlay
            as={NextLink}
            href={`/${listPath}/${id}`}
            aria-labelledby={`catalogue-item-${id}-label`}
          />
        </VStack>
      </LinkBox>
    </HoverCardContainer>
  )
}
