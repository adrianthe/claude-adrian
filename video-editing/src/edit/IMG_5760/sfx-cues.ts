// Sound design IMG_5760 — semua cue di satu file (skill aigrowth-sound-designer).
// frame = frame event visual (dikunci ke kata). Puncak/transient file disejajarkan ke frame itu via PEAK.
import { f, lineEnd, lineStart, TRACKER } from "./timing";

export type Family = "WHOOSHES" | "TEXTURES" | "RISERS" | "HITS" | "MUSIC";
export type Cue = { family: Family; file: string; frame: number; db: number; why: string; maxFrames?: number };

// Offset (frame) dari awal file ke puncak/transient, diukur dari envelope tiap file.
export const PEAK: Record<string, number> = {
  "sfx/whoosh 2.mp3": 13,
  "sfx/whoosh 5.mp3": 13,
  "sfx/whoosh 3.mp3": 6,
  "sfx/Drum Woosh.wav": 20,
  "sfx/IMPACT WOBBLY (1).wav": 18,
  "sfx/GUI_Notification 09 1.wav": 3,
  "sfx/CARTOON PRIZE.wav": 3,
};

const W2 = "sfx/whoosh 2.mp3", W3 = "sfx/whoosh 3.mp3", W5 = "sfx/whoosh 5.mp3", DRUM = "sfx/Drum Woosh.wav";
const POP = "sfx/GUI_Notification 09 1.wav", CLICK = "sfx/BEEP CLICK.mp3";
const SPRAY = "sfx/jet-set-radio-spray-1_4CFwPkb.mp3", LIQUID = "sfx/SFX- Liquid2.mp3", GLITCH = "sfx/GLITCH HIGH (1).wav";
const SUCCESS = "sfx/Success Notification  (1).wav", PRIZE = "sfx/CARTOON PRIZE.wav", IMPACT = "sfx/IMPACT WOBBLY (1).wav";

const w = (file: string, frame: number, why: string, db = -12): Cue => ({ family: "WHOOSHES", file, frame, db, why });
const t = (file: string, frame: number, why: string, db = -6.5): Cue => ({ family: "TEXTURES", file, frame, db, why });
const hit = (frame: number, why: string): Cue => ({ family: "HITS", file: IMPACT, frame, db: -5, why, maxFrames: 40 });

export const CUES: Cue[] = [
  // ---- Pass 1: WHOOSH (gerakan / slide / zoom), -12 dB, Drum Woosh -10 dB untuk masuk full screen
  w(W3, f(7), "punch-in 112% di 'pikir-pikir'"),
  w(W2, f(23) - 2, "iPhone slide masuk dari kanan"),
  w(W5, lineStart(4), "half screen 100% naik"),
  w(W3, lineEnd(4), "half screen turun, balik ke speaker"),
  w(DRUM, lineStart(6), "masuk full screen iPhone hasil edit", -10),
  w(W2, lineEnd(6), "keluar full screen"),
  w(W3, f(54), "punch-in di 'temen-temen'"),
  w(W5, lineStart(9), "half screen langkah 1 naik"),
  w(W3, f(69) - 2, "chip Remotion slide masuk"),
  w(W2, f(70) - 2, "chip HyperFrames slide masuk"),
  w(W5, lineEnd(9), "half screen turun"),
  w(DRUM, lineStart(11), "masuk full screen prompt (langkah 3)", -10),
  w(W2, lineStart(12), "keluar full screen, half before/after naik"),
  w(W3, lineEnd(12), "half screen turun ke CTA"),

  // ---- Pass 2: TEXTURE (pop / klik / reveal tanpa slide), -6/-7 dB
  t(POP, 2, "judul hook muncul"),
  t(GLITCH, 51, "glitch judul hook ±1.7 s", -6),
  t(LIQUID, lineStart(2), "flash putih hook -> isi", -7),
  t(PRIZE, f(11), "maskot Claude muncul (reveal)", -7),
  t(SPRAY, f(16), "'SE-KEREN INI' kuning disemprot"),
  t(POP, f(24), "chip 'CUMA HP'"),
  t(CLICK, f(34) + 6, "CapCut dicoret", -7),
  t(CLICK, f(38) + 6, "Premiere dicoret", -7),
  t(POP, f(46) - 4, "stopwatch muncul"),
  t(PRIZE, f(52), "'60 MENIT' reveal", -7),
  t(SPRAY, f(60), "'GAMPANG BANGET' kuning"),
  t(POP, TRACKER.steps[0] + 2, "tile 1 jadi kuning"),
  t(CLICK, f(69) + 6, "centang Remotion", -7),
  t(CLICK, f(70) + 6, "centang HyperFrames", -7),
  t(POP, TRACKER.steps[1] + 2, "tile 2 jadi kuning"),
  t(CLICK, f(77), "centang Claude Pro", -7),
  t(POP, TRACKER.steps[2] + 2, "tile 3 jadi kuning"),
  t(CLICK, lineEnd(11) - 22, "tombol kirim prompt nyala", -7),
  t(SUCCESS, TRACKER.recap, "recap: 3 tile penuh", -6),
  t(POP, f(102), "'Ketik komen' muncul"),

  // ---- Pass 3: HIT (belum ada riser di library -> sementara IMPACT WOBBLY transient saja), -5 dB
  hit(TRACKER.in, "akhir foreshadow -> masuk body (tile 1-2-3 turun)"),
  hit(f(104), "CTA: keyword 'CLAUDE' pop-in"),
];
