// Timing video IMG_5760: semua kemunculan dikunci ke timestamp kata (transkrip cut).
import tr from "../../../public/transcripts/IMG_5760-cut.json";
import { VIDEO } from "../../brand";

export const FPS = VIDEO.fps;
export const WORDS = tr.words as { text: string; start: number; end: number }[];
export const DURATION_FRAMES = Math.ceil(tr.duration * FPS);
export const CUT_VIDEO = "cut/IMG_5760-cut.mp4";

/** Frame awal kata ke-i. */
export const f = (i: number) => Math.round(WORDS[i].start * FPS);

// Indeks kata awal tiap baris plan (plans/IMG_5760-plan.json, baris 1–13).
export const LINE_STARTS = [0, 10, 18, 25, 31, 40, 45, 55, 62, 71, 81, 90, 96];
export const lineStart = (n: number) => f(LINE_STARTS[n - 1]);
export const lineEnd = (n: number) => (n < LINE_STARTS.length ? f(LINE_STARTS[n]) : DURATION_FRAMES);
export const inLine = (frame: number, n: number) => frame >= lineStart(n) && frame < lineEnd(n);

// Layout speaker per baris (guide Bagian 5): half = grafik atas 45%, full = grafik nutup layar.
export const HALF_LINES = [4, 9, 12];
export const FULL_LINES = [6, 11];
export const isHalf = (frame: number) => HALF_LINES.some((n) => inLine(frame, n));
export const isFull = (frame: number) => FULL_LINES.some((n) => inLine(frame, n));

// Progress tracker 1-2-3: muncul di "caranya", aktif per langkah, recap, hilang di CTA "komen".
export const TRACKER = {
  in: f(58),
  steps: [f(62), f(71), f(81)],
  recap: f(94),
  out: f(102),
};
