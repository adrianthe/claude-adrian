// Track 1: video speaker + punch-in + layout half screen.
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { VIDEO } from "../../brand";
import { CUT_VIDEO, f, isHalf, lineEnd, lineStart, HALF_LINES } from "./timing";
import { Dim, ramp } from "./ui";

// Punch-in 100% -> 112% di kalimat penting (guide Bagian 7). [frame, scale]
const PUNCH: [number, number][] = [
  [0, 1.0],
  [f(7), 1.12], // pikir-pikir
  [f(10), 1.0], // flash ke isi
  [f(16), 1.08], // se-keren ini
  [f(18), 1.0],
  [f(46), 1.06], // kurang dari 1 jam
  [f(54), 1.12], // temen-temen
  [f(55), 1.0],
  [f(60), 1.08], // gampang banget
  [f(62), 1.0],
  [f(75), 1.08], // langganan Claude Pro
  [f(81), 1.0],
  [f(104), 1.12], // CTA "Claude"
];

const punchAt = (frame: number) => {
  let s = 1;
  for (let i = 0; i < PUNCH.length; i++) {
    const [at, sc] = PUNCH[i];
    if (frame < at) break;
    const prev = i ? PUNCH[i - 1][1] : 1;
    s = interpolate(frame, [at, at + 5], [prev, sc], { extrapolateRight: "clamp" });
  }
  return s;
};

// Gelapin + blur di belakang elemen berteks.
const DIM: [number, number][] = [
  [f(16), lineEnd(2)],
  [f(75), lineEnd(10)],
];

export const Speaker: React.FC = () => {
  const frame = useCurrentFrame();
  // progress half screen 0..1, transisi 8 frame di awal/akhir tiap baris half
  let half = 0;
  for (const n of HALF_LINES) {
    const a = lineStart(n), b = lineEnd(n);
    if (frame >= a - 1 && frame < b + 8) half = Math.min(ramp(frame, a, a + 8), ramp(frame, b, b + 8, 1, 0));
  }
  const top = VIDEO.height * 0.45 * half;
  const scale = punchAt(frame) * (1 + 0.015 * Math.sin(frame / 40));
  const dim = Math.max(0, ...DIM.map(([a, b]) => Math.min(ramp(frame, a, a + 5), ramp(frame, b - 5, b, 1, 0))));
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top, bottom: 0, overflow: "hidden", borderTopLeftRadius: 36 * half, borderTopRightRadius: 36 * half }}>
        <OffthreadVideo
          src={staticFile(CUT_VIDEO)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 55%", transform: `scale(${scale})`, transformOrigin: "50% 48%" }}
        />
        {!isHalf(frame) && <Dim opacity={dim} />}
      </div>
    </AbsoluteFill>
  );
};
