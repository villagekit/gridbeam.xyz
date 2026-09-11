---
title: Subscribe success state copy removed
status: open
route: /subscribe
axis: copy
kind: removed
---
## Legacy

`packages/applet-subscribe/src/page.tsx:32,38-44` after a successful submit the title reads "Thanks for subscribing!" and the body "We've just sent an email with a link to confirm your subscription. You'll need to click the link to start receiving updates. " with `<span role="img" aria-label="sunflower">🌻</span>`.

## Current

No success state: `app/subscribe/page.tsx` is static. The state itself is the interaction item on this route.

## Verdict

## Log
