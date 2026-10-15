// #7 Stopwatch di atas kepala, jarum muter cepat lalu berhenti; "KURANG DARI" + "1 JAM" -> "60 MENIT" kuning.
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, WEIGHTS } from "../../../brand";
import { f, lineEnd, lineStart } from "../timing";
import { drift, glowText, out, pop, ramp, textShadow } from "../ui";

export const Scene07_Caption_60Menit: React.FC = () => {
  const frame = useCurrentFrame();
  const a = lineStart(7), end = lineEnd(7);
  if (frame < a || frame >= end) return null;
  const sw = pop(frame, f(46) - 4, 10);
  const stop = f(52);
  const ang = frame < stop ? (frame - f(46)) * 38 : (stop - f(46)) * 38 + interpolate(frame, [stop, stop + 6], [0, 20], { extrapolateRight: "clamp" });
  const small = pop(frame, f(46));
  const jam = pop(frame, f(48));
  const swap = ramp(frame, stop - 2, stop + 4);
  const menit = pop(frame, stop);
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main, opacity: out(frame, end) }}>
      <svg viewBox="0 0 200 220" style={{ position: "absolute", left: 80, top: 230 + drift(frame, 5, 0.15), width: 220, height: 242, opacity: sw, transform: `scale(${interpolate(sw, [0, 1], [0.4, 1])})` }}>
        <rect x="88" y="4" width="24" height="22" rx="6" fill={COLORS.yellow} />
        <circle cx="100" cy="125" r="86" fill={COLORS.white} stroke={COLORS.yellow} strokeWidth="14" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="100" y1="50" x2="100" y2="62" stroke={COLORS.blue} strokeWidth="5" strokeLinecap="round" transform={`rotate(${i * 30} 100 125)`} />
        ))}
        <line x1="100" y1="125" x2="100" y2="66" stroke={COLORS.red} strokeWidth="8" strokeLinecap="round" transform={`rotate(${ang} 100 125)`} />
        <circle cx="100" cy="125" r="9" fill={COLORS.blue} />
      </svg>
      <div style={{ position: "absolute", left: 330, right: 120, top: 230, textShadow }}>
        <div style={{ fontWeight: WEIGHTS.bold, fontSize: 54, color: COLORS.white, opacity: small }}>KURANG DARI</div>
        <div style={{ position: "relative", height: 150 }}>
          <div style={{ position: "absolute", fontWeight: WEIGHTS.black, fontSize: 150, lineHeight: 1, color: COLORS.white, opacity: jam * (1 - swap), transform: `translateY(${-60 * swap}px)` }}>1 JAM</div>
          {frame >= stop - 2 && (
            <div style={{ position: "absolute", fontWeight: WEIGHTS.black, fontSize: 132, lineHeight: 1.05, color: COLORS.yellow, whiteSpace: "nowrap", textShadow: glowText(), opacity: swap, transform: `translateY(${60 * (1 - swap)}px) scale(${interpolate(menit, [0, 1], [0.85, 1])})`, transformOrigin: "left center" }}>
              60 MENIT
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
