# Mulai di Claude Code

Buka Terminal, lalu:

```
cd ~/claude-adrian
claude
```

Set model ke Opus dan effort ke high. Kirim prompt-prompt di bawah ini **satu-satu**, tunggu tiap langkah selesai.

---

## Prompt 1 — Jadiin skill (sekali aja)

```
Baca 2 file ini sampai habis, termasuk semua gambar di folder screenshots:
- aigrowth-editing-guide/AIGROWTH-VISUAL-EDITING-GUIDE.md
- aigrowth-editing-guide/AIGROWTH-SOUND-DESIGN-GUIDE.md

Lalu jadikan 2 skill di .claude/skills/:
1. aigrowth-video-editor — edit visual video talking-head Aigrowth pakai Remotion (pakai guide visual + screenshots sebagai referensi)
2. aigrowth-sound-designer — sound design pakai library di sfx/

Skill harus nunjuk ke file guide dan folder screenshots/sfx yang ada, jangan diringkas sampai aturannya hilang.
```

## Prompt 2 — Setup Remotion (sekali aja)

```
Setup project Remotion baru di folder video-editing/ (1080x1920, 30fps).
Install semua yang dibutuhin, termasuk whisper (lewat @remotion/install-whisper-cpp) buat transkrip per kata.
Bikin file brand.ts dengan warna & font Aigrowth dari guide visual.
Kalau ada yang perlu gue install manual (misal Node.js), kasih tau langkahnya.
```

## Prompt 3 — Potong video

Taruh raw video di `video-editing/raw/` dulu.

```
Pakai skill aigrowth-video-editor. Ini raw video gue: video-editing/raw/[nama-file].mp4
Bikin transkrip per kata, potong semua jeda dan take yang gagal/diulang. Padding sekitar 20ms.
Kasih gue video hasil potong + transkripnya.
```

## Prompt 4 — Planning page

```
Dari transkrip itu, bikinin planning page (HTML) buat gue:
- Atas: pilih warna aksen, 2 font, warna font
- Bawah: tiap baris script di kiri, kotak kosong di kanan buat gue nulis rencana visual,
  plus pilihan tipe scene: Caption / Caption + UI / Half screen / Full screen,
  dan label bagian: Hook / Foreshadow / Body / CTA
- Tombol export plan ke JSON
```

## Prompt 5 — Build animasi

```
Ini plan gue: [tempel JSON / file plan].
Pakai skill aigrowth-video-editor dan bangun semua scene di Remotion sesuai plan dan guide.
Sebelum mulai, list dulu aset apa aja yang lo butuh dari gue (screenshot, logo, foto).
```

## Prompt 6 — Sound design

```
Pakai skill aigrowth-sound-designer. Sound design video yang barusan lo edit.
Mulai dari analisa + cue sheet dulu, kasih ke gue, baru pass 1-3.
```

Setelah gue approve:

```
Tambah musik [nama file] di bawah talking head aja, -19 dB.
```
