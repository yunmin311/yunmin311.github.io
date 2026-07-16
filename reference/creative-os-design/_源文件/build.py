import base64, re, os, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE = os.path.dirname(os.path.abspath(__file__))
OUT  = os.path.join(BASE, '..', '灵感详情页-v4.html')

ASSETS = {
 '__PAPER__':      'assets/paper_q90.jpg',
 '__WENKAI__':     'assets/LXGWWenKai.woff2',
 '__IMFELL__':     'assets/IMFellEnglish.woff2',
 '__NEWSREADER__': 'assets/Newsreader.woff2',
 '__MARTIAN__':    'assets/MartianMono.woff2',
}

html = open(os.path.join(BASE,'proto.html'), encoding='utf-8').read()

# 字表守卫: 每个会被渲染的非 ASCII 字符都必须在 glyphs.txt 里,否则中文字体 subset 会漏字 -> 豆腐块。
# 只查真正会上屏的文本: 剥掉 CSS 注释和 HTML 注释(它们永远不渲染,不该逼着重切字体),
# 但保留 content:"..." 和 title="..." —— 那些是会显示的。
visible = re.sub(r'/\*.*?\*/', '', html, flags=re.S)      # CSS 注释
visible = re.sub(r'<!--.*?-->', '', visible, flags=re.S)  # HTML 注释
glyphs = set(open(os.path.join(BASE,'glyphs.txt'), encoding='utf-8').read())
used   = {c for c in visible if ord(c) > 0x7F}
missing = used - glyphs
if missing:
    print(f'!! 模板里有 {len(missing)} 个字不在字表内,会渲染成豆腐块: {"".join(sorted(missing))}')
    print('   -> 跑 `pip install fonttools brotli && python resubset_fonts.py` 重切中文字体(需联网)')
    sys.exit(1)

for ph, path in ASSETS.items():
    if html.count(ph) == 0:
        print(f'!! 模板缺少占位符 {ph}'); sys.exit(1)
    b64 = base64.b64encode(open(os.path.join(BASE,path),'rb').read()).decode()
    html = html.replace(ph, b64)

left = re.findall(r'__[A-Z]+__', html)
if left:
    print(f'!! 剩余占位符: {left}'); sys.exit(1)

open(OUT, 'w', encoding='utf-8', newline='\n').write(html)
size = os.path.getsize(OUT)
with open(OUT,'rb') as f:
    assert f.read(3) != b'\xef\xbb\xbf', 'BOM!'
print(f'灵感详情页-v4.html  {size:,} B = {size/1024/1024:.2f} MB  placeholders=0  BOM=no  glyphs=covered')
