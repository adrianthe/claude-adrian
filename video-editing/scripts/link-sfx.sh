#!/usr/bin/env bash
# Hard link library ../sfx ke public/sfx (symlink nggak ikut ke bundle render Remotion).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/sfx
for f in ../sfx/*; do ln -f "$f" "public/sfx/$(basename "$f")"; done
echo "$(ls public/sfx | wc -l | tr -d ' ') file SFX ter-link ke public/sfx"
