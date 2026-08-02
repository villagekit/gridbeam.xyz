import {
  Box,
  Container,
  Flex,
  HStack,
  LinkButton,
  LinkCard,
  Main,
  Section,
  SimpleGrid,
  SkipNavContent,
  Span,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'
import NextImage from 'next/image'
import type { ReactNode } from 'react'
import { FaCubes, FaShoppingBag, FaTools } from 'react-icons/fa'

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
          <VStack alignItems="stretch" gap={{ base: 8, md: 10 }}>
            <VStack alignItems="flex-start" gap="5">
              <Text fontSize="lg">
                Grid beam is a beam — wood, aluminium, or steel — drilled with regularly-spaced
                holes along its length. Bolt the beams together with a hex key and you have a
                reconfigurable structure: shelves, desks, beds, kitchens, market stalls, even
                bicycles and trailers.
              </Text>
              <Text fontSize="lg">
                The same parts can be assembled, taken apart, and reassembled into something else.
                That's the point. It's a building system, not a furniture catalogue.
              </Text>
              <Text fontSize="lg" variant="secondary">
                Many sizes have appeared since the original 1½″ grid beam in the 1970s.{' '}
                <Span fontWeight="bold">This site focuses on the 40&nbsp;mm flavour.</Span> The
                designs, cutting planner, and listed suppliers are all sized for 40&nbsp;mm beams on
                a 40&nbsp;mm hole spacing.
              </Text>
            </VStack>

            <AboutText>
              Grid beam is a <Span fontWeight="bold">modular system on a 40&nbsp;mm grid</Span>.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/grid"
              alt="A 40 mm × 40 mm grid square highlighted on a larger grid background."
              width={1188}
              height={841}
            />

            <AboutPhoto
              src="gridbeam.xyz/shared/grid-example"
              alt="A 40 mm grid overlaid on a grid beam and a grid panel showing how their holes line up."
              width={1333}
              height={750}
            />

            <AboutText>
              The primary building components are{' '}
              <Span fontWeight="bold">beams, panels, and fasteners</Span>.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/beams"
              alt="A row of square wooden grid beams with holes drilled at 40 mm centres."
              width={1207}
              height={714}
            />

            <AboutText>
              <Span fontWeight="bold">Beam</Span> profiles are 40 × 40&nbsp;mm with a repeating
              pattern of 8&nbsp;mm holes drilled 40&nbsp;mm apart.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/panels"
              alt="A grid panel — plywood with a 40 mm hole grid drilled across both dimensions."
              width={1111}
              height={564}
            />

            <AboutText>
              <Span fontWeight="bold">Plywood panels</Span> have the same 40&nbsp;mm hole grid
              drilled across both dimensions.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/fasteners"
              alt="A handful of hex-key furniture bolts and nuts."
              width={685}
              height={528}
            />

            <AboutText>
              <Span fontWeight="bold">Hex-key fasteners</Span> bolt beams and panels together
              quickly — and disassembly is just as fast.
            </AboutText>

            <AboutPhoto
              src="gridbeam.xyz/about/tri-joint"
              alt="Three grid beams meeting at right angles, each pair connected by a single bolt — a tri-joint."
              width={1333}
              height={750}
            />

            <AboutText>
              When <Span fontWeight="bold">three beams are joined with three bolts</Span>, a rigid
              corner is formed in all three axes.
            </AboutText>
          </VStack>
        </Container>
      </Section>

      <Section index={1} maxW="6xl" colorPalette="gray">
        <Title
          as="h2"
          description="An open construction system from the 1970s that quietly kept improving."
        >
          Where it came from
        </Title>
        <Container maxW="3xl">
          <VStack alignItems="flex-start" gap="5">
            {/* Note(cc): attribution is sourced, not paraphrased — Ken Isaacs, How to Build Your
                Own Living Structures (1974); Phil Jergenson, Richard Jergenson and Wilma Keppel,
                How to Build with Grid Beam (New Society, 2008); and the legacy site crediting the
                brothers as "the original inventors of Grid Beam" (node-modules@917daac
                apps/gridkit/pages/stories/2022-newsletter.mdx:256). Check a source before editing
                these names — an earlier draft invented one. */}
            <Text fontSize="lg">
              The lineage begins with <Span fontWeight="bold">Ken Isaacs</Span>, whose 1974 manual{' '}
              <em>How to Build Your Own Living Structures</em> showed how furniture, beds, and whole
              rooms could be built from a kit of bolted-together timbers.{' '}
              <Span fontWeight="bold">Phil and Richard Jergenson</Span> took that idea, made the
              hole pattern regular so that every beam was interchangeable, and named the result grid
              beam — and kept improving it for decades.
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

      <Section index={2} maxW="6xl">
        <Title as="h2" description="Three places to go from here.">
          Start building
        </Title>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          <LinkCard
            title="Browse designs"
            icon={<FaCubes />}
            description="A catalogue of beds, desks, shelves, and more — every part listed, every cut measured."
            href="/designs"
          />
          <LinkCard
            title="Plan a build"
            icon={<FaTools />}
            description="The cutting planner works out how many beams to buy and how to cut them with the least off-cut waste."
            href="/tools-and-resources"
          />
          <LinkCard
            title="Find parts"
            icon={<FaShoppingBag />}
            description="A directory of suppliers around the world. We don't sell parts; we link to people who do."
            href="/suppliers"
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
      <NextImage src={src} alt={alt} fill sizes="(min-width: 768px) 48rem, 100vw" />
    </Box>
  )
}

function AboutText(props: { children: ReactNode }) {
  return (
    <Text fontSize={{ base: 'xl', md: '2xl' }} lineHeight="1.4" textAlign="center">
      {props.children}
    </Text>
  )
}
