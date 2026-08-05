# 18 — LinkCard's overlay anchor has no accessible name

**Status:** TODO (touches `../ui`; found while doing [task 06](./06-linkbutton-nextlink.md))

## Why

`@villagekit/ui`'s `LinkCard` (`ui/src/components/LinkCard.tsx`) uses the Chakra `LinkBox`/`LinkOverlay` pattern with an **empty** `LinkOverlay`:

```tsx
<Heading as="h3">{title}</Heading>
<Text>{description}</Text>
<LinkOverlay href={href} />
```

The anchor has no content and no label, so assistive tech announces an unnamed link. There are twelve of these on the site (landing ×3, about ×3, tools-and-resources ×N, legal ×2, subscribe ×2).

Legacy v2 put `aria-label={title}` on the `HoverCard` — on the card `<div>`, not the anchor — so it didn't name the link either. This is a legacy bug carried forward, not a regression; restoring legacy verbatim doesn't fix it.

## What

Every `LinkCard` link announces its title.

## Steps

- [ ] Verify with a screen reader or an a11y checker (Storybook has `@storybook/addon-a11y` wired up in `../ui`) that the link is announced without a name.
- [ ] Fix in `../ui`. The idiomatic Chakra `LinkBox` fix is to wrap the *heading text* in the `LinkOverlay` rather than leaving it empty:
      `<Heading as="h3"><LinkOverlay href={href}>{title}</LinkOverlay></Heading>`.
      Check that the whole-card click target still works (`LinkOverlay` stretches over the `LinkBox` via `::after` either way) and that the heading's styling is unchanged.
- [ ] Keep the `linkComponent` prop working (added in 1.2.0 for client-side routing) — it moves with the `LinkOverlay`.
- [ ] Decide whether `aria-label={title}` on the card wrapper is still wanted once the link is named (probably not — it becomes a duplicate announcement).
- [ ] Bump + publish `@villagekit/ui` (**publish is gated on Mikey**), then `pnpm update @villagekit/ui --latest` in this repo.
- [ ] Re-check the twelve site call sites render unchanged.

## Notes

- This is a deliberate deviation from the legacy baseline: legacy's `aria-label`-on-the-card approach doesn't name the link, so "restore legacy" is not the right answer here. Stated reason: correctness for assistive tech.
- Related a11y items live in [`./12-carousel-a11y.md`](./12-carousel-a11y.md) and [`./15-parity-nits.md`](./15-parity-nits.md); batch the `../ui` release with any other ui-side fixes those turn up.

## Depends on

- Nothing. Pairs with any other `../ui` change so one release covers them all.

## Files

- `../ui/src/components/LinkCard.tsx` (sibling repo)
- Site call sites: `app/page.tsx`, `app/about/page.tsx`, `app/tools-and-resources/page.tsx`, `app/legal/page.tsx`, `app/subscribe/page.tsx`
