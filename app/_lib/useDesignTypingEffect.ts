// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/hooks/useDesignTypingEffect.tsx
import { shuffle } from 'lodash-es'
import { useEffect, useState } from 'react'

import type { DesignIndexEntry } from './designs'

// Reference: https://github.com/Hermanya/use-typing-effect/blob/master/src/index.tsx

interface DesignTypingEffectOptions {
  designs: ReadonlyArray<DesignIndexEntry>
  pause?: boolean
  loop?: boolean
  playbackRate?: number
}

export function useDesignTypingEffect(
  options: DesignTypingEffectOptions,
): [DesignIndexEntry | null, string, DesignIndexEntry | null] {
  const { designs: allDesigns, pause = false, loop = false, playbackRate = 1 } = options

  // designs must start empty so server render matches client render
  const [designs, setDesigns] = useState<ReadonlyArray<DesignIndexEntry> | null>(null)

  useEffect(() => {
    setDesigns(shuffle(allDesigns))
  }, [allDesigns])

  const [{ characterIndex, designIndex }, setState] = useState<{
    characterIndex: number
    designIndex: number
  }>({
    characterIndex: 0,
    designIndex: 0,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (pause === true) return

    let nextCharacterIndex = characterIndex
    let nextDesignIndex = designIndex

    let timeoutId: number

    emulateKeyStroke()

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }

    function emulateKeyStroke() {
      if (designs === null) return
      const nextDesign = designs[nextDesignIndex]
      if (nextDesign === undefined) return

      nextCharacterIndex++

      if (nextCharacterIndex === nextDesign.label.length) {
        nextCharacterIndex = 0
        nextDesignIndex++

        if (nextDesignIndex === designs.length) {
          if (!loop) {
            return
          }
          nextDesignIndex = 0
        }

        timeoutId = window.setTimeout(emulateKeyStroke, 100 * playbackRate)
      } else if (nextCharacterIndex === nextDesign.label.length - 1) {
        timeoutId = window.setTimeout(emulateKeyStroke, 2500 * playbackRate)
      } else {
        timeoutId = window.setTimeout(emulateKeyStroke, 100 * playbackRate)
      }

      setState({
        characterIndex: nextCharacterIndex,
        designIndex: nextDesignIndex,
      })
    }
  }, [designs, pause])

  const currentDesign = designs === null ? null : (designs[designIndex] ?? null)
  const currentDesignLabel = currentDesign === null ? '' : currentDesign.label
  const nextDesign = designs === null ? null : (designs[(designIndex + 1) % designs.length] ?? null)

  const nonBreakingSpace = '\u00A0'
  return [
    currentDesign,
    currentDesignLabel.slice(0, characterIndex + 1) || nonBreakingSpace,
    nextDesign,
  ]
}
