# Setup Tim — Editing Video Aigrowth pakai Claude

Repo ini bikin komputer lo bisa ngedit video talking-head Aigrowth **persis kayak Adrian**: Claude motong video, bikin plan per baris, build animasi di Remotion, sound design, sampai render — pakai skill dan guide yang sama.

## Isi repo

| Folder / file | Isinya |
|---|---|
| `.claude/skills/aigrowth-video-editor/` | Skill edit visual (potong → plan → build → render). Otomatis aktif kalau folder ini dibuka di Claude Code |
| `.claude/skills/aigrowth-sound-designer/` | Skill sound design (cue sheet → whoosh → texture → hit → musik) |
| `aigrowth-editing-guide/` | Guide visual + sound + 58 screenshot referensi. **Sumber aturan utama** |
| `sfx/` | Library SFX Aigrowth |
| `video-editing/` | Project Remotion (1080×1920, 30fps): `src/brand.ts`, script transkrip/potong/planning, contoh edit `src/edit/IMG_5760/` |
| `setup.sh` | Install semuanya sekali jalan |
| `CLAUDE.md` | Instruksi project buat Claude |

## Yang lo butuhin

- **Mac** (Apple Silicon disarankan), kosong minimal **15 GB**.
- **Akun Claude lo sendiri** (Pro / Max, atau seat Claude Team dari kantor). Jangan pakai login orang lain — ketentuan Anthropic nggak ngizinin akun dipakai bareng.
- **Akun ChatGPT** (buat Codex, generate aset gambar). Opsional, tapi kepake kalau butuh maskot/ikon/mockup.
- **Homebrew** — kalau belum ada, install dari https://brew.sh

## Install (sekali aja)

```bash
git clone https://github.com/adrianthe/claude-adrian.git ~/claude-adrian
cd ~/claude-adrian
./setup.sh
```

`setup.sh` bakal nginstall/ngecek: Xcode Command Line Tools, Node 22+, ffmpeg, Claude Code, Codex CLI, dependency Remotion, link SFX, whisper.cpp + model bahasa Indonesia (±1.5 GB), lalu tes render 1 frame. Kalau berhenti di tengah, ikutin pesannya lalu jalankan ulang — aman diulang.

Habis itu login sekali:

```bash
claude        # ketik /login, masuk pakai akun Claude lo
codex login   # masuk pakai akun ChatGPT lo
```

## Cara edit

Buka folder `~/claude-adrian` di **Claude Code** (app desktop: tab Code → pilih folder ini; atau terminal: `cd ~/claude-adrian && claude`). Set model ke Opus, effort high.

1. **Taruh video raw** di `video-editing/raw/`, terus bilang:
   > Pakai skill aigrowth-video-editor. Ini raw video gue: video-editing/raw/NAMA.MOV. Transkrip, potong jeda & take gagal, padding 20ms.

   Claude ngasih video hasil potong + transkrip.
2. **Plan per bagian.** Claude bikin planning page (`video-editing/plans/NAMA-plan.html`): tiap baris script ada usulan edit + kolom masukan lo + Setuju/Ubah. Buka di browser, isi, klik **Export JSON**, kirim file-nya ke Claude.
3. **Revisi sampai oke final.** Claude baru build setelah lo bilang "oke final". Aset yang kurang: kirim file-nya, atau minta Claude generate lewat Codex.
4. **Preview.** Claude render preview + daftar scene per detik. Cek, kasih koreksi.
5. **Sound design.** "Pakai skill aigrowth-sound-designer" → cue sheet → SFX pass 1–3. Musik: taruh file di `video-editing/public/music/`, bilang "tambah musik NAMA di bawah talking head aja, -19 dB".
6. **Render final** → `video-editing/out/NAMA-final.mp4`.

Lihat hasil kapan aja di Remotion Studio: `cd video-editing && npm run studio`.

## Aturan tim

- **Jangan commit video** (raw, hasil potong, render) — udah di-`.gitignore`. Simpan/kirim video lewat Drive.
- Warna & font cuma diambil dari `video-editing/src/brand.ts`. Aturan visual/sound ada di guide; kalau Adrian ubah aturan, update guide/skill-nya lalu push, biar semua ikut.
- Aset generate (maskot, ikon, mockup) lewat **Codex**. Logo brand asli & foto orang asli minta file aslinya, jangan di-generate.
- `UI BLIP.wav` jangan dipakai (kata Adrian ganggu).
- Contoh project lengkap ada di `video-editing/src/edit/IMG_5760/` (kodenya bisa dipelajari, tapi video raw-nya nggak ikut di repo jadi nggak bisa dirender).

## Troubleshooting

| Masalah | Solusi |
|---|---|
| `claude: command not found` habis setup | Tutup & buka lagi Terminal (PATH baru ke-load), atau `export PATH="$HOME/.local/bin:$PATH"` |
| Whisper gagal compile | Pastikan Xcode Command Line Tools ke-install: `xcode-select --install`, lalu `./setup.sh` lagi |
| Render error "404 ... public/sfx/..." | `cd video-editing && npm run setup:sfx` |
| Node versi lama | `brew upgrade node` |

## Lisensi Remotion

Remotion gratis buat individu dan perusahaan sampai 3 karyawan; tim yang lebih besar butuh **Company License** dari remotion.dev. Cek detailnya di https://www.remotion.dev/license sebelum dipakai rame-rame.
