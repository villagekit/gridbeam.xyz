'use client'

import { Box, Button, Heading, Link, SimpleGrid, Text, VStack, Wrap } from '@villagekit/ui'
import NextLink from 'next/link'
import { useMemo, useState } from 'react'

import type { DesignIndexEntry } from '@/app/_lib/designs'

const EXCLUDED_TAGS = new Set(['furniture'])

const LABEL_OVERRIDES: Record<string, string> = {
  cat: 'Cats',
  kid: 'Kids',
}

export interface DesignsBrowserProps {
  designs: ReadonlyArray<DesignIndexEntry>
}

export function DesignsBrowser(props: DesignsBrowserProps) {
  const { designs } = props
  const [selected, setSelected] = useState<string | null>(null)

  const categories = useMemo(() => {
    const tags = new Set<string>()
    for (const design of designs) {
      for (const tag of design.tags) {
        if (!EXCLUDED_TAGS.has(tag)) tags.add(tag)
      }
    }
    return Array.from(tags).sort()
  }, [designs])

  const filtered = useMemo(() => {
    if (selected == null) return designs
    return designs.filter((d) => d.tags.includes(selected))
  }, [designs, selected])

  return (
    <VStack alignItems="stretch" gap="6" w="full">
      <Wrap gap="2" justify="center" aria-label="Filter designs by category">
        <FilterChip label="All" active={selected == null} onClick={() => setSelected(null)} />
        {categories.map((tag) => (
          <FilterChip
            key={tag}
            label={LABEL_OVERRIDES[tag] ?? capitalize(tag)}
            active={selected === tag}
            onClick={() => setSelected(tag)}
          />
        ))}
      </Wrap>

      {filtered.length === 0 ? (
        <Text textAlign="center" variant="secondary">
          No designs match this filter.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {filtered.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  )
}

interface FilterChipProps {
  label: string
  active: boolean
  onClick: () => void
}

function FilterChip(props: FilterChipProps) {
  const { label, active, onClick } = props
  return (
    <Button
      size="sm"
      variant={active ? 'primary' : 'secondary'}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </Button>
  )
}

function DesignCard({ design }: { design: DesignIndexEntry }) {
  return (
    <Link as={NextLink} href={`/designs/${design.id}`} _hover={{ textDecoration: 'none' }}>
      <Box
        p="6"
        bg="white"
        borderRadius="lg"
        borderWidth="2px"
        borderStyle="dashed"
        borderColor="accentA.300"
        transition="border-color 0.15s ease"
        _hover={{ borderColor: 'accentA.500' }}
        h="full"
      >
        <VStack alignItems="flex-start" gap="3">
          <Heading as="h2" size="md">
            {design.label}
          </Heading>
          <Text variant="secondary">{design.description}</Text>
        </VStack>
      </Box>
    </Link>
  )
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
