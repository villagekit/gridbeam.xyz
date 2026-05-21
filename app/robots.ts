import type { MetadataRoute } from 'next'

const SITE_URL = 'https://gridbeam.xyz'

// Block indexing on every non-production deploy. `NEXT_PUBLIC_DEPLOY_ENV`
// is set to `production` only on the production Worker (via
// `WORKERS_CI_BRANCH === 'main'` in Workers Builds, or a static `vars`
// entry on `wrangler.jsonc`'s production env). The default-disallow
// posture is intentional — accidentally not indexing a real site is
// recoverable, but accidentally indexing a preview is not.
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_DEPLOY_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
