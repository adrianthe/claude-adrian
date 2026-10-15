// #4 Half screen: "100%" count-up kuning glow + "di-edit Claude" + maskot Claude lucu (masukan Adrian).
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, VIDEO, WEIGHTS } from "../../../brand";
import { f, lineEnd, lineStart } from "../timing";
import { BlueBg, drift, glowText, pop, ramp } from "../ui";

export const Scene04_HalfScreen_100Persen: React.FC = () => {
  const frame = useCurrentFrame();
  const a = lineStart(4), end = lineEnd(4);
  if (frame < a || frame >= end + 8) return null;
  const h = VIDEO.height * 0.45 * Math.min(ramp(frame, a, a + 8), ramp(frame, end, end + 8, 1, 0));
  const n = Math.round(ramp(frame, f(27), f(28) + 10, 0, 100));
  const num = pop(frame, f(27));
  const mascot = pop(frame, a + 6, 8);
  const hop = Math.abs(Math.sin((frame - a) / 6)) * 26;
  const label = pop(frame, f(30));
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h, overflow: "hidden" }}>
        <BlueBg frame={frame} ray />
        <div style={{ position: "absolute", left: 70, top: 300 - hop, width: 260, opacity: mascot, transform: `scale(${interpolate(mascot, [0, 1], [0.2, 1])}) rotate(${drift(frame, 8, 0.2)}deg)` }}>
          <Img src={staticFile("assets/claude-cute.png")} style={{ width: 260, filter: "drop-shadow(0 16px 26px rgba(0,0,0,0.45))" }} />
        </div>
        <div style={{ position: "absolute", left: 330, right: 120, top: 250, textAlign: "center", opacity: num, transform: `scale(${interpolate(num, [0, 1], [0.8, 1])})` }}>
          <div style={{ fontWeight: WEIGHTS.black, fontSize: 230, color: COLORS.yellow, lineHeight: 1, letterSpacing: -6, textShadow: glowText() }}>{n}%</div>
          <div style={{ marginTop: 8, opacity: label, fontWeight: WEIGHTS.bold, fontSize: 52, color: COLORS.white }}>di-edit Claude</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
