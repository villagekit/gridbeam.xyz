export const colors = {
  primary: '#462E74',
  secondary: ['#6E9B34', '#AA7439'],
  // prev:
  // - http://paletton.com/#uid=54m0X0kllllaFw0g0qFqFg0w0aF
  /*
  primary: ['#8C7AAE', '#665091', '#462E74', '#2C1657', '#18063A'],
  secondary: [
    ['#D991AF', '#B55B81', '#913059', '#6D1238', '#48001E'],
    ['#6D92A0', '#457485', '#27586B', '#103E50', '#022735']
  ],
  */
  // - http://paletton.com/#uid=34t0X0kllllaFw0g0qFqFg0w0aF
  success: '#28a745',
  info: '#17a2b8',
  warning: '#ffc107',
  danger: '#dc3545',
  white: '#fff',
  light: '#f8f9fa',
  muted: '#6c757d',
  dark: '#343a40'
}

export var fonts = {
  headline: 'Bungee',
  sans: 'IBM Plex Sans',
  serif: 'IBM Plex Serif'
}
fonts.heading = fonts.sans
fonts.body = fonts.serif
fonts.link = fonts.sans

// http://tachyons.io/docs/typography/scale/
export const fontSizes = [
  '0.875rem', // 0
  '1rem', // 1
  '1.25rem', // 2
  '1.5rem', // 3
  '2.25rem', // 4
  '3rem', // 5
  '5rem', // 6
  '6rem' // 7
]

// http://tachyons.io/docs/layout/spacing/
export const space = [
  '0rem', // 0
  '0.25rem', // 1
  '0.5rem', // 2
  '1rem', // 3
  '2rem', // 4
  '4rem', // 5
  '8rem', // 6
  '16rem', // 7
  '32rem', // 8
  '64rem' // 9
]

export default {
  colors,
  fonts,
  fontSizes,
  space,
  sizes: space
}
