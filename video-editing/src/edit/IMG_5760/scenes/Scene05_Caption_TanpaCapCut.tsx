// #5 Ikon CapCut (kiri) & Premiere Pro (kanan) pop di kata masing-masing, lalu dicoret merah.
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../../../brand";
import { f, lineEnd, lineStart } from "../timing";
import { drift, out, pop, ramp } from "../ui";

const Crossed: React.FC<{ src: string; at: number; frame: number; x: number; tilt: number }> = ({ src, at, frame, x, tilt }) => {
  const p = pop(frame, at, 10);
  const draw = ramp(frame, at + 9, at + 15);
  const size = 230;
  return (
    <div style={{ position: "absolute", left: x, top: 210 + drift(frame + at, 6, 0.12), width: size, height: size, opacity: p, transform: `scale(${interpolate(p, [0, 1], [0.4, 1])}) rotate(${tilt + drift(frame, 2, 0.1)}deg)` }}>
      <Img src={staticFile(src)} style={{ width: size, height: size, filter: `drop-shadow(0 16px 26px rgba(0,0,0,0.45)) grayscale(${draw * 0.6})` }} />
      <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: -10, width: size + 20, height: size + 20 }}>
        <path d="M14 14 L86 86" stroke={COLORS.red} strokeWidth="11" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, draw * 2)} fill="none" />
        <path d="M86 14 L14 86" stroke={COLORS.red} strokeWidth="11" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.max(0, draw * 2 - 1)} fill="none" />
      </svg>
    </div>
  );
};

export const Scene05_Caption_TanpaCapCut: React.FC = () => {
  const frame = useCurrentFrame();
  const a = lineStart(5), end = lineEnd(5);
  if (frame < a || frame >= end) return null;
  return (
    <AbsoluteFill style={{ opacity: out(frame, end) }}>
      <Crossed src="assets/icon-capcut.png" at={f(34) - 3} frame={frame} x={70} tilt={-8} />
      <Crossed src="assets/icon-premiere.png" at={f(38) - 3} frame={frame} x={700} tilt={8} />
    </AbsoluteFill>
  );
};
