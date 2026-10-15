// #2 Flash putih hook -> isi, maskot Claude pop di "Claude", "SE-KEREN INI" stacked kuning.
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, WEIGHTS } from "../../../brand";
import { f, lineEnd, lineStart } from "../timing";
import { drift, glowText, out, pop, ramp, textShadow } from "../ui";

export const Scene02_Caption_ClaudeSeKeren: React.FC = () => {
  const frame = useCurrentFrame();
  const a = lineStart(2), end = lineEnd(2);
  if (frame < a || frame >= end) return null;
  const flash = ramp(frame, a, a + 3, 1, 0);
  const m = pop(frame, f(11), 9);
  const mOut = frame >= f(16) ? ramp(frame, f(16), f(16) + 7, 1, 0) : 1;
  const st = pop(frame, f(16));
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main }}>
      {/* maskot Claude di kanan atas kepala */}
      <div style={{ position: "absolute", left: 620, top: 250 + drift(frame, 10, 0.12), width: 320, opacity: m * mOut, transform: `scale(${interpolate(m, [0, 1], [0.3, 1])}) rotate(${drift(frame, 6, 0.15)}deg)` }}>
        <Img src={staticFile("assets/claude-cute.png")} style={{ width: 320, filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.45))" }} />
        <div style={{ margin: "-20px auto 0", width: "fit-content", background: COLORS.white, color: COLORS.blue, fontWeight: WEIGHTS.extraBold, fontSize: 36, padding: "8px 22px", borderRadius: 999 }}>Claude</div>
      </div>
      {/* stacked "bisa ngedit video / SE-KEREN INI" */}
      {frame >= f(16) && (
        <div style={{ position: "absolute", top: 250, left: 60, right: 130, textAlign: "center", opacity: st * out(frame, end), transform: `scale(${interpolate(st, [0, 1], [0.8, 1])})` }}>
          <div style={{ fontWeight: WEIGHTS.bold, fontSize: 52, color: COLORS.white, textShadow }}>bisa ngedit video</div>
          <div style={{ fontWeight: WEIGHTS.black, fontSize: 140, color: COLORS.yellow, lineHeight: 1, letterSpacing: -2, textShadow: glowText() }}>SE-KEREN INI</div>
        </div>
      )}
      <AbsoluteFill style={{ backgroundColor: COLORS.white, opacity: flash }} />
    </AbsoluteFill>
  );
};
