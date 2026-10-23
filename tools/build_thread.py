# Thread viral -> carousel gaya cover foto + kartu. python3 build_thread.py thread.json cover.jpg outdir
# cover.jpg = gambar ChatGPT 1080x1350, atau - untuk cover navy polos.
# Headline cover ditulis KAPITAL (keputusan Adrian 23/10). Bagian = verbatim thread, paragraf dipisah baris kosong, "..." utuh = kotak PROMPT.
# thread.json: {"cover_chip":"BREAKING","cover":"teks headline","hl":"kata kuning","parts":["bagian",...],"share":"baris kecil di slide terakhir isi","end":["..."]}
import asyncio,base64,json,sys,os,io,urllib.request
from PIL import Image
from playwright.async_api import async_playwright
T=json.load(open(sys.argv[1]));cover=sys.argv[2];out=sys.argv[3];os.makedirs(out,exist_ok=True)
SRC="https://raw.githubusercontent.com/adrianthe/claude-adrian/main/ig/2026-10-17-jangan-ketik-olshop/slide1.png"
im=Image.open(io.BytesIO(urllib.request.urlopen(SRC,timeout=30).read())).convert('RGB')
b=io.BytesIO();im.crop((100,355,262,517)).resize((324,324),Image.LANCZOS).save(b,'PNG')
AV="data:image/png;base64,"+base64.b64encode(b.getvalue()).decode()
cb=io.BytesIO()
if cover=='-':  # cadangan kalau ChatGPT gagal: latar navy gradasi polos
    from PIL import ImageDraw
    g=Image.new('RGB',(1080,1350));dr=ImageDraw.Draw(g)
    for y in range(1350): dr.line([(0,y),(1080,y)],fill=(6,int(27-20*y/1350),int(176-120*y/1350)))
    g.save(cb,'JPEG',quality=92)
else: Image.open(cover).convert('RGB').resize((1080,1350),Image.LANCZOS).save(cb,'JPEG',quality=92)
CV="data:image/jpeg;base64,"+base64.b64encode(cb.getvalue()).decode()
NAVY="#061BB0";Y="#FFF200"
esc=lambda t:t.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;').replace('\n','<br>')
def body(part,first_bold=True):
    ps=[p for p in part.split('\n\n') if p.strip()];h=''
    for i,p in enumerate(ps):
        s=p.strip()
        if s.startswith('"') and s.endswith('"'):
            h+=f'<div class="lab">PROMPT</div><div class="pr">{esc(s[1:-1])}</div>'
        elif i==0 and first_bold:
            h+=f'<p class="h">{esc(s)}</p>'
        else: h+=f'<p>{esc(s)}</p>'
    return h
N=len(T['parts'])+2
CSS=f"""*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1080px;height:1350px;font-family:'Inter';color:{NAVY};position:relative;overflow:hidden;background:{NAVY}}}
.card{{position:absolute;left:56px;right:56px;top:64px;bottom:120px;background:#fff;border-radius:36px;padding:56px 60px;display:flex;flex-direction:column}}
.pf{{display:flex;align-items:center;gap:22px;margin-bottom:40px;flex:none}}
.pf img{{width:92px;height:92px;border-radius:50%}}
.nm{{font-weight:800;font-size:32px}} .hd{{font-weight:500;font-size:27px;color:#5560B0}}
.bd{{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center}}
.bd p{{font-size:var(--f);line-height:1.4;font-weight:500;margin-bottom:28px}}
.bd p.h{{font-weight:800;font-size:calc(var(--f) * 1.15);line-height:1.25}}
.lab{{align-self:flex-start;background:{Y};font-weight:800;font-size:22px;letter-spacing:3px;padding:6px 12px;border-radius:6px;margin-bottom:14px}}
.pr{{background:#EEF0FB;border-radius:20px;padding:24px 28px;font-size:calc(var(--f) - 4px);line-height:1.42;font-weight:500;margin-bottom:28px}}
.bd p.s{{font-size:28px;color:#5560B0;margin-top:auto}}
.ft{{position:absolute;left:64px;bottom:48px;font-size:26px;font-weight:600;color:#C9CEF5}}
.pg{{position:absolute;right:64px;bottom:48px;font-size:26px;font-weight:600;color:#C9CEF5}}
.cv{{position:absolute;inset:0;background:url({CV}) center/cover}}
.sh{{position:absolute;inset:0;background:linear-gradient(transparent 35%,rgba(3,8,60,.88) 66%,rgba(3,8,60,.97))}}
.ct{{position:absolute;left:70px;right:70px;bottom:130px;color:#fff}}
.ct .lab{{display:inline-block;color:{NAVY};margin-bottom:26px;font-size:26px}}
.ct h1{{color:#fff;font-size:var(--c);line-height:1.1;letter-spacing:-1px;font-weight:800}}
.ct .y{{color:{Y}}}
.tag{{position:absolute;left:70px;top:64px;display:flex;align-items:center;gap:16px;color:#fff;font-weight:700;font-size:28px;background:rgba(3,8,60,.55);padding:10px 20px 10px 10px;border-radius:60px}}
.tag img{{width:56px;height:56px;border-radius:50%}}
.hl{{background:linear-gradient(transparent 52%,{Y} 52%,{Y} 92%,transparent 92%)}}"""
prof=f'<div class="pf"><img src="{AV}"><div><div class="nm">adrian the</div><div class="hd">@adrianthe_</div></div></div>'
hd=esc(T['cover']).replace(T['hl'],f'<span class="y">{T["hl"]}</span>',1)
slides=[f'<div class="cv"></div><div class="sh"></div><div class="tag"><img src="{AV}">@adrianthe_</div><div class="ct"><span class="lab">{T["cover_chip"]}</span><h1>{hd}</h1></div><div class="pg" style="color:#fff">1 / {N}</div>']
for k,p in enumerate(T['parts']):
    extra=f'<p class="s">{esc(T["share"])}</p>' if k==len(T['parts'])-1 and T.get('share') else ''
    slides.append(f'<div class="card">{prof}<div class="bd">{body(p)}{extra}</div></div><div class="ft">Simpan biar gak lupa</div><div class="pg">{k+2} / {N}</div>')
endh=''.join(f'<p class="{"h" if i==0 else ""}">{x}</p>' for i,x in enumerate(T['end']))
slides.append(f'<div class="card">{prof}<div class="bd">{endh}</div></div><div class="pg">{N} / {N}</div>')
async def main():
    async with async_playwright() as p:
        br=await p.chromium.launch();pg=await br.new_page(viewport={'width':1080,'height':1350})
        for i,s in enumerate(slides):
            await pg.set_content(f'<html><head><style>{CSS}</style></head><body style="--f:46px;--c:72px">{s}</body></html>');await pg.wait_for_timeout(250);f=46
            while True:
                ov=await pg.evaluate("(()=>{const c=document.querySelector('.bd');if(!c)return false;return c.scrollHeight>c.clientHeight+1})()")
                if not ov or f<=30:break
                f-=1;await pg.evaluate(f"document.body.style.setProperty('--f','{f}px')")
            fn=f'{out}/slide{i+1}.png';await pg.screenshot(path=fn);Image.open(fn).convert('RGB').save(fn[:-3]+'jpg',quality=90)
            print(i+1,f,'OVERFLOW' if ov else 'ok')
        await br.close()
asyncio.run(main())
