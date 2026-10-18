# Render seri JANGAN vs KETIK @adrianthe_. Pakai: python3 build_jk.py konten.json outdir
# konten.json: {"hook_a":"Kalau lu ..., jangan nyuruh ChatGPT ","hook_hl":"\"bikinin caption\"","hook_b":" doang.",
#  "items":[["situasi","jangan","ketik"], ... 7 item],
#  "sum":["poin 1","poin 2","poin 3"], "share":"Simpan, terus kirim ke temen yang lagi ..."}
import asyncio,base64,json,sys,os,io,urllib.request
from PIL import Image
from playwright.async_api import async_playwright
d=json.load(open(sys.argv[1]));out=sys.argv[2];os.makedirs(out,exist_ok=True)
SRC="https://raw.githubusercontent.com/adrianthe/claude-adrian/main/ig/2026-10-17-jangan-ketik-olshop/slide1.png"
im=Image.open(io.BytesIO(urllib.request.urlopen(SRC,timeout=30).read())).convert('RGB')
b=io.BytesIO();im.crop((100,355,262,517)).resize((324,324),Image.LANCZOS).save(b,'PNG')
AV="data:image/png;base64,"+base64.b64encode(b.getvalue()).decode()
NAVY="#061BB0";Y="#FFF200"
esc=lambda t:t.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
hl=lambda t:f'<span class="hl">{esc(t)}</span>'
hook=f'<p class="big">{esc(d["hook_a"])}{hl(d["hook_hl"])}{esc(d["hook_b"])}</p><p class="big">Coba ketik kayak gini.</p>'
card=lambda s,j,k:f'<div class="lab">SITUASI</div><div class="bub">"{esc(s)}"</div><div class="cols"><div class="cj"><div class="lab">JANGAN</div><div class="jt">{esc(j)}</div></div><div class="ck"><span class="kl">KETIK</span><div class="kt">{esc(k)}</div></div></div>'
summ='<p class="big">Bedanya cuma 3:</p>'+"".join(f'<div class="li"><b>{i+1}</b><span>{esc(t)}</span></div>' for i,t in enumerate(d["sum"]))+f'<p class="sm">{esc(d["share"])} Follow {hl("@adrianthe_")} buat versi profesi lain.</p>'
slides=[hook]+[card(*x) for x in d["items"]]+[summ];N=len(slides)
CSS=f"""*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1080px;height:1350px;background:#fff;font-family:'Inter';color:{NAVY};position:relative;overflow:hidden}}
.w{{position:absolute;left:98px;right:98px;top:120px;bottom:170px;display:flex;flex-direction:column;justify-content:center}}
.pf{{display:flex;align-items:center;gap:36px;margin-bottom:70px}}
.pf img{{width:166px;height:166px;border-radius:50%;border:3px solid #E6E9F7}}
.nm{{font-weight:800;font-size:44px}} .hd{{font-weight:500;font-size:38px;color:#5560B0;margin-top:6px}}
p.big{{font-weight:500;font-size:64px;line-height:1.3;letter-spacing:-0.5px;margin-bottom:30px}}
.hl{{background:linear-gradient(transparent 52%,{Y} 52%,{Y} 92%,transparent 92%)}}
.lab{{font-weight:700;font-size:26px;letter-spacing:4px;color:#8D95C3;margin-bottom:20px}}
.bub{{display:inline-block;align-self:flex-start;background:#EEF0FB;border-radius:44px;padding:22px 38px;font-weight:500;font-size:var(--fs);margin-bottom:60px}}
.cols{{display:flex}} .cj{{width:345px;padding-right:44px;border-right:3px solid #E3E6F5}} .ck{{flex:1;padding-left:44px}}
.jt{{font-size:var(--fs);line-height:1.32;color:#A9B0DD;font-weight:500}}
.kl{{display:inline-block;background:{Y};font-weight:800;font-size:26px;letter-spacing:4px;padding:6px 12px;border-radius:6px;margin-bottom:20px}}
.kt{{font-size:var(--fk);line-height:1.34;font-weight:500}}
.li{{display:flex;gap:28px;align-items:flex-start;margin-bottom:26px;font-weight:700;font-size:46px;line-height:1.25}}
.li b{{flex:none;background:{Y};width:56px;height:62px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:900}}
p.sm{{font-size:38px;line-height:1.4;color:#3C4699;font-weight:500;margin-top:30px}}
.nx{{position:absolute;right:96px;bottom:110px;width:64px;height:64px;border-radius:50%;border:3px solid #C9CEEA;display:flex;align-items:center;justify-content:center;font-size:36px}}
.pg{{position:absolute;right:98px;bottom:58px;font-size:30px;font-weight:500;color:#8D95C3}}"""
def page(i,s):
    nx='' if i==N-1 else '<div class="nx">&rsaquo;</div>'
    return f'<html><head><style>{CSS}</style></head><body><div class="w" style="--fs:40px;--fk:38px"><div class="pf"><img src="{AV}"><div><div class="nm">adrian the</div><div class="hd">@adrianthe_</div></div></div>{s}</div>{nx}<div class="pg">{i+1} / {N}</div></body></html>'
async def main():
    texts=[]
    async with async_playwright() as p:
        br=await p.chromium.launch();pg=await br.new_page(viewport={'width':1080,'height':1350})
        for i,s in enumerate(slides):
            await pg.set_content(page(i,s));await pg.wait_for_timeout(200);fk=38
            while True:
                ov=await pg.evaluate("(()=>{const c=document.querySelector('.w');return c.scrollHeight>c.clientHeight})()")
                if not ov or fk<=32:break
                fk-=1;await pg.evaluate(f"document.querySelector('.w').style.setProperty('--fk','{fk}px');document.querySelector('.w').style.setProperty('--fs','{fk+1}px')")
            f=f'{out}/slide{i+1}.png';await pg.screenshot(path=f);Image.open(f).convert('RGB').save(f[:-3]+'jpg',quality=90)
            print(i+1,fk,'OVERFLOW' if ov else 'ok')
        await br.close()
asyncio.run(main())
