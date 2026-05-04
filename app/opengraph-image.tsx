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
        alignItems: 'center',
        padding: '64px 80px',
        gap: 64,
      }}
    >
      <div style={{ display: 'flex', flexShrink: 0 }}>
        <CubeLogo size={360} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, color: '#831843' }}>
          gridbeam.xyz
        </div>
        <div style={{ display: 'flex', fontSize: 40, color: '#3f3f46', maxWidth: 640 }}>
          Modular furniture from a 40 mm grid — open, reusable, hex-key buildable.
        </div>
      </div>
    </div>,
    { ...size },
  )
}

interface CubeLogoProps {
  size: number
}

function CubeLogo(props: CubeLogoProps) {
  const { size } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 320 320"
      role="img"
      aria-label="Grid Kit cube logo"
    >
      <g stroke="#000" strokeMiterlimit={4}>
        <path
          d="M30 93.66346a15 15 0 017.504163-12.992785L152.50416 14.32452a15 15 0 0114.99168 0l115 66.346153A15 15 0 01290 93.66346v132.67308a15 15 0 01-7.50416 12.99278l-115 66.34616a15 15 0 01-14.99168 0L37.504163 239.32932A15 15 0 0130 226.33654z"
          fill="none"
          strokeWidth={15}
        />
        <path d="M30 235l130-75M160 160l130 75M160 10v150" fill="none" strokeWidth={12} />
        <path
          d="M52.520825 247.99278a15 15 0 010-25.98556l99.983335-57.6827a15 15 0 0114.99168 0l99.98333 57.6827a15 15 0 010 25.98556l-99.98333 57.6827a15 15 0 01-14.99168 0z"
          fill="#f687b3"
          strokeWidth={12}
          strokeLinejoin="round"
        />
        <path
          d="M30 93.66346a15 15 0 017.504163-12.992785l99.999997-57.692309A15 15 0 01160 35.97115v115.36539a15 15 0 01-7.50416 12.99278L52.495837 222.02163A15 15 0 0130 209.02885z"
          fill="#76e4f7"
          strokeWidth={12}
          strokeLinejoin="round"
        />
        <path
          d="M160 35.97115a15 15 0 0122.49584-12.992784l100 57.692308A15 15 0 01290 93.66346v115.36539a15 15 0 01-22.49584 12.99278l-100-57.69231A15 15 0 01160 151.33654z"
          fill="#f6e05e"
          strokeWidth={12}
          strokeLinejoin="round"
        />
        <path
          d="M225 142.71631c-4.59709-2.65217-9.00589-7.30284-12.25652-12.92894-3.25063-5.62609-5.07681-11.76673-5.07681-17.07106 0-5.30433 1.82618-9.33784 5.07681-11.21321 3.25063-1.87536 7.65943-1.43896 12.25652 1.21321 4.59709 2.65216 9.00589 7.30284 12.25652 12.92893 3.25063 5.62609 5.07681 11.76674 5.07681 17.07107 0 5.30433-1.82618 9.33784-5.07681 11.2132-3.25063 1.87536-7.65943 1.43896-12.25652-1.2132z"
          fill="#000"
          strokeWidth={5.333}
        />
        <path
          d="M95.000002 142.5c-4.597086 2.65216-9.005887 3.08856-12.256518 1.2132-3.25063-1.87536-5.076816-5.90887-5.076815-11.2132 0-5.30433 1.826185-11.44498 5.076815-17.07107 3.250631-5.62609 7.659432-10.27677 12.256518-12.92893 4.597086-2.65217 9.005887-3.08857 12.256518-1.21321 3.25063 1.87537 5.07681 5.90888 5.07681 11.21321s-1.82618 11.44497-5.07681 17.07106c-3.250631 5.6261-7.659432 10.27677-12.256518 12.92894z"
          fill="#000"
          strokeWidth={5.333333}
        />
      </g>
    </svg>
  )
}
