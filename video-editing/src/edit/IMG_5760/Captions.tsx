// Track 4: caption word-by-word (1–3 kata), pop 85% -> 100% dalam 4 frame.
// Close-up: muka ngisi tengah, jadi caption default di atas kepala (y ±27%).
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CAPTION, COLORS, FONTS, VIDEO } from "../../brand";
import { DURATION_FRAMES, FPS, LINE_STARTS, WORDS, f, isFull, isHalf, lineEnd } from "./timing";
import { textShadow } from "./ui";

// Kata kunci kuning / negatif merah (maks 1 warna aksen per frame).
const YELLOW = new Set([11, 16, 17, 28, 30, 43, 44, 52, 53, 60, 61, 65, 69, 70, 76, 77, 83, 104, 114]);
const RED = new Set([31, 35]);

// Rentang tanpa caption (teks grafis sudah ngomong hal yang sama). [from, to)
const HIDE: [number, number][] = [
  [0, lineEnd(1)], // hook: judul
  [f(16), lineEnd(2)], // "SE-KEREN INI" stacked
  [f(22), lineEnd(3)], // iPhone + chip
  [f(45), lineEnd(7)], // stopwatch + "60 MENIT"
  [f(60), lineEnd(8)], // "GAMPANG BANGET"
  [f(75), lineEnd(10)], // kartu Claude Pro
  [f(102), DURATION_FRAMES], // CTA keyword
];
const hidden = (fr: number) => HIDE.some(([a, b]) => fr >= a && fr < b);

type Chunk = { words: number[]; start: number; end: number };
const CHUNKS: Chunk[] = (() => {
  const out: Chunk[] = [];
  let cur: number[] = [];
  WORDS.forEach((w, i) => {
    cur.push(i);
    const nx = WORDS[i + 1];
    const len = cur.map((k) => WORDS[k].text).join(" ").length;
    if (!nx || LINE_STARTS.includes(i + 1) || /[,.]$/.test(w.text) || cur.length >= 3 || len > 13 || nx.start - w.end > 0.25) {
      out.push({ words: cur, start: Math.round(WORDS[cur[0]].start * FPS), end: 0 });
      cur = [];
    }
  });
  out.forEach((c, k) => (c.end = k + 1 < out.length ? out[k + 1].start : DURATION_FRAMES));
  return out;
})();

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  if (hidden(frame)) return null;
  const chunk = CHUNKS.find((c) => frame >= c.start && frame < c.end);
  if (!chunk || hidden(chunk.start)) return null;
  const local = frame - chunk.start;
  const s = interpolate(local, [0, CAPTION.popInFrames], [0.85, 1], { extrapolateRight: "clamp" });
  const o = interpolate(local, [0, CAPTION.popInFrames], [0, 1], { extrapolateRight: "clamp" });
  const half = isHalf(frame), full = isFull(frame);
  const pill = half || full;
  const top = full ? 1360 : half ? VIDEO.height * 0.45 - 62 : 470;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top, left: 60, right: 130, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex", gap: 18, alignItems: "baseline", flexWrap: "wrap", justifyContent: "center",
            transform: `scale(${s})`, opacity: o,
            padding: pill ? "14px 30px" : 0, borderRadius: 999,
            backgroundColor: pill ? "rgba(3,16,107,0.88)" : "transparent",
            fontFamily: FONTS.main, fontWeight: CAPTION.fontWeight, fontSize: pill ? 58 : 82, lineHeight: 1.05,
            textShadow: pill ? "none" : textShadow, textTransform: "uppercase",
          }}
        >
          {chunk.words.map((i) => {
            const yellow = YELLOW.has(i), red = RED.has(i);
            return (
              <span key={i} style={{ color: yellow ? CAPTION.keywordColor : red ? COLORS.red : CAPTION.color, fontSize: yellow || red ? `${CAPTION.keywordScale}em` : "1em" }}>
                {WORDS[i].text.replace(/[,.]$/, "")}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
