import createMDX from '@next/mdx'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // The published `@villagekit/*` packages ship TypeScript sources at their
  // top-level `exports`; without `transpilePackages`, Next.js can't compile
  // them and the build dies with "Module not found". Drop only if a package
  // ever publishes built JS instead.
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

// Makes `getCloudflareContext()` resolve under `next dev` by reading from
// `.env.local`. No effect on `next build` / the deployed Worker.
initOpenNextCloudflareForDev()
