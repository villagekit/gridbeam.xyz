// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/catalogue/sorting.tsx
'use client'

import { sortOptions, useCatalogueContext } from '@/app/_lib/context/catalogue'

import { Selector } from './Selector'

/** The sort selector, reading the current sort from the context. */
export function Sorting() {
  const { sort, setSort } = useCatalogueContext()

  return (
    <Selector
      // NOTE (mw): id here is used for aria-owns reference in parent component.
      id="designs-menu-sorting"
      title="Sort by"
      selectedValue={sort}
      options={sortOptions}
      onChange={setSort}
    />
  )
}
