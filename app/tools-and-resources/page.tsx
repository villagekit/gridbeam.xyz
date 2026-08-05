import {
  Container,
  LinkCard,
  Main,
  Section,
  SimpleGrid,
  SkipNavContent,
  Text,
  Title,
} from '@villagekit/ui'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import type { ReactNode } from 'react'
import {
  FaBookOpen,
  FaCubes,
  FaCut,
  FaGithub,
  FaInfoCircle,
  FaQuestionCircle,
  FaShoppingBag,
  FaUsers,
} from 'react-icons/fa'

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
  description: string
  href: string
  icon: ReactNode
  isExternal?: boolean
}

const tools: Array<CardEntry> = [
  {
    title: 'Cutting planner',
    description: 'Work out how many beams to buy and how to cut them with the least off-cut waste.',
    href: '/tools/cutting-planner',
    icon: <FaCut />,
  },
  {
    title: 'Designs catalogue',
    description:
      'Beds, desks, shelves, market stalls — every design with parts list and a 3D preview you can rotate.',
    href: '/designs',
    icon: <FaCubes />,
  },
  {
    title: 'Suppliers directory',
    description:
      "Manufacturers and resellers around the world that make 40 mm grid beam and compatible parts. We don't sell parts; we link to people who do.",
    href: '/suppliers',
    icon: <FaShoppingBag />,
  },
]

const resources: Array<CardEntry> = [
  {
    title: 'About grid beam',
    description:
      'A primer on the 40 mm grid, the parts that fit it, and where the system came from.',
    href: '/about',
    icon: <FaInfoCircle />,
  },
  {
    title: 'FAQ',
    description:
      'Common questions about durability, materials, sourcing, sustainability, and how to get parts.',
    href: '/faq',
    icon: <FaQuestionCircle />,
  },
  {
    title: 'Stories',
    description:
      'Build logs and field reports from people doing it — what worked, what they would do differently next time.',
    href: '/stories',
    icon: <FaBookOpen />,
  },
  {
    title: 'Source on GitHub',
    description:
      'The site, the @villagekit/ui component library, the engine that draws the designs, and the catalogue itself — all open-source under EUPL-1.2.',
    href: 'https://github.com/villagekit',
    icon: <FaGithub />,
    isExternal: true,
  },
  {
    title: 'Community forum',
    description: 'Questions, build logs, and design discussion at discuss.villagekit.com.',
    href: 'https://discuss.villagekit.com',
    icon: <FaUsers />,
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

      <Section index={1} maxW="6xl" colorPalette="gray">
        <Title as="h2" description="Built into the site. Free, open-source, no signup.">
          Tools
        </Title>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          {tools.map((entry) => (
            <LinkCard
              key={entry.href}
              linkComponent={entry.isExternal ? undefined : NextLink}
              title={entry.title}
              icon={entry.icon}
              description={entry.description}
              href={entry.href}
              isExternal={entry.isExternal}
            />
          ))}
        </SimpleGrid>
      </Section>

      <Section index={2} maxW="6xl">
        <Title as="h2" description="Background reading and links to the wider grid-beam community.">
          Resources
        </Title>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {resources.map((entry) => (
            <LinkCard
              key={entry.href}
              linkComponent={entry.isExternal ? undefined : NextLink}
              title={entry.title}
              icon={entry.icon}
              description={entry.description}
              href={entry.href}
              isExternal={entry.isExternal}
            />
          ))}
        </SimpleGrid>
      </Section>
    </Main>
  )
}
