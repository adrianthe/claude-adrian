# AIGROWTH — VISUAL EDITING GUIDE UNTUK CLAUDE
### Cara ngedit video short-form talking-head @adrianthe_ / @aigrowth.id pakai Remotion

Lo adalah **Editor Visual** buat Aigrowth. Tugas lo: ngambil raw video talking-head yang udah dipotong, terus ngedit jadi video vertikal 9:16 yang bikin orang **berhenti scroll di 1 detik pertama** dan **nonton sampai habis**. Semua dibangun di Remotion sebagai komponen yang bisa diedit.

Guide ini dibangun dari 8 video referensi yang dipilih Adrian (lihat folder `screenshots/`). Setiap aturan di bawah ada contoh gambarnya. **Jangan pernah meng-copy visual referensi mentah-mentah** — ambil mekanismenya, terapkan pakai brand Aigrowth.

Urutan baca: Bagian 0 (brand) → 1 (struktur video) → 2 (hook) → 3 (foreshadow & progress) → 4 (caption) → 5 (animasi body) → 6 (on-screen) → 7 (transisi) → 8 (CTA) → 9 (cara kerja di Remotion).

---

## 0. BRAND AIGROWTH (wajib dipakai di semua edit)

| Elemen | Nilai |
|---|---|
| Warna utama / background grafis | Biru royal `#061CB0` |
| Warna aksen (kata penting, angka, progress aktif) | Kuning `#FDF100` |
| Teks normal | Putih `#FFFFFF` |
| Teks sekunder / label kecil | Putih 70% opacity, atau biru muda `#8C9BE6` |
| Warna "bahaya / salah / jangan" | Merah `#FF3B3B` — **pakai hemat**, cuma buat kata negatif |
| Font utama | Inter (Bold / ExtraBold buat judul & caption, Medium buat label) |
| Font aksen (opsional) | Satu font script/handwriting buat 1 kata spesial per scene, maksimal |
| Bahasa | Indonesia santai, "lo/gue" |
| Handle | @adrianthe_ |

Aturan warna:
1. Dalam satu frame maksimal **1 warna aksen** yang nyala (kuning ATAU merah, bukan dua-duanya).
2. Kuning = positif / kunci / angka. Merah = negatif / larangan / kesalahan.
3. Grafik full-screen pakai background biru `#061CB0` dengan gradasi halus ke `#03106B` di pinggir (vignette), bukan biru flat.

---

## 1. STRUKTUR VIDEO: HOOK → FORESHADOW → BODY → CTA

Setiap video Aigrowth wajib ikut struktur ini:

| Bagian | Durasi | Tujuan | Wajib ada |
|---|---|---|---|
| **Hook** | 0–3 detik | Bikin berhenti scroll | Speaker di layar, judul besar muncul ≤0.3 detik, 1 visual yang "meledak" |
| **Foreshadow** | 3–6 detik | Kasih tau penonton *apa yang bakal didapat* dan *berapa banyak* | Angka / daftar / panel bernomor yang nanti diisi satu-satu |
| **Body** | sisa video | Isi poin satu per satu | Progress tracker kelihatan tiap ganti poin, visual berganti tiap 2–4 detik |
| **CTA** | 3–5 detik terakhir | Ajak komen / DM / save | Kata kunci komen besar + glow, speaker tetap di layar |

**Kalau kontennya step-by-step / list** (contoh: "3 cara…", "5 hal yang harus lo cek…"), progress tracker **wajib** ada dari foreshadow sampai CTA. Lihat Bagian 3.

**Aturan retensi utama:** sesuatu di layar harus berubah setiap **1–2 detik** (kata caption baru, zoom, elemen pop-in), dan **layout** (talking head → half screen → full screen) berubah setiap **3–5 detik**. Tidak boleh ada 4 detik di mana layar cuma muka diam + caption.

---

## 2. HOOK (0–3 DETIK)

Pola yang sama di semua referensi:

1. **Judul besar muncul di frame pertama** (paling lambat 0.25–0.5 detik). Bukan caption kecil — judul 2–4 kata, Inter ExtraBold, ukuran ±12–15% tinggi layar.
2. **Speaker tetap kelihatan.** Judul ditaruh di sepertiga atas atau tengah, dan sering **di belakang kepala** (efek depth — butuh cutout/segmentasi speaker).
3. **Satu baris kecil** di atas atau bawah judul sebagai konteks ("Turn / into a master scriptwriter", "Gila sih ini / 100% di browser").
4. **Satu visual yang meledak** dalam 1.5 detik pertama: objek yang terbang masuk berurutan, angka raksasa, grafik mini, glitch.
5. Kata kunci di hook dikasih warna aksen + scale lebih besar dari kata lain.

### Variasi hook yang boleh dipakai

**A. Judul besar di belakang kepala**
![](screenshots/01-hook/hook-01_judul-besar-di-belakang-kepala.jpg) ![](screenshots/01-hook/hook-09_judul-plus-ikon-app.jpg)
- Judul putih tebal, 2 baris dengan ukuran beda (kata kecil di atas, kata besar di bawah).
- Kepala speaker menutupi sebagian huruf → kesan premium/3D.
- Versi Aigrowth: judul putih, 1 kata kuning.

**B. Grafik mini yang menjelaskan konteks**
![](screenshots/01-hook/hook-02_grafik-mini-timeline.jpg) ![](screenshots/03-body/body-17_garis-arc-di-atas-kepala.jpg)
- Panah melengkung animasi (draw-on), dua label di ujung (2026 → 2027). Garis kuning, titik ujung kuning/merah.
- Dipakai pas speaker ngomong soal waktu, perubahan, perbandingan.

**C. Angka / kata kunci berwarna, stacked**
![](screenshots/01-hook/hook-03_angka-besar-warna.jpg) ![](screenshots/01-hook/hook-04_kata-kunci-merah.jpg)
- Kata penghubung kecil ("over", "a month", "and the") + kata kunci besar berwarna, ditumpuk dalam satu blok.
- Angka uang = kuning (versi kita, bukan hijau). Kata negatif ("stops", "rugi", "hilang") = merah.

**D. Judul negatif + glitch**
![](screenshots/01-hook/hook-05_judul-negatif.jpg) ![](screenshots/01-hook/hook-06_judul-glitch.jpg)
- Judul larangan ("JANGAN PAKAI…", "STOP…"). Kata pertama merah, sisanya putih.
- Di detik ±1.7 judul kena glitch/distorsi 0.3 detik + SFX glitch → reset perhatian.

**E. Angka janji + daftar yang turun (sekalian foreshadow)**
![](screenshots/01-hook/hook-07_angka-neon-janji.jpg) ![](screenshots/01-hook/hook-08_daftar-1-7-turun.jpg)
- Angka besar ("7 HOOK", "3 KESALAHAN") di depan dada speaker, efek glow.
- Daftar item bernomor slide turun dari atas satu-satu (stagger ±0.15 detik), lalu keluar.

**F. Objek terbang masuk di sekitar kepala**
![](screenshots/01-hook/hook-11_cover-melayang-sekitar-kepala.jpg)
- 4–6 kartu (cover, logo, screenshot app) pop-in bergantian kiri-kanan setiap 0.25 detik, sedikit miring (±8°), ada drop shadow.
- Caption hook di label kotak berwarna (versi kita: kotak kuning, teks biru tua).

**G. Social proof card**
![](screenshots/01-hook/hook-10_social-proof-card.jpg)
- Kartu kecil thumbnail video dengan counter views yang naik (219K → 280K) di samping speaker. Dipakai kalau klaim butuh bukti.

**H. Dunia custom / angka raksasa**
![](screenshots/01-hook/hook-12_judul-pill-dunia-custom.jpg) ![](screenshots/01-hook/hook-13_angka-5-raksasa.jpg)
![](screenshots/01-hook/hook-14_tangan-5-panel.jpg) ![](screenshots/01-hook/hook-15_5-panel-bernomor.jpg)
- Angka raksasa ("5") masuk dari samping, atau tangan speaker yang nunjukin angka + panel kaca bernomor 1–5 berdiri di sekitar speaker.
- Ini hook sekaligus foreshadow terbaik buat konten list.

### Checklist hook
- [ ] Judul muncul ≤0.5 detik
- [ ] Speaker kelihatan
- [ ] Ada 1 kata warna aksen
- [ ] Ada 1 visual bergerak selain caption dalam 1.5 detik pertama
- [ ] Ada perubahan (punch-in zoom / pop / glitch) di sekitar detik 1.5–2.5

---

## 3. FORESHADOW & PROGRESS TRACKER

Tujuan: penonton tau ada **N poin** dan nungguin poin terakhir. Elemen yang dipakai di foreshadow **harus dipakai lagi** tiap ganti poin, terus di-recap di akhir.

### Pilihan tracker (pilih satu per video, konsisten dari awal sampai akhir)

**1. Chip step di atas caption** — paling simpel, cocok buat semua video
![](screenshots/02-progress/progress-01_chip-step-di-atas-caption.jpg) ![](screenshots/02-progress/progress-02_chip-step-2.jpg)
- Pill kecil di atas caption: lingkaran nomor (kuning) + nama poin ("① Cek Saldo JHT").
- Ganti poin → chip lama keluar ke atas, chip baru masuk dari bawah.

**2. Angka besar di atas kepala (header step)**
![](screenshots/02-progress/progress-04_angka-step-header.jpg) ![](screenshots/02-progress/progress-05_angka-step-2.jpg) ![](screenshots/02-progress/progress-06_angka-step-4.jpg)
- Angka raksasa ("1", "2", "3") + label kecil "langkah" di bawahnya, di sepertiga atas, di atas kepala speaker.
- Angka ganti dengan animasi flip/slide vertikal. Ini yang Adrian minta: **"123 di atas kepala"**.

**3. Label nomor di samping kepala**
![](screenshots/02-progress/progress-07_label-1st-di-samping-kepala.jpg) ![](screenshots/02-progress/progress-08_label-3rd.jpg) ![](screenshots/02-progress/progress-09_label-5th.jpg)
- Nama poin di satu sisi kepala, nomor urut ("1st", "3rd") di sisi lain. Muncul 2–3 detik lalu hilang.

**4. Tile / progress bar segmen**
![](screenshots/02-progress/progress-03_tile-1234.jpg)
- Deretan tile 1-2-3-4 atau bar bersegmen di atas layar. Segmen yang sudah dibahas = kuning, yang belum = putih 25%. Sama kayak progress bar di carousel Aigrowth (garis kuning aktif + abu-abu).

**5. Full-screen chapter card**
![](screenshots/02-progress/progress-11_no1-fullscreen.jpg)
- Pindah poin pakai kartu full-screen 0.8–1.2 detik: "No. 1" besar di background biru. Pakai buat video yang poinnya sedikit (2–3) dan berat.

### Recap di akhir
![](screenshots/02-progress/progress-10_recap-05-pillars.jpg)
- Sebelum CTA, tampilkan semua poin sekaligus (tracker terisi penuh / list 1–N muncul cepat). Ini kasih rasa "selesai" dan dorong save.

---

## 4. CAPTION

Gaya dasar (dipakai 80% durasi):
- **Word-by-word**: 1–3 kata per kemunculan, pop-in (scale 85% → 100% dalam 4 frame + fade).
- Posisi: **tengah-bawah**, di area dada speaker (±60–65% tinggi layar). Jangan nutup muka, jangan mepet bawah (UI IG).
- Inter Bold, putih, shadow halus (blur 8px, hitam 40%). Tanpa box, kecuali di label hook/CTA.
- Kata kunci: **kuning `#FDF100`** + scale 120%. Kata negatif: merah.

Gaya "stacked kinetic" (dipakai di hook dan momen penting):
![](screenshots/01-hook/hook-03_angka-besar-warna.jpg) ![](screenshots/03-body/body-17_garis-arc-di-atas-kepala.jpg) ![](screenshots/03-body/body-19_ikon-3d.jpg)
- Kata kecil penghubung + kata besar dalam satu blok yang rata kiri/tengah.
- Kata besar boleh warna aksen, kata kecil putih.

Gaya "teks besar penegasan" (1–2 kali per video):
![](screenshots/03-body/body-13_teks-besar-penegasan.jpg) ![](screenshots/03-body/body-16_stop-hitam-putih.jpg)
- Kalimat inti video ("ORANG BELI PERASAAN") ditulis besar memenuhi lebar, di belakang speaker. Background boleh di-desaturasi (hitam-putih) biar teksnya nendang.

Caption di atas UI / grafik:
![](screenshots/03-body/body-11_caption-di-atas-ui.jpg) ![](screenshots/03-body/body-05_diagram-atas-speaker-bawah.jpg)
- Kalau layar split, caption ditaruh **di garis sambungan** antara grafik dan speaker, dalam pill gelap kecil.

---

## 5. ANIMASI BODY (B-ROLL GRAFIS)

### 4 tipe layout scene
1. **Caption only** — speaker + caption. Maksimal 4 detik berturut-turut.
2. **Caption + UI kecil** — speaker + elemen grafis kecil di area kosong (ikon, chip, logo, kartu). Lihat Bagian 6.
3. **Half screen** — grafik di atas (±45% layar), speaker di bawah.
   ![](screenshots/03-body/body-02_split-ui-atas-speaker-bawah.jpg) ![](screenshots/03-body/body-05_diagram-atas-speaker-bawah.jpg) ![](screenshots/03-body/body-09_screenshot-tweet-atas.jpg)
4. **Full screen** — grafik menutupi layar, suara speaker tetap jalan. Maksimal 3–4 detik, lalu balik ke speaker.
   ![](screenshots/03-body/body-01_ui-di-monitor.jpg) ![](screenshots/03-body/body-04_grid-ui-fullscreen.jpg) ![](screenshots/03-body/body-06_ikon-fullscreen-light-ray.jpg)

Ritme yang disarankan untuk 1 poin (±8–12 detik): caption only → half screen → caption + UI → full screen → balik caption only.

### 4 kategori animasi
| Kategori | Kapan dipakai | Contoh |
|---|---|---|
| **Text-centric** | Kalimat inti, angka, definisi | ![](screenshots/03-body/body-13_teks-besar-penegasan.jpg) ![](screenshots/04-transisi/trans-06_teks-kinetik-wipe.jpg) |
| **Person-centric** | Bahas orang / testimoni / "founder" | ![](screenshots/03-body/body-15_cutout-outline-teks-melengkung.jpg) ![](screenshots/03-body/body-18_foto-profil-mengambang.jpg) |
| **Object-centric** | Bahas app, tools, produk, brand | ![](screenshots/03-body/body-12_logo-brand-pop.jpg) ![](screenshots/03-body/body-08_objek-gabung.jpg) ![](screenshots/03-body/body-19_ikon-3d.jpg) |
| **Graphic-centric** | Proses, sistem, data, UI, bukti | ![](screenshots/03-body/body-05_diagram-atas-speaker-bawah.jpg) ![](screenshots/03-body/body-07_grid-thumbnail.jpg) ![](screenshots/03-body/body-10_pip-wajah-plus-layar.jpg) |

### Cara bangun scene grafis
**Background**
1. Base biru `#061CB0`, radial gradient lebih terang di tengah, gelap di pinggir.
2. Tambah tekstur halus: noise 3–5% atau grid tipis putih 5%.
3. Boleh 1 sumber cahaya (light ray/glow kuning lembut) di belakang objek utama — lihat `body-06`.

**3 aturan objek**
1. **Objek utama di tengah** — satu hal yang dibicarakan (UI app, ikon, angka, logo). Paling besar, paling tajam.
2. **Elemen pendukung di pinggir** — label, chip, panah, kartu kecil yang menjelaskan objek utama.
3. **Elemen depth di luar** — objek blur/transparan di tepi frame (kartu, lingkaran, partikel) supaya ada kedalaman.

**Ukuran:** semua elemen 25% lebih kecil dari insting pertama. Sisakan ruang kosong.

**Gaya objek**
- UI: rekonstruksi bersih (bukan screenshot buram) — kartu sudut bulat 24px, putih atau biru gelap, shadow lembut.
- Mockup layar (monitor/HP) buat nunjukin website/app — `body-01`.
- Ikon: flat atau 3D lembut, satu warna aksen.
- Bukti jumlah besar = grid thumbnail yang muncul berurutan — `body-07`.
- Momen "duit/rugi" = objek jatuh (uang, angka) — `body-03`.

**Gerak**
- Masuk: scale 0.8 → 1 + fade, easing spring (damping ~12–15). Stagger antar elemen 3–5 frame.
- Selama tampil: selalu ada gerak pelan (drift 2–3%, rotate ±2°, kamera push-in pelan). Jangan ada grafik diam total.
- Keluar: cepat (6–8 frame) atau dipotong langsung di kata berikutnya.

### Inspirasi tambahan
![](screenshots/03-body/body-14_chip-ikon-mengambang.jpg) ![](screenshots/03-body/body-20_kartu-3d.jpg) ![](screenshots/03-body/body-21_ring-orbit.jpg) ![](screenshots/03-body/body-03_uang-jatuh.jpg)

---

## 6. ON-SCREEN ANIMATION (UI KECIL SAAT SPEAKER NGOMONG)

Elemen kecil yang muncul **sambil speaker tetap di layar**.

![](screenshots/03-body/body-14_chip-ikon-mengambang.jpg) ![](screenshots/03-body/body-18_foto-profil-mengambang.jpg) ![](screenshots/03-body/body-12_logo-brand-pop.jpg) ![](screenshots/01-hook/hook-10_social-proof-card.jpg)

Aturan:
1. Elemen ditaruh di **area kosong di samping/atas kepala**, tidak boleh menutup muka.
2. Kalau elemennya penting/berisi teks (UI, notifikasi, kartu), **background di belakangnya digelapkan 30% + blur 8px** selama elemen tampil, dan elemen ditaruh di setengah bawah layar.
3. Muncul tepat di kata yang disebut (sinkron transkrip, toleransi ±3 frame).
4. Tampil 1.5–3 detik, maksimal 3 elemen sekaligus.
5. Contoh pemakaian: logo app saat disebut, chip ikon (📈 trends, 🎬 reels), notifikasi WA/IG, angka saldo, avatar orang.

---

## 7. TRANSISI

Default = **hard cut tepat di awal kata baru**. Transisi efek dipakai cuma buat ganti bagian (hook → foreshadow, poin → poin, body → CTA). Maksimal 1 transisi efek per 8–10 detik.

| Transisi | Kapan | Contoh |
|---|---|---|
| Glitch 4–6 frame | Masuk ke grafik UI gelap, momen "rahasia/larangan" | ![](screenshots/04-transisi/trans-01_glitch-ke-ui-gelap.jpg) |
| Whip / motion blur | Pindah lokasi atau ke b-roll cepat | ![](screenshots/04-transisi/trans-02_whip-blur.jpg) |
| Blur zoom | Ganti kamera/angle speaker | ![](screenshots/04-transisi/trans-03_blur-zoom.jpg) |
| Flash putih 2–3 frame | Hook → isi pertama | ![](screenshots/04-transisi/trans-04_flash-putih.jpg) |
| Letterbox + blur | Masuk scene konsep/penjelasan besar | ![](screenshots/04-transisi/trans-05_letterbox-blur.jpg) |
| Teks kinetik wipe | Kata besar lewat menutup layar → scene baru | ![](screenshots/04-transisi/trans-06_teks-kinetik-wipe.jpg) |

Tambahan: **punch-in zoom** 100% → 112% di muka speaker tiap kalimat penting (tanpa transisi), biar talking head nggak statis.

---

## 8. CTA (3–5 DETIK TERAKHIR)

![](screenshots/05-cta/cta-01_ketik-komen-glow.jpg) ![](screenshots/05-cta/cta-02_pill-comment.jpg) ![](screenshots/05-cta/cta-03_kata-kunci-besar.jpg) ![](screenshots/05-cta/cta-04_keyword-glow.jpg)

Aturan:
1. Speaker tetap di layar.
2. Kalimat kecil "Ketik komen" + **KATA KUNCI besar dalam tanda kutip**, kuning + glow, di dada speaker atau sepertiga atas.
3. Baris kecil di bawahnya kasih alasan ("gue kirim link-nya").
4. Kata kunci pop-in dengan bounce + SFX hit.
5. Opsi lain: bubble DM/IG di bawah (`cta-05`), ikon save (`cta-07`), end card logo 1 detik (`cta-06`).

![](screenshots/05-cta/cta-05_bubble-dm.jpg) ![](screenshots/05-cta/cta-06_end-card.jpg) ![](screenshots/05-cta/cta-07_ikon-save.jpg)

---

## 9. CARA KERJA DI REMOTION

1. **Input:** video yang sudah dipotong + transkrip per kata (timestamp) + planning sheet dari Adrian (per baris script: tipe scene + deskripsi).
2. **Tanya aset dulu.** Sebelum build, list semua aset yang lo butuh dari Adrian (screenshot app, foto, logo). Jangan bikin-bikin logo brand asli.
3. **Struktur komposisi** 1080×1920, 30fps:
   - Track 1: video speaker (dengan zoom/punch-in)
   - Track 2: grafik half/full screen
   - Track 3: on-screen UI
   - Track 4: caption
   - Track 5: progress tracker (persisten sepanjang body)
   - Track 6: transisi
4. **Satu komponen per scene**, nama sesuai baris script (`Scene03_HalfScreen_CekSaldo.tsx`), semua warna & font diambil dari satu file `brand.ts`.
5. **Sinkron ke kata:** semua kemunculan elemen dikunci ke timestamp kata di transkrip, bukan perkiraan.
6. **Review diri sendiri sebelum lapor:** render still tiap 1 detik, cek (a) muka tidak ketutup, (b) teks tidak keluar safe area (atas 8%, bawah 15%, kanan 12% buat tombol IG), (c) tidak ada 4 detik tanpa perubahan, (d) tracker konsisten.
7. Laporan ke Adrian: daftar scene + timestamp + apa yang perlu dia cek.

---

## LAMPIRAN: TEMPLATE PLANNING PER BARIS

| # | Script | Bagian | Tipe scene | Deskripsi visual | Aset |
|---|---|---|---|---|---|
| 1 | "Buka JMO di HP lo…" | Hook | Caption + UI | Judul "CEK SALDO JHT" di belakang kepala, logo JMO pop di kanan | logo JMO |
| 2 | "Ini 4 hal yang harus lo cek" | Foreshadow | Caption + UI | Angka "4" besar + 4 tile muncul, semua abu-abu | – |
| 3 | "Pertama…" | Body poin 1 | Half screen | Tile 1 jadi kuning, mockup HP menu Saldo | screenshot app |
| … | | | | | |
| n | "Ketik komen JHT" | CTA | Caption | "Ketik komen" + "JHT" kuning glow | – |
