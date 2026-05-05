// Ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/hooks/useDesignTypingEffect.tsx
// The cycling logic is unchanged; the only difference is dropping the lodash
// dep (inline Fisher–Yates) and narrowing the input type to the local
// DesignIndexEntry shape.

import { useEffect, useState } from 'react'

import type { DesignIndexEntry } from '../../_lib/designs'

interface DesignTypingEffectOptions {
  designs: ReadonlyArray<DesignIndexEntry>
  pause?: boolean
  loop?: boolean
  playbackRate?: number
}

const NON_BREAKING_SPACE = ' '

export function useDesignTypingEffect(
  options: DesignTypingEffectOptions,
): [DesignIndexEntry | null, string, DesignIndexEntry | null] {
  const { designs: allDesigns, pause = false, loop = false, playbackRate = 1 } = options

  // Designs must start empty so server render matches client render — the
  // shuffle below would otherwise produce a different order each refresh.
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: characterIndex/designIndex are intentionally read inside the effect from local mutable copies; including them would re-arm the timer every keystroke.
  useEffect(() => {
    if (pause === true) return
    if (designs === null) return

    let nextCharacterIndex = characterIndex
    let nextDesignIndex = designIndex

    let timeoutId: number | undefined

    emulateKeyStroke()

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }

    function emulateKeyStroke() {
      if (designs === null) return
      const currentLabel = designs[nextDesignIndex]?.label
      if (currentLabel === undefined) return

      nextCharacterIndex++

      if (nextCharacterIndex === currentLabel.length) {
        nextCharacterIndex = 0
        nextDesignIndex++

        if (nextDesignIndex === designs.length) {
          if (!loop) return
          nextDesignIndex = 0
        }

        timeoutId = window.setTimeout(emulateKeyStroke, 100 * playbackRate)
      } else if (nextCharacterIndex === currentLabel.length - 1) {
        timeoutId = window.setTimeout(emulateKeyStroke, 2500 * playbackRate)
      } else {
        timeoutId = window.setTimeout(emulateKeyStroke, 100 * playbackRate)
      }

      setState({
        characterIndex: nextCharacterIndex,
        designIndex: nextDesignIndex,
      })
    }
  }, [designs, pause, loop, playbackRate])

  const currentDesign = designs === null ? null : (designs[designIndex] ?? null)
  const currentLabel = currentDesign === null ? '' : currentDesign.label
  const nextDesign = designs === null ? null : (designs[(designIndex + 1) % designs.length] ?? null)

  return [
    currentDesign,
    currentLabel.slice(0, characterIndex + 1) || NON_BREAKING_SPACE,
    nextDesign,
  ]
}

function shuffle<T>(input: ReadonlyArray<T>): Array<T> {
  const arr = [...input]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const a = arr[i]
    const b = arr[j]
    if (a === undefined || b === undefined) continue
    arr[i] = b
    arr[j] = a
  }
  return arr
}
