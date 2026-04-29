import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['@villagekit/ui'],
}

const withMDX = createMDX()

export default withMDX(nextConfig)
