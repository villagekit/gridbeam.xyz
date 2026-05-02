'use client'

import './registerParts'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { ParamControls } from '@villagekit/parameters'
import { ProductInfo, type ProductMeta, ProductProvider, ProductView } from '@villagekit/product'
import { ProductKitModule } from '@villagekit/product-kit'
import { Box, VStack } from '@villagekit/ui'

export interface DesignViewerProps {
  meta: ProductMeta
  code: string
}

export function DesignViewer(props: DesignViewerProps) {
  const { meta, code } = props
  const router = useRouter()

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
      <VStack alignItems="stretch" gap="6" w="full">
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
      </VStack>
    </ProductProvider>
  )
}
