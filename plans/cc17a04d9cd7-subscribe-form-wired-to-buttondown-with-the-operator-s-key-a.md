---
title: "Subscribe form wired to Buttondown with the operator's key: a real subscription from pnpm dev lands with the Grid Beam tag, the live API's answers read"
status: todo
parent: fbb7c2c27eb5
derived_from: fbb7c2c27eb5
blocked_by: 244b962caae9
worker: opus
tags:
  - attended
---
The subscribe form is proven against Buttondown with the operator's key: on `pnpm dev` with `BUTTONDOWN_API_KEY` in `.env.local`, a real submission answers 204, shows the `Subscription successful!` toast and the success state, and the subscriber appears in the operator's Buttondown account with the `Grid Beam` tag and the five metadata fields; a second submission of the same address shows the visitor `Uh oh, something went wrong!`, legacy's catch-all for Buttondown's 400; and what the live API answered, field by field, is written into the Outcome, with the key's name and where it lives and never the key. The record `fbb7c2c27eb5` waits on this slice (its Exit demo: `/finish-epic` runs after the operator has), so the form's wiring is read against the real service once, by the operator or by an agent the operator hands the key to, before the record finishes. Decisions `ee86d68a`, `2032533f`; CLAUDE.md, Secrets and Working style (a step done by hand is written into the plan's Outcome, with the command and what it printed). The shape is the re-port's and the edges are the live API's, so Opus.

wants: the Buttondown API key, for the form

## Work

- Prerequisite: the re-port slice (`Subscribe page re-ported from legacy's applet-subscribe package: the form on react-hook-form, zod and ky with legacy's fields, toasts and success state, the API route posting to Buttondown, degrading without the key`) is `done`, its `POST /api/subscribe` posting `{ email_address, metadata, tags }` to `https://api.buttondown.com/v1/subscribers` with `Authorization: Token <key>`.
- The key: the operator writes `BUTTONDOWN_API_KEY=<key>` into `.env.local` (gitignored by `.env*.local`; never into `.env.example`, a plan, a note or a commit) and reads whether the account holds a tag named `Grid Beam` (whether Buttondown creates a tag named in `tags` that does not exist is read from the docs or from the account's tags page after the first submission, and written in the Outcome).
- On `pnpm dev`: fill the form with a test address the operator controls (a `+` tag on their own address), a name, and text in the four optional fields; submit; read the dev server's terminal (no error line), the toast, the scroll to the top, the h1 `Thanks for subscribing!` and the sunflower sentence. In Buttondown: the subscriber exists, `unactivated` until the confirmation link is clicked, tagged `Grid Beam`, its metadata holding `name`, `location`, `referral`, `why_interested` and `feedback` as typed. The confirmation email arrives; click it; the subscriber is `regular`. Then submit the same address again: the handler's `console.error` line prints Buttondown's status and `code` (a 400; the body's `detail` is read in the terminal of the `curl` below, never logged), and the visitor sees the `Error!` toast reading `Uh oh, something went wrong!` (legacy's catch-all, `api.ts:60-62` at `fce357d`).
- Where the live API rejects the body (an unknown field, a renamed one, a tag it refuses): the fix lands in `app/api/subscribe/route.ts` and `app/subscribe/types.ts` in this slice, one edit per answer, and the handler items the re-port filed `open` on the verdicts plan (the HTTP client, the field, the host, the missing-key behavior) get a note each with what the API answered, so the operator's verdict on them is read against fact; a new difference from legacy's code the fix makes is filed `open` the same way. Where the API accepts legacy's `email` or answers on legacy's host `api.buttondown.email` too, the note on that item says so.
- The Outcome writes: the date, `curl -s -o /dev/null -w '%{http_code}\n' -X POST localhost:3000/api/subscribe ...` with the test body (the address redacted to its domain) and the code it printed, what the browser showed, what Buttondown's subscriber page showed (tag, metadata, state), the duplicate's status and `code`, and where the key lives (`.env.local` locally; the Worker's secret is the release's, M4 `a4df2bf79395`, which sets `BUTTONDOWN_API_KEY` with `wrangler secret put`, the note the split left there). Delete the test subscriber afterwards or keep it, the operator's call, written down.
- Docs: `.env.example`'s comment stays true (unset for local work; the page degrades). CLAUDE.md, Secrets, already names the variable and its two homes; nothing to add unless the API's answers change the handler, then the record's Log.
- Not this slice: the Worker's secret and the deploy (M4); a design change to the form (the verdicts plan); the footer box.

## Seams under test

None pure; the proof is the live service's answer and the browser.

## Done when

- A subscriber submitted from the form on `pnpm dev` with the key in `.env.local` exists in the operator's Buttondown account tagged `Grid Beam` with the five metadata fields, and the confirmation email arrived; the same address submitted again shows the `Error!` toast and the handler logs Buttondown's 400 (checked by the operator, written in the Outcome)
- The Outcome holds the commands, the codes and what the pages showed, the address redacted, no key anywhere in the repo: `git grep -n <the key's first eight characters> -- .` prints nothing, `git check-ignore -q .env.local` succeeds and `git status --porcelain` names no file holding the key
- Any handler edit the live API forced is committed with its item filed or noted, `kipu list --collection difference --filter route=/subscribe --status regression` printing nothing
- `timeout 900 just check` is green
