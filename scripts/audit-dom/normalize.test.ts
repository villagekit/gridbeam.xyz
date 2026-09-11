import { describe, expect, it } from 'vitest'

import { normalize } from './normalize'

describe('normalize', () => {
  it('turns innerText into one trimmed block per line with whitespace collapsed', () => {
    const innerText = [
      '',
      '  Grid Kit  ',
      '',
      '',
      'About us\t\tsince \u00a0 2019',
      ' ',
      '\tA beam\u00a0is 40\u00a0mm.  ',
      'Cell one\tCell two\tCell three',
      '   ',
      'Last line',
      '',
    ].join('\n')

    expect(normalize(innerText)).toBe(
      'Grid Kit\nAbout us since 2019\nA beam is 40 mm.\nCell one Cell two Cell three\nLast line\n',
    )
  })

  it('returns an empty string for text with no visible content', () => {
    expect(normalize('')).toBe('')
    expect(normalize(' \n \u00a0\n\t\n')).toBe('')
  })

  it('treats CRLF line breaks as block boundaries', () => {
    expect(normalize('one\r\ntwo\r\n')).toBe('one\ntwo\n')
  })
})
