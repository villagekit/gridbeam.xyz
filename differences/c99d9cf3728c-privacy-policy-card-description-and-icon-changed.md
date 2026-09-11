---
title: "Privacy policy card: description and icon changed"
status: open
route: /legal
axis: copy
kind: changed
---
## Legacy

`packages/applet-legal/src/pages/legal.tsx:36-42` `title="Privacy policy"`, `icon={FaLock}`, `description="How we collect, use, store, and share personal information."`, `href="/legal/privacy-policy"`.

## Current

`app/legal/page.tsx:53-59` same title and href, `icon={<FaUserShield />}`, `description="What we collect, what we don't, and what we do with anything you send us. Short — we collect almost nothing."`.

## Verdict

## Log

- 2026-09-12: The icon swap (FaLock to FaUserShield) rides with the copy item since it is the same card; the operator's verdict covers both, or the icon is split out on request.
