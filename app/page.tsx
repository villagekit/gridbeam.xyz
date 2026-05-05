import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Link,
  LinkButton,
  LinkCard,
  List,
  Main,
  SimpleGrid,
  SkipNavContent,
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
import { FaCut, FaSeedling, FaShoppingBag, FaTools } from 'react-icons/fa'
import { GiHandSaw } from 'react-icons/gi'
import { TfiPencilAlt, TfiThought } from 'react-icons/tfi'

import { StoryCard } from './_components/StoryCard'
import {
  ImageCarousel,
  LandingColumn,
  LandingPhoto,
  LandingRow,
  LandingSection,
  LandingVideo,
  Testimonial,
  TypingDesignSection,
} from './_components/landing'
import { getDesignIndex } from './_lib/designs'
import { getAllStories } from './_lib/stories'

const heroTitle = 'gridbeam.xyz — modular furniture from a 40 mm grid'
const heroDescription =
  'A 40 mm grid system for building furniture — open, modular, and reusable. Find designs, cutting tools, and suppliers.'

export const metadata: Metadata = {
  title: { absolute: heroTitle },
  description: heroDescription,
  openGraph: {
    title: heroTitle,
    description: heroDescription,
    url: 'https://gridbeam.xyz',
  },
  twitter: {
    title: heroTitle,
    description: heroDescription,
  },
}

// Hero carousel — Cloudinary public IDs at the legacy `v1/gridkit.nz/...`
// paths (cloud `villagekit`, same cloud as the new site). Re-hosting these
// to `gridbeam.xyz/home/<descriptor>` is tracked as a follow-up; the path
// rewrite lands once the masters are in `villagekit-media` and synced.
const HERO_SLIDES = [
  {
    src: 'gridbeam.xyz/home/record-shelf-hero',
    alt: 'A wooden grid-beam shelving unit holding a record collection, books, and audio gear in a plant-filled living room.',
    width: 5250,
    height: 3500,
  },
  {
    src: 'v1/gridkit.nz/made-with-grid-kit/standing-desk_cbzvbv',
    alt: 'A compact, adjustable wooden standing desk with a computer monitor, keyboard, and mouse on the tabletop. The desk has caster wheels and is positioned in front of a bay window.',
    width: 1600,
    height: 1200,
  },
  {
    src: 'v1/gridkit.nz/made-with-grid-kit/cat-castle_flivqh',
    alt: 'A modular wooden bookshelf with adjustable sections, holding books, board games, and decorative items. A cat is perched on the highest shelf.',
    width: 4864,
    height: 3648,
  },
  {
    src: 'v1/gridkit.nz/made-with-grid-kit/kitchen-island_ilq6z5',
    alt: 'A wooden rolling cart with a smooth tabletop and two shelves underneath, holding a variety of metal pots and pans, set in a kitchen with a windowed wall.',
    width: 3072,
    height: 2304,
  },
] as const

export default async function HomePage() {
  const designs = await getDesignIndex()
  const designsWithImages = designs.filter((design) => design.image !== null)

  const featuredStories = getAllStories()
    .filter((story) => story.metadata.category === 'guide')
    .slice(0, 3)

  return (
    <Main>
      <SkipNavContent />

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
                Start building your own furniture,{' '}
                <Span color="primary.500" fontWeight="bold">
                  no experience needed
                </Span>
                . Eco-friendly, adaptable, and fun for the whole family.
              </Text>
              <HStack gap="3" flexWrap="wrap">
                <LinkButton href="/designs" size="lg">
                  Browse designs
                </LinkButton>
                <LinkButton href="/about" variant="secondary" size="lg">
                  What is grid beam?
                </LinkButton>
              </HStack>
            </LandingColumn>

            <Box flex="1" w="full">
              <ImageCarousel
                ariaLabel="Things made with grid beam"
                slides={HERO_SLIDES}
                autoPlay
                priority
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
              quote="Grid Beam is an awesome way to make furniture fit around your life. Want to expand your family? Just add more beams! The kits are super fun, versatile, and easy to use ❤"
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
              One simple part. Endless configurations.
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.55">
              Grid beam uses a <Span fontWeight="bold">40&nbsp;mm grid</Span> to make building easy
              for beginners. Cut to size with a hand saw, connect beams and panels with hex-key
              fasteners, and you have a desk, a shelf, or a coffee table — take it apart and it's
              something else.
            </Text>
            <LinkButton href="/about" variant="secondary" size="lg">
              Read the full intro
            </LinkButton>
          </LandingColumn>

          <Box flex="1" w="full">
            <LandingVideo
              src="gridkit.nz/gridkit-coffee-table-website_bqmjpv"
              posterSrc="gridkit.nz/gridkit-coffee-table-website_gyr39u"
              title="Assembling and disassembling a grid-beam coffee table"
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
                  the catalogue
                </Link>
                , or imagine your own.
              </Step>
              <Step icon={TfiPencilAlt}>
                Use the{' '}
                <Link as={NextLink} variant="paragraph" href="/tools/cutting-planner">
                  cutting planner
                </Link>{' '}
                to work out how many beams and panels you need.
              </Step>
              <Step icon={FaShoppingBag}>
                Find a{' '}
                <Link as={NextLink} variant="paragraph" href="/suppliers">
                  supplier
                </Link>
                , or make your own.
              </Step>
              <Step icon={GiHandSaw}>Cut your beams and panels to size.</Step>
              <Step icon={BiHappyHeartEyes}>Have fun assembling your design.</Step>
              <Step icon={FaSeedling}>
                Share your creation{' '}
                <Link
                  variant="paragraph"
                  href="https://discuss.villagekit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  with the community
                </Link>
                .
              </Step>
            </List.Root>

            <Flex justifyContent="center" pt="2">
              <LinkButton href="/designs" size="lg">
                Browse designs
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
            description="Build logs, field reports, and explainers from people doing it."
          >
            Stories from the community
          </Title>
          <SimpleGrid columns={{ base: 1, md: featuredStories.length === 2 ? 2 : 3 }} gap="10">
            {featuredStories.map((story) => (
              <StoryCard key={story.metadata.slug} metadata={story.metadata} />
            ))}
          </SimpleGrid>
          <Flex justifyContent="center" pt="2">
            <LinkButton href="/stories" variant="secondary">
              Read all stories
            </LinkButton>
          </Flex>
        </LandingSection>
      )}

      {/* 5. Sustainability — "A future without waste". */}
      <LandingSection index={5}>
        <LandingRow sectionIndex={5}>
          <LandingColumn>
            <Heading as="h2" size="2xl">
              A future without waste.
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.55">
              Grid beam helps reduce waste by making everyday items reusable instead of disposable.{' '}
              <Span fontWeight="bold">Locally-sourced untreated wood, intended to be reused</Span> —
              durable, non-toxic, and ready for the next thing you build.
            </Text>
          </LandingColumn>

          <Box flex="1" w="full">
            <LandingPhoto
              src="v1/gridkit.nz/douglas-fir-forest_etzvle"
              alt="A forest of Douglas fir trees with sun streaming through the canopy."
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
              A place to share ideas.
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
              for a more sustainable, creative future. There's a community space where everyone can
              share their creations, exchange ideas, and learn together.
            </Text>
            <LinkButton
              href="https://discuss.villagekit.com"
              variant="secondary"
              size="lg"
              isExternal
            >
              Join the community
            </LinkButton>
          </LandingColumn>

          <Box flex="1" w="full">
            <LandingPhoto
              src="v1/gridkit.nz/gridkit-camp-kitchen_jpwvy1"
              alt="A temporary outdoor camp kitchen built from grid beams, set up with cooking gear under a sun shade."
              width={3872}
              height={2160}
            />
          </Box>
        </LandingRow>
      </LandingSection>

      {/* 7. For makers — toolbox shortcuts. */}
      <LandingSection index={7}>
        <Title as="h2" description="Plan a build, find the parts, learn from the community.">
          For makers
        </Title>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          <LinkCard
            title="Cutting planner"
            icon={<FaCut />}
            description="Work out how many full-length beams to buy, and how to cut them with the least off-cut waste."
            href="/tools/cutting-planner"
          />
          <LinkCard
            title="Suppliers"
            icon={<FaShoppingBag />}
            description="Already-cut grid beams and panels from suppliers around the world. We don't sell parts; we link to people who do."
            href="/suppliers"
          />
          <LinkCard
            title="Tools & resources"
            icon={<FaTools />}
            description="Everything else built into the site — engine source, FAQ, how-tos, community links."
            href="/tools-and-resources"
          />
        </SimpleGrid>
      </LandingSection>

      {/* 8. Open and free to remix. */}
      <LandingSection index={8}>
        <Title
          as="h2"
          description="The site, the components, the engine, the catalogue — all open-source under EUPL-1.2."
        >
          Open and free to remix
        </Title>
        <Container maxW="3xl">
          <VStack gap="4" alignItems="center">
            <Text fontSize="lg" textAlign="center">
              Built in the spirit of grid beam itself: standard parts, public specifications, anyone
              can fork it.
            </Text>
            <HStack gap="3" flexWrap="wrap" justifyContent="center">
              <LinkButton href="https://github.com/villagekit" isExternal>
                GitHub
              </LinkButton>
              <LinkButton href="/subscribe" variant="secondary">
                Subscribe to the newsletter
              </LinkButton>
            </HStack>
          </VStack>
        </Container>
      </LandingSection>
    </Main>
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
