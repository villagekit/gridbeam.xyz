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

export default function HomePage() {
  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          gap={{ base: 8, md: 12 }}
        >
          <VStack alignItems="flex-start" gap="6" flex="1">
            <Heading as="h1" size={{ base: '3xl', md: '4xl' }} lineHeight="1.1">
              Modular furniture, on a{' '}
              <Span color="primary.500" fontWeight="bold">
                40&nbsp;mm grid
              </Span>
              .
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} variant="secondary">
              Grid beam is a family of construction systems built around perforated beams that bolt
              together with a hex key. This site catalogues designs, cutting tools, and suppliers
              for the 40&nbsp;mm flavour.
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

          <Flex
            aria-hidden
            flex="1"
            w="full"
            h={{ base: '220px', md: '360px' }}
            borderRadius="xl"
            borderWidth="2px"
            borderStyle="dashed"
            borderColor="accentB.300"
            bg="accentB.50"
            alignItems="center"
            justifyContent="center"
          >
            <Text variant="tertiary" fontSize="sm">
              Hero image — coming soon
            </Text>
          </Flex>
        </Stack>
      </Section>

      <Section index={1} maxW="6xl" colorPalette="accentA">
        <Title as="h2" description="One simple part. Endless configurations.">
          What is grid beam?
        </Title>
        <Container maxW="3xl">
          <VStack alignItems="flex-start" gap="6">
            <Text fontSize="lg">
              Grid beam is a beam — wood, aluminium, or steel — drilled with regularly-spaced holes.
              Bolt the beams together with a hex key and you have a reconfigurable structure:
              shelves, desks, beds, kitchens, market stalls.
            </Text>
            <Text fontSize="lg">
              The idea has been around for decades, in many sizes. The original Phelps grid beam
              used a 1½″ profile on a four-bolt cycle. This site focuses on the 40&nbsp;mm flavour —
              that's what the design catalogue, the cutting planner, and the listed suppliers are
              sized for.
            </Text>
            <LinkButton href="/about" variant="secondary">
              Read the full intro
            </LinkButton>
          </VStack>
        </Container>
      </Section>

      <Section index={2} maxW="6xl">
        <Title
          as="h2"
          description="Beds, desks, shelves, kitchen islands, market stalls — anything that fits a 40 mm grid."
        >
          Things people build with it
        </Title>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          {['A bed', 'A desk', 'A shelf'].map((label) => (
            <Flex
              key={label}
              h="220px"
              borderRadius="lg"
              borderWidth="2px"
              borderStyle="dashed"
              borderColor="gray.200"
              bg="gray.50"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant="tertiary" fontSize="sm">
                {label}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
        <Flex justifyContent="center" pt="2">
          <LinkButton href="/designs">See the catalogue</LinkButton>
        </Flex>
      </Section>

      <Section index={3} maxW="6xl" colorPalette="accentA">
        <Title as="h2" description="Plan your build, then find the parts.">
          For makers
        </Title>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
          <MakerCard
            title="Cutting planner"
            body="Work out how many beams to buy and how to cut them with the least off-cut waste."
            cta="Open the planner"
            href="/tools/cutting-planner"
          />
          <MakerCard
            title="Suppliers"
            body="Already-cut grid beams and panels from suppliers around the world. We don't sell parts; we link to people who do."
            cta="Find suppliers"
            href="/suppliers"
          />
        </SimpleGrid>
      </Section>

      <Section index={4} maxW="6xl">
        <Title
          as="h2"
          description="Build logs, field reports, and explainers from people doing it."
        >
          Stories from the community
        </Title>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          {['Story one', 'Story two', 'Story three'].map((label) => (
            <Flex
              key={label}
              h="180px"
              borderRadius="lg"
              borderWidth="2px"
              borderStyle="dashed"
              borderColor="gray.200"
              bg="gray.50"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant="tertiary" fontSize="sm">
                {label}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
        <Flex justifyContent="center" pt="2">
          <LinkButton href="/stories" variant="secondary">
            Read all stories
          </LinkButton>
        </Flex>
      </Section>

      <Section index={5} maxW="6xl" colorPalette="accentA">
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

interface MakerCardProps {
  title: string
  body: string
  cta: string
  href: string
}

function MakerCard(props: MakerCardProps) {
  const { title, body, cta, href } = props
  return (
    <Box
      p="6"
      bg="white"
      borderRadius="lg"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="accentA.300"
    >
      <VStack alignItems="flex-start" gap="4">
        <Heading as="h3" size="lg">
          {title}
        </Heading>
        <Text>{body}</Text>
        <LinkButton href={href} variant="secondary">
          {cta}
        </LinkButton>
      </VStack>
    </Box>
  )
}
