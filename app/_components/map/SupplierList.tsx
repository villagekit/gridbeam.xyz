// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/map/producer-list.tsx
'use client'

import { Box, Flex, Heading, Icon, VStack, useDisclosure, useIsMobile } from '@villagekit/ui'
import { memo, useCallback } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { suppliers } from '@/content/suppliers'

import { SupplierItem } from './SupplierItem'

interface SupplierListProps {
  flyTo: (latitude: number, longitude: number) => void
}

/** The collapsible Locations panel over the map, one row per supplier. */
export const SupplierList = memo(function SupplierList(props: SupplierListProps) {
  const { flyTo } = props

  const isMobile = useIsMobile()

  const { open, onClose, onToggle } = useDisclosure({
    defaultOpen: false,
  })

  const handleFlyTo = useCallback(
    (latitude: number, longitude: number) => {
      if (isMobile) {
        onClose()
      }

      flyTo(latitude, longitude)
    },
    [flyTo, isMobile, onClose],
  )

  return (
    <VStack
      gap="0"
      alignItems="flex-start"
      css={{
        background: 'white',
        borderRadius: 'lg',
        boxShadow: 'md',
        maxHeight: 'calc(100% - 64px)',
        overflow: 'hidden',
        position: 'absolute',
        right: 4,
        top: 4,
        userSelect: 'none',
        width: '3xs',
        zIndex: 20,
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        onClick={onToggle}
        css={{
          _hover: {
            background: 'primary.500',
          },

          background: 'primary.400',
          color: 'white',
          cursor: 'pointer',
          paddingX: 4,
          paddingY: 2,
          width: '100%',
        }}
      >
        <Heading size="md">Locations</Heading>

        <Icon as={open ? FaChevronUp : FaChevronDown} />
      </Flex>

      {open && (
        <Box css={{ overflowY: 'auto', width: '100%' }}>
          {suppliers.map((supplier) => (
            <SupplierItem key={supplier.id} supplier={supplier} flyTo={handleFlyTo} />
          ))}
        </Box>
      )}
    </VStack>
  )
})
