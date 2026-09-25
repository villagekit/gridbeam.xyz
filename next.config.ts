// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/next.config.mjs
import createMDX from '@next/mdx'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import type { NextConfig } from 'next'

const cspHeader = `
    default-src *;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https: data: blob:;
    style-src 'self' 'unsafe-inline';
`

const nextConfig: NextConfig = {
  eslint: {
    // TODO: remove, but for now GitHub Actions build is failing but lint checks are not.
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    loader: 'custom',
    loaderFile: './app/_lib/cloudinary-loader.ts',
  },
  // An `*.svg` import is a React component (`svg.d.ts` types it), the
  // legacy site's `next-plugin-svgr`; `app/icon.svg` is both the favicon
  // route and the header logo.
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  async redirects() {
    return [
      ...['/creations', '/ideas'].flatMap((source) => [
        { destination: '/designs', permanent: false, source },
      ]),

      ...['/creations/:slug', '/ideas/:slug'].flatMap((source) => [
        { destination: '/designs/:slug', permanent: false, source },
      ]),
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
  typescript: {
    // TODO: remove, but for now GitHub Actions build is failing but type checks are not.
    ignoreBuildErrors: true,
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)

// Makes `getCloudflareContext()` resolve under `next dev` by reading from
// `.env.local`. No effect on `next build` / the deployed Worker.
initOpenNextCloudflareForDev()
