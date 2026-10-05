# 真实内容接入与验收 · 2026-10-05

## Current Project State

定位为“个人数字花园 + Creative Engineering Portfolio”，公开介绍为 Qiyu Li / Yunmin、本科在读；技术、产品判断和视觉创作共同呈现。保留现有 Astro、中英路由、GitHub Pages 与 yunmin311.github.io。

工作目录：`/mnt/e/1project/yunmin311-site-performance`，本轮分支 `codex/real-content`，基于已经发布的 `970b286497ebe4611993210c42d925ebebeb053c`。原始 `/mnt/e/1project/yunmin311.github.io` 有历史未提交文件，本轮没有覆盖它。本轮只有本地实现、验证和保存；未 push，未触发 Pages，线上没有应用本轮内容。

2026-10-03 设计、2026-10-04 性能与颗粒基准继续保留。云层形状、大屏采样、3D 引擎、滚动刻度、语言切换机制、音乐生命周期源码没有重写；极小布局适配只用于真实标题/摘要和窄屏控件避让。没有 Windows 操作、IDM 操作或系统重启。

## 实际读取的一手来源

用户本轮完整指令、项目 AGENTS.md、README、愿景、内容准备和接入说明，以及设计基准、2026-10-03 接入 spec、摄影相册 spec 和 2026-10-04 验证记录；现有内容集合、首页组件、运行脚本和页面源文件均直接检查。dated specs 不改写。

公开仓库固定修订如下。README 和有关状态/限制文档直接读取；长篇 STANDARD、规则表、验证脚本核对相关片段，未运行外部项目的验证器。完整来源链接与文件校验值在 [content-sources-2026-10-05.json](content-sources-2026-10-05.json)。Profile 联系配置只记录候选来源，没有复制联系方式值。

- `GitLineage` · `e6c2bc54305e68552328d02c2a82ef62ccbe7fe8`：`README.md`、`docs/project-state.md`、`docs/web-slice.md`、`package.json`
- `context-distiller` · `c94e1f2c5e63caf664569ef0c18c94e8bfce42c4`：`README.md`、`docs/PRIVACY.md`、`package.json`、`LICENSE`
- `universal-text-structure-standard` · `fe2b7f9763cec2eb3971a20913f8c4dae3d40afe`：`README.md`、`STANDARD.md`、`FORMAT_RULES.yaml`、`scripts/validate.py`
- `DenseGPT` · `01fd25dba0eca1dfc123b34329d745007b653579`：`README.md`、`README.zh-CN.md`、`docs/design-principles.md`、`LICENSE`
- `anatomical-symptom-interface` · `dbd9c1f4af55f11c60e185a925221e1bf6a4a571`：`README.md`、`docs/known-limitations.md`、`docs/04-roadmap.md`、`package.json`
- `dsh-universal-palette` · `d6b59dc8acfe68267039485072b8cdd3eb786989`：`README.md`、`docs/COMPATIBILITY.md`、`package.json`、`LICENSE`
- `yunmin311` · `3cc725a138d53f07856a8d99dd13777fa8f40898`：`README.md`、`scripts/config.json`

额外读取两个项目原有截图并查看原图：Context Distiller 的 `docs/screenshots/messages.png`、DSH Palette 的 `docs/assets/readme/hero.png`。按宽 1200 压缩为 WebP，分别 56,800 / 23,548 字节，随附原 MIT 许可。没有生成截图或摄影图；无确认可用截图的项目使用明确标示的文字卡。

## 本轮替换与数据来源

- 当前简介统一取自 `src/lib/profile.ts`；Hero、About、SEO 和 i18n 共用它。旧 `legacy-profile.json` 保留历史，不作为当前介绍。
- Works 新增六个中英成对的真实项目；首页精选五个：GitLineage、Context Distiller、通用文本结构规范、DenseGPT、Anatomical Symptom Interface。DSH Palette 留在完整作品和代码库。
- 作品模型最小扩展：封面和项目日期可省略；新增类型、状态、技术栈、资料来源和核对日期。没有虚构 client / role / 创建日期。核对日 2026-10-05 不作项目创建或发布日期。
- Repos、项目工作台与知识入口读取同一 Works 集合，不另维护假标题/状态。六个正式项目、练习诚实留空；不显示动态 Star / 下载量。
- Poster series、Motion reel、Chinese sample 和“你好”“过程手记”改为 `draft: true`，排除公开页面；不删除历史源稿。
- 两篇 2026-05 旧文章保留原文与归档提示；六个旧 Project Ideas 原文/状态不变，降为 Earlier ideas / Archive。英文入口明确中文原稿，链接中文路由，不伪造英文翻译。
- CC0 图像、24 秒声音降为折叠 Site study 和侧边声音控件；保留原交互，不称个人 Gallery 或 podcast。一级导航不再用未提供的摄影/声音充数。
- 知识入口关联公开资料，不冒充私人学习经历。设计、配色、字体和砂纹明确标为本站试样；机器管理的 reflections / learning / code 没有写入。
- 联系方式仅 GitHub。其他地址、二维码、简历未复制到站点。学校和专业不补猜测。

## 内容真实性审查

| 项目 | 来源依据与明确边界 |
| --- | --- |
| GitLineage | evidence-backed repository lineage / software provenance explorer；内容相似或历史共享不证明复制方向，不是抄袭检测器，相似度检测仍预留。README 最后状态段与 Web 实现文档存在时间漂移，采用具体 Web 文档，不宣称本轮验证外部部署 |
| anatomical-symptom-interface | 症状描述、解剖定位、就诊前记录；非诊断工具；临床规则未审查、releaseReady=false、2D 示意/FMA 未核验及覆盖限制均保留 |
| universal-text-structure-standard | 文本结构、排版规范、规则表、Python 验证器；不是普通 Prompt 仓库；静态检查不证明完整语义，验证器不是完整 Markdown AST |
| DenseGPT | UserCSS 界面密度与 STYLE/presets 回答密度两层；不把写作指令说成模型行为保证 |
| context-distiller | 本地选择与编译上下文、不自动发送；无模型 API/服务器。package 的旧“无持久化”表述与隐私文档可选本地快照不同，采用具体隐私文档说明 |
| dsh-universal-palette | 实际 DSH 搜索控制器，0.2.1，宿主能力挂载位限制。Profile 的 Figma 配色工具描述与 README/package 冲突，采用项目仓库证据；未修改 Profile 仓库 |

状态、技术与限制都附固定修订来源；没有导入虚构成果、客户、项目过程、评价或个人学习记录。外部项目“有实现”与“生产可发布”没有混用。

## 实际验证结果

| 检查 | 结果与范围 |
| --- | --- |
| `npm run check` | 29 个 Astro 文件，0 errors、0 warnings、3 hints（Zod URL API 弃用提示）。日志另有三个机器管理目录不存在的 loader 提示；没有为消除提示创建假内容 |
| `npm run build` | 成功生成 38 页；日志内构建阶段 5.82s，仅为本地构建耗时，不是网站加载速度 |
| Chromium 路由检查 | 1440×900 / 390×900，中英各 13 条路由，共 52 次：首页、作品列表、项目、文字、关于、代码库、知识入口、六个项目详情。200 响应、无浏览器异常、无横向溢出；身份与描述、医学边界、双层 DenseGPT、草稿排除均有断言 |
| 内部链接 | 构建页面中的 36 个不同内部页面入口均存在，未发现缺页；并验证英文历史入口仍指向中文原稿 |
| 原交互实测 | 6 组通过：3D 三卡前后切换/阅读打开详情关闭；云层滚动穿梭与鼠标扰动；声音首次播放才加载、收起继续播放；原地中英切换/返回保留模型和音频对象；真实项目工作台来源页；正式/练习筛选与减少动效阅读 |
| 窄屏额外检查 | 播放器与入站导航不重叠；六个仓库文字列≥200px，避免逐字换行。实际查看中英首页、Works、知识区、代码库和关于截图 |
| 字体覆盖与许可 | 保留原 Body 字体；服务商长请求退回完整分片时，仅取缺字的原厂 webfont 补充，21,444 字节。Display 增至 37,648 字节，中文字 fallback 到 Body。`fc-query` 实际 cmap 核对：所有请求 Body 字形、Display ASCII 均覆盖。未本地 subset、未更改保留名，许可正文保留 |
| 受保护内容 | 对照基准，cloud-canvas、cloud-flow、scene、music-source、scroll-controls、legacy-profile、六个 projectIdeas、两篇旧文正文、CLAUDE.md 无差异；没有写 reference/Creative OS |

浏览器脚本：[paper-real-content.cjs](../../scripts/qa/paper-real-content.cjs)。证据：[results.json](content-integration-2026-10-05/results.json)、[check](content-integration-2026-10-05/check.txt)、[build](content-integration-2026-10-05/build.txt)、[fonts](content-integration-2026-10-05/fonts.json)。

实际检查发现并修复：知识区旧样稿标题覆盖首次渲染的真实项目名；窄屏旧卡片横排使仓库文字逐字换行；窄屏声音控件遮住入站导航。修复后重新构建并运行完整接受检查。字体覆盖最初按“Display 也应包含中文”断言失败；Display 原为拉丁字体、中文应 fallback 到 Body，按真实字体链重新核对通过。

截图：[中文桌面首页](content-integration-2026-10-05/home-zh-1440.png)、[英文窄屏首页](content-integration-2026-10-05/home-en-390.png)、[桌面作品](content-integration-2026-10-05/works-zh-1440.png)、[修正后的窄屏代码库](content-integration-2026-10-05/repos-390.png)。

## Pending 与最小材料清单

1. 摄影首批建议 6–12 张、1–2 个相册；每册标题、时间、地点，中英标题/地点；清除 EXIF/GPS 后入库。尚未提供个人摄影，绝不从网络替补。
2. 一篇真实文章正文、标题、一句简介、日期；不要求先凑篇数。英文正文未提供时不伪造翻译。
3. 任一个项目的一段真实过程/复盘或现有草稿。机器管理记录继续等实际同步。
4. 一首音乐或一份推荐的名称及原平台链接；可播放音源与使用许可另行确认，24 秒试样不替代歌单。
5. 明确要公开的联系渠道及准确地址/链接。Profile config 发现 EMAIL / DOUYIN / WECHAT / WEBSITE 和仓库微信图候选，仍 pending，未复制具体值。Instagram、Behance、小红书、Resume 无本轮确认来源。
6. 学校/专业仅在希望公开时另行提供；当前本科在读已足够，不阻止站点成立。

详细材料与入库说明见 [内容填充准备](../内容填充准备.md)。

## 未验证 / 未完成，不能称 PASS

- 没有实体手机、Safari、Firefox、Edge 兼容实测；390px 是 Chromium 窄视口，不等同实体手机验收。
- 没有重新跑外部六个项目的安装、运行、性能、发布或临床审查；这里只验证介绍有一手依据。
- 没有本轮网络冷启动/跨地区速度对比、依赖安全审计；没有声称新增内容后速度数值不变。
- 六个历史 idea 与两篇旧文详情不在 52 次浏览器路由抽测内，内部链接检查覆盖它们；正文保留不变。
- 个人照片、新文章、项目复盘、歌单、其他联系渠道和学校/专业尚缺，不补造。
- 本轮未 push / deploy，线上内容验收未发生；不会借旧授权触发 Pages。

## 实际修改文件

以下清单仅属于本轮分支；测试使用的既有 node_modules 链接不提交，原仓库脏文件不纳入。

- `AGENTS.md`
- `README.md`
- `docs/verification/content-integration-2026-10-05.md`
- `docs/verification/content-integration-2026-10-05/browser.txt`
- `docs/verification/content-integration-2026-10-05/build.txt`
- `docs/verification/content-integration-2026-10-05/check.txt`
- `docs/verification/content-integration-2026-10-05/fonts.json`
- `docs/verification/content-integration-2026-10-05/home-en-390.png`
- `docs/verification/content-integration-2026-10-05/home-zh-1440.png`
- `docs/verification/content-integration-2026-10-05/repos-390.png`
- `docs/verification/content-integration-2026-10-05/results.json`
- `docs/verification/content-integration-2026-10-05/works-zh-1440.png`
- `docs/verification/content-sources-2026-10-05.json`
- `docs/内容填充准备.md`
- `docs/愿景.md`
- `docs/正式网站接入说明.md`
- `public/assets/paper/LICENSES/NOTICE.md`
- `public/assets/paper/LICENSES/context-distiller-MIT.txt`
- `public/assets/paper/LICENSES/dsh-universal-palette-MIT.txt`
- `public/assets/paper/body-extra-source.txt`
- `public/assets/paper/body-extra.css`
- `public/assets/paper/body-extra.woff2`
- `public/assets/paper/display-source.txt`
- `public/assets/paper/display.woff2`
- `public/assets/paper/glyphs.txt`
- `public/assets/paper/licenses.json`
- `public/assets/paper/runtime.js`
- `public/assets/paper/theme.css`
- `scripts/build-paper.mjs`
- `scripts/qa/paper-real-content.cjs`
- `scripts/update-paper-fonts.mjs`
- `src/components/WorkCard.astro`
- `src/components/paper/Exhibition.astro`
- `src/components/paper/HeroScene.astro`
- `src/components/paper/ReadingFooter.astro`
- `src/components/paper/WorksSection.astro`
- `src/content.config.ts`
- `src/content/posts/en/hello.md`
- `src/content/posts/zh/hello.md`
- `src/content/posts/zh/process-notes.md`
- `src/content/works/_covers/context-distiller-LICENSE.txt`
- `src/content/works/_covers/context-distiller.webp`
- `src/content/works/_covers/dsh-universal-palette-LICENSE.txt`
- `src/content/works/_covers/dsh-universal-palette.webp`
- `src/content/works/en/anatomical-symptom-interface.md`
- `src/content/works/en/context-distiller.md`
- `src/content/works/en/densegpt.md`
- `src/content/works/en/dsh-universal-palette.md`
- `src/content/works/en/gitlineage.md`
- `src/content/works/en/motion-reel.md`
- `src/content/works/en/poster-series.md`
- `src/content/works/en/text-structure.md`
- `src/content/works/zh/anatomical-symptom-interface.md`
- `src/content/works/zh/context-distiller.md`
- `src/content/works/zh/densegpt.md`
- `src/content/works/zh/dsh-universal-palette.md`
- `src/content/works/zh/gitlineage.md`
- `src/content/works/zh/motion-reel.md`
- `src/content/works/zh/poster-series.md`
- `src/content/works/zh/text-structure.md`
- `src/content/works/zh/zh-only-sample.md`
- `src/i18n/ui.ts`
- `src/lib/content.ts`
- `src/lib/paper-home.ts`
- `src/lib/profile.ts`
- `src/pages/[lang]/[section]/index.astro`
- `src/pages/[lang]/about.astro`
- `src/pages/[lang]/blog/index.astro`
- `src/pages/[lang]/index.astro`
- `src/pages/[lang]/projects/index.astro`
- `src/pages/[lang]/works/[...slug].astro`
- `src/scripts/paper/controls.js`
- `src/scripts/paper/depth.js`
- `src/scripts/paper/exhibition.js`
- `src/scripts/paper/folio.js`
- `src/scripts/paper/personal.js`
- `src/scripts/paper/production-bindings.js`
- `src/scripts/paper/ui.js`
- `src/styles/paper/production.css`
