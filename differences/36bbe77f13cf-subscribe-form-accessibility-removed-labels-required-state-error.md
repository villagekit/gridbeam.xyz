---
title: "Subscribe form accessibility removed: labels, required state, error association, focus and announcements"
status: regression
route: /subscribe
axis: accessibility
kind: removed
---
## Legacy

`packages/applet-subscribe/src/component.tsx:114-163` `FormControl isInvalid isRequired`, `FormLabel htmlFor`, `Input id`, `FormHelperText`, `FormErrorMessage` per field (`audit/subscribe/dom/legacy.aria.yaml:26-30` `textbox "Preferred name"`); react-hook-form's default `shouldFocusError` moves focus to the first invalid field; `useToast` announces "Error!" and "Subscription successful!" (`:77-93`); `page.tsx:41-43,50-52` `<span role="img" aria-label="seedling">` and `aria-label="sunflower"` (`legacy.aria.yaml:23-25` `img "seedling"`).

## Current

No form controls, toasts or `role="img"` spans under `main` in `audit/subscribe/dom/current.aria.yaml:22-40`.

## Verdict

## Log
