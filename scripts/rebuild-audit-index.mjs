#!/usr/bin/env node
// scripts/rebuild-audit-index.mjs
//
// Rebuilds audit/index.html by scanning audit/<slug>/<width>/{legacy,current}.png.
// Useful when you've done a partial re-run (e.g. only design routes) — the audit script
// regenerates index.html from its current run only, dropping references to other routes.
//
// Routes are discovered from existing directories. Order is best-effort: known top-level
// routes first, then anything else alphabetically.

import { existsSync } from 'node:fs'
import { readdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const AUDIT_DIR = resolve(REPO_ROOT, 'audit')
const WIDTHS = [375, 768, 1280]

const KNOWN_ORDER = [
  '/',
  '/about',
  '/faq',
  '/contact',
  '/subscribe',
  '/tools-and-resources',
  '/tools/cutting-planner',
  '/legal',
  '/legal/privacy-policy',
  '/legal/cookie-policy',
  '/legal/return-policy',
  '/stories',
  '/designs',
]

function slugToRoute(slug) {
  if (slug === '_root') return '/'
  return `/${slug.replace(/__/g, '/')}`
}

async function discoverRoutes() {
  const entries = await readdir(AUDIT_DIR, { withFileTypes: true })
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name)
  const routes = slugs.map(slugToRoute)

  const knownIndex = (route) => {
    const idx = KNOWN_ORDER.indexOf(route)
    if (idx !== -1) return idx
    // Group children with their parent prefix.
    for (let i = 0; i < KNOWN_ORDER.length; i++) {
      if (route.startsWith(KNOWN_ORDER[i] + '/')) return i + 0.5
    }
    return KNOWN_ORDER.length
  }

  return routes.sort((a, b) => {
    const diff = knownIndex(a) - knownIndex(b)
    if (diff !== 0) return diff
    return a.localeCompare(b)
  })
}

function routeToSlug(route) {
  if (route === '/') return '_root'
  return route.replace(/^\/+|\/+$/g, '').replace(/\//g, '__')
}

function renderIndexHtml(routes) {
  const sections = routes
    .map((route) => {
      const slug = routeToSlug(route)
      const widthBlocks = WIDTHS.map((w) => {
        const cell = (side) => {
          const file = `${slug}/${w}/${side}.png`
          if (!existsSync(join(AUDIT_DIR, file))) {
            return `<div class="missing">no capture</div>`
          }
          return `<a href="${file}" target="_blank"><img src="${file}" alt="${side} ${route} ${w}px" loading="lazy"></a>`
        }
        return `      <section class="width">
        <h3>${w}px</h3>
        <div class="pair">
          <figure><figcaption>legacy</figcaption>${cell('legacy')}</figure>
          <figure><figcaption>current</figcaption>${cell('current')}</figure>
        </div>
      </section>`
      }).join('\n')
      return `    <article id="${slug}">
      <header><h2><code>${route}</code></h2></header>
${widthBlocks}
    </article>`
    })
    .join('\n')

  const nav = routes.map((r) => `<a href="#${routeToSlug(r)}"><code>${r}</code></a>`).join(' ')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Stream 06 — parity audit</title>
<style>
  :root { color-scheme: light dark; font-family: system-ui, sans-serif; }
  body { margin: 0; padding: 1.5rem; max-width: 1800px; margin-inline: auto; }
  h1 { margin-top: 0; }
  nav { position: sticky; top: 0; z-index: 1; background: Canvas; padding: 0.5rem 0; border-bottom: 1px solid color-mix(in srgb, CanvasText 25%, transparent); margin-bottom: 1rem; line-height: 2; }
  nav a { margin-right: 0.5rem; }
  article { margin-block: 2rem; padding-top: 1rem; border-top: 1px solid color-mix(in srgb, CanvasText 25%, transparent); }
  article > header h2 { margin: 0 0 0.5rem; font-size: 1.1rem; }
  .width { margin-block: 1rem; }
  .width h3 { font-size: 0.9rem; margin: 0.25rem 0; opacity: 0.7; font-weight: normal; }
  .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  figure { margin: 0; position: relative; }
  figcaption { font-size: 0.75rem; opacity: 0.6; margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.05em; }
  img { width: 100%; height: auto; display: block; border: 1px solid color-mix(in srgb, CanvasText 25%, transparent); }
  .missing { padding: 2rem; text-align: center; opacity: 0.6; border: 1px dashed currentColor; font-size: 0.85rem; }
  code { background: color-mix(in srgb, CanvasText 10%, transparent); padding: 0.1em 0.3em; border-radius: 3px; font-size: 0.9em; }
</style>
</head>
<body>
<h1>Stream 06 — parity audit</h1>
<nav>${nav}</nav>
${sections}
</body>
</html>
`
}

const routes = await discoverRoutes()
await writeFile(join(AUDIT_DIR, 'index.html'), renderIndexHtml(routes), 'utf8')
console.log(`Rebuilt audit/index.html with ${routes.length} routes`)
