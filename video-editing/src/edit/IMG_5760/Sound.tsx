// Track audio SFX: satu <Sequence> per cue, dikelompokkan per keluarga (WHOOSHES · TEXTURES · RISERS · HITS · MUSIC).
import { Audio, Sequence, interpolate, staticFile } from "remotion";
import { CUES, type Family, PEAK } from "./sfx-cues";

const FAMILIES: Family[] = ["WHOOSHES", "TEXTURES", "RISERS", "HITS", "MUSIC"];
const gain = (db: number) => 10 ** (db / 20);

export const Sound: React.FC = () => (
  <>
    {FAMILIES.map((fam) => (
      <Sequence key={fam} name={fam} layout="none">
        {CUES.filter((c) => c.family === fam).map((c, i) => {
          const from = Math.max(0, c.frame - (PEAK[c.file] ?? 0));
          const g = gain(c.db);
          return (
            <Sequence key={i} name={`${c.file.split("/").pop()} — ${c.why}`} from={from} durationInFrames={c.maxFrames} layout="none">
              <Audio
                src={staticFile(c.file)}
                volume={(fr) => (c.maxFrames ? g * interpolate(fr, [c.maxFrames - 12, c.maxFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : g)}
              />
            </Sequence>
          );
        })}
      </Sequence>
    ))}
  </>
);
