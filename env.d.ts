// CloudflareEnv augmentation for secrets/vars set on the deployed Worker but
// not declared in `wrangler.jsonc`. `pnpm cf-typegen` regenerates
// `cloudflare-env.d.ts` (gitignored) from `wrangler.jsonc` bindings; this file
// adds the runtime-only entries (set via dashboard or `wrangler secret put`)
// so `getCloudflareContext().env` is typed at use sites.
interface CloudflareEnv {
  readonly BUTTONDOWN_API_KEY?: string
}
