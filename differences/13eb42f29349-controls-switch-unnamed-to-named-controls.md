---
title: "Controls switch: unnamed to named Controls"
status: sanctioned
route: /designs/bed-frame
axis: accessibility
kind: changed
---
## Legacy

`gridkit@v0.9.0 core/parameters/src/index.tsx:50-63` `<FormLabel htmlFor="show-controls">` beside `<Switch id="show-controls" role="menuitem">`; Chakra v2 puts the id on the switch's root label, so the input has no name (`legacy.aria.yaml`: `menuitem:` / `checkbox`).

## Current

`@villagekit/parameters@0.10.0 src/index.tsx:50-69` identical JSX; Chakra v3's `Field.Root` context gives the hidden input `aria-labelledby` pointing at the field label (`@ark-ui/react` `switch-hidden-input` reads the field context); the `htmlFor` pairing itself still dangles, as on the parts switch (the run's first `audit/designs__bed-frame/dom/current.aria.yaml` capture and a `main` aria snapshot on `http://localhost:3000/designs/bed-frame`, plan cf52c388: `menuitem "Controls"` / `checkbox "Controls"`; a networkidle capture can catch the page before the controls mount, see the log on [[9d4e2e43543e]]).

## Verdict

rule: upgrade (identical source; the name is what the v3 field wiring produces)

## Log

- 2026-09-12: Template.
