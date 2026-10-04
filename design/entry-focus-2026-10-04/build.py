from pathlib import Path
here=Path(__file__).resolve().parent
(here/'00-entry-focus.html').write_text("""<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Yunmin · 完整交互与集中构图</title><style>html,body{margin:0;height:100%;overflow:hidden;background:#cfdfeb}iframe{display:block;width:100%;height:100%;border:0}</style></head><body><iframe title="完整网站交互与首屏构图对照" src="http://localhost:8800/zh/?entry=focus" allow="autoplay; fullscreen"></iframe></body></html>""")
print(here/'00-entry-focus.html')
