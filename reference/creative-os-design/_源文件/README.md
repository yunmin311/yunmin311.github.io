# design/_源文件/

灵感详情页设计稿的**源**。`design/` 下那 4 个 HTML 是从这里生成出来的。

生成物每个 2.2 MB、base64 内联、不可 diff，**不进 git**；只有本目录进 git。
所以下面这条命令必须永远能把设计完整变回来——否则设计就只存在于某台机器的硬盘上。

## 重造全部 4 个 HTML

```bash
cd design/_源文件
python build_all.py
```

**零依赖。** 只用 Python 标准库，不联网。纸纹和 12 个字体文件都在 `assets/` 里，跟着 git 走。

跑完 `design/` 下会出现：

| 文件 | 是什么 |
|---|---|
| `00-从这里开始.html` | 入口页。链到下面三个，写了还欠的四个决定。 |
| `灵感详情页-v4.html` | **主原型（定稿）。** 四个设计决定已写死，调节面板已拆除。 |
| `字体样张.html` | 当初选字用的对比页，保留作记录。12 个字体并排 + SimSun / 微软雅黑**对照组**，胜出的两个已标注。 |
| `craft-真值.html` | 研究记录。从 craft.do 线上 CSS 逐字扒的真实数值。 |

全部双击即可用浏览器打开，断网可看，外部引用 0 处。

## 为什么字体必须 base64 内联

Chrome 对 `file://` 按不透明源做 CORS 检查，**相对路径的 `@font-face` 会被静默拒绝加载**——
不报错，只是悄悄回退到系统字体。v1–v3 整页中文渲染成 Windows 出厂宋体/雅黑就是这类问题
（那次是字体栈里写了 macOS 专有的 `PingFang SC` / `Songti SC`）。
内联换来 2.2 MB 和不可 diff，但这是双击即看的唯一代价。**别改成外链。**

## 文件清单

| 文件 | 作用 |
|---|---|
| `build_all.py` | **入口。** 依次跑下面 4 个生成脚本。 |
| `build.py` | 生成主原型：把 `assets/` 注入 `proto.html` 的占位符。 |
| `gen_fonts.py` | 生成字体样张。 |
| `gen_craft.py` | 生成 craft 真值页。 |
| `gen_index.py` | 生成入口页。 |
| `proto.html` | **主原型的模板。** 改设计改这个。占位符形如 `__PAPER__` / `__WENKAI__`。 |
| `glyphs.txt` | 字表，687 字（proto.html 实用 445 + 兜底常用字）。中文字体按它裁切。 |
| `resubset_fonts.py` | **只在加了新汉字、`build.py` 报豆腐块时才跑。** 需联网 + fonttools。 |
| `assets/paper_q90.jpg` | 纸纹，2048×1201 灰度。 |
| `assets/*.woff2` | 12 个字体：3 中文（已 subset）+ 9 拉丁。 |

## 改设计的流程

改 `proto.html` → `python build_all.py` → 双击看。

**如果加了新汉字**，`build.py` 会拦下来并报哪几个字缺：

```
!! 模板里有 8 个字不在字表内,会渲染成豆腐块: 亮围掉楚硬窗铺露
   -> 跑 `pip install fonttools brotli && python resubset_fonts.py` 重切中文字体(需联网)
```

照它说的做，然后再 `build_all.py`。

守卫只查**会上屏的文本**——CSS 注释和 HTML 注释里的字被剥掉了，不会逼你为了注释重切字体。

未裁切的 CJK woff2 是 5–20 MB+，base64 再涨 33%，不切这个单文件 HTML 直接废掉。
霞鹜文楷 25.5 MB → 144 KB，压掉 177 倍。`resubset_fonts.py` 会下那个 25 MB 的 TTF，
它是中间产物，**别提交进 git，用完可以删**。

## 授权（会随产品发出去，也会随 git 公开再分发，认真的）

**逐个文件的权威记录在 [`assets/LICENSES/NOTICE.md`](assets/LICENSES/NOTICE.md)** —— 那里面每一行版权声明都是
用 fontTools 从字体二进制自己的 `name` 表里读出来的，不是手打的，跑 `python assets/gen_notice.py` 可复现。

| 资产 | 授权 | 能不能内嵌进产品 / 随 git 再分发 |
|---|---|---|
| 纸纹 ambientCG Paper001 | **CC0 1.0** | 能，且免署名 |
| 霞鹜文楷 | **OFL 1.1** | 能。作者的附加许可明确覆盖「subset 成 WOFF/WOFF2 做网页字体」并允许保留「霞鹜」这个保留字体名。 |
| 思源宋 / 思源黑 | **OFL 1.1** | 能 |
| 9 个拉丁字体 | **OFL 1.1** | 能 |

### 为什么 `assets/LICENSES/` 不能删

OFL 1.1 第 2 条要求再分发时**每一份拷贝都必须随附版权声明与许可正文**：

> *"provided that each copy contains the above copyright notice and this license."*

版权声明在字体自己的 `name` 表里（属于该条允许的 machine-readable metadata）。
**但许可正文不在** —— Google Fonts 的网页字体和 `pyftsubset` 默认都会剥掉 nameID 13（License Description），
12 个 woff2 **全部缺**这一项，其中 LXGW WenKai 和 Recursive 连 nameID 14（License URL）都没有。

所以许可正文必须以「stand-alone text files」的形式随文件走，那就是 `assets/LICENSES/` 里的
`OFL-1.1.txt` / `LXGWWenKai-OFL.txt` / `CC0-1.0.txt`。**删掉它们，这个仓库对这 12 个字体就是不合规再分发。**
README 里写一句「OFL」不算数——那是转述，不是许可文本。

**两条红线：**

- **craft.do 用的 Untitled Sans / Untitled Serif 是 Klim 商业授权零售字体，不扒、不嵌。**
  颜色可以取（用户已确认），字体不行。产品里那个「高级编辑感」要用 OFL 字体去够，不是抠他们的文件。
- **Fontshare（Gambetta / Zodiak / Erode / Sentient）全部排除。** ITF Free Font License
  禁止再分发字体文件、禁止打包进分发物。base64 内嵌进要传播的单文件 HTML = 二进制原样随文件走 = 再分发。

早前版本用过的 transparenttextures 素材实测是 **CC BY-SA 3.0（传染性 ShareAlike）**，商用有雷，v4 已弃用。

## git

**本目录的任何东西都不要由 Claude 来 add/commit。** 暂存区是全仓库共享的，
并行对话的 commit 会把别人 add 的文件一起卷走。提交由专门的 GitHub 对话处理。

`design/` 之外一个字都不动——尤其 `src/`、`package.json`、任何配置文件。

## 已知

- `字体样张.html` 的生成脚本是重写的（原来那条一次性命令没留住），所以它和 2026-07-15 最初那版
  差 231 字节——重写时顺手改了授权行的字体。`gen_fonts.py` 本身是确定性的：同源同字节，连跑两遍已验证。
  另外三个文件重造后与原版**字节完全一致**。
- **四个设计决定已定稿（2026-07-15）**，写死在 `proto.html` 的 `:root` 里，调节面板已拆除：

  | 决定 | 定稿值 |
  |---|---|
  | 中文字体 | 霞鹜文楷 `--cjk:"LXGW WenKai"` |
  | 拉丁方案 | 铅笔草稿 `--disp-lat:"IM Fell English"` + `--sans-lat:"Newsreader"` |
  | 色块深浅 | 标准 −2（`.c-green` 等直接用 `--green-2`） |
  | 颗粒强度 | `--tex:.70` |

  锁定前后做过逐像素比对：除被拆掉的面板区域外，**页面本体差异为 0 像素**。

- **因此只内嵌 4 个字体**（霞鹜文楷 / IM Fell English / Newsreader / Martian Mono），
  另外 8 个锁定后无人引用，已从 `proto.html` 和 `build.py` 移除 —— 主原型 2.21 MB → **0.95 MB**。
  8 个字体文件仍留在 `assets/`，`字体样张.html` 也仍然展示全部 12 个，**什么都没丢**。
- 用户提过「以后在设置里让用户自己调字体/纸纹」——**那是产品功能，要走 US，不在 design/ 做。**
  craft.do 自己的编辑器就有文档字体选择器（System/Serif/Mono/Rounded），有先例。
- 别抽 `tokens.ts`、别抽变量、别搭架子。UI 落地等 US2 做完，那时候主对话对着定稿抽。
