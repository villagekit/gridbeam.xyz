// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/map/producer-marker.tsx
'use client'

import { Box, Heading, Text, VStack } from '@villagekit/ui'
import { Marker, Popup as ReactPopup } from '@vis.gl/react-maplibre'
import { memo } from 'react'

import { useMapContext } from '@/app/_lib/context/map'
import type { Supplier } from '@/content/suppliers'

interface SupplierMarkerProps {
  supplier: Supplier
  flyTo: (latitude: number, longitude: number) => void
}

const POINT_SIZE = 4

/** A supplier's dot on the map, with the popup of its title over its location while selected. */
export const SupplierMarker = memo(function SupplierMarker(props: SupplierMarkerProps) {
  const {
    supplier: { id, title, location, latitude, longitude },
    flyTo,
  } = props

  const { selectedSupplier, setSelectedSupplier } = useMapContext()

  const isSelected = selectedSupplier === id

  return (
    <>
      <Marker
        // Legacy's Mapbox hid a marker behind the globe and named every marker `Map marker`;
        // MapLibre fades one to 0.2 and names only its default marker.
        ref={(marker) => marker?.getElement().setAttribute('aria-label', 'Map marker')}
        longitude={longitude}
        latitude={latitude}
        opacityWhenCovered={0}
        onClick={(ev) => {
          // NOTE (mw): Needed so this click doesn't propogate to close the new popup.
          ev.originalEvent.stopPropagation()

          setSelectedSupplier(id)

          // if double click
          if (ev.originalEvent.detail === 2) {
            flyTo(latitude, longitude)
          }
        }}
      >
        <Box
          className="supplier-marker"
          css={{
            _hover: {
              backgroundColor: 'primary.500',
            },

            backgroundColor: 'primary.400',
            borderColor: 'white',
            borderRadius: '100%',
            borderStyle: 'solid',
            borderWidth: 2,
            cursor: 'pointer',
            height: POINT_SIZE,
            width: POINT_SIZE,
          }}
        />
      </Marker>

      {isSelected && (
        <ReactPopup
          latitude={latitude}
          longitude={longitude}
          anchor="bottom"
          closeButton={false}
          closeOnClick
          onClose={() => setSelectedSupplier(null)}
        >
          <Box css={{ background: 'primary.400', color: 'white', padding: 2 }}>
            <Heading size="sm">{title}</Heading>
          </Box>

          <VStack alignItems="flex-start" gap="1" css={{ background: 'white', padding: 2 }}>
            <Text fontSize="sm" variant="secondary">
              {location}
            </Text>
          </VStack>
        </ReactPopup>
      )}
    </>
  )
})
