---
name: implement
description: Implement one plan end to end - pull, orient, scope, build, verify, review, record, commit, push. Use only when the user or an orchestrator hands you a plan (or names work to do); this is the repo's working loop, and it ends in a pushed commit.
---

# Implement

Build the work described by one plan. One pass of this skill is one focused
commit on `main`, pushed. The repo's CLAUDE.md holds the standing rules this
loop runs under: the conventions, the quality gate, the sub-agent roles, and
where plans, decisions and the parity ledger live.

## The loop

1. **Pull.** `git pull --rebase` on `main`. Run `kipu --version` once; the
   binary must be on the path.

2. **Orient.** `kipu show <id> --related` on the plan you were handed; if none
   was named, the first of `kipu ready --collection plan`. A plan tagged
   `gate` is the operator's: stop and report it, whoever handed it to you.
   Read the decisions in its area (`decisions/`), every `difference` item the
   plan cites, and the legacy source the differences cite. Plan edits you did
   not make are requirements. Claim it: `kipu move <id> doing --from todo`.

3. **Scope one plan.** One plan is one commit. If it is bigger, split it:
   when the user is present, ask them to run `/to-plan-slices`. Unattended, a
   record (a milestone, a route) is never split: stop and report, since the
   split needs the operator's granularity call. A slice that turns out to be
   two or three commits is split into that many with `kipu split`, each with
   `blocked_by` for what it consumes, the split plan moved to `doing`; say so
   in your report and ship the first. A conflict between the plan and the
   code, or the plan and good sense, is flagged and resolved per CLAUDE.md
   ("Plans vs. reality"), never silently overridden.

4. **Build.** The port rule first (CLAUDE.md, "Legacy is the baseline"): when
   a difference says the current structure drifted, start from the legacy
   source and translate; when it says the current is a faithful port, close
   the difference in place. Cite ported code by SHA-pinned URL. Never write
   or rewrite visitor-facing copy: copy comes from the legacy source or from
   a `sanctioned` difference's verdict, verbatim.
   - Call the Skill tool for `tdd` at the seams the plan names, for pure
     logic. The DOM, the network and the 3D canvas are exempt but kept thin.
   - A load-bearing claim about an upstream library (Next, Chakra, motion,
     `@villagekit/*`): read its source in `node_modules` and cite the path,
     never recall it.
   - A deviation from the plan that changes what the visitor sees, or the
     shape of the code, is not yours to decide: file it as a `difference`
     (or cite the one it already has) and let the rules judge it, per
     CLAUDE.md ("Plans vs. reality") and the `parity` skill's judging step.
     Rule 4 (upgrade-forced) covers only what the migration forces, never
     what is easier to write; and a difference you file for your own
     deviation is never sanctioned by you: it is `regression`, or `open`
     for the operator.
   - Mechanical work (bulk edits, extraction, exact diffs of legacy against
     current) goes to Sonnet sub-agents; reviews and design alternatives go
     to Opus. You have the last say over both.
   - Run `pnpm lint` and `pnpm typecheck` as you go.

5. **Verify.** `timeout 900 pnpm check`, green. Then, for every route the
   change touches, fresh screenshots against the dev server: start
   `pnpm dev` in the background, run `pnpm audit:pages --routes <file>` with a
   routes file listing those routes, and look at the pairs yourself under
   `audit/`. A change that touches no route (tooling, the store, docs) skips
   the screenshots and says so in the Outcome. No "fix it next commit".

6. **Review.** Call the Skill tool for `code-review` against the fixed point
   this work started from. Verify each finding against the files, fix what is
   critical, and run the review again with fresh sub-agents until no critical
   feedback remains. Re-run the gate after fixes. A reviewer advises; a finding
   you reject is answered in the plan's Outcome, with the reason.

7. **Record.** In the same commit as the code:
   - CLAUDE.md, READMEs and the scripts' header comments, for any change to
     how the repo is worked or built;
   - a decision item (`kipu new decision`), if a decision was made that meets
     CLAUDE.md's bar;
   - every difference the plan closes moved with
     `kipu fix <id> --outcome "plan <prefix>"`; a difference the work found
     minted with `kipu new difference` and judged, or left `open` for the
     operator when it is copy;
   - the plan finished with `kipu finish <id> --outcome -`: what shipped, what
     deviated from the plan and why, findings rejected and why; when this was
     the last open child of a record, the report says so, since the record's
     exit demo is the operator's;
   - `plans/README.md`, when the order of work changed;
   - `kipu verify` green.

8. **Commit and push.** One focused commit, imperative scoped subject citing
   the plan's prefix: `home: restore the hero carousel (plan fd9a92bd)`. No
   attribution trailers. Rebase onto the latest `origin/main`, then push. If
   the rebase touched this work's files, re-run the gate first.

## Done

- [ ] Tests first where pure
- [ ] `pnpm check` green
- [ ] Screenshots of every touched route looked at
- [ ] Last review clean, rejected findings answered in the Outcome
- [ ] Differences fixed or minted; decisions and docs recorded; `kipu verify` green
- [ ] Plan finished with its Outcome
- [ ] Rebased onto latest `origin/main` and pushed

Report completion when every box holds. When part of the scope is blocked,
finish the rest, leave the plan `doing`, and say exactly what was left out
and why.
