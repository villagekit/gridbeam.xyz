'use client'

/**
 * The client boundary for `@u-wave/react-youtube`, a class component with no `'use client'`
 * directive: the story MDX modules are evaluated in the server layer too (the page renders
 * them and `app/_lib/stories.ts` imports them), where React's server build has no `Component`,
 * so the MDX imports the player from here, a boundary legacy's pages router never needed.
 */
export { default } from '@u-wave/react-youtube'
