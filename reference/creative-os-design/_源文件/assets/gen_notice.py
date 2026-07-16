# -*- coding: utf-8 -*-
"""从 assets/ 里 woff2 文件自己的 name 表生成 LICENSES/NOTICE.md。

版权行不是手打的,是从字体二进制里读出来的 —— 所以它不可能和实际文件对不上。
加/换字体后重跑:  python gen_notice.py
需要 fonttools。
"""
import os, sys, glob
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT  = os.path.join(HERE, 'LICENSES', 'NOTICE.md')

# 每个字体的来源与用途 —— 这部分是人写的,name 表里没有
SRC = {
 'BodoniModa':    ('Google Fonts (css2 API)', '拉丁 · 铜版蚀刻 display'),
 'IMFellEnglish': ('Google Fonts (css2 API)', '拉丁 · 铅笔草稿 display(默认)'),
 'Literata':      ('Google Fonts (css2 API)', '拉丁 · 手工木刻/当代艺术 body'),
 'LXGWWenKai':    ('github.com/lxgw/LxgwWenKai v1.522 · 本地 pyftsubset 裁切', '中文 · 霞鹜文楷(默认)'),
 'MartianMono':   ('Google Fonts (css2 API)', '拉丁 · 建筑蓝图 display / 全局 mono'),
 'Newsreader':    ('Google Fonts (css2 API)', '拉丁 · 铅笔草稿/建筑蓝图 body'),
 'NotoSansSC':    ('Google Fonts (css2 API, &text= 服务端 subset)', '中文 · 思源黑'),
 'NotoSerifSC':   ('Google Fonts (css2 API, &text= 服务端 subset)', '中文 · 思源宋'),
 'Petrona':       ('Google Fonts (css2 API)', '拉丁 · 铜版蚀刻 body'),
 'Recursive':     ('Google Fonts (css2 API)', '拉丁 · 可调怪癖 display + body'),
 'Syne':          ('Google Fonts (css2 API)', '拉丁 · 当代艺术 display'),
 'YoungSerif':    ('Google Fonts (css2 API)', '拉丁 · 手工木刻 display'),
}

rows = []
for f in sorted(glob.glob(os.path.join(HERE, '*.woff2'))):
    stem = os.path.basename(f)[:-6]
    ft = TTFont(f)
    name = {}
    for rec in ft['name'].names:
        if rec.nameID in (0, 1, 13, 14):
            try: name.setdefault(rec.nameID, ' '.join(rec.toUnicode().split()))
            except Exception: pass
    src, use = SRC.get(stem, ('?', '?'))
    rows.append({
        'file': os.path.basename(f),
        'size': os.path.getsize(f),
        'family': name.get(1, '?'),
        'copyright': name.get(0, '!! name 表里没有版权声明'),
        'lic_url': name.get(14, '(name 表内无,已在下方单独核实)'),
        'src': src, 'use': use,
    })

body = []
body.append('# NOTICE — assets/ 里每个文件的版权与授权\n')
body.append('> 下面每一行**版权声明**都是用 fontTools 从字体二进制自己的 `name` 表(nameID 0)里读出来的,')
body.append('> 不是手打的 —— 重跑 `python gen_notice.py` 可复现。许可正文见同目录的 `OFL-1.1.txt`。\n')
body.append('OFL 1.1 第 2 条要求:再分发时**每一份拷贝都必须随附版权声明与许可正文**')
body.append('(*"provided that each copy contains the above copyright notice and this license"*)。')
body.append('版权声明在字体自己的 `name` 表里(属于该条允许的 "machine-readable metadata fields");')
body.append('**许可正文由本目录的 `OFL-1.1.txt` 以 "stand-alone text files" 形式满足** —— ')
body.append('因为 Google Fonts 的网页字体和 pyftsubset 默认都会把 nameID 13(License Description)剥掉。\n')
body.append('---\n')

for r in rows:
    body.append(f"## {r['file']}\n")
    body.append(f"- **字体族**:{r['family']}")
    body.append(f"- **授权**:SIL Open Font License 1.1 —— 见 `OFL-1.1.txt`"
                + ("(**另见 `LXGWWenKai-OFL.txt`**,含作者的附加许可)" if r['file'].startswith('LXGW') else ""))
    body.append(f"- **版权(读自 name 表 nameID 0)**:`{r['copyright']}`")
    body.append(f"- **许可 URL(nameID 14)**:{r['lic_url']}")
    body.append(f"- **来源**:{r['src']}")
    body.append(f"- **本项目用途**:{r['use']}")
    body.append(f"- **可随仓库再分发**:是\n")

body.append('---\n')
body.append('## paper_q90.jpg\n')
body.append('- **授权**:Creative Commons CC0 1.0 Universal —— 见 `CC0-1.0.txt`')
body.append('- **来源**:ambientCG「Paper001」,`https://ambientcg.com/get?file=Paper001_2K-JPG.zip`')
body.append('  取其中 `Paper001_2K-JPG_Color.jpg`(2048×1201),转灰度后存为 JPEG q90')
body.append('- **授权原文**(`https://docs.ambientcg.com/license/`):*"All ambientCG assets are provided under the')
body.append('  Creative Commons CC0 1.0 Universal License… You can copy, modify, distribute and perform the assets,')
body.append('  even for commercial purposes, all without asking permission."* 且 *"You don\'t need to give credit"*')
body.append('- **可随仓库再分发**:是,且无需署名\n')

body.append('---\n')
body.append('## 保留字体名(OFL 第 3 条)\n')
body.append('第 3 条禁止 Modified Version 使用保留字体名(RFN),除非获得版权持有者明确书面许可。涉及两处:\n')
body.append('- **LXGW WenKai**(RFN:`霞鹜` `霞鶩` `落霞孤鹜` `落霞孤鶩` `LXGW`)—— 我们自己做了 subset,')
body.append('  属于 Modified Version。但作者在 OFL 里给了**附加许可**,原文明确覆盖本用法:')
body.append('  *"…or in Modified Versions subsetted or converted to other formats (e.g., WOFF/WOFF2)')
body.append('  **solely for web font delivery**, provided such Modified Versions are not made available as')
body.append('  installable desktop fonts"*。我们交付的是 woff2 网页字体、不是可安装的桌面字体,合规。')
body.append('  见 `LXGWWenKai-OFL.txt`。\n')
body.append('- **其余 11 个**由 Google Fonts 服务端 subset 后分发,沿用原名 —— ')
body.append('  这是自托管 Google Fonts 的通行做法,subset 由 Google 完成并以该名称对外分发。\n')

body.append('---\n')
body.append('## 明确排除(不在 assets/ 里,也不许加进来)\n')
body.append('- **Klim Type Foundry 的 Untitled Sans / Untitled Serif** —— craft.do 自己用的字体,')
body.append('  商业授权零售字体。颜色可以取,字体不行。')
body.append('- **Fontshare(Gambetta / Zodiak / Erode / Sentient 等)** —— ITF Free Font License')
body.append('  禁止再分发字体文件、禁止打包进分发物。免费可用 ≠ 可再分发。')
body.append('- **transparenttextures.com 的纹理** —— 溯源 Subtle Patterns 为 **CC BY-SA 3.0**,')
body.append('  传染性 ShareAlike,商用有雷。v4 已改用 CC0 的 ambientCG Paper001。\n')

open(OUT, 'w', encoding='utf-8', newline='\n').write('\n'.join(body))
print(f'NOTICE.md  {os.path.getsize(OUT):,} B  ({len(rows)} 个字体 + 1 张纹理)')
