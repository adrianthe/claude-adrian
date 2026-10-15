// #6 Full screen: iPhone di tengah muter pelan nampilin hasil edit Claude, light ray kuning.
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { lineEnd, lineStart } from "../timing";
import { BlueBg, pop, ramp } from "../ui";
import { IPhone } from "./Scene03_Caption_PakeHP";

export const Scene06_FullScreen_Hasilnya: React.FC = () => {
  const frame = useCurrentFrame();
  const a = lineStart(6), end = lineEnd(6);
  if (frame < a || frame >= end) return null;
  const p = pop(frame, a, 12);
  const wipe = ramp(frame, a, a + 6);
  return (
    <AbsoluteFill style={{ clipPath: `circle(${wipe * 120}% at 50% 50%)` }}>
      <BlueBg frame={frame} ray />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", perspective: 1600 }}>
        <div style={{ marginTop: -120, transform: `scale(${interpolate(p, [0, 1], [0.75, 1]) * (1 + (frame - a) * 0.002)}) rotateY(${interpolate(frame, [a, end], [-14, 10])}deg) rotateZ(${interpolate(frame, [a, end], [-3, 2])}deg)` }}>
          <IPhone width={560}>
            <OffthreadVideo muted src={staticFile("assets/hasil-edit-claude.mp4")} startFrom={30 * 12} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </IPhone>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
