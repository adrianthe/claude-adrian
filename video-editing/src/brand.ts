// Brand Aigrowth — sumber: aigrowth-editing-guide/AIGROWTH-VISUAL-EDITING-GUIDE.md Bagian 0.
// Semua komponen WAJIB ambil warna & font dari file ini, jangan hardcode hex.
import { loadFont } from "@remotion/google-fonts/Inter";

const inter = loadFont("normal", {
  weights: ["500", "700", "800", "900"],
  subsets: ["latin"],
});

export const VIDEO = { width: 1080, height: 1920, fps: 30 } as const;

export const COLORS = {
  blue: "#061CB0", // warna utama / background grafis
  blueDeep: "#03106B", // vignette pinggir background grafis
  yellow: "#FDF100", // aksen: kata penting, angka, progress aktif
  white: "#FFFFFF", // teks normal
  whiteMuted: "rgba(255,255,255,0.7)", // teks sekunder / label kecil
  blueLight: "#8C9BE6", // alternatif teks sekunder
  red: "#FF3B3B", // bahaya / salah / jangan — pakai hemat
  trackInactive: "rgba(255,255,255,0.25)", // segmen tracker yang belum dibahas
} as const;

export const FONTS = {
  main: inter.fontFamily, // Inter
  // Font aksen script/handwriting: maks 1 kata per scene. Diisi saat dipilih di planning page.
  accent: undefined as string | undefined,
} as const;

export const WEIGHTS = { medium: 500, bold: 700, extraBold: 800, black: 900 } as const;

// Background grafis: biru dengan radial lebih terang di tengah, vignette ke biru tua (bukan biru flat).
export const BG_GRADIENT = `radial-gradient(120% 80% at 50% 45%, ${COLORS.blue} 0%, ${COLORS.blue} 45%, ${COLORS.blueDeep} 100%)`;

export const CAPTION = {
  fontWeight: WEIGHTS.bold,
  color: COLORS.white,
  keywordColor: COLORS.yellow,
  negativeColor: COLORS.red,
  keywordScale: 1.2,
  shadow: "0 0 8px rgba(0,0,0,0.4)",
  popInFrames: 4, // scale 85% -> 100%
  centerY: 0.62, // ±60–65% tinggi layar
} as const;

// Safe area dari guide Bagian 9: atas 8%, bawah 15%, kanan 12% (tombol IG).
export const SAFE = {
  top: Math.round(VIDEO.height * 0.08),
  bottom: Math.round(VIDEO.height * 0.15),
  right: Math.round(VIDEO.width * 0.12),
} as const;

export const MOTION = {
  springDamping: 13, // 12–15
  staggerFrames: 4, // 3–5
  exitFrames: 7, // 6–8
  punchInScale: 1.12,
  uiRadius: 24,
} as const;

export const HANDLE = "@adrianthe_";
