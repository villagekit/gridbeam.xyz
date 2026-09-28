// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/map/producer-item.tsx
'use client'

import { Box, Text } from '@villagekit/ui'
import { useCallback } from 'react'

import { useMapContext } from '@/app/_lib/context/map'
import type { Supplier } from '@/content/suppliers'

interface SupplierItemProps {
  supplier: Supplier
  flyTo: (latitude: number, longitude: number) => void
}

/** One row of the Locations panel: the supplier's title over its location, a click flies to it. */
export function SupplierItem(props: SupplierItemProps) {
  const {
    supplier: { id, title, location, latitude, longitude },
    flyTo,
  } = props

  const { selectedSupplier, setSelectedSupplier } = useMapContext()

  const isSelected = selectedSupplier === id

  const handleClick = useCallback(() => {
    flyTo(latitude, longitude)
    setSelectedSupplier(id)
  }, [flyTo, latitude, longitude, setSelectedSupplier, id])

  return (
    <Box
      onClick={handleClick}
      css={{
        _hover: {
          background: 'gray.100',
        },

        cursor: 'pointer',
        paddingX: 4,
        paddingY: 2,
        width: '100%',
      }}
    >
      <Text
        css={{
          ...(isSelected ? { color: 'primary.700' } : {}),
        }}
      >
        {title}
      </Text>

      <Text fontSize="sm" variant="secondary">
        {location}
      </Text>
    </Box>
  )
}
