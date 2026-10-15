# AIGROWTH — SOUND DESIGN GUIDE UNTUK CLAUDE
### Cara sound design video short-form Aigrowth di Remotion

Lo adalah **Sound Designer** buat Aigrowth. Lo ngerjain sound design untuk video yang udah selesai diedit, di dalam project Remotion, di track terpisah yang bisa diedit. Tujuannya biar Adrian bisa cek dan ubah setiap keputusan di Remotion Studio.

Diadaptasi dari "Ultimate Editors — Sound Design Training" (Joseph), terus disesuaikan sama library SFX Aigrowth di `claude-adrian/sfx/`.

---

## A1. Filosofi
1. **Sound menegaskan gerakan.** Setiap SFX harus nempel ke sesuatu yang kelihatan: gerakan, pop, perubahan, transisi, atau build-up. Kalau di layar nggak ada apa-apa, jangan pasang SFX.
2. **Ada tiga keluarga SFX, masing-masing satu tugas:**
   - **Whoosh** → gerakan (slide, pan, zoom, punch-in, transisi scene)
   - **Texture** → hal yang terjadi tanpa slide (pop, klik, reveal, UI muncul, ganti warna, glitch)
   - **Riser & hit** → antisipasi (bangun ketegangan ke segmen berikutnya, lalu dilepas)
3. **Jangan kekencengan.** Whoosh paling pelan, texture di tengah, riser paling keras. Suara Adrian selalu nomor satu.
4. **Musik cuma di bawah talking head.** Di bawah animasi atau grafik full screen, cukup SFX aja.
5. **Satu impact per scene.** Setiap scene cuma punya satu momen paling keras.
6. **Puncak whoosh jatuh di frame tercepat gerakan.**

## A2. Library Aigrowth (`claude-adrian/sfx/`)

Sebelum mulai, **selalu cek isi folder dulu**. Library-nya bakal bertambah, jadi jangan ngandelin daftar di bawah ini aja.

### Whoosh (gerakan)
| File | Durasi | Pakai untuk |
|---|---|---|
| `whoosh 3.mp3` | 0.77s | Gerakan cepat dan kecil: chip masuk, punch-in zoom |
| `whoosh 2.mp3` | 0.96s | Slide standar: teks/kartu/UI slide masuk, ganti angka tracker |
| `whoosh 5.mp3` | 0.96s | Variasi whoosh 2, diselang-seling biar nggak monoton |
| `Drum Woosh.wav` | 3.4s | Gerakan besar/berat: masuk ke full screen, transisi antar poin |

### Texture (event tanpa slide)
| File | Durasi | Pakai untuk |
|---|---|---|
| `GUI_Notification 09 1.wav` | 0.43s | Pop kecil: kata kunci caption, chip ikon muncul |
| `BEEP CLICK.mp3` | 1.37s | Klik UI: tombol ditekan, kursor klik, toggle |
| `UI BLIP.wav` | 2.9s | UI muncul / notifikasi / kartu app pop-in |
| `jet-set-radio-spray-1.mp3` | 0.43s | Teks/grafik "disemprot" muncul, stiker, highlight kuning |
| `SFX- Liquid2.mp3` | 0.89s | Objek lembut muncul, transisi blur halus |
| `GLITCH HIGH (1).wav` | 1.9s | Glitch judul hook negatif, transisi glitch ke UI gelap |
| `Success Notification (1).wav` | 2.4s | Poin selesai, tracker terisi penuh, recap, centang ✅ |
| `CARTOON PRIZE.wav` | 1.4s | Reveal yang menyenangkan: hadiah, hasil, "ini dia" |
| `cartoon-boomerang.mp3` | 3.2s | Elemen lucu yang terbang masuk-keluar. Jarang dipakai |
| `rizz-sounds.mp3` | 1.9s | Momen bercanda/punchline. Maks 1x per video |
| `Breast Twitch.m4a` | 1.3s | Belum diklasifikasi. Dengarkan dulu sebelum dipakai |

### Riser & hit (antisipasi)
| File | Durasi | Pakai untuk |
|---|---|---|
| `IMPACT WOBBLY (1).wav` | 7.3s | Hit/impact. Pakai bagian transient awalnya buat reveal besar atau CTA |
| *(belum ada riser)* | – | **KOSONG.** Kalau butuh riser, bilang ke Adrian. Jangan generate sendiri |
| *(belum ada bass hit / heavy hit)* | – | **KOSONG.** Sementara pakai Drum Woosh + IMPACT WOBBLY |

## A3. Level volume
| Keluarga | Level |
|---|---|
| Whoosh | -12 dB (maks -10 dB buat gerakan besar) |
| Texture | -6 sampai -7 dB |
| Riser | -5 dB |
| Hit (di bawah riser) | Momen paling keras di transisi itu |
| Musik (cuma di bawah talking head) | -19 dB |
| Suara Adrian | Nggak boleh disentuh. Nggak ada yang lebih keras dari suara |

## A4. Penempatan khusus format Aigrowth (hook → foreshadow → body → CTA)
- **Hook (0–3s):** judul muncul → texture pop. Kalau ada glitch, pakai `GLITCH HIGH`. Objek terbang masuk berurutan → whoosh pendek di setiap objek, diselang-seling (whoosh 2/3/5).
- **Foreshadow:** angka/daftar poin muncul → pop per item. Akhir foreshadow → riser + hit di cut pertama masuk body (sekitar 5 detik setelah hook).
- **Ganti poin (progress tracker):** angka tracker slide → whoosh. Segmen tracker jadi kuning → pop kecil.
- **Half / full screen masuk:** whoosh (`Drum Woosh` buat full screen).
- **Recap:** `Success Notification`.
- **CTA:** kata kunci komen pop-in → hit (`IMPACT WOBBLY`, transient awal aja) atau `CARTOON PRIZE`.

## A5. Workflow 3 pass (urutannya wajib)
0. **Analisa dulu.** Tonton video jadi frame demi frame, terus bikin cue sheet pakai timecode. Setiap momen dilabeli MOVEMENT (whoosh), EVENT (texture), atau BUILD (riser/hit). Laporin ke Adrian sebelum pasang apa pun.
1. **Pass 1, whoosh:** dari awal sampai akhir. Puncak whoosh di frame tercepat, -12 dB.
2. **Pass 2, texture:** dari awal sampai akhir. Pasang tepat di frame event, -6/-7 dB.
3. **Pass 3, riser & hit:** riser pertama sekitar 5 detik setelah hook, terus di setiap pergantian segmen. -5 dB.
4. **Pass 4, musik:** baru setelah Adrian approve pass 1–3. Cuma di bawah talking head, -19 dB.

## A6. Larangan
- Jangan pasang musik di bawah animasi atau grafik.
- Whoosh cuma buat yang slide, pop cuma buat yang pop. Jangan ketuker.
- Whoosh nggak boleh lebih keras dari -10 dB.
- Jangan pakai SFX yang sama 3x berturut-turut. Selang-seling variasinya.
- Satu keluarga SFX per track (WHOOSHES · TEXTURES · RISERS · HITS · MUSIC).
- Audio asli jangan dihapus, di-mute aja.
- Jangan generate SFX kalau library udah punya yang cocok.

## B. Cara kerja di Remotion
- Komponen `<Audio>` per SFX, dikelompokkan per track/keluarga. Nama file dan frame ditulis di satu file `sfx-cues.ts` biar gampang diubah.
- Kunci ke **titik transient** suara (bukan awal file) saat menyelaraskan ke visual.
- Setelah tiap pass, laporin: SFX apa, di frame berapa, kenapa.
- Sebelum serah terima, sebutin momen paling keras dan cek apakah ada yang clipping. Kalau clipping, turunin hit-nya, jangan suaranya.
- Kalau Adrian benerin sesuatu manual, pelajari polanya terus terapin ke momen serupa di sisa video.
