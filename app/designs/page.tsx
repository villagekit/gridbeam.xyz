import {
  Box,
  Heading,
  Link,
  Main,
  Section,
  SimpleGrid,
  SkipNavContent,
  Text,
  Title,
  VStack,
} from '@villagekit/ui'
import type { Metadata } from 'next'
import NextLink from 'next/link'

import { type DesignIndexEntry, getDesignIndex } from '@/app/_lib/designs'

const title = 'Designs'
const description =
  'A catalogue of grid-beam designs — beds, desks, shelves, and more. Each design has a 3D preview and a parts list.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://gridbeam.xyz/designs',
  },
  twitter: { title, description },
}

export default async function DesignsPage() {
  const designs = await getDesignIndex()

  return (
    <Main>
      <SkipNavContent />

      <Section index={0} maxW="6xl">
        <Title description="Browse designs and tweak the parameters in your browser. Every design is open-source.">
          {title}
        </Title>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {designs.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </SimpleGrid>
      </Section>
    </Main>
  )
}

function DesignCard({ design }: { design: DesignIndexEntry }) {
  return (
    <Link as={NextLink} href={`/designs/${design.id}`} _hover={{ textDecoration: 'none' }}>
      <Box
        p="6"
        bg="white"
        borderRadius="lg"
        borderWidth="2px"
        borderStyle="dashed"
        borderColor="accentA.300"
        transition="border-color 0.15s ease"
        _hover={{ borderColor: 'accentA.500' }}
      >
        <VStack alignItems="flex-start" gap="3">
          <Heading as="h2" size="md">
            {design.label}
          </Heading>
          <Text variant="secondary">{design.description}</Text>
        </VStack>
      </Box>
    </Link>
  )
}
