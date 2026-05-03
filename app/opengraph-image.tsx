import { ImageResponse } from 'next/og'

export const alt = 'gridbeam.xyz — modular furniture from a 40 mm grid'
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
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        gap: 28,
      }}
    >
      <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, color: '#831843' }}>
        gridbeam.xyz
      </div>
      <div style={{ display: 'flex', fontSize: 44, color: '#3f3f46', maxWidth: 1000 }}>
        Modular furniture from a 40 mm grid — open, reusable, hex-key buildable.
      </div>
      <div
        style={{
          marginTop: 36,
          background: '#831843',
          width: 560,
          height: 110,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div style={{ width: 38, height: 38, borderRadius: 9999, background: '#fffbea' }} />
        <div style={{ width: 38, height: 38, borderRadius: 9999, background: '#fffbea' }} />
        <div style={{ width: 38, height: 38, borderRadius: 9999, background: '#fffbea' }} />
        <div style={{ width: 38, height: 38, borderRadius: 9999, background: '#fffbea' }} />
        <div style={{ width: 38, height: 38, borderRadius: 9999, background: '#fffbea' }} />
      </div>
    </div>,
    { ...size },
  )
}
