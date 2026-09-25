// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/theme.ts
import { config, createSystem, defaultConfig, defineConfig } from '@villagekit/ui'
import { Bitter, Fredoka } from 'next/font/google'

const bitter = Bitter({ subsets: ['latin'] })
const fredoka = Fredoka({ subsets: ['latin'], weight: '600' })

/**
 * The site's Chakra system: the ui's theme with the two web fonts written into the font
 * tokens, the xl radius and smooth scrolling, the way legacy's `theme.ts` extended it.
 */
export default createSystem(
  defaultConfig,
  config,
  defineConfig({
    theme: {
      tokens: {
        fonts: {
          body: { value: bitter.style.fontFamily },
          heading: { value: fredoka.style.fontFamily },
        },
        radii: {
          xl: { value: '1rem' },
        },
      },
    },
    globalCss: {
      html: {
        scrollBehavior: 'smooth',
      },
    },
  }),
)
