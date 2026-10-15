// Track 5: progress tracker tile 1-2-3 di atas kepala (guide Bagian 3, opsi 4). Persisten dari "caranya" sampai CTA.
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, WEIGHTS } from "../../brand";
import { TRACKER } from "./timing";
import { out, pop } from "./ui";

export const Tracker: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < TRACKER.in || frame >= TRACKER.out) return null;
  const exit = out(frame, TRACKER.out);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 170, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 22, opacity: exit }}>
        {[0, 1, 2].map((i) => {
          const enter = pop(frame, TRACKER.in + i * 4);
          const active = frame >= TRACKER.steps[i];
          const flip = pop(frame, TRACKER.steps[i], 11);
          const recap = frame >= TRACKER.recap ? Math.sin(Math.min(1, (frame - TRACKER.recap - i * 3) / 8) * Math.PI) * 0.12 : 0;
          return (
            <div
              key={i}
              style={{
                width: 118, height: 148, borderRadius: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: FONTS.main, fontWeight: WEIGHTS.black, fontSize: 84,
                color: active ? COLORS.blue : COLORS.white,
                background: active ? COLORS.yellow : "rgba(255,255,255,0.18)",
                border: `3px solid ${active ? COLORS.yellow : "rgba(255,255,255,0.45)"}`,
                backdropFilter: "blur(10px)",
                boxShadow: active ? "0 0 36px rgba(253,241,0,0.55)" : "0 10px 30px rgba(0,0,0,0.3)",
                opacity: enter,
                transform: `translateY(${interpolate(enter, [0, 1], [-90, 0])}px) rotateX(${active ? (1 - flip) * 180 : 0}deg) scale(${1 + recap})`,
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
