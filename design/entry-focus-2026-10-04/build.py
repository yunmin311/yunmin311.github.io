from pathlib import Path
import json,base64,re,mimetypes,html
here=Path(__file__).resolve().parent
root=here.parents[1]
snapshot=json.loads((here/'snapshot.json').read_text())
css=(root/'public/assets/paper/theme.css').read_text()
def embed(match):
 url=match.group(1);p=root/'public'/url.lstrip('/')
 mime='font/woff2' if p.suffix=='.woff2' else mimetypes.guess_type(str(p))[0]
 return 'url("data:'+mime+';base64,'+base64.b64encode(p.read_bytes()).decode()+'")'
css=re.sub(r'url\([\"\']?(/assets/paper/[^)\"\']+)[\"\']?\)',embed,css)
licenses='\n\n'.join(p.name+'\n'+p.read_text() for p in sorted((root/'public/assets/paper/LICENSES').iterdir()) if p.is_file())
minor='''
body{padding-bottom:90px!important}.cloud-sky{background-image:var(--study-cloud)!important;background-size:cover!important;background-position:center!important}.stage img{display:block}.reader{display:none!important}
.focus-study .headline h1{color:#244b63!important}.focus-study .hero-links button{background:#eaf3f787!important;border-color:#ffffff85!important;box-shadow:inset 0 1px 0 #ffffff85!important}.focus-study .hero-links button:first-child{background:#c8dde993!important}
.focus-study .header-wrap .nav{background:#eff7fc50!important;border-color:#ffffff80!important;box-shadow:inset 0 1px 0 #ffffffa0!important}.focus-study .nav-links button{color:#3e5d70!important}
.focus-study .hint{font-size:12px!important;color:#466175!important}.focus-study .hint a{text-decoration:none!important;color:#466175!important}.focus-study .chapter-dock .section-map{box-shadow:inset 0 1px 0 #ffffffa0!important;background:#e3eef780!important}.focus-study .music-toggle{box-shadow:inset 0 1px 0 #fff8!important;background:#eaf3f88c!important}.focus-study .page-ruler{opacity:.7}.focus-study .page-ruler:hover,.focus-study .page-ruler:focus-within{opacity:1}
.study-controls{position:fixed;bottom:18px;right:28px;z-index:1000;display:flex;gap:3px;padding:3px;border:1px solid #ffffffb0;border-radius:26px;background:#eaf2f8e6;backdrop-filter:blur(12px)}.study-controls button{border:0;background:transparent;padding:8px 16px;border-radius:22px;font:14px Body;color:#33556b;min-height:44px}.study-controls [aria-pressed=true]{background:#fff9;box-shadow:0 2px 6px #24425910}.study-note{margin-top:80px;padding:24px 48px;font:13px Body;color:#496476}.study-note p{max-width:70ch}.study-note details{margin-top:20px}.study-note pre{white-space:pre-wrap;overflow-wrap:anywhere}
@media(max-width:560px){.study-controls{right:12px;bottom:16px}.study-controls button{padding-inline:11px;font-size:13px}.study-note{margin-top:80px;padding:24px}.stage img{object-fit:contain}.focus-study .hint{font-size:11px!important}}
'''
content='''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Yunmin · 入站首屏微调对照</title><style>'''+css+minor+'''</style></head><body class="paper-site focus-study"><div class="cloud-sky" aria-hidden="true" style="--study-cloud:url('''+snapshot['cloud']+''')"></div>'''+snapshot['nav']+'<div class="review" aria-hidden="true"></div><main>'+snapshot['hero']+snapshot['dock']+'</main>'+snapshot['ruler']+snapshot['music']+'''<div class="study-controls" role="group" aria-label="首屏设计对照"><button data-mode="baseline" aria-pressed="false">定稿原版</button><button data-mode="focus" aria-pressed="true">轻微收束</button></div><div class="study-note"><p>仅首屏构图对照：名字与卡片保持原尺度；导航、入口与辅助控件稍退后。蓝色、云层、字体和卡片素材沿用定稿。</p><p>卡片是现有 3D 画面的静态截取，用于比较视觉主次；这份小稿不替代完整网站。</p><details><summary>字体与素材许可</summary><pre>'''+html.escape(licenses)+'''</pre></details></div><script>
const buttons=[...document.querySelectorAll('[data-mode]')];buttons.forEach(b=>b.onclick=()=>{document.body.classList.toggle('focus-study',b.dataset.mode==='focus');buttons.forEach(a=>a.setAttribute('aria-pressed',String(a===b)));});
document.querySelectorAll('.nav-links button,.hero-links button').forEach(b=>b.onclick=()=>{document.querySelector('.stage').animate([{transform:'translateY(0)'},{transform:'translateY(-5px)'},{transform:'translateY(0)'}],{duration:280});});
</script></body></html>'''
(here/'00-entry-focus.html').write_text(content)
print(here/'00-entry-focus.html')
