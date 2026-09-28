// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/map/map.tsx
'use client'

import 'maplibre-gl/dist/maplibre-gl.css'

import { Box } from '@villagekit/ui'
import {
  type MapEvent,
  type MapRef,
  Map as ReactMapGL,
  NavigationControl as ReactNavigationControl,
} from '@vis.gl/react-maplibre'
import type { MapMouseEvent } from 'maplibre-gl'
import { useCallback, useRef } from 'react'

import { MapContextProvider } from '@/app/_lib/context/map'
import { suppliers } from '@/content/suppliers'

import { SupplierList } from './SupplierList'
import { SupplierMarker } from './SupplierMarker'

/** The suppliers map: a globe on OpenFreeMap tiles with a dot per supplier and the Locations panel. */
// biome-ignore lint/suspicious/noShadowRestrictedNames:
export function Map() {
  const mapRef = useRef<MapRef>(null)

  const handleLoad = useCallback((ev: MapEvent) => {
    const { target } = ev
    target.resize()
  }, [])

  const handleFlyTo = useCallback((latitude: number, longitude: number) => {
    const map = mapRef.current
    if (map == null) return

    map.flyTo({
      center: [longitude, latitude],
      duration: 1000,
    })
  }, [])

  // if we clicked on a SupplierMarker, disable the double click zoom
  const handleDoubleClick = useCallback((ev: MapMouseEvent) => {
    const map = mapRef.current
    if (map == null) return
    const mapUnsafe = map.getMap()

    const target = ev.originalEvent.target
    if (target == null) return

    if ((target as HTMLDivElement).classList == null) return
    const el = target as HTMLDivElement

    if (el.classList.contains('supplier-marker')) {
      mapUnsafe.doubleClickZoom.disable()
      setTimeout(() => {
        mapUnsafe.doubleClickZoom.enable()
      })
    }
  }, [])

  return (
    <MapContextProvider>
      <Box
        css={{
          '& .maplibregl-popup-content': {
            borderRadius: 'md',
            boxShadow: 'md',
            overflow: 'hidden',
            padding: 0,
            width: 180,
          },
          '& .maplibregl-popup-tip': {
            borderBottomColor: 'primary.400',
            borderTopColor: 'white',
          },
          // Legacy's Mapbox let no click through a marker hidden behind the globe.
          '& .maplibregl-marker-covered': {
            pointerEvents: 'none',
          },

          height: '50vh',
          minHeight: 'xs',

          position: 'relative',

          width: '100%',
        }}
      >
        <SupplierList flyTo={handleFlyTo} />

        <ReactMapGL
          ref={mapRef}
          projection="globe"
          initialViewState={{
            latitude: -40.6,
            longitude: 174.7,
            zoom: 2,
          }}
          onLoad={handleLoad}
          onDblClick={handleDoubleClick}
          dragPan
          mapStyle="https://tiles.openfreemap.org/styles/positron"
          minZoom={1}
          reuseMaps
          // MapLibre GL 6 forces the compact attribution; undefined is the responsive default
          // legacy's Mapbox had, compact only under 640px.
          attributionControl={{ compact: undefined }}
          // MapLibre GL 6 loads its tile worker from a URL beside its bundle, which Next's chunks
          // do not serve; `scripts/copy-maplibre-worker.ts` puts the worker and its shared chunk
          // under `public/`.
          workerUrl="/maplibre/maplibre-gl-worker.mjs"
        >
          <ReactNavigationControl showCompass={false} showZoom position="top-left" />

          {suppliers.map((supplier) => (
            <SupplierMarker key={supplier.id} supplier={supplier} flyTo={handleFlyTo} />
          ))}
        </ReactMapGL>
      </Box>
    </MapContextProvider>
  )
}
