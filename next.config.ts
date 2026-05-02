import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: [
    '@villagekit/parameters',
    '@villagekit/part',
    '@villagekit/part-fastener',
    '@villagekit/part-gridbeam',
    '@villagekit/part-gridpanel',
    '@villagekit/plugin-smart-fasteners',
    '@villagekit/product',
    '@villagekit/product-kit',
    '@villagekit/sandbox',
    '@villagekit/ui',
  ],
  images: {
    loader: 'custom',
    loaderFile: './app/_lib/cloudinary-loader.ts',
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
