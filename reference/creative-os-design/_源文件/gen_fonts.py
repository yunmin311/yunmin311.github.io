# -*- coding: utf-8 -*-
"""重造 字体样张.html —— 12 个字体并排,外加 SimSun / 雅黑 对照组。
只用标准库。路径全部相对本文件,clone 到任何位置都能跑。"""
import base64, os, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

HERE = os.path.dirname(os.path.abspath(__file__))
A    = os.path.join(HERE, 'assets')
OUT  = os.path.join(HERE, '..', '字体样张.html')

def b64(p): return base64.b64encode(open(os.path.join(A, p), 'rb').read()).decode()

# (中文名, font-family, 文件, 说明, 授权)
CJK = [
 ("霞鹜文楷", "LXGW WenKai", "LXGWWenKai.woff2",
  "楷体骨架,起收锋、撇捺出锋都在。最贴「素描」,和卡纸是一路的。文艺,信息密度高时略累。",
  "OFL 1.1(附加许可明确允许 subset 成 woff2 做网页字体)"),
 ("思源宋", "Noto Serif SC", "NotoSerifSC.woff2",
  "正统编辑感宋体,横细竖粗有对比。和 craft.do 用的 Untitled Serif 是同一条「编辑」车道。",
  "OFL 1.1"),
 ("思源黑", "Noto Sans SC", "NotoSansSC.woff2",
  "干净现代黑体。craft.do 自己的中文回退栈里用的就是它。最稳,但性格最弱。",
  "OFL 1.1"),
]
# 对照组:系统自带,不内嵌 —— 就是 v1-v3 用户实际看到的东西
CTRL = [
 ("SimSun 宋体", "SimSun",
  "Windows 出厂默认。v3 你看到的所有标题就是它 —— 因为我的字体栈把中文漏了。"),
 ("Microsoft YaHei 雅黑", "Microsoft YaHei",
  "Windows 出厂默认。v3 你看到的所有正文。"),
]
# (方案名, display family, display 文件, body family, body 文件, 说明)
LAT = [
 ("铅笔草稿", "IM Fell English", "IMFellEnglish.woff2", "Newsreader", "Newsreader.woff2",
  "17 世纪 Fell 活字的数字化,油墨扩散和毛边都保留着。它本身就是「铅笔/活字压在纸上」。"),
 ("铜版蚀刻", "Bodoni Moda", "BodoniModa.woff2", "Petrona", "Petrona.woff2",
  "真 Didone,带光学尺寸轴。opsz 拉到 96 时发丝笔画极细,冷、贵、时装编辑。"),
 ("手工木刻", "Young Serif", "YoungSerif.woff2", "Literata", "Literata.woff2",
  "粗壮、手工凿刻感、末端钝而有机。Fraunces 的暖度,但没有它那个 WONK 噱头。"),
 ("当代艺术", "Syne", "Syne.woff2", "Literata", "Literata.woff2",
  "为 Synesthésie 艺术中心做的。故意不匹配的字宽和古怪曲线,画廊/艺术机构气质。"),
 ("可调怪癖", "Recursive", "Recursive.woff2", "Recursive", "Recursive.woff2",
  "五根可变轴。CASL 0→1 从中性变马克笔手写,MONO 0→1 从比例变等宽 —— 一个文件里好几种性格。"),
 ("建筑蓝图", "Martian Mono", "MartianMono.woff2", "Newsreader", "Newsreader.woff2",
  "等宽当标题用,读起来像制图而不是代码。技术制图压在纸上的感觉。"),
]
SENT = "某本画册的跨页版式"
SUB  = "一张平面图,已经被拆成六类可复用的创意知识。图片是证据,下面的知识才是你收下的东西。"

faces = {}
for _, fam, f, _, _ in CJK: faces[fam] = f
for _, d, df, b, bf, _ in LAT: faces[d] = df; faces[b] = bf

ff = "\n".join('@font-face{font-family:"%s";src:url(data:font/woff2;base64,%s) format("woff2");font-display:block}'
               % (fam, b64(f)) for fam, f in faces.items())

cjk_rows = "".join(
 '<div class="row%s"><div class="meta"><div class="nm">%s%s</div><div class="fam">%s</div>'
 '<div class="note">%s</div><div class="lic">%s</div></div>'
 '<div class="spec"><div class="big" style="font-family:\'%s\'">%s</div>'
 '<div class="body" style="font-family:\'%s\'">%s</div></div></div>'
 % (' win' if name=='霞鹜文楷' else '', name, ' <span class="won">已选定</span>' if name=='霞鹜文楷' else '',
     fam, note, lic, fam, SENT, fam, SUB) for name, fam, _, note, lic in CJK)

ctrl_rows = "".join(
 '<div class="row ctrl"><div class="meta"><div class="nm">%s</div>'
 '<div class="fam">系统自带 · 非内嵌</div><div class="note">%s</div></div>'
 '<div class="spec"><div class="big" style="font-family:\'%s\'">%s</div>'
 '<div class="body" style="font-family:\'%s\'">%s</div></div></div>'
 % (name, note, fam, SENT, fam, SUB) for name, fam, note in CTRL)

lat_rows = "".join(
 '<div class="row%s"><div class="meta"><div class="nm">%s%s</div>'
 '<div class="fam">%s<br><span>+ %s</span></div><div class="note">%s</div>'
 '<div class="lic">OFL · 可内嵌可再分发</div></div>'
 '<div class="spec"><div class="big" style="font-family:\'%s\'">Slow Mornings</div>'
 '<div class="lat-b" style="font-family:\'%s\'">Kinfolk No.38 &middot; editorial spread &middot; 0123456789</div>'
 '<div class="body" style="font-family:\'%s\',\'LXGW WenKai\'">%s'
 '<span class="hintx"> ← 拉丁字体不含汉字,汉字自动回退到你选的中文字体(这里是霞鹜文楷)</span></div>'
 '</div></div>' % (' win' if name=='铅笔草稿' else '', name,
     ' <span class="won">已选定</span>' if name=='铅笔草稿' else '',
     d, b, note, d, b, d, SENT) for name, d, _, b, _, note in LAT)

CSS = """
__FF__
*{box-sizing:border-box;margin:0;padding:0}
body{background:#fcf9f7;color:#030302;font-family:"Noto Sans SC",system-ui,sans-serif;
  font-size:14px;line-height:1.6;padding:40px 32px 80px;
  background-image:url(data:image/jpeg;base64,__PAPER__);
  background-size:2048px 1201px;background-blend-mode:multiply}
.wrap{max-width:1180px;margin:0 auto}
h1{font-family:"LXGW WenKai";font-size:34px;font-weight:400;margin-bottom:6px}
.lead{color:#03030280;margin-bottom:34px;max-width:76ch}
h2{font-family:"LXGW WenKai";font-size:21px;font-weight:400;margin:40px 0 6px;
  padding-top:22px;border-top:1px solid #03030217}
.h2n{color:#03030280;font-size:13px;margin-bottom:18px}
.row{display:grid;grid-template-columns:250px 1fr;gap:26px;padding:22px 0;
  border-bottom:1px solid #03030217;align-items:start}
.row.ctrl{opacity:.62}
.row.win{background:#d5f0db4d;border-radius:20px;padding-left:14px;padding-right:14px}
.won{display:inline-block;background:#3f8850;color:#fff;font-size:10px;border-radius:99px;padding:2px 8px;margin-left:7px;vertical-align:2px}
.nm{font-size:15px;font-weight:600;margin-bottom:3px}
.fam{font-family:ui-monospace,monospace;font-size:11.5px;color:#03030299;margin-bottom:8px}
.fam span{color:#0303027a}
.note{font-size:12.5px;color:#030302b3;line-height:1.6}
.lic{font-size:10.5px;color:#0303027a;margin-top:7px;line-height:1.5}
.big{font-size:46px;line-height:1.25}
.body{font-size:15px;line-height:1.7;margin-top:10px;color:#030302cc;max-width:70ch}
.lat-b{font-size:16px;margin-top:8px;color:#030302cc}
.hintx{font-size:11px;color:#0303026b;font-family:"Noto Sans SC"}
.warn{background:#fcf1c5;border-radius:16px;padding:16px 18px;margin:26px 0;font-size:13px;line-height:1.7}
.warn b{font-weight:600}
code{font-family:ui-monospace,monospace;font-size:11.5px;background:#0303020f;padding:1px 5px;border-radius:4px}
"""
CSS = CSS.replace('__FF__', ff).replace('__PAPER__', b64('paper_q90.jpg'))

BODY = """
<h1>字体样张</h1>
<p class="lead">给「灵感详情页 v4」挑字用。全部字体已 base64 内嵌在本文件里,断网也能看,和原型里渲染的是同一批文件。
所有字体均为 OFL 开源、可商用、可再分发 —— craft.do 自己用的 Untitled Sans/Serif 是 Klim 商业授权字体,没有扒。</p>

<div class="warn"><b>为什么会有这份样张:</b>v1–v3 的中文一直渲染成 Windows 出厂的宋体 / 雅黑,因为字体栈写的是
<code>Instrument Serif, PingFang SC, Songti SC</code> —— 前者是纯拉丁 subset,后两个是 macOS 专有,在 Windows 上是静默失效的死项。
所以那三版的字体开关只切换了 "Aa" 和数字 "38",整页中文从没变过。
下面第一组最后两行是<b>对照组</b>,就是你之前一直在看的东西。</div>

<h2>一 · 中文(三选一)</h2>
<div class="h2n">这一项决定整页 90% 的观感 —— 页面几乎全是中文。<b>已选定:霞鹜文楷</b>(2026-07-15 定稿)。</div>
__CJK____CTRL__

<h2>二 · 拉丁(六选一)</h2>
<div class="h2n">只作用于英文、数字、hex 值、文件名这类字符。汉字不受影响,会回退到中文字体。<b>已选定:铅笔草稿</b>(2026-07-15 定稿)。</div>
__LAT__
"""
BODY = BODY.replace('__CJK__', cjk_rows).replace('__CTRL__', ctrl_rows).replace('__LAT__', lat_rows)

html = ('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>字体样张 · 灵感详情页 v4</title><style>' + CSS + '</style></head>'
        '<body><div class="wrap">' + BODY + '</div></body></html>')

open(OUT, 'w', encoding='utf-8', newline='\n').write(html)
print('字体样张.html  %s B' % format(os.path.getsize(OUT), ','))
