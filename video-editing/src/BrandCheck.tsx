import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BG_GRADIENT, COLORS, FONTS, HANDLE, MOTION, WEIGHTS } from "./brand";

export const BrandCheck: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: MOTION.springDamping } });
  return (
    <AbsoluteFill style={{ background: BG_GRADIENT, fontFamily: FONTS.main, alignItems: "center", justifyContent: "center", gap: 24 }}>
      <div style={{ color: COLORS.white, fontWeight: WEIGHTS.extraBold, fontSize: 120, transform: `scale(${0.8 + 0.2 * s})`, opacity: s }}>
        AI<span style={{ color: COLORS.yellow }}>GROWTH</span>
      </div>
      <div style={{ color: COLORS.whiteMuted, fontWeight: WEIGHTS.medium, fontSize: 40 }}>{HANDLE}</div>
    </AbsoluteFill>
  );
};
