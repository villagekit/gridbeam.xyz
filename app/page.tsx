import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  LinkButton,
  Main,
  Section,
  SimpleGrid,
  SkipNavContent,
  Span,
  Stack,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'
import NextImage from 'next/image'
import NextLink from 'next/link'

import { StoryCard } from './_components/StoryCard'
import { designImages } from './_lib/design-images'
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

const featuredDesigns: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'shelving-unit', label: 'Shelving unit' },
  { id: 'makers-desk', label: "Maker's desk" },
  { id: 'bed-frame', label: 'Bed frame' },
  { id: 'coffee-table', label: 'Coffee table' },
]

export default function HomePage() {
  const featuredStories = getAllStories()
    .filter((story) => story.metadata.category === 'guide')
    .slice(0, 3)

  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          alignItems="center"
          gap={{ base: 10, lg: 16 }}
        >
          <VStack alignItems="flex-start" gap="6" flex="1">
            <Heading as="h1" size={{ base: '4xl', md: '5xl' }} lineHeight="1.05">
              Modular furniture, on a{' '}
              <Span color="primary.500">40&nbsp;mm grid</Span>.
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.55">
              Grid beam is a family of construction systems built from perforated beams that bolt
              together with a hex&nbsp;key. Open, modular, and re-cuttable — find designs, cutting
              tools, and suppliers for the 40&nbsp;mm flavour.
            </Text>
            <HStack gap="3" flexWrap="wrap">
              <LinkButton href="/designs" size="lg">
                Browse designs
              </LinkButton>
              <LinkButton href="/about" variant="secondary" size="lg">
                What is grid beam?
              </LinkButton>
            </HStack>
          </VStack>

          <Box flex="1" w="full">
            <HeroPhoto />
          </Box>
        </Stack>
      </Section>

      <Section index={1} maxW="7xl" colorPalette="gray">
        <Title
          as="h2"
          description="Beds, desks, shelves, kitchen islands, market stalls — the catalogue is open and growing."
        >
          Things you can build
        </Title>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 4, md: 8 }}>
          {featuredDesigns.map((design) => (
            <DesignThumb key={design.id} id={design.id} label={design.label} />
          ))}
        </SimpleGrid>
        <Flex justifyContent="center" pt="2">
          <LinkButton href="/designs" variant="secondary">
            See the full catalogue
          </LinkButton>
        </Flex>
      </Section>

      <Section index={2} maxW="6xl">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          alignItems="center"
          gap={{ base: 8, lg: 16 }}
        >
          <Box flex="1" w="full">
            <CloudPhoto
              src="v1/gridkit.nz/grid-example_vezsvx"
              alt="A 40 mm grid overlaid on a grid beam and a grid panel, showing how the holes line up."
              width={1333}
              height={750}
            />
          </Box>
          <VStack alignItems="flex-start" gap="5" flex="1">
            <Heading as="h2" size="2xl">
              One simple part. Endless configurations.
            </Heading>
            <Text fontSize="lg">
              Every beam is a <Span fontWeight="bold">40 × 40 mm</Span> profile drilled with{' '}
              <Span fontWeight="bold">8 mm holes every 40 mm</Span>. Bolt three beams into a
              tri-joint, add panels, and you have a desk, a shelf, or a bed. Take it apart, cut a
              beam shorter, and it's something else.
            </Text>
            <LinkButton href="/about" variant="secondary">
              Read the full intro
            </LinkButton>
          </VStack>
        </Stack>
      </Section>

      <Section index={3} maxW="6xl" colorPalette="gray">
        <Title as="h2" description="Plan a build, find the parts, learn from the community.">
          For makers
        </Title>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          <MakerCard
            title="Cutting planner"
            body="Work out how many full-length beams to buy, and how to cut them with the least off-cut waste."
            cta="Open the planner"
            href="/tools/cutting-planner"
          />
          <MakerCard
            title="Suppliers"
            body="Already-cut grid beams and panels from suppliers around the world. We don't sell parts; we link to people who do."
            cta="Find suppliers"
            href="/suppliers"
          />
          <MakerCard
            title="Tools & resources"
            body="Everything else built into the site — engine source, FAQ, how-tos, community links."
            cta="See all tools"
            href="/tools-and-resources"
          />
        </SimpleGrid>
      </Section>

      {featuredStories.length > 0 && (
        <Section index={4} maxW="6xl">
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
        </Section>
      )}

      <Section index={5} maxW="6xl" colorPalette="gray">
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
      </Section>
    </Main>
  )
}

function HeroPhoto() {
  return (
    <Box
      position="relative"
      w="full"
      aspectRatio="4 / 3"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
    >
      <NextImage
        src="v1/gridkit.nz/made-with-grid-kit/record-shelf_x6zscs"
        alt="A wooden grid-beam shelving unit holding a record collection, books, and audio gear in a plant-filled living room."
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        style={{ objectFit: 'cover' }}
      />
    </Box>
  )
}

interface CloudPhotoProps {
  src: string
  alt: string
  width: number
  height: number
}

function CloudPhoto(props: CloudPhotoProps) {
  const { src, alt, width, height } = props
  return (
    <Box
      position="relative"
      w="full"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      aspectRatio={`${width} / ${height}`}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        style={{ objectFit: 'cover' }}
      />
    </Box>
  )
}

interface DesignThumbProps {
  id: string
  label: string
}

function DesignThumb(props: DesignThumbProps) {
  const { id, label } = props
  const image = designImages[id]
  return (
    <NextLink href={`/designs/${id}`} aria-label={label} style={{ textDecoration: 'none' }}>
      <VStack
        alignItems="stretch"
        gap="3"
        css={{
          transitionDuration: 'fast',
          transitionProperty: 'transform',
          _hover: { transform: 'translateY(-2px)' },
        }}
      >
        <Box
          position="relative"
          w="full"
          aspectRatio="1 / 1"
          bg="white"
          borderRadius="lg"
          overflow="hidden"
        >
          {image != null && (
            <NextImage
              src={image}
              alt=""
              fill
              unoptimized
              sizes="(min-width: 768px) 22vw, 45vw"
              style={{ objectFit: 'contain', padding: '0.5rem' }}
            />
          )}
        </Box>
        <Text textAlign="center" fontWeight="medium">
          {label}
        </Text>
      </VStack>
    </NextLink>
  )
}

interface MakerCardProps {
  title: string
  body: string
  cta: string
  href: string
}

function MakerCard(props: MakerCardProps) {
  const { title, body, cta, href } = props
  return (
    <VStack
      as="article"
      alignItems="flex-start"
      gap="4"
      p="6"
      bg="white"
      borderRadius="xl"
      boxShadow="sm"
    >
      <Heading as="h3" size="lg">
        {title}
      </Heading>
      <Text flex="1">{body}</Text>
      <LinkButton href={href} variant="secondary" size="sm">
        {cta}
      </LinkButton>
    </VStack>
  )
}
