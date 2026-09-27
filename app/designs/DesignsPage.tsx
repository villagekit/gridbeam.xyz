// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/pages/designs/index.tsx
'use client'

import { useMemo } from 'react'

import { Catalogue } from '@/app/_components/catalogue'
import type { DesignIndexes } from '@/app/_lib/designs'

type FilterOptionType =
  | 'all'
  | 'bedroom'
  | 'cat'
  | 'desk'
  | 'dining'
  | 'garage'
  | 'kid'
  | 'kitchen'
  | 'lounge'
  | 'office'
  | 'seating'
  | 'storage'
  | 'table'
  | 'utility'
  | 'workbench'

const filterOptions: Record<FilterOptionType, string> = {
  all: 'All designs',
  bedroom: 'Bedroom',
  cat: 'Cats',
  desk: 'Desk',
  dining: 'Dining',
  garage: 'Garage',
  kid: 'Kids',
  kitchen: 'Kitchen',
  lounge: 'Lounge',
  office: 'Office',
  seating: 'Seating',
  storage: 'Storage',
  table: 'Tables',
  utility: 'Utility',
  workbench: 'Workbench',
}

type DesignsPageProps = {
  designs: DesignIndexes
}

/** The designs index: every design as a catalogue item under the static filter table. */
export function DesignsPage(props: DesignsPageProps) {
  const { designs } = props

  const designCatalogueItems = useMemo(() => {
    return designs.map((design) => {
      const { id, label, description, tags = [], image } = design

      return {
        active: true,
        categories: tags as Array<FilterOptionType>,
        description,
        id,
        image,
        name: label,
      }
    })
  }, [designs])

  return (
    <Catalogue
      items={designCatalogueItems}
      filterOptions={filterOptions}
      defaultFilterOption="all"
      itemLabel="designs"
      listPath="designs"
      listMessage={
        <>
          Your designs here…{' '}
          <span role="img" aria-label="sparkle">
            ✨
          </span>
        </>
      }
    />
  )
}
