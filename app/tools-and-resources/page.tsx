import {
  Box,
  Container,
  Heading,
  LinkButton,
  Main,
  Section,
  SimpleGrid,
  SkipNavContent,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'

const title = 'Tools & resources'
const description =
  'Tools to plan a grid-beam build, and references for going deeper into the system.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/tools-and-resources',
  },
  twitter: { title, description },
}

interface CardEntry {
  title: string
  body: string
  href: string
  cta: string
  isExternal?: boolean
}

const tools: Array<CardEntry> = [
  {
    title: 'Cutting planner',
    body: 'Work out how many beams to buy and how to cut them with the least off-cut waste.',
    href: '/tools/cutting-planner',
    cta: 'Open the planner',
  },
  {
    title: 'Designs catalogue',
    body: 'Beds, desks, shelves, market stalls — every design with parts list and a 3D preview you can rotate.',
    href: '/designs',
    cta: 'Browse designs',
  },
  {
    title: 'Suppliers directory',
    body: "Manufacturers and resellers around the world that make 40 mm grid beam and compatible parts. We don't sell parts; we link to people who do.",
    href: '/suppliers',
    cta: 'Find suppliers',
  },
]

const resources: Array<CardEntry> = [
  {
    title: 'About grid beam',
    body: 'A primer on the 40 mm grid, the parts that fit it, and where the system came from.',
    href: '/about',
    cta: 'Read the intro',
  },
  {
    title: 'FAQ',
    body: 'Common questions about durability, materials, sourcing, sustainability, and how to get parts.',
    href: '/faq',
    cta: 'Read the FAQ',
  },
  {
    title: 'Stories',
    body: 'Build logs and field reports from people doing it — what worked, what they would do differently next time.',
    href: '/stories',
    cta: 'Read stories',
  },
  {
    title: 'Source on GitHub',
    body: 'The site, the @villagekit/ui component library, the engine that draws the designs, and the catalogue itself — all open-source under EUPL-1.2.',
    href: 'https://github.com/villagekit',
    cta: 'GitHub',
    isExternal: true,
  },
  {
    title: 'Community forum',
    body: 'Questions, build logs, and design discussion at discuss.villagekit.com.',
    href: 'https://discuss.villagekit.com',
    cta: 'Visit the forum',
    isExternal: true,
  },
]

export default function ToolsAndResourcesPage() {
  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description="Tools to plan a build, plus references for going deeper into the system.">
          Tools &amp; resources
        </Title>
        <Container maxW="3xl">
          <Text textAlign="center">
            Everything below is open and free. The tools live on this site; the resources point at
            the wider grid-beam community.
          </Text>
        </Container>
      </Section>

      <Section index={1} maxW="6xl">
        <Title as="h2" description="Built into the site. Free, open-source, no signup.">
          Tools
        </Title>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          {tools.map((entry) => (
            <ResourceCard key={entry.href} {...entry} accent="accentA" />
          ))}
        </SimpleGrid>
      </Section>

      <Section index={2} maxW="6xl" colorPalette="accentA">
        <Title as="h2" description="Background reading and links to the wider grid-beam community.">
          Resources
        </Title>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {resources.map((entry) => (
            <ResourceCard key={entry.href} {...entry} accent="accentB" />
          ))}
        </SimpleGrid>
      </Section>
    </Main>
  )
}

interface ResourceCardProps extends CardEntry {
  accent: 'accentA' | 'accentB'
}

function ResourceCard(props: ResourceCardProps) {
  const { title, body, href, cta, isExternal, accent } = props
  return (
    <Box
      p="6"
      bg="white"
      borderRadius="lg"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={`${accent}.300`}
    >
      <VStack alignItems="flex-start" gap="4" h="full">
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text flex="1">{body}</Text>
        <LinkButton href={href} variant="secondary" size="sm" isExternal={isExternal}>
          {cta}
        </LinkButton>
      </VStack>
    </Box>
  )
}
