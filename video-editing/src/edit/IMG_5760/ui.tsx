import { AbsoluteFill, interpolate, spring } from "remotion";
import { BG_GRADIENT, COLORS, MOTION } from "../../brand";
import { FPS } from "./timing";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Spring masuk (scale 0.8 -> 1 + fade), damping dari brand. */
export const pop = (frame: number, at: number, damping: number = MOTION.springDamping) =>
  spring({ frame: frame - at, fps: FPS, config: { damping } });

/** 1 -> 0 di frame-frame terakhir sebelum `end` (keluar cepat 6–8 frame). */
export const out = (frame: number, end: number, dur: number = MOTION.exitFrames) =>
  interpolate(frame, [end - dur, end], [1, 0], clamp);

export const ramp = (frame: number, a: number, b: number, from = 0, to = 1) => interpolate(frame, [a, b], [from, to], clamp);

/** Drift pelan supaya grafik nggak pernah diam total. */
export const drift = (frame: number, amp = 6, speed = 0.05) => Math.sin(frame * speed) * amp;

/** Background grafis Aigrowth: biru, radial terang di tengah, vignette, grid tipis, opsional light ray kuning. */
export const BlueBg: React.FC<{ frame: number; ray?: boolean }> = ({ frame, ray }) => (
  <AbsoluteFill style={{ background: BG_GRADIENT, overflow: "hidden" }}>
    <AbsoluteFill
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)",
        backgroundSize: "72px 72px",
        transform: `translateY(${(frame * 0.6) % 72}px)`,
      }}
    />
    {ray && (
      <AbsoluteFill
        style={{
          background: `conic-gradient(from ${frame * 0.6}deg at 50% 50%, transparent 0deg, rgba(253,241,0,0.16) 18deg, transparent 36deg, transparent 90deg, rgba(253,241,0,0.12) 108deg, transparent 126deg, transparent 180deg, rgba(253,241,0,0.16) 198deg, transparent 216deg, transparent 270deg, rgba(253,241,0,0.12) 288deg, transparent 306deg)`,
          maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 65%)",
        }}
      />
    )}
  </AbsoluteFill>
);

/** Gelapin 30% + blur 8px di belakang elemen UI berisi teks (guide Bagian 6). */
export const Dim: React.FC<{ opacity: number }> = ({ opacity }) =>
  opacity <= 0 ? null : (
    <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${0.3 * opacity})`, backdropFilter: `blur(${8 * opacity}px)` }} />
  );

export const glowText = (color: string = COLORS.yellow) =>
  `0 0 18px ${color}AA, 0 0 42px ${color}66, 0 4px 14px rgba(0,0,0,0.45)`;

export const textShadow = "0 0 8px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.35)";
