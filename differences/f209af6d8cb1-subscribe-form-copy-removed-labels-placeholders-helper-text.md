---
title: "Subscribe form copy removed: labels, placeholders, helper text, button and toasts"
status: open
route: /subscribe
axis: copy
kind: removed
---
## Legacy

`packages/applet-subscribe/src/component.tsx:114-174`: "Preferred name" (required; placeholder "Charlie Doe"; helper "What should we call you?"), "Email" (required; placeholder "charlie@example.com"; helper "How do we get in contact with you?"), "Location" (placeholder "Wellington, New Zealand"; helper "Where are you?"), "How did you find out about us?", "Why are you interested in Grid Kit?" (`websiteName` interpolated), "Do you have any questions or comments?" (helper "What's something we need to hear?"), button "Subscribe!". Toasts (`:77-83,88-93`): "Error!" with `toastMessage || 'Uh oh, something went wrong!'`; "Subscription successful!". Field errors from zod's `.email()` default via `upperFirst` (`schema.ts:10`, `component.tsx:99-107`).

## Current

No form, labels, button or toasts on `app/subscribe/page.tsx`. The form's removal is the interaction item on this route; its copy is here so the operator can judge the strings when it returns.

## Verdict

## Log

- 2026-09-12: One item for the whole form's copy: the strings stand or fall with the form (the interaction regression), so per-field items would each carry the same verdict.
