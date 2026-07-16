import base64, sys, os
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
HERE = os.path.dirname(os.path.abspath(__file__))
A    = os.path.join(HERE, 'assets')
def b64(p): return base64.b64encode(open(os.path.join(A,p),'rb').read()).decode()

RAMP = [
 ("green",  ["#d5f0db","#9bd8a9","#4aa25e","#3f8850"]),
 ("blue",   ["#d1eef9","#9ed4ef","#4ba2b4","#427e8a"]),
 ("purple", ["#d6e0f7","#b8caf5","#748ddd","#4b68c3"]),
 ("pink",   ["#e9d6ea","#d5acd8","#c37ec8","#a549ab"]),
 ("red",    ["#f9d3d0","#f09d93","#e66960","#bb433a"]),
 ("orange", ["#f9debd","#f6cb98","#dd8e40","#b25620"]),
 ("yellow", ["#fcf1c5","#fde99b",None,"#987e1b"]),
]
SEM = [
 ("--background","#fcf9f7","页面底色。暖米白,不是奶油白 —— craft 最有辨识度的一个色"),
 ("--foreground","#030302","墨色。近黑带暖,不是纯黑"),
 ("--card","#ffffff","卡片纯白,压在米白上"),
 ("--accent","#427e8a","强调色 = --color-blue-4。灰青"),
 ("--destructive","#bb433a","= --color-red-4"),
 ("--border","#03030217","描边 ≈ 9% 黑"),
 ("--muted","#0303020a","≈ 4% 黑"),
 ("--muted-foreground","#03030280","次级文字 ≈ 50% 黑"),
 ("--ring","#0303021f","焦点环 ≈ 12% 黑"),
]
RAD = [("--radius","10px"),("--radius-2xl","16px"),("--radius-3xl","24px"),("--radius-4xl","32px")]

ramp_html = "".join(
 '<div class="rrow"><div class="rname">%s</div>' % n +
 "".join(('<div class="sw" style="background:%s"><span>%s</span><i>%s-%d</i></div>' % (c,c,n,i+1))
         if c else ('<div class="sw none"><span>未取到</span><i>%s-3</i></div>' % n)
         for i,c in enumerate(steps)) + '</div>' for n,steps in RAMP)

sem_html = "".join(
 '<div class="semrow"><div class="chip" style="background:%s"></div>'
 '<div class="semk">%s</div><div class="semv">%s</div><div class="semn">%s</div></div>' % (v,k,v,n)
 for k,v,n in SEM)

rad_html = "".join('<div class="radbox"><div class="rb" style="border-radius:%s"></div>'
                   '<div class="radk">%s</div><div class="radv">%s</div></div>' % (v,k,v) for k,v in RAD)

CSS = """
@font-face{font-family:"LXGW WenKai";src:url(data:font/woff2;base64,__WK__) format("woff2");font-display:block}
@font-face{font-family:"Noto Sans SC";src:url(data:font/woff2;base64,__NS__) format("woff2");font-display:block}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#fcf9f7;color:#030302;font-family:"Noto Sans SC",system-ui,sans-serif;font-size:14px;line-height:1.6;
  padding:40px 32px 90px;background-image:url(data:image/jpeg;base64,__PAPER__);
  background-size:2048px 1201px;background-blend-mode:multiply}
.wrap{max-width:1100px;margin:0 auto}
h1{font-family:"LXGW WenKai";font-size:34px;font-weight:400;margin-bottom:6px}
.lead{color:#03030280;margin-bottom:8px;max-width:80ch}
.src{font-family:ui-monospace,monospace;font-size:11px;color:#0303027a;margin-bottom:30px;line-height:1.8}
h2{font-family:"LXGW WenKai";font-size:21px;font-weight:400;margin:42px 0 4px;padding-top:22px;border-top:1px solid #03030217}
.h2n{color:#03030280;font-size:13px;margin-bottom:16px;max-width:82ch}
.rrow{display:grid;grid-template-columns:74px repeat(4,1fr);gap:8px;margin-bottom:8px}
.rname{font-family:ui-monospace,monospace;font-size:12px;color:#03030299;display:flex;align-items:center}
.sw{height:64px;border-radius:12px;padding:8px 10px;display:flex;flex-direction:column;justify-content:space-between;
  box-shadow:inset 0 0 0 1px #0303021f}
.sw span{font-family:ui-monospace,monospace;font-size:11px;color:#030302b3}
.sw i{font-family:ui-monospace,monospace;font-size:9.5px;color:#03030280;font-style:normal}
.sw.none{background:#0303020a;box-shadow:inset 0 0 0 1px #03030233}
.semrow{display:grid;grid-template-columns:34px 190px 110px 1fr;gap:12px;align-items:center;
  padding:9px 0;border-bottom:1px solid #03030217}
.chip{width:34px;height:34px;border-radius:9px;box-shadow:inset 0 0 0 1px #0303021f}
.semk,.semv{font-family:ui-monospace,monospace;font-size:12px}
.semv{color:#03030299}
.semn{font-size:12.5px;color:#030302b3}
.rads{display:flex;gap:22px;flex-wrap:wrap}
.radbox{text-align:center}
.rb{width:96px;height:70px;background:#9ed4ef;margin-bottom:7px;box-shadow:inset 0 0 0 1px #0303021f}
.radk{font-family:ui-monospace,monospace;font-size:11px;color:#03030299}
.radv{font-family:ui-monospace,monospace;font-size:12px;font-weight:600}
.navdemo{position:relative;height:150px;border-radius:20px;overflow:hidden;margin-bottom:14px;
  background:linear-gradient(120deg,#9bd8a9,#b8caf5 40%,#fde99b 70%,#f6cb98)}
.navbar{position:absolute;top:26px;left:5%;right:5%;border-radius:26px;
  background:linear-gradient(180deg,#fff6 10%,#fffc);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
  box-shadow:0 12px 12px 2px #0000001a,0 2px 4px -1px #0000000f;padding:11px 16px;font-size:13px}
.navbar::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:linear-gradient(#ffffffa3 40%,#fff0 75% 95%,#ffffffa3);padding:1px;
  -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;
  mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude}
pre{background:#0303020a;border-radius:12px;padding:14px 16px;overflow-x:auto;
  font-family:ui-monospace,monospace;font-size:11.5px;line-height:1.75;margin-top:12px}
.warn{background:#fcf1c5;border-radius:16px;padding:16px 18px;margin:20px 0;font-size:13px;line-height:1.75}
.warn b{font-weight:600}
code{font-family:ui-monospace,monospace;font-size:11.5px;background:#0303020f;padding:1px 5px;border-radius:4px}
"""
CSS = CSS.replace('__WK__', b64('LXGWWenKai.woff2')).replace('__NS__', b64('NotoSansSC.woff2')).replace('__PAPER__', b64('paper_q90.jpg'))

BODY = """
<h1>craft.do 真值</h1>
<p class="lead">下面每一个数值都是用 <code>curl</code> 从 craft.do 线上 CSS/HTML 里逐字扒出来的,<b>没有一个是凭记忆编的</b>。
v3 之所以「没有任何风格」,就是因为那一版的配色是我编的。</p>
<p class="src">来源:https://www.craft.do/_next/static/css/679a6a0dd0f9207b.css (593,842 B) + 首页 HTML (3.6 MB)<br>
方法:WebFetch 不可用(会转成 markdown、吃掉 &lt;link&gt; 标签),必须用 curl 取原文</p>

<h2>一 · 品牌色梯</h2>
<div class="h2n">7 个色相 × 4 档。首页那组你点名夸过的「课程配色圆角卡」用的是 <b>-2 档</b>,平涂,零渐变 ——
实际写法是 <code>&lt;div class="absolute inset-0 -z-10 rounded-4xl bg-green-2"&gt;</code> 垫在内容背后。
只有 -4 档被提升成了 <code>:root</code> 自定义属性。</div>
__RAMP__

<h2>二 · 语义色</h2>
<div class="h2n">解析后的最终值。注意 <code>--primary</code> 和 <code>--primary-foreground</code> 在他们线上 CSS 里都等于
<code>var(--color-black)</code> —— 看着像他们自己的一个 token bug,原样记录。</div>
__SEM__

<h2>三 · 圆角梯</h2>
<div class="h2n">糖果卡用 <code>--radius-4xl</code> = 32px;导航条 class 写的是 <code>rounded-[64px]</code>,
但内联 style 覆盖成了 <b>26px</b>,内联赢。</div>
<div class="rads">__RAD__</div>

<h2>四 · 导航毛玻璃(真值现场复现)</h2>
<div class="h2n">下面这条是用 craft 的原始数值实时渲染的,不是截图。</div>
<div class="navdemo"><div class="navbar">导航条 · blur(4px) · 无 saturate · 圆角 26px</div></div>
<div class="warn"><b>这里我之前错得最离谱:</b>v3 我写的是 <code>blur(28px) saturate(1.7)</code> —— 是我编的,差 7 倍。
craft 的真值是 <code>backdrop-blur-xs</code> → <code>--blur-xs:4px</code>,<b>而且完全没有 saturate</b>。
<code>blur(32px)/saturate(150%)</code> 在他们 CSS 里确实存在,但<b>首页 HTML 里 0 处引用</b> —— 是为别的页面编译出来的死代码。照抄就错。</div>
<pre>&lt;header class="fixed ... rounded-[64px] glass-border-3xl glass-button-shadow
        glass-background backdrop-blur-xs top-[64px]" style="border-radius:26px"&gt;

--blur-xs: 4px
--navbar-gradient: linear-gradient(180deg,#fff6 10%,#fffc)
.glass-border-3xl:before   1px 渐变描边 + mask-composite:exclude
  background: linear-gradient(#ffffffa3 40%,#fff0 75% 95%,#ffffffa3); padding:1px
.glass-button-shadow       0 12px 12px 2px #0000001a, 0 2px 4px -1px #0000000f
定位   fixed; top:64px; width:calc(100% - 96px); max-width:850px   &lt;- 悬浮胶囊,不贴边</pre>

<h2>五 · 纸纹(craft 确实有,但做法和直觉相反)</h2>
<div class="h2n">首页内联样式出现 9 次。</div>
<pre>https://www.craft.do/_next/static/media/paper-texture.a0b2b1ca.webp   1192x843, 313,346 B

background-image:url(...paper-texture.a0b2b1ca.webp);
background-repeat:repeat; background-size:1192px 843px; background-position:left top
class: pointer-events-none absolute inset-0 overflow-hidden select-none mix-blend-screen opacity-50</pre>
<div class="warn">
<b>① 永远是 <code>absolute</code>,在卡片内部。</b>全站 <code>background-attachment:fixed</code> / <code>bg-fixed</code> 出现 <b>0 次</b>,
<code>body</code> 上一点纹理都没有。<code>fixed</code> 会把纹理钉在视口上、内容从静止的颗粒下面滑过 —— 那就是 v3「上下移动很假」的来源。<br><br>
<b>② 贴图 1192×843 比它贴的每一个元素都大</b>(他们卡片才 248–280px),所以 <code>background-repeat:repeat</code> 是废的 ——
每张卡只显示一个独一无二的裁切。<b>这才是「不重复」的真正解法:让贴图比元素大,重复问题直接不存在。</b>
那张 tile 本身其实并不无缝(实测左右比 1.56 / 上下 2.74)—— 它不需要无缝。<br><br>
<b>③ 不要照抄他们的 <code>screen</code> + <code>opacity-50</code>。</b>解码该 PNG:调色板仅 59 色全暗灰(mean 41.26),
tRNS alpha 恒定 ≈ 128 → 有效 alpha = 0.502 × 0.5 = <b>0.251</b>。
screen 公式 <code>b + α(1−b)s</code>,当 b=1(白底)时 (1−b)=0 → <b>screen 在白底上数学上是 no-op,Δ = 0.00%</b>。
craft 的纸纹在他们自家白色表面上根本看不见,只在黑卡/橙卡上起作用。<b>浅色卡纸底必须用 multiply。</b>
v3 正是照抄了这套配方到浅底上,再靠把 opacity 拧到 0.85 硬补 —— 于是就有了「一张照片贴在背景」。</div>

<h2>六 · 字体(不可用,记录在案)</h2>
<pre>--font-untitled-sans:  "UntitledSansFont","UntitledSansFont Fallback"
--font-untitled-serif: "UntitledSerifFont","UntitledSerifFont Fallback"
--font-sans:  var(--font-untitled-sans), "apple-system", var(--font-inter), ...
--font-serif: var(--font-untitled-serif),"apple-system-ui-serif","ui-serif","Georgia","serif"
中文回退: Noto Sans SC / Noto Serif SC</pre>
<div class="warn"><b>craft.do 用的是 Klim Type Foundry 的 Untitled Sans + Untitled Serif,商业授权零售字体。</b>
把别人网站的商业字体抠出来塞进你的产品,将来挨刀的是你,不是我 —— 所以没扒,也不该扒。
你要的那个「高级编辑感」就是 Untitled Serif。<br><br>
<b>另:我此前告诉过你「craft.do 用系统字体」,那是错的</b>,已更正。当时查到的「System / Serif / Mono / Rounded」
是 craft <b>编辑器内的文档字体选择器</b>,和营销站是两个不同的界面 —— 你说的 craft.do 指的是后者。</div>

<h2>七 · 深色模式(别参考)</h2>
<div class="h2n">整个 bundle 里只有一个 <code>.dark{}</code> 块,是<b>未经修改的 shadcn 出厂默认</b>:纯中性灰、
零品牌色、米白消失。<code>prefers-color-scheme</code> 在整个 bundle 里出现 <b>0 次</b>。
他们的营销站<b>没有设计过深色模式</b> —— 这是样板代码原样发出去了,不要当作 craft 的深色方案来参考。</div>

<h2>未取到 / 未核实</h2>
<div class="h2n">
· <code>yellow-3</code> 色值 —— 只存在 <code>.text-yellow-3</code>,没抓到 hex<br>
· <code>blur(32px)</code> / <code>saturate(150%)</code> 是否在 craft 其他路由(pricing / templates / app)上真实启用 —— 只扒了首页<br>
· <code>.dark</code> 的激活机制 —— CSS 里没有 <code>prefers-color-scheme</code> 也没有主题切换属性,推测是 JS 加的,未验证
</div>
"""
BODY = BODY.replace('__RAMP__', ramp_html).replace('__SEM__', sem_html).replace('__RAD__', rad_html)

html = ('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>craft.do 真值 · 扒取记录</title><style>' + CSS + '</style></head><body><div class="wrap">'
        + BODY + '</div></body></html>')

out = os.path.join(HERE, '..', 'craft-真值.html')
open(out,'w',encoding='utf-8',newline='\n').write(html)
print('craft-真值.html  %s B' % format(os.path.getsize(out), ','))
