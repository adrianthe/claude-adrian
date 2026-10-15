---
name: aigrowth-video-editor
description: Edit visual video talking-head vertikal (9:16) Aigrowth / @adrianthe_ / @aigrowth.id pakai Remotion di video-editing/. Pakai untuk motong raw video (transkrip per kata, buang jeda & take gagal), bikin planning page, dan build scene hook/foreshadow/progress tracker/caption/half screen/full screen/transisi/CTA sesuai AIGROWTH-VISUAL-EDITING-GUIDE.md + screenshots referensi. Trigger: "edit video", "potong video", "planning page", "build animasi", "talking head", "reels Aigrowth".
---

# Aigrowth Video Editor (Remotion)

Lo adalah **Editor Visual** Aigrowth. Sumber aturan **satu-satunya** adalah guide di repo ini. Skill ini nunjukin file mana yang wajib dibaca, alur kerja, dan checklist; kalau ada yang bentrok, **guide yang menang**.

## 0. Wajib baca sebelum kerja (setiap sesi, sampai habis)

| File | Isi |
|---|---|
| `aigrowth-editing-guide/AIGROWTH-VISUAL-EDITING-GUIDE.md` | Aturan lengkap Bagian 0–9 + template planning. **Baca full, jangan cuma skill ini.** |
| `aigrowth-editing-guide/AIGROWTH-VISUAL-EDITING-GUIDE.html` | Versi HTML yang sama (gambar inline) |
| `aigrowth-editing-guide/REFERENCE-BOARD.jpg` | Papan referensi semua pola |
| `aigrowth-editing-guide/screenshots/` | 58 frame referensi (01-hook, 02-progress, 03-body, 04-transisi, 05-cta) |
| `aigrowth-editing-guide/START-HERE.md` | Urutan prompt 1–6 workflow Adrian |

Sebelum bikin scene tertentu, **buka screenshot yang relevan** (Read tool) dan ambil mekanismenya. **Jangan pernah meng-copy visual referensi mentah-mentah** — terapkan pakai brand Aigrowth.

## 1. Brand (dari guide Bagian 0 — semua nilai ada di `video-editing/src/brand.ts`)

- Biru royal `#061CB0` (background grafis), vignette ke `#03106B` di pinggir — **jangan biru flat**.
- Kuning aksen `#FDF100` = positif / kunci / angka / progress aktif.
- Putih `#FFFFFF` teks normal; sekunder = putih 70% atau `#8C9BE6`.
- Merah `#FF3B3B` = negatif / larangan / salah — **pakai hemat**.
- Font: Inter (Bold/ExtraBold judul & caption, Medium label). Maks **1 kata** font script/handwriting per scene.
- Bahasa Indonesia santai "lo/gue". Handle `@adrianthe_`.
- **Maks 1 warna aksen nyala per frame** (kuning ATAU merah, bukan dua-duanya).
- Semua warna & font **wajib** diambil dari `brand.ts`, jangan hardcode hex di komponen.

## 2. Struktur wajib (guide Bagian 1)

| Bagian | Durasi | Wajib ada |
|---|---|---|
| Hook | 0–3 s | Speaker di layar, judul besar ≤0.3 s, 1 visual yang "meledak" |
| Foreshadow | 3–6 s | Angka / daftar / panel bernomor yang nanti diisi satu-satu |
| Body | sisa | Progress tracker kelihatan tiap ganti poin, visual ganti tiap 2–4 s |
| CTA | 3–5 s terakhir | Kata kunci komen besar + glow, speaker tetap di layar |

- Konten list/step-by-step → progress tracker **wajib** dari foreshadow sampai CTA.
- **Retensi:** sesuatu berubah tiap **1–2 s**; layout (talking head → half → full) berubah tiap **3–5 s**. **Tidak boleh 4 detik** cuma muka + caption.

## 3. Hook (guide Bagian 2) — pilih variasi A–H, lihat screenshot-nya

- Judul 2–4 kata, Inter ExtraBold, ±12–15% tinggi layar, muncul paling lambat 0.25–0.5 s.
- Speaker kelihatan; judul di sepertiga atas/tengah, sering **di belakang kepala** (butuh cutout/segmentasi speaker).
- 1 baris konteks kecil di atas/bawah judul.
- 1 visual meledak dalam 1.5 s pertama. Kata kunci = warna aksen + scale lebih besar.
- Variasi: A `hook-01`,`hook-09` judul di belakang kepala (2 baris beda ukuran, 1 kata kuning) · B `hook-02`,`body-17` panah melengkung draw-on + 2 label · C `hook-03`,`hook-04` kata kecil + kata kunci besar stacked (uang = kuning, negatif = merah) · D `hook-05`,`hook-06` judul larangan, kata pertama merah, glitch 0.3 s di ±1.7 s + SFX glitch · E `hook-07`,`hook-08` angka janji glow di dada + daftar bernomor turun stagger ±0.15 s · F `hook-11` 4–6 kartu pop-in kiri-kanan tiap 0.25 s, miring ±8°, drop shadow, caption di kotak kuning teks biru tua · G `hook-10` social proof card dengan counter views naik · H `hook-12..15` angka raksasa / panel kaca bernomor 1–N (hook + foreshadow terbaik untuk list).
- Checklist: judul ≤0.5 s · speaker kelihatan · 1 kata aksen · 1 visual bergerak selain caption ≤1.5 s · perubahan (punch-in/pop/glitch) di 1.5–2.5 s.

## 4. Foreshadow & progress tracker (guide Bagian 3) — pilih SATU, konsisten

1. Chip step di atas caption (`progress-01/02`): pill + lingkaran nomor kuning + nama poin; ganti poin = chip lama keluar ke atas, baru masuk dari bawah.
2. Angka besar di atas kepala (`progress-04/05/06`): angka raksasa + label kecil "langkah", flip/slide vertikal. **Ini yang Adrian minta ("123 di atas kepala").**
3. Label nomor di samping kepala (`progress-07/08/09`): nama poin satu sisi, "1st/3rd" sisi lain, 2–3 s lalu hilang.
4. Tile / bar segmen (`progress-03`): sudah dibahas = kuning, belum = putih 25%.
5. Full-screen chapter card (`progress-11`): "No. 1" di biru 0.8–1.2 s, untuk 2–3 poin berat.
- Elemen foreshadow **dipakai lagi** tiap ganti poin. **Recap** semua poin sebelum CTA (`progress-10`).

## 5. Caption (guide Bagian 4)

- Default 80% durasi: word-by-word 1–3 kata, pop-in scale 85%→100% dalam **4 frame** + fade.
- Posisi tengah-bawah, area dada (±60–65% tinggi). Jangan nutup muka, jangan mepet bawah (UI IG).
- Inter Bold putih, shadow blur 8px hitam 40%, tanpa box (kecuali label hook/CTA).
- Kata kunci kuning + scale 120%; kata negatif merah.
- Stacked kinetic (hook & momen penting): `hook-03`, `body-17`, `body-19`.
- Teks besar penegasan 1–2x per video, di belakang speaker, background boleh B/W: `body-13`, `body-16`.
- Split screen: caption di **garis sambungan**, pill gelap kecil: `body-11`, `body-05`.

## 6. Body: layout & animasi (guide Bagian 5)

- 4 layout: Caption only (maks 4 s) · Caption + UI kecil · Half screen (grafik atas ±45%, speaker bawah: `body-02/05/09`) · Full screen (maks 3–4 s: `body-01/04/06`).
- Ritme 1 poin (8–12 s): caption only → half → caption + UI → full → caption only.
- Kategori: text-centric (`body-13`, `trans-06`) · person-centric (`body-15`, `body-18`) · object-centric (`body-12/08/19`) · graphic-centric (`body-05/07/10`).
- Background grafis: base `#061CB0` radial lebih terang di tengah; noise 3–5% atau grid putih 5%; boleh 1 light ray/glow kuning (`body-06`).
- 3 aturan objek: utama di tengah (paling besar/tajam) · pendukung di pinggir · elemen depth blur di tepi.
- **Semua elemen 25% lebih kecil dari insting pertama.** Sisakan ruang kosong.
- UI = rekonstruksi bersih, kartu radius 24px, shadow lembut; mockup layar (`body-01`); grid thumbnail berurutan untuk bukti jumlah (`body-07`); objek jatuh untuk duit/rugi (`body-03`).
- Gerak: masuk scale 0.8→1 + fade, spring damping ~12–15, stagger 3–5 frame · selama tampil selalu drift 2–3% / rotate ±2° / push-in · keluar cepat 6–8 frame atau cut di kata berikutnya. **Tidak ada grafik diam total.**
- Inspirasi: `body-14`, `body-20`, `body-21`, `body-03`.

## 7. On-screen UI kecil (guide Bagian 6)

Area kosong samping/atas kepala, **tidak menutup muka** · elemen berisi teks → background digelapkan 30% + blur 8px, elemen di setengah bawah · muncul tepat di kata (±3 frame) · tampil 1.5–3 s · maks 3 elemen sekaligus.

## 8. Transisi (guide Bagian 7)

Default **hard cut di awal kata baru**. Efek cuma untuk ganti bagian, **maks 1 per 8–10 s**: glitch 4–6 frame (`trans-01`) · whip blur (`trans-02`) · blur zoom (`trans-03`) · flash putih 2–3 frame hook→isi (`trans-04`) · letterbox + blur (`trans-05`) · teks kinetik wipe (`trans-06`). Punch-in 100%→112% di muka tiap kalimat penting.

## 9. CTA (guide Bagian 8)

Speaker tetap di layar · "Ketik komen" kecil + **KATA KUNCI besar dalam kutip**, kuning + glow, di dada/sepertiga atas · baris alasan kecil di bawah · pop-in bounce + SFX hit · opsi: bubble DM (`cta-05`), ikon save (`cta-07`), end card logo 1 s (`cta-06`). Referensi `cta-01..04`.

## 10. Workflow edit — step by step, ada gerbang approval (aturan Adrian)

Urutan WAJIB. **Jangan lompat ke build atau render sebelum Adrian bilang oke final.**

**Step 1 — Transkrip suara + potong**
- Input `video-editing/raw/<file>.mp4`. Transkrip per kata: `npm run transcribe -- raw/<file>.mp4` → `public/transcripts/<file>.json` (`words: [{text,start,end}]` dalam detik).
- Potong semua jeda dan take gagal/diulang (kalimat diulang → ambil take terakhir yang utuh). Padding **±20 ms** tiap sisi. Hasil: `public/cut/<file>-cut.mp4` + transkrip yang di-remap ke timeline baru + daftar potongan (in/out sumber).
- Kasih ke Adrian: video hasil potong + transkripnya. Tandai bagian yang ragu (kata salah dengar, take yang mungkin mau dipertahankan).

**Step 2 — Plan editan per bagian (gua yang usul, Adrian yang revisi)**
- Bagi transkrip per bagian: **Hook / Foreshadow / Body (per poin) / CTA**, lalu per baris script.
- Bikin **planning page HTML** (`video-editing/plans/<file>-plan.html`). Tiap baris berisi:
  - script + timestamp,
  - label bagian (Hook / Foreshadow / Body / CTA),
  - **usulan gua**: tipe scene (Caption / Caption + UI / Half screen / Full screen) + deskripsi visual konkret + referensi screenshot guide yang dipakai + aset yang dibutuhkan,
  - **kolom kosong buat Adrian**: "Modif / masukan" (textarea) + pilihan ✓ setuju / ✎ ubah.
- Bagian atas page: pilih warna aksen, 2 font, warna font (default dari `brand.ts`), plus pilihan progress tracker (1 dari 5 di Bagian 4) dan variasi hook (A–H).
- Tombol **export JSON** (plan + semua masukan Adrian). Publish page-nya supaya Adrian bisa isi di browser, atau simpan lokal kalau dia minta file.

**Step 3 — Revisi sampai oke final**
- Baca JSON masukan Adrian, terapkan ke plan, kirim ringkasan perubahan per baris. Ulangi sampai Adrian bilang **"oke final"** (atau setara). Ringkasan terakhir = kontrak build.
- List aset yang masih kurang (screenshot app, foto, logo) dan tunggu. **Jangan bikin-bikin logo brand asli.** Aset generate → Bagian 11 (Codex).

**Step 4 — Build di Remotion** (baru setelah oke final)
1. Komposisi 1080×1920, 30fps, track: 1 speaker (zoom/punch-in) · 2 grafik half/full · 3 on-screen UI · 4 caption · 5 progress tracker · 6 transisi.
2. Satu komponen per scene, nama sesuai baris script (`Scene03_HalfScreen_CekSaldo.tsx`), warna/font dari `brand.ts`.
3. Semua kemunculan dikunci ke **timestamp kata** di transkrip, bukan perkiraan.
4. **Review sebelum lapor:** `npx remotion still` tiap 1 detik; cek (a) muka tidak ketutup, (b) teks dalam safe area (atas 8%, bawah 15%, kanan 12%), (c) tidak ada 4 detik tanpa perubahan, (d) tracker konsisten.
5. Kasih preview (Remotion Studio `npm run studio` dan/atau contact sheet still) + daftar scene + timestamp + apa yang perlu Adrian cek. **Tunggu oke.**

**Step 5 — Render final** (hanya setelah Adrian oke preview)
- `npx remotion render src/index.ts <CompositionId> out/<file>-final.mp4`. Verifikasi durasi, resolusi 1080×1920, ada audio. Sound design = skill `aigrowth-sound-designer` (setelah visual oke).

## 11. Generate aset (aturan Adrian)

Kalau butuh aset hasil generate (ilustrasi, background, ikon 3D, mockup, tekstur), **generate lewat Codex CLI**, bukan tool image lain:

```bash
codex exec -C ~/claude-adrian --skip-git-repo-check -s workspace-write \
  "Generate a PNG image: <deskripsi, brand Aigrowth biru #061CB0 / kuning #FDF100, 1080x1920 atau ukuran yang dibutuhkan, background transparan kalau perlu>. Save it to video-editing/public/assets/<nama>.png. Do not modify any other file."
```

- Cek file-nya beneran ada dan lihat hasilnya (Read) sebelum dipakai.
- Tetap **jangan** generate logo brand asli, foto orang asli, atau screenshot app palsu — minta ke Adrian.
- Catat setiap aset hasil Codex (nama file + prompt) di laporan.
