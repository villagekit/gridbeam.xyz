'use client'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { useServerInsertedHTML } from 'next/navigation'
import { type ReactNode, useState } from 'react'

/**
 * Collects Emotion's server-rendered styles via `useServerInsertedHTML` so
 * Chakra v3's `<Global>` and `<Insertion>` components don't emit inline `<style>`
 * tags as siblings of the app — which would otherwise break React 19 hydration
 * under the Next.js App Router.
 */
export function EmotionRegistry({ children }: { children: ReactNode }) {
  const [registry] = useState(() => {
    const cache = createCache({ key: 'css' })
    cache.compat = true

    const prevInsert = cache.insert
    let inserted: Array<string> = []
    cache.insert = (...args) => {
      const [, serialized] = args
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prev = inserted
      inserted = []
      return prev
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = registry.flush()
    if (names.length === 0) return null

    let styles = ''
    for (const name of names) {
      const rule = registry.cache.inserted[name]
      if (typeof rule === 'string') styles += rule
    }

    return (
      <style
        data-emotion={`${registry.cache.key} ${names.join(' ')}`}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Emotion-flushed styles for SSR.
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>
}
