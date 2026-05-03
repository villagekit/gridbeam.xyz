import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#fffbea',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#831843',
          width: 146,
          height: 56,
          borderRadius: 9,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div style={{ width: 22, height: 22, borderRadius: 9999, background: '#fffbea' }} />
        <div style={{ width: 22, height: 22, borderRadius: 9999, background: '#fffbea' }} />
        <div style={{ width: 22, height: 22, borderRadius: 9999, background: '#fffbea' }} />
      </div>
    </div>,
    { ...size },
  )
}
