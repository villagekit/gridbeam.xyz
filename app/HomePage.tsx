// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/index.tsx
'use client'

import {
  Box,
  type ButtonProps,
  Column,
  type ColumnProps,
  Flex,
  Heading,
  Icon,
  Image,
  type ImageProps,
  Link,
  LinkButton,
  List,
  Row,
  type RowProps,
  Section,
  type SectionProps,
  Span,
  Stack,
  type StackProps,
  type SystemStyleObject,
  Text,
  type TextProps,
  VStack,
  Video,
  type VideoProps,
  VisuallyHidden,
  useBreakpointValue,
  useIsMobile,
  useSectionIndex,
} from '@villagekit/ui'
import { useInView } from 'motion/react'
import type { StaticImageData } from 'next/image'
import NextLink from 'next/link'
import pluralize from 'pluralize-esm'
import { forwardRef, useRef } from 'react'
import { BiHappyHeartEyes } from 'react-icons/bi'
import { BsFillBox2HeartFill } from 'react-icons/bs'
import { FaSeedling } from 'react-icons/fa'
import { GiHandSaw } from 'react-icons/gi'
import { TfiPencilAlt, TfiThought } from 'react-icons/tfi'

import { DesignCarousel } from './_components/DesignCarousel'
import { ImageCarousel } from './_components/ImageCarousel'
import { Testimonial } from './_components/Testimonial'
import { Item as StoryItem } from './_components/stories/Item'
import type { DesignIndexEntry } from './_lib/designs'
import type { StoryMetadata } from './_lib/stories'
import { useDesignTypingEffect } from './_lib/useDesignTypingEffect'

interface HomePageProps {
  designs: ReadonlyArray<DesignIndexEntry>
  whatsAGridUnit: StoryMetadata
  buildingWithGridKit: StoryMetadata
}

export function HomePage(props: HomePageProps) {
  const { designs, whatsAGridUnit, buildingWithGridKit } = props

  const isMobile = useIsMobile()

  const isWideScreen = useBreakpointValue<boolean>(
    {
      base: false,
      lg: true,
    },
    { fallback: 'lg' },
  ) as boolean

  const buttonSize = isMobile ? 'md' : 'lg'
  const textSize = isWideScreen ? 'xl' : 'lg'

  return (
    <VStack gap={isMobile ? 8 : 12}>
      <LandingSection index={0}>
        <VStack gap="16" css={{ width: '100%' }}>
          <Stack
            direction={isWideScreen ? 'row' : 'column'}
            alignItems="center"
            gap="12"
            css={{ flex: 1 }}
          >
            <LandingColumn index={0}>
              <VStack alignItems="flex-start">
                <Heading size="2xl">Anyone can be a maker.</Heading>
              </VStack>

              <Text fontSize={textSize}>
                Start building custom furniture,{' '}
                <Span color="primary.400" fontWeight="bold">
                  no experience needed
                </Span>
                .
              </Text>
              <Text fontSize={textSize}>
                Eco-friendly, adaptable, and fun for the whole family.
              </Text>

              <LinkButton as={NextLink} href="/suppliers" size={buttonSize}>
                Buy a Grid Beam
              </LinkButton>
            </LandingColumn>

            <Flex justifyContent="flex-end" css={{ flex: 1 }}>
              <ImageCarousel
                ariaLabel="Showcase of things made with grid beam"
                sizes={{ base: '100%', md: ['1500px', 2] }}
                slides={[
                  {
                    type: 'cloudinary',
                    src: 'gridbeam.xyz/home/record-shelf-hero',
                    alt: 'A wooden shelving unit filled with vinyl records, books, and audio equipment. A speaker is positioned on the top left shelf. A small chair with carved woodwork sits to the left of the shelving unit, and a rotating wire rack holding more records stands on the right. The room has light teal walls and a decorative hanging artwork of a butterfly on the top left.',
                    priority: true,
                    width: 5250,
                    height: 3500,
                  },
                  {
                    type: 'cloudinary',
                    src: 'v1/gridkit.nz/made-with-grid-kit/standing-desk_cbzvbv',
                    alt: 'A compact, adjustable wooden standing desk with a computer monitor, keyboard, and mouse on the tabletop. The desk has a unique, angular base with caster wheels. A desktop computer tower is situated underneath, and the desk is positioned in front of a bay window with a view of a residential neighborhood outside.',
                    width: 1600,
                    height: 1200,
                  },
                  {
                    type: 'cloudinary',
                    src: 'v1/gridkit.nz/made-with-grid-kit/cat-castle_flivqh',
                    alt: 'A modular wooden bookshelf with adjustable sections, holding books, board games, and decorative items like a spider plant in a pot and a framed poster at the top. A cat is perched on the highest shelf. The bookshelf is placed on a carpeted floor, with a coat rack to the left and a tall potted plant to the right.',
                    width: 4864,
                    height: 3648,
                  },
                  {
                    type: 'cloudinary',
                    src: 'v1/gridkit.nz/made-with-grid-kit/kitchen-island_ilq6z5',
                    alt: 'A wooden rolling cart with a smooth tabletop and two shelves underneath. The shelves store a variety of metal pots, pans, and lids. The cart has caster wheels and is set on a hardwood floor, with a windowed kitchen wall in the background.',
                    width: 3072,
                    height: 2304,
                  },
                ]}
                priority
                autoPlayEnabled
              />
            </Flex>
          </Stack>

          <Stack
            direction={isWideScreen ? 'row' : 'column'}
            gap={isWideScreen ? '16' : '8'}
            css={{ width: '100%' }}
          >
            <Testimonial
              quote="Grid Beam is an awesome way to make furniture fit around your life. Want to expand your family? Just add more beams! The kits are super fun, versatile and easy to use ❤"
              name="Rhona"
            />
            <Testimonial
              quote={
                <>
                  Building this way is so fun. Given that it&apos;s modular, if you wanted something
                  lower, you can just saw the legs down. With a traditional bed I would probably
                  never do that.{' '}
                  <Span color="gray.600" fontStyle="normal">
                    EMPOWERING.
                  </Span>
                </>
              }
              name="Mix"
            />
            <Testimonial
              quote="Grid Beam is like Ikea, but if you could refactor your furniture once you tire of their existing configuration."
              name="Alexander"
            />
          </Stack>
        </VStack>
      </LandingSection>

      <TypingDesignSection
        index={1}
        textSize={textSize}
        buttonSize={buttonSize}
        designs={designs}
      />

      <LandingSection index={2}>
        <LandingColumn index={0}>
          <Heading>One modular kit, unlimited creations</Heading>

          <Text fontSize={textSize}>
            Grid beam uses a 40mm grid to make building easy for beginners. Everything just fits
            together using only simple tools. Cut to size with a hand saw, connect beams and panels
            with fasteners and a hex key.
          </Text>

          <LinkButton as={NextLink} href="/about" variant="secondary" size={buttonSize}>
            Learn more
          </LinkButton>
        </LandingColumn>

        <Box css={{ flex: 1 }}>
          <LandingVideo
            src="gridkit.nz/gridkit-coffee-table-website_bqmjpv"
            title="Assembling and disassembling a coffee table"
            posterSrc="gridkit.nz/gridkit-coffee-table-website_gyr39u"
            sizes={{
              // original video is 2276 x 1280
              base: '356px', // 200px height
              md: '622px', // 350px height
            }}
          />
        </Box>
      </LandingSection>

      <LandingSection index={3}>
        <LandingColumn index={0}>
          <Heading css={{ alignSelf: 'center' }}>How to get started</Heading>

          <List.Root
            gap="8"
            listStyleType="none"
            css={{
              alignSelf: 'center',
              fontSize: textSize,
              width: { base: 'full', lg: '2xl' },
            }}
          >
            <List.Item>
              <List.Indicator asChild>
                <Icon as={TfiThought} />
              </List.Indicator>
              Browse designs from{' '}
              <Link as={NextLink} href="/designs">
                our catalog
              </Link>
              , or imagine your own
            </List.Item>
            <List.Item>
              <List.Indicator asChild>
                <Icon as={TfiPencilAlt} />
              </List.Indicator>
              See how many beams, panels, and other components you need
            </List.Item>
            <List.Item>
              <List.Indicator asChild>
                <Icon as={BsFillBox2HeartFill} />
              </List.Indicator>
              Find a{' '}
              <Link as={NextLink} href="/suppliers">
                supplier
              </Link>
              , or make your own.
            </List.Item>
            <List.Item>
              <List.Indicator asChild>
                <Icon as={GiHandSaw} />
              </List.Indicator>
              Cut your beams and panels to size
            </List.Item>
            <List.Item>
              <List.Indicator asChild>
                <Icon as={BiHappyHeartEyes} />
              </List.Indicator>
              Have fun assembling your design
            </List.Item>
            <List.Item>
              <List.Indicator asChild>
                <Icon as={FaSeedling} />
              </List.Indicator>
              Share your creation{' '}
              <Link href="https://discuss.villagekit.com" target="_blank" rel="noopener noreferrer">
                with the community!
              </Link>
            </List.Item>
          </List.Root>

          <LinkButton
            as={NextLink}
            href="/suppliers"
            size={buttonSize}
            css={{ alignSelf: 'center' }}
          >
            Buy a Grid Beam
          </LinkButton>
        </LandingColumn>
      </LandingSection>

      <LandingSection index={4}>
        <LandingColumn index={0}>
          <Heading css={{ alignSelf: 'center' }}>Our stories</Heading>

          <Text fontSize={textSize} css={{ alignSelf: 'center' }}>
            Discover all things grid beam in our collection of guides, newsletters, and inspiration.
          </Text>

          <Stack
            justifyContent="center"
            direction={isWideScreen ? 'row' : 'column'}
            gap={[4, null, 8]}
            css={{ width: '100%' }}
          >
            <StoryItem metadata={whatsAGridUnit} showDate={false} />
            <StoryItem metadata={buildingWithGridKit} showDate={false} />
          </Stack>

          <LinkButton
            as={NextLink}
            href="/stories"
            variant="secondary"
            size={buttonSize}
            css={{ alignSelf: 'center' }}
          >
            See all stories
          </LinkButton>
        </LandingColumn>
      </LandingSection>

      <LandingSection index={5}>
        <LandingColumn index={0}>
          <Heading>A future without waste</Heading>

          <Text fontSize={textSize}>
            Grid beam helps reduce waste by making everyday items reusable instead of disposable.
            Locally-sourced untreated wood, intended to be reused: grid beams are durable and made
            to be used again and again.
          </Text>
        </LandingColumn>

        <Box css={{ flex: 1 }}>
          <LandingImage
            type="cloudinary"
            src="v1/gridkit.nz/douglas-fir-forest_etzvle"
            alt="Forest of douglas fir trees"
            sizes={{ base: '100%', md: ['1500px', 2] }}
            width={5120}
            height={3840}
          />
        </Box>
      </LandingSection>

      <LandingSection index={6}>
        <LandingColumn index={0}>
          <Heading>A place to share ideas</Heading>

          <Text fontSize={textSize}>
            Grid beam is part of a{' '}
            <Link
              variant="paragraph"
              href="https://villagekit.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              wider vision
            </Link>{' '}
            for a more sustainable, creative future. So we&apos;re building a community space where
            everyone can share their creations, exchange ideas, and learn together to shape a
            brighter tomorrow.
          </Text>

          <LinkButton variant="secondary" href="https://discuss.villagekit.com" size={buttonSize}>
            Join our community
          </LinkButton>
        </LandingColumn>

        <Box css={{ flex: 1 }}>
          <LandingImage
            type="cloudinary"
            src="v1/gridkit.nz/gridkit-camp-kitchen_jpwvy1"
            alt="A temporary camp kitchen constructed with grid beam"
            sizes={{ base: '100%', md: ['1500px', 2] }}
            width={3872}
            height={2160}
          />
        </Box>
      </LandingSection>
    </VStack>
  )
}

interface TypingDesignSectionProps {
  designs: ReadonlyArray<DesignIndexEntry>
  index: number
  textSize: TextProps['fontSize']
  buttonSize: ButtonProps['size']
}

function TypingDesignSection(props: TypingDesignSectionProps) {
  const { designs, index, textSize, buttonSize } = props

  const typingDesignRef = useRef<HTMLDivElement>(null)
  const typingDesignIsInView = useInView(typingDesignRef)
  const [currentDesign, typingDesignLabel, nextDesign] = useDesignTypingEffect({
    designs,
    loop: true,
    pause: !typingDesignIsInView,
  })
  const currentDesignLastWord = currentDesign?.label.split(' ').at(-1)
  const currentDesignIsPlural =
    currentDesignLastWord != null ? pluralize.isPlural(currentDesignLastWord) : null

  return (
    <LandingSection index={index} ref={typingDesignRef}>
      <LandingColumn index={0}>
        <Heading>
          {/* NOTE (mw): With this, the screen reader will announce the name of the current design in the carousel. */}
          {currentDesign && (
            <VisuallyHidden aria-atomic="true" aria-live="polite">
              <>
                Build {currentDesignIsPlural ? '' : 'a '}
                {currentDesign.label}
              </>
            </VisuallyHidden>
          )}
          <Box as="span" aria-hidden>
            Build {currentDesignIsPlural ? '' : 'a '}
            <Span color="accentA.500">{typingDesignLabel}</Span>
          </Box>
        </Heading>

        <Text fontSize={textSize}>
          Imagine, build, and rebuild — grid beam evolves with your life. From practical furniture
          to fun family projects, our designs are simple to make and can fit any space.
        </Text>

        <LinkButton as={NextLink} href="/designs" variant="secondary" size={buttonSize}>
          Explore our design catalog
        </LinkButton>
      </LandingColumn>

      <Box css={{ flex: 1, overflow: 'hidden' }}>
        {currentDesign !== null && hasImage(currentDesign) && (
          <DesignCarousel
            design={currentDesign}
            sizes={{ base: '100%', md: ['1500px', 2] }}
            shouldMirror
          />
        )}
      </Box>
      {nextDesign !== null && nextDesign.image !== null && (
        // eagerly load the next design
        <Image
          type="local"
          priority
          unoptimized
          src={nextDesign.image}
          alt={nextDesign.label}
          sizes={{ base: '100%', md: ['1500px', 2] }}
          css={{ display: 'none' }}
        />
      )}
    </LandingSection>
  )
}

// The site's design index may lack a picture (272613135119, the designs
// record's); DesignCarousel takes a design that has one, as legacy's did.
function hasImage(
  design: DesignIndexEntry,
): design is DesignIndexEntry & { image: StaticImageData } {
  return design.image !== null
}

interface LandingSectionProps extends SectionProps {}

const LandingSection = forwardRef<HTMLDivElement, LandingSectionProps>(
  function LandingSection(props, ref) {
    const { index, children, ...sectionProps } = props

    const isEven = index % 2 === 0
    const colorPalette = isEven ? undefined : 'gray'

    return (
      <Section index={index} colorPalette={colorPalette} ref={ref} maxW="1500px" {...sectionProps}>
        <LandingRow index={0}>{children}</LandingRow>
      </Section>
    )
  },
)

interface LandingRowProps extends RowProps {}

function LandingRow(props: LandingRowProps) {
  const isMobile = useIsMobile()
  const isMediumScreen = useBreakpointValue<boolean>(
    {
      base: true,
      lg: false,
    },
    { fallback: 'lg' },
  ) as boolean
  const sectionIndex = useSectionIndex()

  const isEven = sectionIndex % 2 === 0
  const direction: StackProps['direction'] = isMediumScreen
    ? 'column-reverse'
    : isEven
      ? 'row'
      : 'row-reverse'

  return (
    <Row
      direction={direction}
      alignItems="center"
      gap={[8, null, 12]}
      {...props}
      css={[
        {
          paddingX: isMobile ? 2 : 16,
          paddingY: isMobile ? 8 : 16,
          width: '100%',
        },
        props.css,
      ]}
    />
  )
}

interface LandingColumnProps extends ColumnProps {}

function LandingColumn(props: LandingColumnProps) {
  return (
    <Column alignItems="flex-start" gap={[4, null, 8]} {...props} css={[{ flex: 1 }, props.css]} />
  )
}

const landingMediaCss = (isMobile: boolean): SystemStyleObject => ({
  borderRadius: 'xl',
  boxShadow: 'md',
  height: isMobile ? 200 : 350,
  objectFit: 'cover',
})

type LandingImageProps = ImageProps

function LandingImage(props: LandingImageProps) {
  const { css, ...restProps } = props

  const isMobile = useIsMobile()

  return <Image {...restProps} css={[landingMediaCss(isMobile), css]} />
}

type LandingVideoProps = VideoProps

function LandingVideo(props: LandingVideoProps) {
  const isMobile = useIsMobile()

  return <Video {...props} css={landingMediaCss(isMobile)} />
}
