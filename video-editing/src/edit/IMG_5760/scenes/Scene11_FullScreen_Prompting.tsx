// #11 Langkah 3 (full screen): kotak prompt Claude, teks ngetik sendiri + kursor, push-in pelan.
// Teks prompt = contoh (Adrian minta dikarang).
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, MOTION, WEIGHTS } from "../../../brand";
import { f, lineEnd, lineStart } from "../timing";
import { BlueBg, pop, ramp } from "../ui";

const PROMPT =
  "Edit video talking head gue jadi Reels yang bikin orang stop scroll: potong semua jeda, caption kuning per kata, progress 1-2-3 di atas kepala, sama sound design. Pakai brand biru-kuning Aigrowth.";

export const Scene11_FullScreen_Prompting: React.FC = () => {
  const frame = useCurrentFrame();
  const a = lineStart(11), end = lineEnd(11);
  if (frame < a || frame >= end) return null;
  const p = pop(frame, a + 2, 12);
  const typed = Math.floor(ramp(frame, f(83) - 6, end - 22) * PROMPT.length);
  const done = typed >= PROMPT.length;
  const send = done ? 1 + Math.abs(Math.sin((frame - (end - 22)) / 4)) * 0.12 : 1;
  const cursor = Math.floor(frame / 8) % 2 === 0;
  const wipe = ramp(frame, a, a + 6);
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main, clipPath: `inset(${(1 - wipe) * 50}% 0 ${(1 - wipe) * 50}% 0)` }}>
      <BlueBg frame={frame} ray />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 880, marginTop: -60, borderRadius: MOTION.uiRadius, background: COLORS.white, boxShadow: "0 34px 80px rgba(0,0,0,0.5)", opacity: p, transform: `scale(${interpolate(p, [0, 1], [0.85, 1]) * (1 + (frame - a) * 0.0012)})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 28px", borderBottom: "2px solid #E5E7EB" }}>
            <Img src={staticFile("assets/claude-cute.png")} style={{ width: 60, height: 60 }} />
            <div style={{ fontWeight: WEIGHTS.extraBold, fontSize: 40, color: "#111827" }}>Claude</div>
          </div>
          <div style={{ padding: "28px 30px 18px", minHeight: 300, fontWeight: WEIGHTS.medium, fontSize: 40, lineHeight: 1.35, color: "#111827" }}>
            {PROMPT.slice(0, typed)}
            <span style={{ display: "inline-block", width: 4, height: 44, marginLeft: 4, verticalAlign: "-8px", background: cursor ? COLORS.blue : "transparent" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 24px 22px" }}>
            <div style={{ width: 86, height: 86, borderRadius: 43, background: done ? COLORS.yellow : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${send})` }}>
              <svg viewBox="0 0 24 24" width="44" height="44"><path d="M12 19V5M5 12l7-7 7 7" stroke={COLORS.blue} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
