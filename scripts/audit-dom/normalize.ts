// Shapes `document.body.innerText` into the parity ledger's copy diff: one visible block
// per line, in document order, whitespace collapsed. Pure: `pnpm audit:dom` calls it,
// `normalize.test.ts` specifies it.
//
// innerText already renders one block-level element per line (a paragraph, a heading, a list
// item) and separates table cells with tabs; what remains is the noise: blank lines between
// blocks, runs of spaces, tabs, non-breaking spaces and leading or trailing space. `\s` in a
// JavaScript regex covers the non-breaking space and the other Unicode spaces.

export function normalize(innerText: string): string {
  const lines = innerText
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 0)
  return lines.length === 0 ? '' : `${lines.join('\n')}\n`
}
