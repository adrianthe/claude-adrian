import asyncio,base64,json
from playwright.async_api import async_playwright
NAVY="#061BB0";Y="#FFF200"
AV="data:image/png;base64,"+base64.b64encode(open('av.png','rb').read()).decode()
def hl(t): return f'<span class="hl">{t}</span>'
hook='<p class="big">Kalau lu jualan makanan rumahan, jangan nyuruh ChatGPT '+hl('"bikinin caption"')+' doang.</p><p class="big">Coba ketik kayak gini.</p>'
P=[
("Menu udah enak, tapi postingan sepi.","Bikinin caption buat nasi box.","Gua jualan [menu] buat [pembeli, misal karyawan kantor sekitar]. Tulis 5 caption yang mulai dari masalah mereka pas jam makan siang, bukan dari enaknya makanan. Tiap caption maksimal 3 baris, tutup pakai cara pesan."),
("Bingung mau rekam apa hari ini.","Kasih ide konten makanan.","Gua masak di dapur rumah dan cuma pakai HP. Kasih 7 ide video 15 detik yang bisa direkam sambil masak [menu], lengkap sama urutan shot dan teks di layar."),
("Upload kalau inget doang.","Bikin jadwal posting.","Bikin jadwal konten 7 hari buat akun [menu] gua. Tiap hari 1 posting: jenisnya (foto, video, carousel), kalimat pembuka, dan jam upload. Pasin sama jam orang laper: pagi, siang, sore."),
("Testimoni numpuk di chat, gak kepake.","Rangkum testimoni ini.","Ini 10 chat pelanggan yang muji makanan gua: [paste]. Pilih 3 yang paling spesifik, susun jadi carousel \"kata mereka\" tanpa ngubah kalimat aslinya, dan kasih judul pendek di tiap slide."),
("Pesanan sepi pas tanggal tua.","Kasih ide promo.","Modal [menu] gua [angka] per porsi, harga jual [angka]. Kasih 5 ide promo tanggal tua yang gak bikin rugi, hitung untung per porsi tiap promo, dan tulis 1 kalimat pengumuman buat status WA."),
("Orang mampir ke profil, terus pergi.","Bikin bio Instagram.","Gua jualan [menu] di [kota], buka [hari dan jam], bisa [antar/ambil]. Tulis 5 versi bio Instagram maksimal 150 karakter yang langsung jelas jualan apa dan cara pesannya."),
("Akun katering lain rame, punya gua sepi.","Kenapa akun gua sepi?","Ini 5 caption akun katering yang rame: [paste]. Ini 5 caption gua: [paste]. Sebutin 3 pola yang mereka pakai dan gua belum, terus tulis ulang 1 caption gua pakai pola itu."),
]
def card(s,j,k): return f'<div class="lab">SITUASI</div><div class="bub">"{s}"</div><div class="cols"><div class="cj"><div class="lab">JANGAN</div><div class="jt">{j}</div></div><div class="ck"><span class="kl">KETIK</span><div class="kt">{k}</div></div></div>'
summ='<p class="big">Bedanya cuma 3:</p><div class="li"><b>1</b><span>Sebut menu lu dan siapa pembelinya</span></div><div class="li"><b>2</b><span>Kasih bahan (paste menu, caption, atau chat)</span></div><div class="li"><b>3</b><span>Minta format hasil yang jelas</span></div><p class="sm">Simpan, terus kirim ke temen yang lagi jualan makanan. Follow '+hl('@adrianthe_')+' buat versi profesi lain.</p>'
slides=[hook]+[card(*x) for x in P]+[summ]
N=len(slides)
CSS=f"""*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1080px;height:1350px;background:#fff;font-family:'Inter';color:{NAVY};position:relative;overflow:hidden}}
.w{{position:absolute;left:98px;right:98px;top:120px;bottom:170px;display:flex;flex-direction:column;justify-content:center}}
.pf{{display:flex;align-items:center;gap:36px;margin-bottom:var(--g)}}
.pf img{{width:166px;height:166px;border-radius:50%;border:3px solid #E6E9F7}}
.nm{{font-weight:800;font-size:44px}} .hd{{font-weight:500;font-size:38px;color:#5560B0;margin-top:6px}}
p.big{{font-weight:500;font-size:var(--fb);line-height:1.3;letter-spacing:-0.5px;margin-bottom:30px}}
.hl{{background:linear-gradient(transparent 52%,{Y} 52%,{Y} 92%,transparent 92%)}}
.lab{{font-weight:700;font-size:26px;letter-spacing:4px;color:#8D95C3;margin-bottom:20px}}
.bub{{display:inline-block;align-self:flex-start;background:#EEF0FB;border-radius:44px;padding:22px 38px;font-weight:500;font-size:var(--fs);margin-bottom:60px}}
.cols{{display:flex}} .cj{{width:345px;padding-right:44px;border-right:3px solid #E3E6F5}} .ck{{flex:1;padding-left:44px}}
.jt{{font-size:var(--fs);line-height:1.32;color:#A9B0DD;font-weight:500}}
.kl{{display:inline-block;background:{Y};font-weight:800;font-size:26px;letter-spacing:4px;padding:6px 12px;border-radius:6px;margin-bottom:20px}}
.kt{{font-size:var(--fk);line-height:1.34;font-weight:500}}
.li{{display:flex;gap:28px;align-items:flex-start;margin-bottom:26px;font-weight:700;font-size:var(--fl);line-height:1.25}}
.li b{{flex:none;background:{Y};width:56px;height:62px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:900}}
p.sm{{font-size:38px;line-height:1.4;color:#3C4699;font-weight:500;margin-top:30px}}
.nx{{position:absolute;right:96px;bottom:110px;width:64px;height:64px;border-radius:50%;border:3px solid #C9CEEA;display:flex;align-items:center;justify-content:center;font-size:36px}}
.pg{{position:absolute;right:98px;bottom:58px;font-size:30px;font-weight:500;color:#8D95C3}}"""
def page(i,b):
    nx='' if i==N-1 else '<div class="nx">&rsaquo;</div>'
    return f'<html><head><style>{CSS}</style></head><body><div class="w" style="--g:70px;--fb:64px;--fs:40px;--fk:38px;--fl:46px"><div class="pf"><img src="{AV}"><div><div class="nm">adrian the</div><div class="hd">@adrianthe_</div></div></div>{b}</div>{nx}<div class="pg">{i+1} / {N}</div></body></html>'
async def main():
    async with async_playwright() as p:
        br=await p.chromium.launch();pg=await br.new_page(viewport={'width':1080,'height':1350})
        for i,s in enumerate(slides):
            await pg.set_content(page(i,s));await pg.wait_for_timeout(200)
            fk=38
            while True:
                ov=await pg.evaluate("(()=>{const c=document.querySelector('.w');return c.scrollHeight>c.clientHeight})()")
                if not ov or fk<=32:break
                fk-=1;await pg.evaluate(f"document.querySelector('.w').style.setProperty('--fk','{fk}px');document.querySelector('.w').style.setProperty('--fs','{fk+1}px')")
            await pg.screenshot(path=f'slide{i+1}.png');print(i+1,fk,'OVERFLOW' if ov else 'ok')
        await br.close()
asyncio.run(main())
