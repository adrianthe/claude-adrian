// Transkrip per kata. Jalankan: npm run transcribe -- raw/<file>.mp4
// Output: public/transcripts/<file>.json (whisper output mentah + daftar kata {text,start,end} dalam detik).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { toCaptions, transcribe } from "@remotion/install-whisper-cpp";
import { WHISPER_MODEL, WHISPER_PATH, WHISPER_VERSION } from "./whisper-config.ts";

const input = process.argv[2];
if (!input) throw new Error("Pakai: npm run transcribe -- raw/<file>.mp4");
const name = path.basename(input, path.extname(input));
const wav = path.resolve("public/transcripts", `${name}.16k.wav`);
fs.mkdirSync(path.dirname(wav), { recursive: true });
// whisper.cpp butuh WAV 16 kHz mono
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", input, "-ar", "16000", "-ac", "1", wav]);

const output = await transcribe({
  inputPath: wav,
  whisperPath: WHISPER_PATH,
  whisperCppVersion: WHISPER_VERSION,
  model: WHISPER_MODEL,
  language: "id",
  tokenLevelTimestamps: true,
});
const { captions } = toCaptions({ whisperCppOutput: output });
// Token whisper = potongan kata. Token yang diawali spasi = kata baru, sisanya disambung ke kata sebelumnya.
const words: { text: string; start: number; end: number }[] = [];
for (const c of captions) {
  if (!c.text.trim()) continue;
  const last = words[words.length - 1];
  if (last && !/^\s/.test(c.text)) {
    last.text += c.text;
    last.end = c.endMs / 1000;
  } else {
    words.push({ text: c.text.trim(), start: c.startMs / 1000, end: c.endMs / 1000 });
  }
}
const out = path.resolve("public/transcripts", `${name}.json`);
fs.writeFileSync(out, JSON.stringify({ source: input, words, whisper: output }, null, 2));
fs.rmSync(wav);
console.log(`${words.length} kata -> ${out}`);
