# 02 — Migrate to Chakra v3 (theme + multipart components + hooks)

**Status:** DONE (storybook smoke test pending — see follow-ups)

## Why
Chakra v3 is a full API rewrite from v2. The theme system, the multipart component composition, and many hooks have new shapes. There's no way to upgrade incrementally — the whole library has to come along at once.

## What
A `./ui/src/` that compiles, type-checks, lints, and renders correctly under Chakra v3 + React 19. All 24 components rewritten to v3 idioms. Theme converted from `extendTheme()` to `createSystem()`. Storybook decorator wraps every story in the new `Provider`.

## Steps

### Theme
- [x] Read the v3 theming docs (theme tokens, semanticTokens, recipes for variants).
- [x] Rewrite `src/theme/index.ts`: `extendTheme({...})` → `createSystem(defaultConfig, defineConfig(...))`.
- [x] Custom colors (accentA, accentB, outlineColor, primary, wood) → tokens / semanticTokens. Brand palettes alias the built-in `pink`/`cyan`/`yellow` for both numeric (`primary.400`) and v3 palette (`primary.solid`) keys.
- [x] Fonts (Bitter, Fredoka One) → tokens.
- [x] Component overrides → recipes / slot recipes (per-component file).
- [x] Wire the system through a `Provider` component exported from the library (replaces `ChakraProvider` for typical consumers; raw `ChakraProvider` is still re-exported).

### Multipart components (highest-risk surface)
- [x] **Tabs** — v3 namespace API: `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`. Custom `Tabs.List` retains the fade-out scrollable indicator (`scrollWidth > clientWidth` runtime check).
- [x] **Accordion** — namespace API: `Accordion.Root`, `Accordion.Item`, `Accordion.ItemTrigger`, `Accordion.ItemContent`, `Accordion.ItemBody`, `Accordion.ItemIndicator`. Dashed-border styling kept as a slot recipe.
- [x] **NumberInput** — namespace API: `NumberInput.Root`, `NumberInput.Input`, `NumberInput.Control`, `NumberInput.IncrementTrigger`/`DecrementTrigger`. Custom Root wrapper for white background.
- [x] **Table** — namespace API: `Table.Root`, `Table.Header`, etc.
- [x] **Slider**, **Switch**, **Checkbox** — all namespace APIs, slot recipes carry custom styling (primary.300 fill).

### Hooks
- [x] Audit re-exports in `src/index.ts`. Removed v2-only hooks (`useBoolean`, `useColorMode`, `useColorModeValue`, `useStyleConfig`, `useToken`, `useToast`, `useDimensions`, `useOutsideClick`, `usePrefersReducedMotion`, `useClipboard`, `useControllableProp`). Kept v3-supported ones (`useDisclosure`, `useBreakpointValue`, `useMediaQuery`, `useConst`, etc.). `useMergeRefs` (v2) → `mergeRefs` (v3).
- [x] Custom hooks updated:
  - `useTheme` now wraps `useChakraContext()` and returns the system, not the raw theme dict. **Breaking** for any consumer indexing into `theme.colors.x.y` — they should call `system.token('colors.x.y')` instead.
  - `useBreakpointWidth`, `useSizeWidths` rewritten to use `system.token(...)`.
  - `useMobileFriendlyTooltip`, `useIsMobile`, `useWasRenderedOnClientAtLeastOnce` updated for React 19 / v3 imports.

### Components
- [x] Walked through every file in `src/components/`. All 24 compile cleanly under Chakra v3 + React 19.
- [x] Trimmed `src/index.ts` from ~447 lines (massive v2 re-export wall) to ~100 (only what consumers actually import). v2-only names (`StackDivider`, `Modal*`, `AlertDialog*`, `Form*` except FormLabel→Field shim, `UnorderedList`, `OrderedList`, `Tab`/`TabList`/`TabPanel`, etc.) are dropped.
- [x] `src/types.ts` (which imported the now-defunct `@chakra-ui/react-types`) deleted; nothing depended on it.

### Storybook
- [x] `.storybook/preview.ts` → `preview.tsx` adding the `<Provider>` decorator so every story renders under our theme.
- [x] All 24 story files updated for the v3 API (compound components, recipe inspection removed in favour of literal arrays, `isExternal`/`open`/`label` props matched to new component shapes).

### Verify
- [x] `tsc --noEmit` clean (strict mode, `noUnusedLocals`/`noUnusedParameters`).
- [x] `biome check .` clean.
- [ ] `pnpm run build:pkg` — **blocked**: `tsup` is referenced in `package.json` but not in `devDependencies` and not present in the lockfile. Pre-existing issue. Add `tsup` (or switch to `tsc -p .`) as a follow-up.
- [ ] `pnpm run dev` (Storybook) — visual smoke test deferred. The CLI tools needed are not in the lockfile in this environment; can be done after `pnpm install` from the repo root.

## Breaking changes for consumers (gridkit + gridbeam.xyz site)

Documented here so the engine migration (Stream 03 task 08) and website work (Stream 01) know what to update:

- `<ChakraProvider theme={theme}>` → `<Provider>` (or `<ChakraProvider value={system}>` for direct use).
- `useTheme()` returns the Chakra v3 system, not the raw theme dict. Replace `theme.colors.primary[400]` with `system.token('colors.primary.400')`, or read CSS vars via `var(--chakra-colors-primary-400)`.
- `<Tabs>`/`<TabList>`/`<Tab>`/`<TabPanel>` → `<Tabs.Root>`/`<Tabs.List>`/`<Tabs.Trigger value="…">`/`<Tabs.Content value="…">`.
- `<Accordion><AccordionItem><AccordionButton/><AccordionPanel/></AccordionItem></Accordion>` → `Accordion.Root`/`Accordion.Item value="…"`/`Accordion.ItemTrigger`/`Accordion.ItemContent` + `Accordion.ItemBody`.
- `<NumberInput><NumberInputField/></NumberInput>` → `NumberInput.Root`/`NumberInput.Input` + `NumberInput.Control` for steppers.
- `<Slider><SliderTrack><SliderFilledTrack/></SliderTrack><SliderThumb/></Slider>` → `Slider.Root`/`Slider.Control`/`Slider.Track`/`Slider.Range`/`Slider.Thumb index={0}`.
- `<Checkbox/>` → `Checkbox.Root` + `Checkbox.HiddenInput` + `Checkbox.Control` + `Checkbox.Label`.
- `<Switch/>` → `Switch.Root` + `Switch.HiddenInput` + `Switch.Control` (with `Switch.Thumb` inside) + optional `Switch.Label`.
- `<Modal/>`, `<AlertDialog/>` → use `Dialog.*` from `@chakra-ui/react` directly (not re-exported by us).
- `<FormControl>` / `<FormHelperText>` / `<FormErrorMessage>` → use `Field.*` from `@chakra-ui/react` directly. We re-export `FormLabel` as an alias for `Field.Label` only.
- `colorScheme` prop → `colorPalette` prop on most components.
- `isOpen` → `open`, `isDisabled` → `disabled`, `isExternal` (on Link) → `target="_blank"`.
- `sx` prop → `css` prop (Chakra v3 uses Emotion's `css` directly).
- `useColorModeValue`, `useColorMode` removed. v3 has a different color-mode story; consumers depending on these need a refactor.
- `<UnorderedList>` / `<OrderedList>` → `<List.Root as="ul">` / `<List.Root as="ol">`.
- `forwardRef` from React, not from `@chakra-ui/react`.

## Follow-ups (split out of this task)

- **`tsup` not installed** — `package.json` references `tsup src` but the binary is missing from the lockfile. Either add `tsup` to devDependencies, or switch to `tsc -p .` for the package build. Filed on Stream 02 task 01 as a wash-up.
- **Brand colour values** — Chakra v3's built-in `pink`/`cyan`/`yellow` palettes are slightly different shades from v2. Brand-perfect colours can be re-locked once the website lands and we eyeball it; for now, primary remains pink-flavoured.
- **Visual storybook regression test** — needs `pnpm run dev` in an environment with the full lockfile installed. Track separately.

## Notes
- Used the official v2-to-v3 migration guide (https://chakra-ui.com/docs/get-started/migration) as a checklist.
- Trimmed `src/index.ts` significantly during the migration — stops re-exporting v2 surface that consumers shouldn't be touching anyway.
- `core/ui` deletion (engine task 08) and the website bootstrap (Stream 01 task 01) can both proceed against this v3 library now.

## Depends on
- [./01-version-alignment.md](./01-version-alignment.md)
