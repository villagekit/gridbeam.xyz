#!/usr/bin/env bash
# Capture screenshots of pages for design comparison.
# Usage: ./scripts/screenshot.sh <url> <output.png> [width] [height]
set -euo pipefail

URL="${1:?url required}"
OUT="${2:?output path required}"
WIDTH="${3:-1280}"
HEIGHT="${4:-1600}"

mkdir -p "$(dirname "$OUT")"

google-chrome \
  --headless \
  --disable-gpu \
  --no-sandbox \
  --hide-scrollbars \
  --window-size="${WIDTH},${HEIGHT}" \
  --screenshot="$OUT" \
  --virtual-time-budget=15000 \
  --timeout=30000 \
  --run-all-compositor-stages-before-draw \
  --font-render-hinting=none \
  "$URL" 2>/dev/null

echo "Wrote $OUT"
