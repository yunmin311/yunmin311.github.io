import base64, sys, os
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
HERE = os.path.dirname(os.path.abspath(__file__))
A    = os.path.join(HERE, 'assets')
def b64(p): return base64.b64encode(open(os.path.join(A,p),'rb').read()).decode()

FILES = [
 ("灵感详情页-v4.html", "green", "主原型 · 定稿",
  "灵感详情页的完整原型,四个设计决定已写死:霞鹜文楷 + 铅笔草稿 + 色块标准 -2 + 颗粒 0.70。"
  "只内嵌实际用到的 4 个字体,全部资源 base64,断网可开,外部引用 0 处。"),
 ("字体样张.html", "purple", "选字用",
  "当初选字用的对比页,保留作记录。12 个字体并排,最后两行是<b>对照组</b> —— SimSun 宋体和微软雅黑,"
  "也就是 v1–v3 实际一直在看的东西。定稿选了霞鹜文楷 + 铅笔草稿,页内已标注。"),
 ("craft-真值.html", "blue", "研究记录 · 别丢",
  "从 craft.do 线上 CSS/HTML 里 curl 逐字扒出来的真实数值:品牌色梯、语义色、圆角梯、导航毛玻璃(现场复现)、"
  "纸纹做法、字体授权情况。<b>今天最费劲、也最容易丢的东西</b> —— 这些 hex 躺在聊天记录里等于没有。"),
]

rows = "".join(
 '<a class="card c-%s" href="%s"><div class="tag">%s</div><div class="fn">%s</div><p>%s</p></a>'
 % (color, name, tag, name, desc) for name, color, tag, desc in FILES)

CSS = """
@font-face{font-family:"LXGW WenKai";src:url(data:font/woff2;base64,__WK__) format("woff2");font-display:block}
@font-face{font-family:"Noto Sans SC";src:url(data:font/woff2;base64,__NS__) format("woff2");font-display:block}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#fcf9f7;color:#030302;font-family:"Noto Sans SC",system-ui,sans-serif;font-size:14px;line-height:1.6;
  padding:56px 32px 80px;background-image:url(data:image/jpeg;base64,__PAPER__);
  background-size:2048px 1201px;background-blend-mode:multiply}
.wrap{max-width:900px;margin:0 auto}
h1{font-family:"LXGW WenKai";font-size:36px;font-weight:400;margin-bottom:8px}
.lead{color:#03030280;margin-bottom:34px;max-width:74ch}
.grid{display:grid;gap:14px}
.card{display:block;text-decoration:none;color:inherit;border-radius:32px;padding:22px 26px;
  transition:transform .15s cubic-bezier(0,0,.2,1),box-shadow .15s cubic-bezier(0,0,.2,1)}
.card:hover{transform:translateY(-2px);box-shadow:0 12px 12px 2px #0000001a,0 2px 4px -1px #0000000f}
.c-green{background:#9bd8a9}.c-purple{background:#b8caf5}.c-blue{background:#9ed4ef}
.tag{font-family:ui-monospace,monospace;font-size:10.5px;letter-spacing:.09em;color:#03030299;
  background:#ffffff8c;border-radius:99px;padding:3px 10px;display:inline-block;margin-bottom:9px}
.fn{font-family:"LXGW WenKai";font-size:22px;margin-bottom:7px}
.card p{font-size:13px;color:#030302c4;line-height:1.7}
.note{margin-top:34px;padding-top:22px;border-top:1px solid #03030217;font-size:12.5px;color:#030302b3;line-height:1.8}
.note b{color:#030302}
code{font-family:ui-monospace,monospace;font-size:11.5px;background:#0303020f;padding:1px 5px;border-radius:4px}
"""
CSS = CSS.replace('__WK__', b64('LXGWWenKai.woff2')).replace('__NS__', b64('NotoSansSC.woff2')).replace('__PAPER__', b64('paper_q90.jpg'))

BODY = """
<h1>设计稿</h1>
<p class="lead">灵感详情页 v4 · 2026-07-15。三个文件都能直接双击用浏览器打开,全部资源内嵌,断网可看。</p>
<div class="grid">__ROWS__</div>
<div class="note">
<b>四个设计决定已定稿(2026-07-15)。</b>中文=霞鹜文楷 · 拉丁=铅笔草稿(IM Fell English + Newsreader) · 色块=标准 -2 · 颗粒=0.70。已在 <code>proto.html</code> 里写死,右下角调节面板已拆除。锁定前后做过逐像素比对:除面板区域外,<b>页面本体差异为 0 像素</b>。<br><br>
<b><code>_源文件/</code> 里是什么。</b>是重新生成上面这些页面的原料:模板 <code>proto.html</code>、构建脚本 <code>build.py</code>、
字表 <code>glyphs.txt</code>(448 字实用 + 兜底 = 687 字)、以及 <code>assets/</code> 里的纸纹和 12 个 woff2 字体文件。
上面三个 HTML 已经把这些全部 base64 内嵌了,所以<b>就算删掉 <code>_源文件/</code>,页面照样能看</b> ——
留着只是为了以后改一行字不用把 25 MB 的字体和 16 MB 的纹理重下一遍。<br><br>
<b>授权。</b>纹理 ambientCG Paper001 是 CC0,免署名可商用。12 个字体全部 OFL,可内嵌可再分发 ——
霞鹜文楷的 OFL 里还有一条附加许可,明确允许 subset 成 woff2 做网页字体。
craft.do 自己用的 Untitled Sans/Serif 是 Klim 商业授权,<b>没扒,也不该扒</b>。<br>
早前版本用过的 transparenttextures 素材实测是 <b>CC BY-SA 3.0(传染性 ShareAlike)</b>,商用有雷,已弃用。
</div>
"""
BODY = BODY.replace('__ROWS__', rows)

html = ('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>设计稿 · 灵感详情页 v4</title><style>' + CSS + '</style></head><body><div class="wrap">'
        + BODY + '</div></body></html>')

out = os.path.join(HERE, '..', '00-从这里开始.html')
open(out,'w',encoding='utf-8',newline='\n').write(html)
print('00-从这里开始.html  %s B' % format(os.path.getsize(out), ','))
