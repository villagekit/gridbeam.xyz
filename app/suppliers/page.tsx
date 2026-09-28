// ported from https://github.com/villagekit/node-modules/blob/8311c3fa/apps/gridkit/pages/order.tsx
import { Box, Link, Text, Title, VStack } from '@villagekit/ui'
import type { Metadata } from 'next'

// biome-ignore lint/suspicious/noShadowRestrictedNames:
import { Map } from '@/app/_components/map'

import { type Supplier, suppliers } from '../../content/suppliers'

export const metadata: Metadata = {
  title: 'Suppliers',
}

const systemLabels: Record<Supplier['system'], string> = {
  metric: 'Metric',
  imperial: 'Imperial',
}

export default function SuppliersPage() {
  return (
    <>
      <Title>Suppliers</Title>

      <VStack gap={[8, null, 12]}>
        <Map />

        <Box maxW="breakpoint-md" width="100%">
          {suppliers.map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </Box>
      </VStack>
    </>
  )
}

// The row is legacy's map panel item, with the name as the link out and the system label under
// the location; ported from
// https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/map/producer-item.tsx
function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <Box paddingX="4" paddingY="2" width="100%">
      <Text>
        <Link href={supplier.website} target="_blank" rel="noopener noreferrer">
          {supplier.title}
        </Link>
      </Text>

      <Text fontSize="sm" variant="secondary">
        {supplier.location}
      </Text>

      <Text fontSize="sm" variant="secondary">
        {systemLabels[supplier.system]}
      </Text>
    </Box>
  )
}
