'use client'

import { useSearchParams } from 'next/navigation'
import { useReducer, useRef, useSyncExternalStore } from 'react'
import type {
  PartialLocation,
  QueryParamAdapter,
  QueryParamAdapterComponent,
} from 'use-query-params'

// Note(cc): `next-query-params/app` calls `useSearchParams()` unconditionally, and a static
// prerender throws that hook to the nearest Suspense boundary: at the root, every route loses its
// HTML. This adapter exists until that package ships one that keeps the prerender; a second app
// router site of ours wanting it is the trigger to send it upstream.

/**
 * The `use-query-params` adapter for the app router, with the semantics of the pages adapter
 * legacy mounted at its root. The query is empty on the server and during hydration, so every
 * route keeps its static HTML. Once hydrated it is the query Next's router holds: a consumer
 * mounted by a navigation reads its own URL on its first render, and back and forward follow the
 * history. A write goes through the History API, which Next patches to keep its router in sync,
 * and is read back at once, so a later write builds on it before the router has caught up.
 */
export const NextQueryParamAdapter: QueryParamAdapterComponent = ({ children }) => {
  const hydrated = useSyncExternalStore(subscribeToNothing, isClient, isServer)
  // The hook runs on the client only, where it is a context read. The condition is constant for
  // the life of each render tree (the server's and the client's are separate roots), so the hook
  // order is stable within each.
  const params = typeof window === 'undefined' ? null : useSearchParams()
  const query = hydrated && params ? params.toString() : ''
  const routerSearch = query === '' ? '' : `?${query}`

  // The writes ahead of the router, oldest first. The router reports them in order as their
  // transitions land, batched at times, so a report drops the writes up to it; a report that is
  // none of them is a navigation that overtook them and drops them all. Refs, read and written
  // in render against React's advice, because `use-query-params` reads the location at setter
  // time through an adapter it captured in an effect, which may be a render or two old: the
  // getter reads the latest write and the latest report, never a render's closure. A render
  // React throws away keeps its trim; the writes it could drop are the ones in flight.
  const written = useRef<string[]>([])
  const reported = useRef(routerSearch)
  if (reported.current !== routerSearch) {
    reported.current = routerSearch
    const landed = written.current.lastIndexOf(routerSearch)
    written.current = landed === -1 ? [] : written.current.slice(landed + 1)
  }
  const [, rerender] = useReducer(increment, 0)

  // Built each render, so a write and a router change each hand the consumers a new adapter.
  function write(method: 'pushState' | 'replaceState', next: PartialLocation) {
    const { pathname, hash } = window.location
    window.history[method](next.state ?? null, '', `${pathname}${next.search}${hash}`)
    written.current.push(next.search)
    rerender()
  }
  const adapter: QueryParamAdapter = {
    location: {
      get search() {
        return written.current[written.current.length - 1] ?? reported.current
      },
    },
    push: (next) => write('pushState', next),
    replace: (next) => write('replaceState', next),
  }

  return children(adapter)
}

function increment(count: number) {
  return count + 1
}

function subscribeToNothing() {
  return () => {}
}

function isClient() {
  return true
}

function isServer() {
  return false
}
