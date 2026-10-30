"""Render gambar hook FB @adrianthe_ (gaya brand: navy #061BB0, aksen kuning #FFF200, Inter Display).
Pakai: python3 hook_fb.py spec.json out.jpg
spec.json:
{"avatar": "avatar.jpg",            # path lokal ATAU URL https (diunduh otomatis)
 "name": "Adrian The", "handle": "@adrianthe_",
 "label": "FOTO LAMA",              # opsional, chip kecil di atas teks
 "blocks": [{"text": "...", "size": 70}, ...],
 "cta": "Prompt lengkap di komentar 1, 2, 3"}
Markup teks: **tebal**, ==kuning tebal==, \n = baris baru. size = ukuran font px.
Keluar kode 2 kalau teks kepanjangan (kecilkan size / pangkas teks lalu render ulang).
"""
import sys, json, base64, html, re, pathlib, urllib.request
from playwright.sync_api import sync_playwright

FONT = "/usr/share/fonts/opentype/inter/InterDisplay-"

def md(t):
    t = html.escape(t)
    t = re.sub(r"==(.+?)==", r'<b class="y">\1</b>', t, flags=re.S)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t, flags=re.S)
    return t.replace("\n", "<br>")

def avatar_b64(src):
    data = urllib.request.urlopen(src, timeout=20).read() if src.startswith("http") else pathlib.Path(src).read_bytes()
    return base64.b64encode(data).decode()

def render(spec, out):
    av = avatar_b64(spec["avatar"])
    blocks = "".join(f'<p style="font-size:{b.get("size",70)}px">{md(b["text"])}</p>' for b in spec["blocks"])
    label = f'<div class="chip">{html.escape(spec["label"])}</div>' if spec.get("label") else ""
    cta = html.escape(spec.get("cta", "Prompt lengkap di komentar 1, 2, 3"))
    page = f"""<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face{{font-family:I;src:url(file://{FONT}Regular.otf);font-weight:400}}
    @font-face{{font-family:I;src:url(file://{FONT}SemiBold.otf);font-weight:600}}
    @font-face{{font-family:I;src:url(file://{FONT}Black.otf);font-weight:900}}
    *{{box-sizing:border-box}}
    body{{margin:0;width:1080px;height:1350px;background:#061BB0;font-family:I;color:#fff;overflow:hidden;position:relative}}
    body:before{{content:"";position:absolute;right:-220px;top:-220px;width:620px;height:620px;border-radius:50%;
      background:radial-gradient(circle,rgba(255,242,0,.18),rgba(255,242,0,0) 70%)}}
    .wrap{{position:absolute;inset:0;padding:64px 76px 64px;display:flex;flex-direction:column}}
    .head{{display:flex;align-items:center;gap:30px}}
    .av{{width:150px;height:150px;border-radius:50%;padding:6px;background:#FFF200}}
    .av img{{width:100%;height:100%;border-radius:50%;object-fit:cover;border:5px solid #061BB0;display:block}}
    .nm{{font-weight:900;font-size:52px;letter-spacing:-1px;line-height:1.05}}
    .hd{{font-weight:600;font-size:36px;color:#C9D1FF;margin-top:6px}}
    .rule{{height:6px;width:150px;border-radius:4px;margin-top:40px;background:linear-gradient(90deg,#FFF200,rgba(255,242,0,0))}}
    .body{{flex:1;display:flex;flex-direction:column;justify-content:center;gap:46px;padding:30px 0}}
    .chip{{align-self:flex-start;background:#FFF200;color:#061BB0;font-weight:900;font-size:34px;letter-spacing:2px;padding:12px 26px;border-radius:14px}}
    p{{margin:0;text-wrap:balance;line-height:1.15;letter-spacing:-1px;font-weight:400;color:#EEF1FF}}
    b{{font-weight:900;color:#fff;letter-spacing:-1.5px}}
    b.y{{color:#FFF200}}
    .cta{{display:flex;align-items:center;gap:22px;background:#FFF200;color:#061BB0;border-radius:999px;padding:24px 40px;
      font-weight:900;font-size:40px;letter-spacing:-.5px;align-self:flex-start;white-space:nowrap}}
    .cta i{{font-style:normal;display:inline-flex;width:58px;height:58px;border-radius:50%;background:#061BB0;color:#FFF200;
      align-items:center;justify-content:center;font-size:36px}}
    </style></head><body><div class="wrap">
    <div class="head"><div class="av"><img src="data:image/jpeg;base64,{av}"></div>
    <div><div class="nm">{html.escape(spec.get("name","Adrian The"))}</div><div class="hd">{html.escape(spec.get("handle","@adrianthe_"))}</div></div></div>
    <div class="rule"></div>
    <div class="body">{label}{blocks}</div>
    <div class="cta"><i>&#8595;</i>{cta}</div>
    </div></body></html>"""
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1080, "height": 1350})
        hp = pathlib.Path(out).with_suffix(".html").resolve(); hp.write_text(page)
        pg.goto(hp.as_uri()); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(300)
        over = pg.evaluate("(()=>{const e=document.querySelector('.body');return e.scrollHeight>e.clientHeight+2})()")
        kw = {"quality": 92} if out.endswith(".jpg") else {}
        pg.screenshot(path=out, type="jpeg" if out.endswith(".jpg") else "png", **kw)
        b.close()
    if over:
        print("WARNING: teks kepanjangan, kecilkan size atau pangkas teks", file=sys.stderr)
        sys.exit(2)

if __name__ == "__main__":
    render(json.load(open(sys.argv[1])), sys.argv[2])
