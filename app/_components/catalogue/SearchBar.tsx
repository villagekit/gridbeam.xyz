// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/catalogue/search-bar.tsx
'use client'

// the stand-in for the @villagekit/ui re-export until the operator's publish (983c471842e1)
import { InputGroup } from '@chakra-ui/react'
import { Box, Icon, IconButton, Input } from '@villagekit/ui'
import { type ChangeEvent, useCallback } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

import { useCatalogueContext } from '@/app/_lib/context/catalogue'

/** The search field with a clear button while it holds text and a search icon otherwise. */
export function SearchBar() {
  const { search, setSearch } = useCatalogueContext()

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setSearch(ev.target.value)
    },
    [setSearch],
  )

  const handleClear = useCallback(() => {
    setSearch('')
  }, [setSearch])

  return (
    <Box css={{ flex: 1, width: '100%' }}>
      <InputGroup
        // NOTE (mw): id here is used for aria-owns reference in parent component.
        id="designs-menu-search"
        // biome-ignore lint/a11y/useSemanticElements:
        role="search"
        aria-label="Search"
        endElement={
          search.length > 0 ? (
            <IconButton title="Clear search" variant="toolbar" onClick={handleClear}>
              <Icon as={FaTimes} boxSize="5" />
            </IconButton>
          ) : (
            <Icon as={FaSearch} role="presentation" css={{ color: 'gray.700' }} />
          )
        }
        // Chakra v2's right element was a square of the input's height at the group's font size;
        // v3's has no width and a small font, so the square is written here
        endElementProps={{
          w: '12',
          px: 0,
          fontSize: 'lg',
          ...(search.length > 0 ? {} : { pointerEvents: 'none' }),
        }}
      >
        {/* Chakra v2's group never padded the ui Input (its wrapper carried no `type.id`), so legacy's text ran under the end element at the recipe's 16px; v3 clones the end element's width onto the input, and the input's own `pe` wins */}
        <Input
          type="search"
          size="lg"
          pe="4"
          value={search}
          onChange={handleChange}
          placeholder="Search..."
        />
      </InputGroup>
    </Box>
  )
}
