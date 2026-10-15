// #12 Half screen before/after: kiri raw (abu-abu), kanan hasil edit. Recap tile penuh ada di Tracker.
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, VIDEO, WEIGHTS } from "../../../brand";
import { CUT_VIDEO, lineEnd, lineStart } from "../timing";
import { BlueBg, pop, ramp } from "../ui";

const Card: React.FC<{ label: string; at: number; frame: number; tilt: number; active?: boolean; children: React.ReactNode }> = ({ label, at, frame, tilt, active, children }) => {
  const p = pop(frame, at, 12);
  return (
    <div style={{ width: 300, opacity: p, transform: `translateY(${interpolate(p, [0, 1], [80, 0])}px) rotate(${tilt}deg)` }}>
      <div style={{ width: 300, height: 400, borderRadius: 24, overflow: "hidden", border: `5px solid ${active ? COLORS.yellow : "rgba(255,255,255,0.6)"}`, boxShadow: active ? "0 0 40px rgba(253,241,0,0.5)" : "0 20px 40px rgba(0,0,0,0.4)" }}>{children}</div>
      <div style={{ margin: "14px auto 0", width: "fit-content", fontWeight: WEIGHTS.black, fontSize: 36, padding: "6px 20px", borderRadius: 999, background: active ? COLORS.yellow : COLORS.white, color: COLORS.blue }}>{label}</div>
    </div>
  );
};

export const Scene12_HalfScreen_BeforeAfter: React.FC = () => {
  const frame = useCurrentFrame();
  const a = lineStart(12), end = lineEnd(12);
  if (frame < a || frame >= end + 8) return null;
  const h = VIDEO.height * 0.45 * Math.min(ramp(frame, a, a + 8), ramp(frame, end, end + 8, 1, 0));
  return (
    <AbsoluteFill style={{ fontFamily: FONTS.main }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h, overflow: "hidden" }}>
        <BlueBg frame={frame} />
        <div style={{ position: "absolute", top: 340, left: 0, right: 60, display: "flex", justifyContent: "center", gap: 56 }}>
          <Card label="SEBELUM" at={a + 4} frame={frame} tilt={-4}>
            <OffthreadVideo muted src={staticFile(CUT_VIDEO)} startFrom={300} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) brightness(0.85)" }} />
          </Card>
          <Card label="SESUDAH" at={a + 10} frame={frame} tilt={4} active>
            <OffthreadVideo muted src={staticFile("assets/hasil-edit-claude.mp4")} startFrom={30 * 22} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};
