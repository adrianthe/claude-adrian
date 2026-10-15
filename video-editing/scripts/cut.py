# Potong jeda: pakai interval silencedetect (ground truth audio), padding 20 ms tiap sisi.
# Pakai: python3 scripts/cut.py raw/<file> <src_in> <src_out>
import json, re, subprocess, sys, os
src, IN, OUT = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
name = os.path.splitext(os.path.basename(src))[0]
PAD, MIN_SIL = 0.02, 0.2
log = subprocess.run(["ffmpeg", "-hide_banner", "-i", src, "-af", f"silencedetect=noise=-35dB:d={MIN_SIL}", "-f", "null", "-"], capture_output=True, text=True).stderr
st = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", log)]
en = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", log)]
keep, a = [], IN
for s, e in zip(st, en):
    cs, ce = s + PAD, e - PAD
    if ce <= IN or cs >= OUT or ce - cs < 0.05: continue
    if cs > a: keep.append([a, cs])
    a = max(a, ce)
if OUT > a: keep.append([a, OUT])
# filter trim+concat
parts, labels = [], ""
for i, (s, e) in enumerate(keep):
    parts.append(f"[0:v]trim={s:.3f}:{e:.3f},setpts=PTS-STARTPTS,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30[v{i}];[0:a]atrim={s:.3f}:{e:.3f},asetpts=PTS-STARTPTS,aresample=48000[a{i}]")
    labels += f"[v{i}][a{i}]"
fc = ";".join(parts) + f";{labels}concat=n={len(keep)}:v=1:a=1[v][a]"
out = f"public/cut/{name}-cut.mp4"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-filter_complex", fc, "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "256k", "-movflags", "+faststart", out], check=True)
# remap transcript ke timeline baru
segs, o = [], 0.0
for s, e in keep: segs.append((s, e, o)); o += e - s
def m(t):
    for s, e, off in segs:
        if t < s: return off
        if t <= e: return off + t - s
    return o
tr = json.load(open(f"public/transcripts/{name}.json"))
FIX = {"cloud": "Claude", "cloud,": "Claude,", "Cloud": "Claude", "capcut,": "CapCut,", "premiere": "Premiere", "pro": "Pro", "remotion": "Remotion", "hyperframes": "HyperFrames", "hp": "HP", "headnya": "head-nya"}
words = [{"text": FIX.get(w["text"], w["text"]), "start": round(m(w["start"]), 3), "end": round(m(w["end"]), 3), "srcStart": w["start"], "srcEnd": w["end"]} for w in tr["words"]]
json.dump({"source": src, "cutVideo": out, "duration": round(o, 3), "fps": 30, "segments": [{"srcIn": round(s, 3), "srcOut": round(e, 3), "at": round(off, 3)} for s, e, off in segs], "words": words}, open(f"public/transcripts/{name}-cut.json", "w"), indent=1)
print(json.dumps({"out": out, "segments": len(keep), "duration": round(o, 3), "removed": round(OUT - IN - o, 3)}))
