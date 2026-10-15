// #1 Hook — judul negatif + glitch (guide hook D: hook-05, hook-06).
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { COLORS, FONTS, WEIGHTS } from "../../../brand";
import { lineEnd } from "../timing";
import { out, pop, textShadow } from "../ui";

const GLITCH = [51, 60]; // ±1.7 s, 0.3 s

const Title: React.FC<{ dx?: number; color?: string; clip?: string }> = ({ dx = 0, color, clip }) => (
  <div style={{ position: "absolute", left: 60, right: 130, top: 0, transform: `translateX(${dx}px)`, clipPath: clip, display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ fontWeight: WEIGHTS.extraBold, fontSize: 118, color: color ?? COLORS.red, letterSpacing: -2, lineHeight: 1 }}>PIKIR-PIKIR</div>
    <div style={{ fontWeight: WEIGHTS.black, fontSize: 168, color: color ?? COLORS.white, letterSpacing: -3, lineHeight: 0.95 }}>DULU</div>
  </div>
);

export const Scene01_Hook_PikirPikir: React.FC = () => {
  const frame = useCurrentFrame();
  const end = lineEnd(1);
  if (frame >= end) return null;
  const sSmall = pop(frame, 0, 200);
  const sBig = pop(frame, 3, 12);
  const glitching = frame >= GLITCH[0] && frame < GLITCH[1];
  const jit = glitching ? (random(`g${frame}`) - 0.5) * 40 : 0;
  const o = out(frame, end);
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main, opacity: o, textShadow }}>
      <div style={{ position: "absolute", top: 190, left: 60, right: 130, textAlign: "center", fontWeight: WEIGHTS.bold, fontSize: 50, color: COLORS.white, opacity: sSmall, transform: `translateY(${interpolate(sSmall, [0, 1], [20, 0])}px)` }}>
        Mau jadi video editor?
      </div>
      <div style={{ position: "absolute", top: 262, left: 0, right: 0, height: 320, transform: `scale(${interpolate(sBig, [0, 1], [0.8, 1])})`, opacity: sBig }}>
        {glitching && (
          <>
            <Title dx={jit - 14} color="rgba(0,255,255,0.75)" />
            <Title dx={-jit + 14} color="rgba(255,0,80,0.75)" />
          </>
        )}
        <Title
          dx={jit}
          clip={glitching ? `inset(${Math.floor(random(`c${frame}`) * 60)}% 0 ${Math.floor(random(`d${frame}`) * 30)}% 0)` : undefined}
        />
        {glitching && <Title dx={-jit * 1.5} clip={`inset(0 0 ${55 + Math.floor(random(`e${frame}`) * 30)}% 0)`} />}
      </div>
    </AbsoluteFill>
  );
};
