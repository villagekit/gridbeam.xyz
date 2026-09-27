import { describe, expect, it } from 'vitest'

import { orderRoutes, parseRoutes, routeToSlug, slugToRoute } from './audit-routes.ts'

describe('parseRoutes', () => {
  it('declares an unmarked route on both sides', () => {
    expect(parseRoutes('/about\n')).toEqual({
      ok: true,
      routes: [{ route: '/about', sides: ['legacy', 'current'] }],
    })
  })

  it('declares a route marked legacy-only or current-only on that side alone', () => {
    expect(parseRoutes('/shop legacy-only\n/suppliers   current-only')).toEqual({
      ok: true,
      routes: [
        { route: '/shop', sides: ['legacy'] },
        { route: '/suppliers', sides: ['current'] },
      ],
    })
  })

  it('skips blank lines, comment lines and trailing comments', () => {
    const text = ['# header', '', '   ', '/faq  # the FAQ', '\t/contact\t', '# /about'].join('\n')
    expect(parseRoutes(text)).toEqual({
      ok: true,
      routes: [
        { route: '/faq', sides: ['legacy', 'current'] },
        { route: '/contact', sides: ['legacy', 'current'] },
      ],
    })
  })

  it('returns no routes for a file of only comments', () => {
    expect(parseRoutes('# nothing here\n\n')).toEqual({ ok: true, routes: [] })
  })

  it('rejects an unknown marker with its one-based line number and the line', () => {
    expect(parseRoutes('# header\n/faq\n/about both-sides\n')).toEqual({
      ok: false,
      line: 3,
      text: '/about both-sides',
    })
  })

  it('rejects a line with more than one word after the route', () => {
    expect(parseRoutes('/about legacy-only extra')).toEqual({
      ok: false,
      line: 1,
      text: '/about legacy-only extra',
    })
  })
})

describe('routeToSlug', () => {
  it('names the root route _root', () => {
    expect(routeToSlug('/')).toBe('_root')
  })

  it('drops the edge slashes and joins the segments with a double underscore', () => {
    expect(routeToSlug('/about')).toBe('about')
    expect(routeToSlug('/tools/cutting-planner')).toBe('tools__cutting-planner')
    expect(routeToSlug('/legal/privacy-policy/')).toBe('legal__privacy-policy')
  })
})

describe('slugToRoute', () => {
  it('names the _root slug /', () => {
    expect(slugToRoute('_root')).toBe('/')
  })

  it('turns each double underscore back into a slash under a leading slash', () => {
    expect(slugToRoute('designs__bed-frame')).toBe('/designs/bed-frame')
  })

  it('inverts routeToSlug for every route shape the routes file holds', () => {
    const routes = [
      '/',
      '/about',
      '/tools-and-resources',
      '/tools/cutting-planner',
      '/designs/bed-frame',
    ]
    for (const route of routes) expect(slugToRoute(routeToSlug(route))).toBe(route)
  })
})

describe('orderRoutes', () => {
  it('puts the known top-level routes first, in the known order', () => {
    expect(orderRoutes(['/designs', '/about', '/'])).toEqual(['/', '/about', '/designs'])
  })

  it('puts a child route right after its known parent, children alphabetical', () => {
    expect(orderRoutes(['/stories', '/designs/desk', '/designs', '/designs/bed-frame'])).toEqual([
      '/stories',
      '/designs',
      '/designs/bed-frame',
      '/designs/desk',
    ])
  })

  it('puts unknown routes last, alphabetical', () => {
    expect(orderRoutes(['/zebra', '/suppliers', '/', '/apple'])).toEqual([
      '/',
      '/apple',
      '/suppliers',
      '/zebra',
    ])
  })

  it('leaves its input unchanged', () => {
    const routes = ['/designs', '/']
    orderRoutes(routes)
    expect(routes).toEqual(['/designs', '/'])
  })
})
