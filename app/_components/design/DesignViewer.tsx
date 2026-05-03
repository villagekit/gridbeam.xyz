'use client'

import './registerParts'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { ParamControls } from '@villagekit/parameters'
import { ProductInfo, type ProductMeta, ProductProvider, ProductView } from '@villagekit/product'
import { ProductKitModule } from '@villagekit/product-kit'
import { Box, VStack } from '@villagekit/ui'

import type { DisplayUnit } from '@/app/_components/cutting-plan/CutBeamSvg'

import { DesignCuttingPlan } from './DesignCuttingPlan'
import { PartsBreakdown } from './PartsBreakdown'

export interface DesignViewerProps {
  meta: ProductMeta
  code: string
}

export function DesignViewer(props: DesignViewerProps) {
  const { meta, code } = props
  const router = useRouter()
  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>('gu')

  const onLocationUpdate = useCallback(
    (nextLocation: Location) => {
      const next = `${nextLocation.pathname}${nextLocation.search}`
      router.replace(next, { scroll: false })
    },
    [router],
  )

  return (
    <ProductProvider
      Products={[ProductKitModule]}
      meta={meta}
      code={code}
      onLocationUpdate={onLocationUpdate}
    >
      <VStack alignItems="stretch" gap="8" w="full">
        <Box
          w="full"
          h={{ base: '320px', md: '480px', lg: '560px' }}
          borderRadius="lg"
          overflow="hidden"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <ProductView />
        </Box>

        <ParamControls />

        <ProductInfo />

        <PartsBreakdown displayUnit={displayUnit} onDisplayUnitChange={setDisplayUnit} />

        <DesignCuttingPlan displayUnit={displayUnit} />
      </VStack>
    </ProductProvider>
  )
}
