// #8 Foreshadow langkah: tile 1-2-3 turun (Tracker), lalu "GAMPANG BANGET" stacked kuning.
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, WEIGHTS } from "../../../brand";
import { f, lineEnd } from "../timing";
import { glowText, out, pop, textShadow } from "../ui";

export const Scene08_Caption_GampangBanget: React.FC = () => {
  const frame = useCurrentFrame();
  const a = f(60), end = lineEnd(8);
  if (frame < a || frame >= end) return null;
  const s1 = pop(frame, a);
  const s2 = pop(frame, f(61));
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main, opacity: out(frame, end) }}>
      <div style={{ position: "absolute", top: 350, left: 60, right: 130, textAlign: "center", lineHeight: 0.95 }}>
        <div style={{ fontWeight: WEIGHTS.black, fontSize: 132, color: COLORS.yellow, textShadow: glowText(), opacity: s1, transform: `scale(${interpolate(s1, [0, 1], [0.7, 1])})` }}>GAMPANG</div>
        <div style={{ fontWeight: WEIGHTS.black, fontSize: 132, color: COLORS.white, textShadow, opacity: s2, transform: `scale(${interpolate(s2, [0, 1], [0.7, 1])})` }}>BANGET</div>
      </div>
    </AbsoluteFill>
  );
};
