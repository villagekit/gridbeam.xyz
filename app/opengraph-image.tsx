import { ImageResponse } from 'next/og'

import { CubeLogo } from './_components/CubeLogo'

export const alt = 'Grid Beam — modular furniture from a 40 mm grid'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#fffbea',
        display: 'flex',
        alignItems: 'center',
        padding: '64px 80px',
        gap: 64,
      }}
    >
      <div style={{ display: 'flex', flexShrink: 0 }}>
        <CubeLogo size={360} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', fontSize: 120, fontWeight: 700, color: '#831843' }}>
          Grid Beam
        </div>
        <div style={{ display: 'flex', fontSize: 36, color: '#3f3f46', maxWidth: 640 }}>
          Modular furniture from a 40 mm grid — open, reusable, hex-key buildable.
        </div>
      </div>
    </div>,
    { ...size },
  )
}
