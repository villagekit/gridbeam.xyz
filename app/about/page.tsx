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

const title = 'About grid beam'
const description =
  'Grid beam is a modular construction system: regularly-drilled beams that bolt together with a hex key. This site catalogues the 40 mm flavour.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/about',
  },
  twitter: { title, description },
}

export default function AboutPage() {
  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description="A modular construction system anyone can build, modify, or fork.">
          What is grid beam?
        </Title>
        <Container maxW="3xl">
          <VStack alignItems="flex-start" gap="5">
            <Text fontSize="lg">
              Grid beam is a beam — wood, aluminium, or steel — drilled with regularly-spaced holes
              along its length. Bolt the beams together with a hex key and you have a reconfigurable
              structure: shelves, desks, beds, kitchens, market stalls, even bicycles and trailers.
            </Text>
            <Text fontSize="lg">
              The same parts can be assembled, taken apart, and reassembled into something else.
              That's the point. It's a building system, not a furniture catalogue.
            </Text>
            <Text fontSize="lg" variant="secondary">
              The original Phelps grid beam — developed by Phil Jergenson in the 1970s, building on
              the open-construction work of Ken Isaacs — used a 1½″ profile on a four-bolt cycle.
              Many other sizes have appeared since.{' '}
              <Span fontWeight="bold">This site focuses on the 40&nbsp;mm flavour.</Span> The
              designs, cutting planner, and listed suppliers are all sized for 40&nbsp;mm beams on a
              40&nbsp;mm hole spacing.
            </Text>
          </VStack>
        </Container>
      </Section>

      <Section index={1} maxW="6xl" colorPalette="gray">
        <Title as="h2" description="Holes every 40 mm in every direction. That's the whole spec.">
          The 40 mm grid
        </Title>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 12 }} alignItems="center">
          <AboutPhoto
            src="gridbeam.xyz/about/grid"
            alt="A 40 mm × 40 mm grid square highlighted on a larger grid background."
            width={1188}
            height={841}
          />
          <VStack alignItems="flex-start" gap="4">
            <Text fontSize="lg">
              Imagine a 3D grid of points spaced 40&nbsp;mm apart. Every hole on every beam, every
              hole on every panel, lines up with that grid. Two parts that share the grid bolt
              together; two parts that don't, won't.
            </Text>
            <Text variant="secondary">
              That single constraint is what makes the system work. You can mix beams and panels
              from any compatible supplier, in any wood or metal, and they'll fit.
            </Text>
            <AboutPhoto
              src="gridbeam.xyz/shared/grid-example"
              alt="A 40 mm grid overlaid on a grid beam and a grid panel showing how their holes line up."
              width={1333}
              height={750}
            />
          </VStack>
        </SimpleGrid>
      </Section>

      <Section index={2} maxW="6xl">
        <Title as="h2" description="Three primitives. Everything else is composition.">
          The parts
        </Title>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
          <PartCard
            title="Beams"
            src="gridbeam.xyz/about/beams"
            alt="A row of square wooden grid beams with holes drilled at 40 mm centres."
            width={1207}
            height={714}
            body="40 × 40 mm profile with 8 mm holes drilled at 40 mm centres along the length. Wood for furniture; aluminium or steel for load-bearing builds."
          />
          <PartCard
            title="Panels"
            src="gridbeam.xyz/about/panels"
            alt="A grid panel — plywood with a 40 mm hole grid drilled across both dimensions."
            width={1111}
            height={564}
            body="Plywood (or other sheet material) with the same 40 mm hole grid drilled across both dimensions. Used for shelves, doors, work surfaces, walls."
          />
          <PartCard
            title="Fasteners"
            src="gridbeam.xyz/about/fasteners"
            alt="A handful of hex-key furniture bolts and nuts."
            width={685}
            height={528}
            body="Hex-key furniture bolts and nuts that pass through the holes. One tool, one fastener type — assembly is fast, and disassembly is just as fast."
          />
        </SimpleGrid>
      </Section>

      <Section index={3} maxW="6xl" colorPalette="gray">
        <Title
          as="h2"
          description="Three beams + three bolts = a rigid corner. Repeat to build anything."
        >
          How it goes together
        </Title>
        <Stack
          direction={{ base: 'column', md: 'row-reverse' }}
          gap={{ base: 8, md: 12 }}
          alignItems="center"
        >
          <Box flex="1" w="full">
            <AboutPhoto
              src="gridbeam.xyz/about/tri-joint"
              alt="Three grid beams meeting at right angles, each pair connected by a single bolt — a tri-joint."
              width={1333}
              height={750}
            />
          </Box>
          <VStack alignItems="flex-start" gap="4" flex="1">
            <Text fontSize="lg">
              The fundamental joint is the <Span fontWeight="bold">tri-joint</Span>: three beams
              meeting at right angles, each pair connected by a single bolt. Three bolts make the
              corner rigid in all three axes.
            </Text>
            <Text>
              From there, every grid-beam structure is a network of tri-joints. Add a panel here, a
              cross-brace there, and you have a desk, a shelf, or a bed.
            </Text>
            <Text variant="secondary">
              No glue. No welding. No specialised joinery. A 4&nbsp;mm hex key and a measuring tape
              will build almost anything in the catalogue.
            </Text>
          </VStack>
        </Stack>
      </Section>

      <Section index={4} maxW="6xl">
        <Title
          as="h2"
          description="An open construction system from the 1970s that quietly kept improving."
        >
          Where it came from
        </Title>
        <Container maxW="3xl">
          <VStack alignItems="flex-start" gap="5">
            <Text fontSize="lg">
              The lineage begins with <Span fontWeight="bold">Ken Isaacs</Span>, whose 1974 manual{' '}
              <em>How to Build Your Own Living Structures</em> showed how furniture, beds, and whole
              rooms could be built from a kit of identical drilled timbers.{' '}
              <Span fontWeight="bold">Phil Jergenson</Span> took that idea, refined the geometry,
              and named the result grid beam — and kept improving it for decades.
            </Text>
            <Text>
              The system has stayed alive because it's intentionally generic. Anyone can mill a
              beam. Anyone can drill the holes. The intelligence lives in the geometry, not in a
              proprietary part.
            </Text>
            <Text variant="secondary">
              gridbeam.xyz is a community site for the 40&nbsp;mm flavour: a catalogue of designs,
              tools to plan a build, and a directory of suppliers. The site, the components, and the
              engine that draws the designs are all open-source under EUPL-1.2.
            </Text>
          </VStack>
        </Container>
      </Section>

      <Section index={5} maxW="6xl" colorPalette="gray">
        <Title as="h2" description="Three places to go from here.">
          Start building
        </Title>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          <NextStepCard
            title="Browse designs"
            body="A catalogue of beds, desks, shelves, and more — every part listed, every cut measured."
            href="/designs"
            cta="See the catalogue"
          />
          <NextStepCard
            title="Plan a build"
            body="The cutting planner works out how many beams to buy and how to cut them with the least off-cut waste."
            href="/tools-and-resources"
            cta="Tools & resources"
          />
          <NextStepCard
            title="Find parts"
            body="A directory of suppliers around the world. We don't sell parts; we link to people who do."
            href="/suppliers"
            cta="Find suppliers"
          />
        </SimpleGrid>
        <Flex justifyContent="center" pt="2">
          <HStack gap="3" flexWrap="wrap">
            <LinkButton href="/faq" variant="secondary">
              Read the FAQ
            </LinkButton>
            <LinkButton href="https://github.com/villagekit" variant="secondary" isExternal>
              GitHub
            </LinkButton>
          </HStack>
        </Flex>
      </Section>
    </Main>
  )
}

interface AboutPhotoProps {
  src: string
  alt: string
  width: number
  height: number
}

function AboutPhoto(props: AboutPhotoProps) {
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
        sizes="(min-width: 768px) 50vw, 100vw"
        style={{ objectFit: 'cover' }}
      />
    </Box>
  )
}

interface PartCardProps {
  title: string
  src: string
  alt: string
  width: number
  height: number
  body: string
}

function PartCard(props: PartCardProps) {
  const { title, src, alt, width, height, body } = props
  return (
    <VStack as="article" alignItems="flex-start" gap="4">
      <AboutPhoto src={src} alt={alt} width={width} height={height} />
      <Heading as="h3" size="lg">
        {title}
      </Heading>
      <Text>{body}</Text>
    </VStack>
  )
}

interface NextStepCardProps {
  title: string
  body: string
  href: string
  cta: string
}

function NextStepCard(props: NextStepCardProps) {
  const { title, body, href, cta } = props
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
