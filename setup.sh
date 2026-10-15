#!/usr/bin/env bash
# Setup komputer tim untuk editing video Aigrowth (Claude Code + Remotion + whisper + Codex).
# Pakai: ./setup.sh   (aman dijalankan ulang)
set -euo pipefail
cd "$(dirname "$0")"

say()  { printf "\n\033[1;34m==> %s\033[0m\n" "$1"; }
ok()   { printf "\033[1;32m✓ %s\033[0m\n" "$1"; }
fail() { printf "\n\033[1;31m✗ %s\033[0m\n" "$1"; exit 1; }

[[ "$(uname)" == "Darwin" ]] || fail "Setup ini untuk macOS."

say "1/8 Xcode Command Line Tools (buat compile whisper)"
if ! xcode-select -p >/dev/null 2>&1; then
  xcode-select --install || true
  fail "Klik Install di popup yang muncul, tunggu selesai, lalu jalankan ulang ./setup.sh"
fi
ok "Command Line Tools ada"

say "2/8 Homebrew"
command -v brew >/dev/null || fail "Homebrew belum ada. Install dulu dari https://brew.sh lalu jalankan ulang ./setup.sh"
ok "Homebrew ada"

say "3/8 Node.js + ffmpeg"
for p in node ffmpeg; do brew list "$p" >/dev/null 2>&1 || brew install "$p"; done
NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]')
(( NODE_MAJOR >= 22 )) || fail "Node $NODE_MAJOR terlalu lama (butuh 22+). Jalankan: brew upgrade node"
command -v python3 >/dev/null || fail "python3 nggak ketemu (harusnya ikut Command Line Tools)"
ok "node $(node -v), $(ffmpeg -version | head -1 | cut -d' ' -f1-3)"

say "4/8 Claude Code"
if ! command -v claude >/dev/null; then
  curl -fsSL https://claude.ai/install.sh | bash
  export PATH="$HOME/.local/bin:$PATH"
fi
ok "$(claude --version)"

say "5/8 Codex CLI (buat generate aset gambar)"
command -v codex >/dev/null || npm install -g @openai/codex
ok "$(codex --version)"

say "6/8 Dependency Remotion"
(cd video-editing && npm ci)
ok "node_modules siap"

say "7/8 Library SFX + whisper.cpp (model ±1.5 GB, sekali aja)"
(cd video-editing && bash scripts/link-sfx.sh)
if [[ ! -f video-editing/whisper.cpp/ggml-medium.bin ]]; then
  (cd video-editing && npm run whisper:install)
fi
ok "SFX + whisper siap"

say "8/8 Tes render"
(cd video-editing && npx remotion still src/index.ts BrandCheck out/brandcheck.png --frame=45 >/dev/null)
ok "Render jalan: video-editing/out/brandcheck.png"

printf "\n\033[1;32mSelesai!\033[0m Tinggal login (sekali):\n"
printf "  1. claude   -> ketik /login, masuk pakai akun Claude LO SENDIRI\n"
printf "  2. codex login   -> masuk pakai akun ChatGPT lo (buat generate aset)\n"
printf "Lalu buka folder ini di Claude Code dan ikutin SETUP-TIM.md bagian 'Cara edit'.\n"
