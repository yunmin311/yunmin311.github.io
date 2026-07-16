# -*- coding: utf-8 -*-
"""重造 design/ 下全部 4 个 HTML。

    python build_all.py

零依赖 —— 只用 Python 标准库,不联网。
(只有改字表后重切中文字体才需要 fonttools + 联网,见 resubset_fonts.py)
"""
import os, subprocess, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

HERE = os.path.dirname(os.path.abspath(__file__))
STEPS = [
    ('build.py',     '灵感详情页-v4.html   主原型'),
    ('gen_fonts.py', '字体样张.html        选字用'),
    ('gen_craft.py', 'craft-真值.html      研究记录'),
    ('gen_index.py', '00-从这里开始.html   入口页'),
]

print('重造 design/ 下的 4 个 HTML ...\n')
fail = 0
for script, what in STEPS:
    r = subprocess.run([sys.executable, os.path.join(HERE, script)],
                       capture_output=True, text=True, encoding='utf-8', errors='replace')
    if r.returncode != 0:
        fail += 1
        print(f'  FAIL  {script}\n{r.stdout}{r.stderr}')
    else:
        print(f'  OK    {what}\n        {r.stdout.strip()}')

print()
if fail:
    print(f'{fail} 个失败')
    sys.exit(1)
print('4 个全部重造完成。双击 ../00-从这里开始.html 开始看。')
