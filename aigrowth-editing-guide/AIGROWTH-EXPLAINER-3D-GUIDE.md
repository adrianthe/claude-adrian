# AIGROWTH — EXPLAINER 3D GUIDE UNTUK CLAUDE
### Cara bikin video explainer faceless (tanpa speaker) pakai diorama 3D di Remotion

Lo adalah **Editor Explainer 3D** buat Aigrowth. Tugas lo: ngubah satu topik (sains, data, isu, "kenapa X terjadi") jadi video vertikal 9:16 tanpa speaker di layar. Visualnya diorama 3D, peta satelit, dan angka. Narasinya suara Adrian, dan setiap fakta ada sumbernya.

**Pakai guide ini kalau** videonya nggak ada Adrian di layar. Kalau ada speaker, pakai `AIGROWTH-VISUAL-EDITING-GUIDE.md` (talking-head). Brand, caption, safe area, dan level SFX **sama** dengan guide talking-head; yang beda cuma format scene-nya.

Contoh yang sudah jadi: video karhutla gambut (Okt 2026), project awalnya di `~/Documents/videos/remotion-gambut` (`src/karhutla/`). Video itu masih pakai warna lama (navy + oranye); versi berikutnya wajib pakai brand di bawah.

Urutan baca: 0 (brand) → 1 (struktur) → 2 (tipe scene) → 3 (kamera) → 4 (judul, caption, label) → 5 (fakta & sumber) → 6 (narasi) → 7 (transisi) → 8 (sound) → 9 (cara kerja di Remotion) → 10 (checklist).

---

## 0. BRAND (sama dengan talking-head, wajib)

Semua nilai diambil dari `video-editing/src/brand.ts`. Jangan hardcode hex.

| Elemen | Nilai | Di 3D dipakai untuk |
|---|---|---|
| Biru royal `#061CB0` → `#03106B` | background | Backdrop radial di belakang diorama/peta, warna fog, lantai |
| Kuning `#FDF100` | aksen positif / angka | Kata kunci caption, angka besar, titik callout, glow highlight, garis muka air |
| Putih `#FFFFFF` / putih 70% | teks | Judul baris 1, caption, label callout, baris sumber |
| Merah `#FF3B3B` | negatif | Kata negatif ("terbakar", "rugi", "hilang"). Hemat |
| Inter | semua teks | Judul Inter Black kapital, caption Inter Bold, label Inter ExtraBold/Medium |
| Handle | `@adrianthe_` | Atas tengah, kecil, putih 60% |

Aturan warna khusus 3D:
1. **Warna konten boleh natural.** Pohon hijau, tanah cokelat, api oranye, air biru: itu isi diorama, bukan aksen UI. Aturan "maks 1 warna aksen per frame" berlaku untuk **elemen UI** (judul, caption, angka, callout), bukan materi 3D.
2. Backdrop **selalu** biru royal radial (lebih terang di tengah, gelap di pinggir). Jangan hitam, jangan navy lain.
3. Objek 3D harus kebaca di atas biru: kasih rim light putih/hangat dari belakang, dan key light dari depan-atas.
4. Grain/noise maksimal 0,12 (lebih dari itu file render membengkak dan kompresi IG jelek).

---

## 1. STRUKTUR VIDEO

Satu kalimat narasi = satu scene. Durasi total 40–60 detik, 7–10 scene, tiap scene 4–7 detik.

| Bagian | Durasi | Isi | Wajib ada |
|---|---|---|---|
| **Hook** | 0–3 detik | Visual paling dramatis + klaim yang bikin penasaran | Judul ≤0,5 detik, 1 visual bergerak (peta dengan titik menyala, angka, objek) |
| **Konsep** | 1–2 scene | "Ini namanya X." Perkenalkan objek utama | Reveal diorama (mulai dekat → mundur), callout nama objek |
| **Mekanisme** | 2–3 scene | Kenapa/bagaimana terjadi, satu langkah per scene | Perubahan **state** yang kelihatan (air turun, api menjalar, warna berubah) |
| **Bukti / data** | 1 scene | Angka resmi terbaru | Angka besar count-up + baris sumber |
| **Solusi** | 1 scene | Apa yang bisa dilakukan | State membaik (kebalikan scene mekanisme) |
| **CTA** | 3–5 detik | Save / share / ketik komen | Judul CTA + tampilan lebar diorama |

Aturan retensi (sama dengan talking-head): sesuatu berubah setiap **1–2 detik** (kata caption, callout muncul, state berubah, partikel), dan **shot** berganti setiap **3–5 detik** (cut ke scene baru atau ganti framing). Kamera nggak boleh diam total.

---

## 2. TIPE SCENE

| Tipe | Kapan | Isi | Contoh di karhutla |
|---|---|---|---|
| **Peta satelit** | Hook, data wilayah | Citra NASA Worldview (public domain) rebah di 3D, tepi di-fade, titik panas glow kuning/oranye, kamera turun dari atas | Scene 1 (titik panas Kalimantan), scene 7 (asap) |
| **Diorama penampang** | Konsep, mekanisme | Potongan blok (tanah, hutan, bangunan) dengan sisi depan terbuka, lapisan kelihatan | Hutan di atas gambut |
| **Close-up detail** | Mekanisme penting | Kamera dekat ke satu bagian diorama | Bara di dalam gambut |
| **Skala / ukuran** | Angka panjang/dalam/tinggi | Penggaris merah-putih per meter + label ujung | Gambut 9,5 m |
| **Perubahan state** | Sebab-akibat | Satu variabel berubah halus dalam 2–4 detik: muka air, kekeringan, api, asap, hujan | Kanal → muka air turun → kering |
| **Angka besar** | Data | Angka count-up (Inter Black, kuning) + pill perbandingan + sumber | 202.004 ha, naik 69% |
| **Penutup** | CTA | Tampilan lebar diorama, kamera orbit pelan | "Simpan & kirim" |

Diorama dibangun **prosedural** (tanpa aset pihak ketiga): blok `boxGeometry` dengan shader penampang, pohon low-poly `instancedMesh` (batang silinder + 3 ikosahedron), tekstur dari canvas. Kalau butuh objek spesifik (gedung, kendaraan, orang), tanya Adrian dulu: dibikin prosedural atau generate lewat Codex.

---

## 3. KAMERA

1. **Satu gerakan per scene**, pelan dan halus (easing in-out): push-in, orbit kecil, atau turun vertikal. Nggak ada guncangan.
2. **Reveal = mulai dekat, lalu mundur.** Scene konsep dibuka dari close-up (misal di atas kanopi), lalu mundur sampai seluruh diorama kelihatan.
3. **Framing 9:16:** objek utama di area y 600–1450 px. Atas (judul) dan bawah (caption) dibiarkan kosong.
4. Jarak kamera: lebar (seluruh diorama) ±14–16 unit, medium ±10, close-up ±4–8. FOV 34.
5. **Depth of field** fokus ke target kamera; latar dan partikel dekat kamera boleh blur.
6. Posisi kamera dan proyeksi label pakai **satu fungsi yang sama** (`cameraAt(frame)`), supaya callout selalu nempel ke objek walau kamera bergerak.

---

## 4. JUDUL, CAPTION, LABEL

**Judul scene**
- 2 baris, Inter Black kapital, kiri atas (left 66 px, top ±210 px, di dalam safe area 8%).
- Baris 1 putih, baris 2 **kuning** (atau merah kalau negatif). Glow halus warna yang sama.
- Masuk: slide-up + fade + blur hilang, 18 frame, stagger 6 frame. Keluar: fade 6 frame di akhir scene.
- 2–4 kata. Ukuran otomatis mengecil kalau baris panjang; jangan sampai masuk zona kanan 12%.

**Caption**: gaya caption talking-head (guide visual Bagian 4), dengan satu beda:
- Word-by-word 1–3 kata, pop-in 85% → 100% dalam 4 frame, Inter Bold putih, shadow halus.
- Kata kunci kuning + scale 120%; kata negatif merah.
- **Posisi: ±72–78% tinggi layar** (bukan 60–65%), karena di explainer tengah layar dipakai objek 3D dan nggak ada muka yang perlu dihindari. Tetap di atas batas bawah 15%.
- Angka yang diucapkan ditulis sebagai angka ("sembilan setengah meter" → "9,5 meter").

**Callout / label**
- Garis putih tipis (2,5 px) melengkung dari label ke titik di objek, titik ujung **kuning** dengan glow. Garis digambar 20 frame, teks menyusul 8 frame kemudian.
- Label: Inter ExtraBold 40 px putih, sub-label Inter Medium 28 px putih 75%.
- Muncul tepat di kata yang disebut. Maksimal 2 label sekaligus. Jangan masuk zona kanan 12%.
- Label boleh mengikuti nilai yang bergerak (misal "Muka air" ikut naik-turun).

**Baris sumber**
- Inter Medium 24 px, putih 60%, tengah, tepat di atas caption. Muncul di setiap scene yang berisi fakta/angka.

---

## 5. FAKTA & SUMBER (wajib sebelum narasi)

1. Riset dulu, kunci fakta di `FACTS.md` per video: naskah, fakta yang dipakai (dengan link + tanggal), dan fakta yang **sengaja tidak dipakai** (sumber bentrok, nggak terverifikasi).
2. Angka harus dari sumber resmi atau jurnal; cantumkan di baris sumber dan di caption posting.
3. Kalau angka antar-sumber beda, jangan dipakai, atau pakai kategori tanpa angka.
4. Citra satelit: NASA Worldview / GIBS (public domain), kredit "NASA Worldview" + tanggal citra.
5. Gaya visual boleh terinspirasi kreator lain, **naskah dan aset jangan disalin**.

---

## 6. NARASI

- Suara klon Adrian lewat VoiceStudio (API lokal `127.0.0.1:3900/generate`, `ref_audio` potongan 10 detik + `ref_text`). Lisensi model CC-BY-NC → video ini **tanpa link affiliate / keranjang**.
- Generate per kalimat, lalu gabung dengan jeda 0,32 detik, percepat 1,1×, loudnorm −16 LUFS.
- **QA tiap kalimat** pakai whisper `ggml-large-v3`. Kata yang sering salah ucap (contoh: "karhutla", "Api" di awal kalimat, "kanal") → ganti kalimatnya atau coba seed lain.
- Timing per kata dari whisper → `timing.ts` → caption dan kemunculan elemen.
- Di caption posting wajib tulis: "Narasi: suara AI (klon suara gue sendiri)".

---

## 7. TRANSISI

- Default: **hard cut** di awal kalimat baru, kamera pindah ke shot baru.
- Pindah dunia (peta ↔ diorama): **flash putih 2–3 frame** atau whip blur, plus whoosh.
- Maksimal 1 transisi efek per 8–10 detik.
- Hook → scene pertama boleh flash putih (sama dengan talking-head).

---

## 8. SOUND DESIGN

Ikut `AIGROWTH-SOUND-DESIGN-GUIDE.md` (library `sfx/`, level, workflow 3 pass, larangan), dengan tambahan khusus explainer:

| Momen | SFX | Level |
|---|---|---|
| Judul scene muncul | texture pop (`GUI_Notification 09 1.wav`) | −6/−7 dB |
| Callout tergambar | pop kecil atau `jet-set-radio-spray` | −7 dB |
| Kamera reveal / pindah peta ↔ diorama | whoosh 2/3/5 (selang-seling), `Drum Woosh` buat reveal besar | −12 dB |
| Angka besar count-up selesai | hit (`IMPACT WOBBLY`, transient awal) | momen terkeras scene itu |
| State membaik (solusi) | `Success Notification` | −6 dB |
| Suara alam (api, hujan, air) | ambience yang sinkron dengan visual, boleh dibuat kalau library belum punya | −16 sampai −20 dB |

- Karena nggak ada talking head, **musik nggak dipakai** kecuali Adrian minta. Ambience alam cukup.
- Narasi selalu paling keras. Target akhir −16 LUFS integrated, true peak di bawah −1 dB.

---

## 9. CARA KERJA DI REMOTION

1. **Lokasi:** project `video-editing/`, satu folder per video di `src/explainer/<NAMA>/` (FACTS.md, `timing.ts`, `state.ts`, scene). Kit 3D bersama di `src/three/` (blok penampang + shader, pohon, api/asap/hujan/percikan, peta, post-processing). Semua warna dan font dari `brand.ts`.
2. **Alur wajib** (sama dengan talking-head): riset + FACTS.md → naskah → narasi + QA → **planning page** per kalimat (tipe scene, gerak kamera, state yang berubah, callout, sumber) → revisi sampai Adrian bilang **oke final** → build → still per scene → preview → oke → render. Jangan build atau render final sebelum ada oke.
3. **State per frame:** semua yang berubah (muka air, api, asap, hujan, sekat) dihitung dari satu fungsi `dioramaState(frame)` berdasarkan rentang scene dari `timing.ts`. Jangan pakai waktu nyata atau random tanpa seed.
4. **Gotcha teknis:**
   - `@react-three/postprocessing@3.0.4` untuk fiber 9.2.
   - Tekstur yang di-load async: `delayRender` + panggil `advance()` setelah load, kalau tidak frame pertama keluar hitam.
   - Render: `npx remotion bundle` lalu `npx remotion render build <ID> ... --timeout=120000`.
   - Thumbnail: render still dengan prop `cover` (tanpa caption dan sumber).
5. **Review diri sendiri** sebelum lapor: contact sheet still tiap scene; cek label tidak menutupi objek utama, teks di dalam safe area, tidak ada 4 detik tanpa perubahan, angka dan sumber cocok dengan FACTS.md.

---

## 10. CHECKLIST SEBELUM RENDER FINAL

- [ ] Backdrop biru royal radial, aksen UI kuning (merah hanya kata negatif), Inter semua
- [ ] Judul muncul ≤0,5 detik di hook
- [ ] Satu kalimat = satu scene, tiap scene ada perubahan state atau gerak kamera
- [ ] Setiap angka ada baris sumber, cocok dengan FACTS.md
- [ ] Caption 1–3 kata, angka ditulis angka, di 72–78% tinggi layar
- [ ] Teks di dalam safe area (atas 8%, bawah 15%, kanan 12%)
- [ ] Narasi lolos QA whisper large-v3
- [ ] SFX ikut level di Bagian 8, nggak ada clipping, −16 LUFS
- [ ] Ukuran file wajar (≤60 MB untuk 60 detik)
- [ ] Caption posting: sumber + label suara AI, tanpa affiliate
