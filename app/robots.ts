import type { MetadataRoute } from 'next'

const SITE_URL = 'https://gridbeam.xyz'

export default function robots(): MetadataRoute.Robots {
  // Block preview/development on Vercel; allow elsewhere (production Vercel + any self-host).
  // Failure mode of accidentally not-indexing a real production site is worse than indexing a preview.
  const vercelEnv = process.env.VERCEL_ENV
  if (vercelEnv && vercelEnv !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
