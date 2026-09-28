// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/context/map.ts
import constate from 'constate'
import { useMemo, useState } from 'react'

import type { Supplier } from '@/content/suppliers'

interface MapContextType {
  selectedSupplier: Supplier['id'] | null
  setSelectedSupplier: (supplierId: Supplier['id'] | null) => void
}

function useMap(): MapContextType {
  const [selectedSupplier, setSelectedSupplier] = useState<MapContextType['selectedSupplier']>(null)

  return useMemo(
    () => ({
      selectedSupplier,
      setSelectedSupplier,
    }),
    [selectedSupplier],
  )
}

/** The supplier the map has selected, shared by the list, the items and the markers. */
export const [MapContextProvider, useMapContext] = constate(useMap)
