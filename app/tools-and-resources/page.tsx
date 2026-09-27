import { LinkCard, Section, SimpleGrid, Title } from '@villagekit/ui'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import type { ReactNode } from 'react'
import { FaCut } from 'react-icons/fa'

const title = 'Tools and resources'

export const metadata: Metadata = {
  title,
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
    description: 'Online tool to plan how to cut beams into desired lengths.',
    href: '/tools/cutting-planner',
    icon: <FaCut />,
  },
]

export default function ToolsAndResourcesPage() {
  return (
    <>
      <Section index={0} maxW="6xl">
        <Title>Tools and resources</Title>
      </Section>

      <Section index={1} maxW="6xl" colorPalette="gray">
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
    </>
  )
}
