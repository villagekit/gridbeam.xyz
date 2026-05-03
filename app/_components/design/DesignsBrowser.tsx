'use client'

import { useMemo } from 'react'

import { Catalogue } from '@/app/_components/catalogue'
import type { DesignIndexEntry } from '@/app/_lib/designs'

import { buildDesignFilterOptions, designsToCatalogueItems } from './designs-to-catalogue'

export interface DesignsBrowserProps {
  designs: ReadonlyArray<DesignIndexEntry>
}

export function DesignsBrowser(props: DesignsBrowserProps) {
  const { designs } = props

  const filterOptions = useMemo(() => buildDesignFilterOptions(designs), [designs])
  const items = useMemo(() => designsToCatalogueItems(designs), [designs])

  return (
    <Catalogue
      items={items}
      filterOptions={filterOptions}
      itemLabel="designs"
      basePath="designs"
      searchPlaceholder="Search designs…"
    />
  )
}
