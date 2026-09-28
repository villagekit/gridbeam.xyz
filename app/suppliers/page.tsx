import { Box, Heading, Link, Section, SimpleGrid, Text, Title, VStack } from '@villagekit/ui'
import type { Metadata } from 'next'

// biome-ignore lint/suspicious/noShadowRestrictedNames:
import { Map } from '@/app/_components/map'

import { type Supplier, suppliers } from '../../content/suppliers'

const title = 'Suppliers'

export const metadata: Metadata = {
  title,
}

const systemLabels: Record<Supplier['system'], string> = {
  metric: 'Metric',
  imperial: 'Imperial',
}

export default function SuppliersPage() {
  return (
    <>
      <Section index={0} maxW="6xl">
        <Title>Suppliers</Title>
      </Section>

      <Section index={1} maxW="6xl">
        <Map />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
          {suppliers.map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </SimpleGrid>
      </Section>
    </>
  )
}

function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <Box p="6" bg="white" borderRadius="xl" boxShadow="sm">
      <VStack alignItems="flex-start" gap="1">
        <Heading as="h3" size="md">
          <Link href={supplier.website} target="_blank" rel="noopener noreferrer">
            {supplier.title}
          </Link>
        </Heading>
        <Text fontSize="sm" variant="secondary">
          {supplier.location}
        </Text>
        <Text fontSize="sm" variant="secondary">
          {systemLabels[supplier.system]}
        </Text>
      </VStack>
    </Box>
  )
}
