// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/catalogue/catalogue.tsx
'use client'

import { Container, HStack, Stack, VStack, useBreakpointValue, useIsMobile } from '@villagekit/ui'

import {
  type CatalogueContextProps,
  CatalogueContextProvider,
  type CatalogueItem,
} from '@/app/_lib/context/catalogue'

import { Filters } from './Filters'
import { List } from './List'
import { ResultsCount } from './ResultsCount'
import { SearchBar } from './SearchBar'
import { Sorting } from './Sorting'

interface CatalogueProps<
  ItemType extends CatalogueItem<FilterOptionType>,
  FilterOptionType extends string,
  DefaultFilterOptionType extends FilterOptionType,
> extends CatalogueContextProps<ItemType, FilterOptionType, DefaultFilterOptionType> {}

/**
 * The catalogue frame: the search bar, the category filters, the sort options, the results count
 * and the animated list, laid out by width around one context holding the URL state.
 */
export function Catalogue<
  ItemType extends CatalogueItem<FilterOptionType>,
  FilterOptionType extends string,
  DefaultFilterOptionType extends FilterOptionType,
>(props: CatalogueProps<ItemType, FilterOptionType, DefaultFilterOptionType>) {
  const isMobile = useIsMobile()

  const isWideScreen = useBreakpointValue<boolean>(
    {
      base: false,
      xl: true,
    },
    { fallback: 'xl' },
  ) as boolean

  const spacing = useBreakpointValue<number>({ base: 8, md: 16 })

  return (
    <CatalogueContextProvider {...props}>
      <Container maxW="8xl">
        {/*
          NOTE (mw): Here we manually create a menubar in the a11y tree, using explicit ids of the menu elements.
          We need to do this because the DOM tree is messy due to use of css flexbox.
          (We could potentially refactor this to use css grid and have a clean DOM tree.)
        */}
        <div
          id="designs-menu"
          role="menubar"
          aria-label="Designs menu"
          aria-owns="designs-menu-search designs-menu-filters designs-menu-sorting"
        />

        <Stack direction={isMobile ? 'column' : 'row'} gap={spacing} css={{ width: '100%' }}>
          <VStack alignItems="flex-start" gap="8">
            {isMobile && <SearchBar />}
            <Filters />
            {!isWideScreen && <Sorting />}
            {!isWideScreen && <ResultsCount />}
          </VStack>

          <VStack gap="8" css={{ flex: 1 }}>
            {!isMobile && (
              <HStack gap="8" css={{ paddingX: 4, width: '100%' }}>
                <SearchBar />
                {isWideScreen && <ResultsCount />}
              </HStack>
            )}

            <List />
          </VStack>

          {isWideScreen && <Sorting />}
        </Stack>
      </Container>
    </CatalogueContextProvider>
  )
}
