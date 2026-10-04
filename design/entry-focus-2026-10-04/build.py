from pathlib import Path
here=Path(__file__).resolve().parent
(here/'00-entry-focus.html').write_text("""<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Yunmin · 原定稿 · 性能测试</title><style>html,body{margin:0;height:100%;overflow:hidden;background:#cfdfeb}iframe{display:block;width:100%;height:100%;border:0}</style></head><body><iframe title="原定稿完整交互与性能测试" src="http://localhost:8800/zh/" allow="autoplay; fullscreen"></iframe></body></html>""")
print(here/'00-entry-focus.html')
