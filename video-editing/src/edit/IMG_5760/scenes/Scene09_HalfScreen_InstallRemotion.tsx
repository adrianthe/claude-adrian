// #9 Langkah 1 (half screen): jendela Claude, chip Remotion & HyperFrames masuk di nama masing-masing.
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, MOTION, VIDEO, WEIGHTS } from "../../../brand";
import { f, lineEnd, lineStart } from "../timing";
import { BlueBg, drift, pop, ramp } from "../ui";

const Chip: React.FC<{ label: string; at: number; frame: number }> = ({ label, at, frame }) => {
  const p = pop(frame, at, 12);
  const done = pop(frame, at + 10, 10);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, height: 84, padding: "0 26px", borderRadius: 18, background: "#F1F4FF", border: `3px solid ${done > 0.5 ? COLORS.blue : "#DCE2F5"}`, opacity: p, transform: `translateX(${interpolate(p, [0, 1], [380, 0])}px)` }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.blue }} />
      <div style={{ flex: 1, fontWeight: WEIGHTS.extraBold, fontSize: 42, color: "#111827" }}>{label}</div>
      <div style={{ width: 52, height: 52, borderRadius: 26, background: COLORS.yellow, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${done})` }}>
        <svg viewBox="0 0 24 24" width="32" height="32"><path d="M5 12.5l4.5 4.5L19 7" stroke={COLORS.blue} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  );
};

export const Scene09_HalfScreen_InstallRemotion: React.FC = () => {
  const frame = useCurrentFrame();
  const a = lineStart(9), end = lineEnd(9);
  if (frame < a || frame >= end + 8) return null;
  const h = VIDEO.height * 0.45 * Math.min(ramp(frame, a, a + 8), ramp(frame, end, end + 8, 1, 0));
  const win = pop(frame, f(64));
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h, overflow: "hidden" }}>
        <BlueBg frame={frame} />
        <div style={{ position: "absolute", left: 120, right: 160, top: 350 + drift(frame, 5, 0.08), borderRadius: MOTION.uiRadius, background: COLORS.white, boxShadow: "0 30px 70px rgba(0,0,0,0.45)", overflow: "hidden", opacity: win, transform: `scale(${interpolate(win, [0, 1], [0.8, 1])})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 24px", borderBottom: "2px solid #E5E7EB" }}>
            <Img src={staticFile("assets/claude-cute.png")} style={{ width: 54, height: 54 }} />
            <div style={{ fontWeight: WEIGHTS.extraBold, fontSize: 38, color: "#111827" }}>Claude</div>
            <div style={{ marginLeft: "auto", fontWeight: WEIGHTS.medium, fontSize: 26, color: "#6B7280" }}>Skills</div>
          </div>
          <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14, minHeight: 210 }}>
            <Chip label="Remotion" at={f(69) - 4} frame={frame} />
            <Chip label="HyperFrames" at={f(70) - 4} frame={frame} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
