import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  LinkButton,
  List,
  SimpleGrid,
  Span,
  Stack,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import type { ReactNode } from 'react'
import { BiHappyHeartEyes } from 'react-icons/bi'
import { FaSeedling, FaShoppingBag } from 'react-icons/fa'
import { GiHandSaw } from 'react-icons/gi'
import { TfiPencilAlt, TfiThought } from 'react-icons/tfi'

import { ImageCarousel, type ImageCarouselProps } from './_components/ImageCarousel'
import { StoryCard } from './_components/StoryCard'
import { Testimonial } from './_components/Testimonial'
import {
  LandingColumn,
  LandingPhoto,
  LandingRow,
  LandingSection,
  LandingVideo,
  TypingDesignSection,
} from './_components/landing'
import { getDesignIndex } from './_lib/designs'
import { getAllStories } from './_lib/stories'

export const metadata: Metadata = {
  title: { absolute: 'Grid Beam' },
}

// Hero carousel — Cloudinary public IDs under `gridbeam.xyz/home/...`
// (cloud `villagekit`). Masters live in the `villagekit/media` repo at
// `media/gridbeam.xyz/home/`; sync via `pnpm sync-media` from that repo.
const HERO_SLIDES: ImageCarouselProps['slides'] = [
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
]

export default async function HomePage() {
  const designs = await getDesignIndex()
  const designsWithImages = designs.filter((design) => design.image !== null)

  const featuredStories = getAllStories()
    .filter((story) => story.metadata.category === 'guide')
    .slice(0, 3)

  return (
    <>
      {/* 0. Hero — headline + image carousel, then 3 testimonials below. */}
      <LandingSection index={0}>
        <VStack gap={{ base: 12, lg: 16 }} w="full">
          {/* Hero uses plain `Stack` (text-then-image at base) rather than
              `LandingRow` (image-then-text at base). The brand promise should
              be the first thing a mobile reader sees. */}
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            alignItems="center"
            gap={{ base: 8, lg: 16 }}
            w="full"
          >
            <LandingColumn>
              <Heading as="h1" size={{ base: '4xl', md: '5xl' }} lineHeight="1.05">
                Anyone can be a maker.
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.55">
                Start building custom furniture,{' '}
                <Span color="primary.500" fontWeight="bold">
                  no experience needed
                </Span>
                . Eco-friendly, adaptable, and fun for the whole family.
              </Text>
              <LinkButton as={NextLink} href="/suppliers" size="lg">
                Buy a Grid Beam
              </LinkButton>
            </LandingColumn>

            <Box flex="1" w="full">
              <ImageCarousel
                ariaLabel="Showcase of things made with grid beam"
                sizes={{ base: '100%', md: ['1500px', 2] }}
                slides={HERO_SLIDES}
                priority
                autoPlayEnabled
              />
            </Box>
          </Stack>

          <Stack
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: 6, lg: 10 }}
            w="full"
            alignItems="stretch"
          >
            <Testimonial
              quote="Grid Beam is an awesome way to make furniture fit around your life. Want to expand your family? Just add more beams! The kits are super fun, versatile and easy to use ❤"
              name="Rhona"
            />
            <Testimonial
              quote={
                <>
                  Building this way is so fun. Given that it's modular, if you wanted something
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

      {/* 1. Typing-effect "Build a [design]" with cycling design carousel. */}
      <TypingDesignSection index={1} designs={designsWithImages} />

      {/* 2. One simple part + the coffee-table assembly video. */}
      <LandingSection index={2}>
        <LandingRow sectionIndex={2}>
          <LandingColumn>
            <Heading as="h2" size="2xl">
              One modular kit, unlimited creations
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.55">
              Grid beam uses a 40mm grid to make building easy for beginners. Everything just fits
              together using only simple tools. Cut to size with a hand saw, connect beams and
              panels with fasteners and a hex key.
            </Text>
            <LinkButton as={NextLink} href="/about" variant="secondary" size="lg">
              Learn more
            </LinkButton>
          </LandingColumn>

          <Box flex="1" w="full">
            <LandingVideo
              src="gridkit.nz/gridkit-coffee-table-website_bqmjpv"
              posterSrc="gridkit.nz/gridkit-coffee-table-website_gyr39u"
              title="Assembling and disassembling a coffee table"
              width={2276}
              height={1280}
            />
          </Box>
        </LandingRow>
      </LandingSection>

      {/* 3. How to get started — 6-step icon list. */}
      <LandingSection index={3}>
        <Container maxW="3xl">
          <VStack gap="8" alignItems="stretch">
            <Heading as="h2" size="2xl" alignSelf="center">
              How to get started
            </Heading>

            <List.Root variant="plain" gap="6" fontSize={{ base: 'md', md: 'lg' }}>
              <Step icon={TfiThought}>
                Browse designs from{' '}
                <Link as={NextLink} variant="paragraph" href="/designs">
                  our catalog
                </Link>
                , or imagine your own
              </Step>
              <Step icon={TfiPencilAlt}>
                See how many beams, panels, and other components you need
              </Step>
              <Step icon={FaShoppingBag}>
                Find a{' '}
                <Link as={NextLink} variant="paragraph" href="/suppliers">
                  supplier
                </Link>
                , or make your own.
              </Step>
              <Step icon={GiHandSaw}>Cut your beams and panels to size</Step>
              <Step icon={BiHappyHeartEyes}>Have fun assembling your design</Step>
              <Step icon={FaSeedling}>
                Share your creation{' '}
                <Link
                  variant="paragraph"
                  href="https://discuss.villagekit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  with the community!
                </Link>
              </Step>
            </List.Root>

            <Flex justifyContent="center" pt="2">
              <LinkButton as={NextLink} href="/suppliers" size="lg">
                Buy a Grid Beam
              </LinkButton>
            </Flex>
          </VStack>
        </Container>
      </LandingSection>

      {/* 4. Stories from the community. */}
      {featuredStories.length > 0 && (
        <LandingSection index={4}>
          <Title
            as="h2"
            description="Discover all things grid beam in our collection of guides, newsletters, and inspiration."
          >
            Our stories
          </Title>
          <SimpleGrid columns={{ base: 1, md: featuredStories.length === 2 ? 2 : 3 }} gap="10">
            {featuredStories.map((story) => (
              <StoryCard key={story.metadata.slug} metadata={story.metadata} />
            ))}
          </SimpleGrid>
          <Flex justifyContent="center" pt="2">
            <LinkButton as={NextLink} href="/stories" variant="secondary">
              See all stories
            </LinkButton>
          </Flex>
        </LandingSection>
      )}

      {/* 5. Sustainability — "A future without waste". */}
      <LandingSection index={5}>
        <LandingRow sectionIndex={5}>
          <LandingColumn>
            <Heading as="h2" size="2xl">
              A future without waste
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.55">
              Grid beam helps reduce waste by making everyday items reusable instead of disposable.
              Locally-sourced untreated wood, intended to be reused: grid beams are durable and made
              to be used again and again.
            </Text>
          </LandingColumn>

          <Box flex="1" w="full">
            <LandingPhoto
              src="v1/gridkit.nz/douglas-fir-forest_etzvle"
              alt="Forest of douglas fir trees"
              width={5120}
              height={3840}
            />
          </Box>
        </LandingRow>
      </LandingSection>

      {/* 6. A place to share ideas — community / forum. */}
      <LandingSection index={6}>
        <LandingRow sectionIndex={6}>
          <LandingColumn>
            <Heading as="h2" size="2xl">
              A place to share ideas
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.55">
              Grid beam is part of a{' '}
              <Link
                variant="paragraph"
                href="https://villagekit.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                wider vision
              </Link>{' '}
              for a more sustainable, creative future. So we're building a community space where
              everyone can share their creations, exchange ideas, and learn together to shape a
              brighter tomorrow.
            </Text>
            <LinkButton
              href="https://discuss.villagekit.com"
              variant="secondary"
              size="lg"
              isExternal
            >
              Join our community
            </LinkButton>
          </LandingColumn>

          <Box flex="1" w="full">
            <LandingPhoto
              src="v1/gridkit.nz/gridkit-camp-kitchen_jpwvy1"
              alt="A temporary camp kitchen constructed with grid beam"
              width={3872}
              height={2160}
            />
          </Box>
        </LandingRow>
      </LandingSection>
    </>
  )
}

interface StepProps {
  icon: React.ComponentType
  children: ReactNode
}

function Step(props: StepProps) {
  const { icon: StepIcon, children } = props
  return (
    <List.Item display="flex" alignItems="flex-start" gap="3">
      <Icon color="primary.500" boxSize="6" mt="1" flexShrink={0}>
        <StepIcon />
      </Icon>
      <Span>{children}</Span>
    </List.Item>
  )
}
