// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/custom.d.ts
// The shape `@svgr/webpack` gives an `*.svg` import under the `turbopack.rules`
// entry in `next.config.ts`. Next's own `image-types/global` declares the same
// module as `any` and wins (as it did on the legacy site), so this file records
// the shape; it does not type the import.
declare module '*.svg' {
  import type * as React from 'react'

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

  export default ReactComponent
}
