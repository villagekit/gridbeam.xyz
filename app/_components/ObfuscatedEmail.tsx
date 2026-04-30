import { Box, type BoxProps } from '@villagekit/ui'

interface ObfuscatedEmailProps extends Omit<BoxProps, 'children' | 'dangerouslySetInnerHTML'> {
  user: string
  domain: string
}

export function ObfuscatedEmail(props: ObfuscatedEmailProps) {
  const { user, domain, ...rest } = props
  const addr = `${encode(user)}&#x40;${encode(domain)}`
  return (
    <Box
      as="span"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: email obfuscation requires entity-encoded markup that React's renderer would otherwise re-encode
      dangerouslySetInnerHTML={{
        __html: `<a href="mailto:${addr}">${addr}</a>`,
      }}
      {...rest}
    />
  )
}

const paragraphLinkCss = {
  '& a': {
    color: 'accentA.800',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    wordBreak: 'break-word' as const,
  },
  '& a:hover': {
    color: 'primary.700',
    textDecoration: 'none',
  },
}

export function ObfuscatedEmailLink(props: ObfuscatedEmailProps) {
  return <ObfuscatedEmail css={paragraphLinkCss} {...props} />
}

function encode(input: string) {
  return input
    .split('')
    .map((c) => `&#x${c.charCodeAt(0).toString(16)};`)
    .join('')
}
