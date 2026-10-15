// #10 Langkah 2: kartu "Claude Pro" + label WAJIB + centang di "langganan". Background digelapkan (Speaker DIM).
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, MOTION, WEIGHTS } from "../../../brand";
import { f, lineEnd } from "../timing";
import { drift, out, pop } from "../ui";

export const Scene10_Caption_ClaudePro: React.FC = () => {
  const frame = useCurrentFrame();
  const a = f(75), end = lineEnd(10);
  if (frame < a || frame >= end) return null;
  const p = pop(frame, a);
  const tick = pop(frame, f(77), 9);
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main, opacity: out(frame, end) }}>
      <div style={{ position: "absolute", left: 150, right: 190, top: 360 + drift(frame, 6, 0.1), display: "flex", alignItems: "center", gap: 24, padding: "26px 30px", borderRadius: MOTION.uiRadius, background: COLORS.white, boxShadow: "0 26px 60px rgba(0,0,0,0.45)", opacity: p, transform: `scale(${interpolate(p, [0, 1], [0.8, 1])}) rotate(${drift(frame, 1.5, 0.08)}deg)` }}>
        <Img src={staticFile("assets/claude-cute.png")} style={{ width: 120, height: 120 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: WEIGHTS.black, fontSize: 58, color: "#111827", lineHeight: 1 }}>Claude Pro</div>
          <div style={{ marginTop: 10, display: "inline-block", background: COLORS.yellow, color: COLORS.blue, fontWeight: WEIGHTS.black, fontSize: 30, padding: "6px 16px", borderRadius: 10 }}>WAJIB LANGGANAN</div>
        </div>
        <div style={{ width: 76, height: 76, borderRadius: 38, background: COLORS.blue, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${tick})` }}>
          <svg viewBox="0 0 24 24" width="46" height="46"><path d="M5 12.5l4.5 4.5L19 7" stroke={COLORS.white} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
