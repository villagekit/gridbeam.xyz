// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/catalogue/filters.tsx
'use client'

import { useIsMobile } from '@villagekit/ui'

import { useCatalogueContext } from '@/app/_lib/context/catalogue'

import { Selector } from './Selector'

/** The category selector, reading the filter table and the current filter from the context. */
export function Filters() {
  const isMobile = useIsMobile()

  const { filterOptions, filter, setFilter } = useCatalogueContext()

  return (
    <Selector
      // NOTE (mw): id here is used for aria-owns reference in parent component.
      id="designs-menu-filters"
      title={isMobile ? 'Category' : 'Categories'}
      selectedValue={filter}
      options={filterOptions}
      onChange={setFilter}
    />
  )
}
