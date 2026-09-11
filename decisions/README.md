# decisions

The `decision` collection, declared in [.kipu/collections/decision.toml](../.kipu/collections/decision.toml):
one item per decision, with its reasons, `date` in the frontmatter,
`status` `proposed`, `accepted` or `superseded`. Append-only: a decision is
superseded by a new item carrying a `supersedes` edge, never rewritten.

A decision earns an item when it is hard to reverse, surprising without
context, and the result of real trade-offs. Routine choices do not. The
operator's calls that agents must not re-ask (an editorial lock, a copy
verdict, a sanctioned deviation) are decisions too, since re-asking is the
failure they prevent.

Mint one with `kipu new decision --title <text> --status accepted --set
date=YYYY-MM-DD`, then write the body: Context, Decision, Consequences,
all H2. Cite one in prose by its prefix or a link to its file.
