# claude-adrian — editing video Aigrowth

Repo kerja konten @adrianthe_ / @aigrowth.id. Bahasa: Indonesia santai (gue/lo).

## Editing video talking-head
- Edit visual → skill `aigrowth-video-editor`. Sound design → skill `aigrowth-sound-designer`. Baca guide di `aigrowth-editing-guide/` sampai habis sebelum kerja; guide menang kalau bentrok dengan skill.
- Project Remotion ada di `video-editing/` (1080×1920, 30fps). Warna & font cuma dari `video-editing/src/brand.ts`.
- Alur wajib: transkrip + potong → planning page per baris (usulan + kolom masukan) → revisi sampai user bilang **oke final** → build → preview → oke → render. Jangan build atau render final sebelum ada oke.
- Satu folder per video: `video-editing/src/edit/<NAMA>/` (timing.ts, scene per baris `SceneNN_Tipe_Nama.tsx`, `sfx-cues.ts`). Contoh lengkap: `src/edit/IMG_5760/`.
- Script: `npm run transcribe -- raw/<file>`, `npm run cut -- raw/<file> <in> <out>`, `npm run plan-page -- <NAMA>` (jalan dari `video-editing/`).
- Aset gambar yang perlu di-generate → Codex CLI (`codex exec ... -s workspace-write`), simpan di `video-editing/public/assets/`, cek hasilnya sebelum dipakai. Logo brand asli / foto orang asli → minta file aslinya.
- SFX di `sfx/` di-hard-link ke `video-editing/public/sfx/` (`npm run setup:sfx`); jangan symlink. Jangan pakai `UI BLIP.wav`.
- Video (raw, cut, render, mp4 aset) jangan di-commit.

## Video explainer 3D (faceless, tanpa speaker)
- Baca `aigrowth-editing-guide/AIGROWTH-EXPLAINER-3D-GUIDE.md` sampai habis. Brand, caption, safe area, dan level SFX tetap sama dengan talking-head (`brand.ts`, guide sound); yang beda format scene-nya.
- Alur wajib: riset + `FACTS.md` → naskah → narasi + QA whisper → planning page per kalimat → **oke final** → build → still per scene → preview → oke → render.
- Satu folder per video: `video-editing/src/explainer/<NAMA>/`. Kit 3D bersama di `video-editing/src/three/`.
