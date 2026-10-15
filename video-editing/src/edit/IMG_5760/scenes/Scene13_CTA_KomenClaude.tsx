// #13 CTA: "Ketik komen" + “CLAUDE” kuning glow (pop bounce di "Claude"), alasan kecil, bubble DM di "DM".
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, WEIGHTS } from "../../../brand";
import { f } from "../timing";
import { drift, glowText, pop, textShadow } from "../ui";

export const Scene13_CTA_KomenClaude: React.FC = () => {
  const frame = useCurrentFrame();
  const a = f(102);
  if (frame < a) return null;
  const small = pop(frame, a);
  const kw = pop(frame, f(104), 7);
  const why = pop(frame, f(107));
  const dm = pop(frame, f(112) - 2, 10);
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main }}>
      <div style={{ position: "absolute", top: 200, left: 60, right: 130, textAlign: "center" }}>
        <div style={{ fontWeight: WEIGHTS.bold, fontSize: 56, color: COLORS.white, textShadow, opacity: small }}>Ketik komen</div>
        <div style={{ fontWeight: WEIGHTS.black, fontSize: 176, lineHeight: 1, letterSpacing: -3, color: COLORS.yellow, textShadow: glowText(), opacity: Math.min(1, kw * 2), transform: `scale(${interpolate(kw, [0, 1], [0.4, 1])})` }}>
          “CLAUDE”
        </div>
        <div style={{ marginTop: 10, fontWeight: WEIGHTS.bold, fontSize: 42, color: COLORS.white, textShadow, opacity: why }}>tutorial lengkap gue kirim ke DM, gratis</div>
      </div>
      <div style={{ position: "absolute", left: 160, right: 210, top: 560 + drift(frame, 5, 0.12), display: "flex", alignItems: "center", gap: 18, padding: "16px 22px", borderRadius: 999, background: "rgba(255,255,255,0.95)", boxShadow: "0 18px 40px rgba(0,0,0,0.4)", opacity: dm, transform: `translateY(${interpolate(dm, [0, 1], [60, 0])}px) scale(${interpolate(dm, [0, 1], [0.8, 1])})` }}>
        <Img src={staticFile("assets/claude-cute.png")} style={{ width: 64, height: 64 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: WEIGHTS.extraBold, fontSize: 30, color: "#111827" }}>adrianthe_</div>
          <div style={{ fontWeight: WEIGHTS.medium, fontSize: 26, color: "#4B5563" }}>Ini tutorial lengkapnya ya</div>
        </div>
        <div style={{ width: 22, height: 22, borderRadius: 11, background: COLORS.blue }} />
      </div>
    </AbsoluteFill>
  );
};
