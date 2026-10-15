// #3 iPhone masuk miring dari kanan di "HP", chip "CUMA HP" kuning di "doang".
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BG_GRADIENT, COLORS, FONTS, WEIGHTS } from "../../../brand";
import { f, lineEnd } from "../timing";
import { drift, out, pop } from "../ui";

// Area layar iPhone (diukur dari iphone.png 1024x1536).
const SCREEN = { left: 0.186, top: 0.046, width: 0.629, height: 0.908 };

export const IPhone: React.FC<{ width: number; children?: React.ReactNode }> = ({ width, children }) => {
  const h = width * 1.5;
  return (
    <div style={{ position: "relative", width, height: h }}>
      <div style={{ position: "absolute", left: SCREEN.left * width, top: SCREEN.top * h, width: SCREEN.width * width, height: SCREEN.height * h, borderRadius: width * 0.07, overflow: "hidden", background: BG_GRADIENT }}>
        {children}
      </div>
      <Img src={staticFile("assets/iphone-frame.png")} style={{ position: "absolute", inset: 0, width, height: h, filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.5))" }} />
    </div>
  );
};

export const Scene03_Caption_PakeHP: React.FC = () => {
  const frame = useCurrentFrame();
  const a = f(22), end = lineEnd(3) + 4;
  if (frame < a || frame >= end) return null;
  const p = pop(frame, f(23) - 4, 12);
  const chip = pop(frame, f(24), 10);
  const o = out(frame, end, 6);
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main, opacity: o }}>
      <div style={{ position: "absolute", left: 650, top: 250 + drift(frame, 8, 0.1), transform: `translateX(${interpolate(p, [0, 1], [500, 0])}px) rotate(${interpolate(p, [0, 1], [24, 9])}deg)` }}>
        <IPhone width={290}>
          <Img src={staticFile("assets/claude-cute.png")} style={{ width: "86%", margin: "32% auto 0", display: "block" }} />
        </IPhone>
      </div>
      <div style={{ position: "absolute", left: 300, top: 300, opacity: chip, transform: `scale(${interpolate(chip, [0, 1], [0.6, 1])}) rotate(-4deg)`, background: COLORS.yellow, color: COLORS.blue, fontWeight: WEIGHTS.black, fontSize: 64, padding: "12px 30px", borderRadius: 20, boxShadow: "0 12px 30px rgba(0,0,0,0.35)" }}>
        CUMA HP
      </div>
    </AbsoluteFill>
  );
};
