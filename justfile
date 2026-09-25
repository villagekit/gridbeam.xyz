_default:
    @just --list

# The gate (CLAUDE.md, Commands): every check, one copy. Bound it: `timeout 900 just check`.
check: fmt-check typecheck test build generated

# tests only, the inner loop
test:
    pnpm test

# the full build
build:
    pnpm build

# format, writing
fmt:
    pnpm format

# format as a check, no writes
fmt-check:
    pnpm lint

# language recipes
typecheck:
    pnpm typecheck

# the committed designs data matches what the build regenerated (CI's drift check)
generated:
    git diff --exit-code app/_lib/designs-data.generated.ts
