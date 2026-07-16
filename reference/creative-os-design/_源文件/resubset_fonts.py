# -*- coding: utf-8 -*-
"""只在给 proto.html 加了新汉字、build.py 报「豆腐块」时才需要跑这个。

    pip install fonttools brotli
    python resubset_fonts.py      # 需要联网,会下 25 MB 的霞鹜文楷 TTF

做三件事:
  1. 从 proto.html 重新清点字表(+ 兜底常用字)-> glyphs.txt
  2. 下载霞鹜文楷完整 TTF(25 MB)并 subset 成 woff2
  3. 用 Google Fonts css2 的 &text= 参数取思源宋/思源黑的服务端 subset

为什么必须 subset: 未裁切的 CJK woff2 是 5-20 MB+,base64 再涨 33%,
不切的话单文件 HTML 直接废掉。霞鹜文楷 25.5 MB -> 144 KB,压掉 177 倍。

授权: 霞鹜文楷 OFL 1.1 的附加许可明确写了 ——「subsetted or converted to
other formats (e.g. WOFF/WOFF2) solely for web font delivery」被允许,
且可保留「霞鹜」这个保留字体名。思源宋/黑 OFL 1.1。
"""
import os, re, sys, subprocess, urllib.request, urllib.parse
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

HERE = os.path.dirname(os.path.abspath(__file__))
A    = os.path.join(HERE, 'assets')
UA   = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")
LXGW_URL = "https://github.com/lxgw/LxgwWenKai/releases/download/v1.522/LXGWWenKai-Regular.ttf"

# 兜底常用字 —— 以后改文案不至于一改就出豆腐块。CJK 每字约 210 B,多带几百字很便宜。
SAFETY = (
 "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动"
 "同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自"
 "二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日"
 "那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变"
 "条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总"
 "次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指"
 "几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器"
 "压志世金增争济阶油思术极交受联什认六共权收证改清美再采转更单风切打白教速花带安场"
 "身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温"
 "传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断"
 "深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值"
 "号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆"
 "包火住调满县局照参红细引听该铁价严龙飞"
 "灵仓库类未分某本画册跨页版式浏览按图片析已完成钟前张平已经拆可复创意知识据面收东西"
 "来源期保存理由想那种留白托着块密度字呼吸文件夹编排杂志提结构化六色板背景主辅助灰蓝"
 "强调赭点击复制层级题正小签系统原值修改布局推断网格阅读顺序对齐左基准间距柱确定仅为"
 "可见区域粗估什么这判原上下被裁切看不到完整无法靠反推所以标没有替你编一个起精数元素"
 "压角码右衬线细隔满幅色块角标实心整体视觉风格制感版大留起少量高信息密文本冷暖中性打"
 "底完全靠号重强立而任何装饰安静但每一处都经过掂纸真扫描免署名原生颗粒关键跟内滚贴任"
 "何卡永不重复取自糖果档圆角玻璃只在导航一无自己用的是商业授权没扒霞鹜文楷思源宋黑铅"
 "笔草稿铜版蚀刻手工木刻当代艺术调怪癖建筑蓝图颗粒"
)

def get(url, timeout=180):
    return urllib.request.urlopen(
        urllib.request.Request(url, headers={"User-Agent": UA}), timeout=timeout).read()

# ── 1. 清点字表 ──────────────────────────────────────────────
html = open(os.path.join(HERE, 'proto.html'), encoding='utf-8').read()
# 剥掉注释: CSS/HTML 注释永远不渲染,不该逼着把注释里的字也切进字体
vis = re.sub(r'/\*.*?\*/', '', html, flags=re.S)
vis = re.sub(r'<!--.*?-->', '', vis, flags=re.S)
used = {c for c in vis if ord(c) > 0x7F}
allc = sorted(used | set(SAFETY))
open(os.path.join(HERE, 'glyphs.txt'), 'w', encoding='utf-8').write(''.join(allc))
cjk = [c for c in allc if 0x4E00 <= ord(c) <= 0x9FFF]
print(f'1. 字表: {len(allc)} 字 ({len(cjk)} 汉字 + {len(allc)-len(cjk)} 符号) '
      f'[proto.html 实用 {len(used)}, 其余兜底] -> glyphs.txt')

# ── 2. 霞鹜文楷: 下 TTF + 本地 subset ────────────────────────
ttf = os.path.join(HERE, 'LXGWWenKai-Regular.ttf')
if not os.path.exists(ttf):
    print(f'2. 下载霞鹜文楷 TTF (25 MB) ...')
    open(ttf, 'wb').write(get(LXGW_URL, timeout=600))
else:
    print(f'2. 复用已有的 {os.path.basename(ttf)}')
subprocess.run([sys.executable, '-m', 'fontTools.subset', ttf,
                f'--text-file={os.path.join(HERE,"glyphs.txt")}',
                '--flavor=woff2', f'--output-file={os.path.join(A,"LXGWWenKai.woff2")}',
                '--layout-features=*', '--no-hinting', '--desubroutinize'], check=True)
print(f'   LXGWWenKai.woff2  {os.path.getsize(os.path.join(A,"LXGWWenKai.woff2")):,} B '
      f'(源 TTF {os.path.getsize(ttf):,} B)')

# ── 3. 思源宋 / 思源黑: Google 服务端 subset ─────────────────
enc = urllib.parse.quote(''.join(allc))
for name, fam in [("NotoSerifSC", "Noto+Serif+SC"), ("NotoSansSC", "Noto+Sans+SC")]:
    css = get(f"https://fonts.googleapis.com/css2?family={fam}:wght@300..700&text={enc}&display=block").decode()
    # 注意: &text= 返回的 URL 形如 gstatic.com/l/font?kit=... —— 没有 .woff2 后缀,别用后缀正则去匹配
    m = re.search(r"src:\s*url\(([^)]+)\)", css)
    if not m:
        print(f'3. {name}: 解析失败\n{css[:300]}'); sys.exit(1)
    data = get(m.group(1))
    open(os.path.join(A, f'{name}.woff2'), 'wb').write(data)
    print(f'3. {name}.woff2  {len(data):,} B')

# ── 4. 覆盖验证: 漏一个字就是豆腐块 ──────────────────────────
try:
    from fontTools.ttLib import TTFont
    text = set(allc)
    for f in ('LXGWWenKai.woff2', 'NotoSerifSC.woff2', 'NotoSansSC.woff2'):
        ft = TTFont(os.path.join(A, f)); cov = set()
        for t in ft['cmap'].tables: cov |= {chr(c) for c in t.cmap}
        miss = text - cov
        print(f'4. {f:<22} {"OK 全覆盖" if not miss else "!! 缺 " + "".join(sorted(miss))}')
        if miss: sys.exit(1)
except ImportError:
    print('4. 跳过覆盖验证(需要 fonttools)')

print('\n完成。现在跑 python build_all.py 重造 HTML。')
print(f'提示: {os.path.basename(ttf)} 是 25 MB 的中间产物,不要提交进 git,可以删。')
