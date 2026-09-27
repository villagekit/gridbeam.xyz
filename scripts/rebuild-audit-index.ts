#!/usr/bin/env node
// scripts/rebuild-audit-index.ts
//
// Rebuilds audit/index.html by scanning audit/<slug>/<width>/{legacy,current}.png.
// Useful when you've done a partial re-run (e.g. only design routes) — the audit script
// regenerates index.html from its current run only, dropping references to other routes.
//
// Routes are discovered from existing directories, at the default widths of
// scripts/audit-shared.ts. Order is best-effort: known top-level routes first, each with its
// children, then anything else alphabetically (orderRoutes in scripts/audit-routes.ts). The
// page is the one `pnpm audit:pages` writes, from the same renderer, where a screenshot that
// was never taken reads "no capture" and no HTTP status is tagged.

import { existsSync } from 'node:fs'
import { readdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

import { orderRoutes, routeToSlug, slugToRoute } from './audit-routes.ts'
import { DEFAULTS, REPO_ROOT, renderIndexHtml } from './audit-shared.ts'

const AUDIT_DIR = resolve(REPO_ROOT, 'audit')

const entries = await readdir(AUDIT_DIR, { withFileTypes: true })
const routes = orderRoutes(entries.filter((e) => e.isDirectory()).map((e) => slugToRoute(e.name)))
const html = renderIndexHtml({
  routes,
  widths: DEFAULTS.widths,
  cell: (route, width, side) =>
    existsSync(join(AUDIT_DIR, routeToSlug(route), String(width), `${side}.png`))
      ? { ok: true }
      : { ok: false, reason: 'no capture' },
})
await writeFile(join(AUDIT_DIR, 'index.html'), html, 'utf8')
console.log(`Rebuilt audit/index.html with ${routes.length} routes`)
