import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['@villagekit/ui'],
  images: {
    loader: 'custom',
    loaderFile: './app/_lib/cloudinary-loader.ts',
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
