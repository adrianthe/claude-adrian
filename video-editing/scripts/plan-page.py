# Bikin planning page HTML dari transkrip cut + usulan plan.
# Pakai: python3 scripts/plan-page.py IMG_5760
import json, sys, html

name = sys.argv[1]
tr = json.load(open(f"public/transcripts/{name}-cut.json"))
prop = json.load(open(f"plans/{name}-proposal.json"))
W = tr["words"]
lines = []
for i, L in enumerate(prop["lines"]):
    s = L["start"]
    e = prop["lines"][i + 1]["start"] if i + 1 < len(prop["lines"]) else len(W)
    t0 = W[s]["start"]
    t1 = W[e]["start"] if e < len(W) else tr["duration"]
    lines.append({**L, "id": i + 1, "t0": round(t0, 2), "t1": round(t1, 2), "script": " ".join(w["text"] for w in W[s:e])})
data = {"video": name, "duration": tr["duration"], "globals": prop["globals"], "lines": lines}

page = r"""<!doctype html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Plan Edit __NAME__</title>
<style>
:root{--blue:#061CB0;--deep:#03106B;--yellow:#FDF100;--ink:#0F172A;--sub:#64748B;--line:#E2E8F0;--bg:#F5F7FB}
*{box-sizing:border-box}body{margin:0;background:var(--bg);font-family:Inter,system-ui,sans-serif;color:var(--ink)}
header{background:var(--blue);color:#fff;padding:20px 24px;position:sticky;top:0;z-index:5;display:flex;gap:16px;align-items:center;flex-wrap:wrap}
header h1{margin:0;font-size:20px;flex:1;min-width:200px}header h1 span{color:var(--yellow)}
button{font:inherit;font-weight:700;border:0;border-radius:10px;padding:10px 16px;cursor:pointer}
.primary{background:var(--yellow);color:var(--deep)}.ghost{background:rgba(255,255,255,.15);color:#fff}
main{max-width:1200px;margin:0 auto;padding:20px 16px 80px}
.globals{background:#fff;border:1px solid var(--line);border-radius:16px;padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:22px}
.globals h2{grid-column:1/-1;margin:0;font-size:16px}
label{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:700;color:var(--sub);text-transform:uppercase;letter-spacing:.03em}
select,input[type=text],textarea{font:inherit;font-size:14px;color:var(--ink);border:1px solid var(--line);border-radius:10px;padding:9px 10px;background:#fff;text-transform:none;letter-spacing:0;font-weight:500}
input[type=color]{height:40px;width:100%;border:1px solid var(--line);border-radius:10px;background:#fff}
textarea{resize:vertical;min-height:70px}
.row{background:#fff;border:1px solid var(--line);border-radius:16px;margin-bottom:14px;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);overflow:hidden}
.left{padding:16px;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:10px}
.right{padding:16px;display:flex;flex-direction:column;gap:12px}
.meta{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:12px;color:var(--sub);font-weight:700}
.num{background:var(--blue);color:#fff;border-radius:8px;padding:3px 8px}
.badge{border-radius:999px;padding:3px 10px;color:#fff}
.Hook{background:#E5484D}.Foreshadow{background:#7C3AED}.Body{background:#0A64D6}.CTA{background:#16A34A}
.script{font-size:18px;font-weight:700;line-height:1.35}
.refs{display:flex;gap:8px;flex-wrap:wrap}.refs a{display:block;width:64px;height:114px;border-radius:8px;overflow:hidden;border:1px solid var(--line)}
.refs img{width:100%;height:100%;object-fit:cover}
.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.status{display:flex;gap:8px}.status label{flex-direction:row;align-items:center;gap:6px;text-transform:none;font-size:14px;color:var(--ink);border:1px solid var(--line);border-radius:10px;padding:8px 12px;cursor:pointer}
.status input{accent-color:var(--blue)}
.fb{border:2px dashed #CBD5E1;background:#FFFDE6}
.assets{font-size:13px;color:var(--sub)}.assets b{color:var(--ink)}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--ink);color:#fff;padding:10px 16px;border-radius:10px;opacity:0;transition:.2s}
.toast.on{opacity:1}
@media (max-width:760px){.row{grid-template-columns:1fr}.left{border-right:0;border-bottom:1px solid var(--line)}.two{grid-template-columns:1fr}}
</style></head><body>
<header><h1>Plan edit <span>__NAME__</span> · <span id="dur"></span></h1>
<button class="ghost" id="reset">Reset ke usulan</button><button class="primary" id="export">Export JSON</button></header>
<main>
<section class="globals" id="globals"><h2>Setelan global</h2></section>
<p style="color:var(--sub);font-size:14px;margin:0 0 14px">Kiri = script + waktu. Kanan = usulan edit gua (boleh lo ubah langsung). Isi kolom kuning buat masukan, pilih <b>Setuju</b> atau <b>Ubah</b>, lalu klik <b>Export JSON</b> dan kirim file-nya ke gua.</p>
<section id="rows"></section>
</main><div class="toast" id="toast"></div>
<script>
const DATA = __DATA__;
const SHOT = "../../aigrowth-editing-guide/screenshots/";
const KEY = "plan-" + DATA.video;
const SCENES = ["Caption", "Caption + UI", "Half screen", "Full screen"];
const SECTIONS = ["Hook", "Foreshadow", "Body", "CTA"];
const GLOBAL_FIELDS = [
  ["accent", "Warna aksen", "color"], ["fontColor", "Warna font", "color"],
  ["font1", "Font 1 (utama)", ["Inter", "Plus Jakarta Sans", "Montserrat", "Poppins"]],
  ["font2", "Font 2 (aksen, 1 kata/scene)", ["Caveat", "Permanent Marker", "Pacifico", "Tanpa font aksen"]],
  ["tracker", "Progress tracker", ["1. Chip step di atas caption", "2. Angka besar di atas kepala", "3. Label nomor di samping kepala", "4. Tile 1-2-3 di atas kepala (3 langkah)", "5. Full-screen chapter card"]],
  ["hook", "Variasi hook", ["A. Judul besar di belakang kepala", "B. Grafik mini", "C. Angka/kata kunci stacked", "D. Judul negatif + glitch", "E. Angka janji + daftar turun", "F. Objek terbang sekitar kepala", "G. Social proof card", "H. Angka raksasa / panel bernomor"]],
  ["captionPos", "Posisi caption", "text"],
];
function initial() {
  return { globals: { ...DATA.globals, notes: "" }, lines: DATA.lines.map(l => ({ id: l.id, section: l.section, scene: l.scene, proposal: l.proposal, status: "", feedback: "" })) };
}
let state;
try { state = JSON.parse(localStorage.getItem(KEY)) || initial(); } catch (e) { state = initial(); }
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = t => (Math.floor(t / 60) + ":" + (t % 60).toFixed(1).padStart(4, "0"));
document.getElementById("dur").textContent = fmt(DATA.duration);
function render() {
  const g = document.getElementById("globals");
  g.innerHTML = "<h2>Setelan global</h2>" + GLOBAL_FIELDS.map(([k, lbl, t]) => {
    const v = state.globals[k] ?? "";
    if (t === "color") return `<label>${lbl}<input type="color" data-g="${k}" value="${esc(v)}"></label>`;
    if (t === "text") return `<label>${lbl}<input type="text" data-g="${k}" value="${esc(v)}"></label>`;
    return `<label>${lbl}<select data-g="${k}">${t.map(o => `<option${o === v ? " selected" : ""}>${esc(o)}</option>`).join("")}</select></label>`;
  }).join("") + `<label style="grid-column:1/-1">Catatan umum buat gua<textarea class="fb" data-g="notes" placeholder="Misal: hook-nya mau lebih lucu, jangan pakai merah, dll.">${esc(state.globals.notes || "")}</textarea></label>`;
  document.getElementById("rows").innerHTML = DATA.lines.map((l, i) => {
    const s = state.lines[i];
    return `<article class="row">
      <div class="left">
        <div class="meta"><span class="num">#${l.id}</span><span>${fmt(l.t0)} – ${fmt(l.t1)}</span><span class="badge ${esc(s.section)}">${esc(s.section)}</span></div>
        <div class="script">“${esc(l.script)}”</div>
        <div class="refs">${l.refs.map(r => `<a href="${SHOT + r}" target="_blank" title="${esc(r)}"><img src="${SHOT + r}" alt="${esc(r)}"></a>`).join("")}</div>
        <div class="assets"><b>Aset:</b> ${esc(l.assets)}</div>
      </div>
      <div class="right">
        <div class="two">
          <label>Tipe scene<select data-i="${i}" data-k="scene">${SCENES.map(o => `<option${o === s.scene ? " selected" : ""}>${o}</option>`).join("")}</select></label>
          <label>Bagian<select data-i="${i}" data-k="section">${SECTIONS.map(o => `<option${o === s.section ? " selected" : ""}>${o}</option>`).join("")}</select></label>
        </div>
        <label>Usulan edit gua<textarea data-i="${i}" data-k="proposal" rows="4">${esc(s.proposal)}</textarea></label>
        <label>Modif / masukan lo<textarea class="fb" data-i="${i}" data-k="feedback" placeholder="Kosongin kalau udah oke">${esc(s.feedback)}</textarea></label>
        <div class="status">
          <label><input type="radio" name="st${i}" data-i="${i}" data-k="status" value="setuju"${s.status === "setuju" ? " checked" : ""}> Setuju</label>
          <label><input type="radio" name="st${i}" data-i="${i}" data-k="status" value="ubah"${s.status === "ubah" ? " checked" : ""}> Ubah</label>
        </div>
      </div></article>`;
  }).join("");
}
document.addEventListener("input", e => {
  const t = e.target;
  if (t.dataset.g) state.globals[t.dataset.g] = t.value;
  else if (t.dataset.k) { state.lines[+t.dataset.i][t.dataset.k] = t.value; if (t.dataset.k === "section") render(); }
  save();
});
function toast(m) { const el = document.getElementById("toast"); el.textContent = m; el.classList.add("on"); setTimeout(() => el.classList.remove("on"), 2200); }
document.getElementById("export").onclick = async () => {
  const out = { video: DATA.video, exportedAt: new Date().toISOString(), globals: state.globals,
    lines: DATA.lines.map((l, i) => ({ id: l.id, t0: l.t0, t1: l.t1, script: l.script, refs: l.refs, assets: l.assets, ...state.lines[i] })) };
  const txt = JSON.stringify(out, null, 2);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([txt], { type: "application/json" }));
  a.download = DATA.video + "-plan.json"; a.click();
  try { await navigator.clipboard.writeText(txt); toast("JSON ke-download + ke-copy"); } catch (e) { toast("JSON ke-download"); }
};
document.getElementById("reset").onclick = () => { if (confirm("Balikin semua ke usulan awal? Masukan lo bakal hilang.")) { state = initial(); save(); render(); } };
render();
</script></body></html>"""
out = f"plans/{name}-plan.html"
open(out, "w").write(page.replace("__NAME__", html.escape(name)).replace("__DATA__", json.dumps(data, ensure_ascii=False)))
print(out, len(lines), "baris")
