# 公开项目、Release 与自适应修正 · 2026-10-05

本轮继续 `codex/real-content`，基于上一轮本地提交 `a247d32`。只修改个人网站工作分支；原始仓库脏文件、其他项目和机器管理目录未写入。没有 push / deploy，没有系统或 IDM 操作。

## 自适应问题的一手证据

用户截图中的高亮覆盖了整段多行项目选择栏。浏览器复现：390px 下按钮高 44px，但玻璃高亮高 97px；768px 下分别 44px 与 90px。原因是高亮 CSS 使用容器全高，运行脚本只计算 x/width；换行后仍按单行定位。

现在玻璃高亮同时测量选中按钮的 x/y/width/height。项目选择保持网格、多行自适应；长名称使用项目正式标题，按钮及 Release 可以换行。五种宽度、中英两种语言逐一点击五个选项，断言高亮四边与实际按钮相符，减少动效路径也保留。

## 项目覆盖与分组

通过 GitHub `users/yunmin311/repos` 读取当日全部 26 个公开仓库，再逐仓读取 README、当前提交和 Releases 元数据。README 的有关介绍、功能和边界段直接核对，未执行外部项目代码。固定修订、README 校验值与 Release 来源见 [public-catalog-sources-2026-10-05.json](public-catalog-sources-2026-10-05.json)。

- Works 从 6 项增为 22 项，中英文成对；首页精选五项保持，完整目录与首页代码库能找到全部项目。
- Obsidian 共 8 项放在同一组：Dense Reading、Paper Desk、Quiet Shelf、Reading Rail Sidebar、Toolbar Pin Toggle、Zheng Tally 六个插件，加 Obsidian Config 和 Obsidian Course Notes Standard。
- 其他组：软件与交互工具、知识与协作规范、视觉与创意实验。
- 全部 26 个公开仓库都在 Repos 可见。无 README 的 game、个人 Profile、网站源码与 DeepSeek Harness fork 放在其他仓库组。Fork 明确标示，不算原创精选；未为它们伪造作品说明页。
- 新条目简介源于公开 README，不复制私人笔记、配置值、联系方式或未公开资产。AI 课程库不称已完成学习记录，Dark Canvas 候选配方不称已经成功复刻，医学项目仍保留非诊断、临床规则未审查和 releaseReady=false。

## Release

17 个条目具有实际 GitHub Release，入口在首页代码库、完整项目目录、对应详情和有 Release 的阅读面板提供。版本、URL、预发布标记、附件存在与当次 API 返回记录逐项核对。

- 预发布明确标示，例如医学 RC 与 Dark Canvas 候选，不写成正式成熟版本。
- 无附件的 Release 标“源码”，不制造安装下载按钮。
- 有附件也只进入真实 Release 页面，不自动下载或安装。
- Course Notes Standard README 提及 3.1.1，但 API 最新实际发布是 v3.1.0；发布入口采用 v3.1.0，不猜不存在的 Release。
- 这是 2026-10-05 静态核对快照，不是运行时 API 请求或动态统计；后续更新需重新核对。

`src/data/public-repositories.json` 存完整清单与发布元数据；`src/lib/catalog.ts` 合并真实 Works。不会把所有条目堆为首屏精选，也不隐藏完整项目入口。

## 实际验证

- `npm run check`：32 文件，0 errors、0 warnings、4 hints（Zod URL API 弃用提示）。机器管理空目录的 loader 提示仍保留，不为消除提示造记录。
- `npm run build`：70 页成功；日志内本地构建阶段 5.12s，不是加载速度。
- Chromium：390 / 768 / 1024 / 1440 / 1920 × 中文 / 英文 × 29 路由 = 290 次页面检查。包含首页、Works、Projects、Writing、About、Repos、知识入口以及全部 22 个项目详情；无横向溢出、无浏览器异常。
- 检查首页 5 个精选、22 个完整作品、26 个公开仓库、Obsidian 8 项和 17 个 Release 入口；全部清单名称集合与公共仓库 API 快照相等。
- 68 个不同内部页面入口均存在；6 组原交互通过，包含 3D 卡片/阅读打开关闭与 Release、云层滚动和鼠标扰动、音乐延迟加载与生命周期、原地中英切换和历史返回、项目工作台来源、仓库筛选与减少动效。
- 实际查看修复后的窄屏工作台、中等宽度工作台、窄屏 Obsidian 目录。字体补充现为 31,472 字节，比前轮增加 10,028 字节；原 Body 与补充 cmap 覆盖全部请求字形。未修改字体许可、云层引擎、大屏颗粒策略、3D 核心、右侧刻度或音乐引擎。

证据：[results](public-catalog-2026-10-05/results.json)、[check](public-catalog-2026-10-05/check.txt)、[build](public-catalog-2026-10-05/build.txt)、[原问题](public-catalog-2026-10-05/ui-before.png)、[窄屏工作台](public-catalog-2026-10-05/workbench-zh-390.png)、[Obsidian 窄屏目录](public-catalog-2026-10-05/obsidian-en-390.png)。

## 未验证与剩余项

没有实体设备与 Safari/Firefox/Edge 实测，没有外部项目重新安装/临床审查，没有下载或安装 Release 附件，没有本轮冷启动网络速度/安全审计，也没有部署线上。私有仓库不属于公开网站清单；个人摄影、文章、过程记录和其他联系方式仍等待真实材料。旧稿不改写。上述范围不能概括成 PASS。

## 本轮修改文件

- `AGENTS.md`
- `README.md`
- `docs/verification/public-catalog-2026-10-05.md`
- `docs/verification/public-catalog-2026-10-05/browser.txt`
- `docs/verification/public-catalog-2026-10-05/build.txt`
- `docs/verification/public-catalog-2026-10-05/check.txt`
- `docs/verification/public-catalog-2026-10-05/obsidian-en-390.png`
- `docs/verification/public-catalog-2026-10-05/obsidian-zh-1440.png`
- `docs/verification/public-catalog-2026-10-05/results.json`
- `docs/verification/public-catalog-2026-10-05/ui-before.png`
- `docs/verification/public-catalog-2026-10-05/workbench-en-768.png`
- `docs/verification/public-catalog-2026-10-05/workbench-zh-390.png`
- `docs/verification/public-catalog-sources-2026-10-05.json`
- `docs/内容填充准备.md`
- `docs/正式网站接入说明.md`
- `public/assets/paper/body-extra-source.txt`
- `public/assets/paper/body-extra.css`
- `public/assets/paper/body-extra.woff2`
- `public/assets/paper/glyphs.txt`
- `public/assets/paper/runtime.js`
- `public/assets/paper/theme.css`
- `scripts/qa/paper-real-content.cjs`
- `src/components/ReleaseLink.astro`
- `src/components/RepoCatalog.astro`
- `src/components/WorkCard.astro`
- `src/components/paper/WorksSection.astro`
- `src/content.config.ts`
- `src/content/works/en/ai-systematic-notes.md`
- `src/content/works/en/anatomical-symptom-interface.md`
- `src/content/works/en/calendar-app.md`
- `src/content/works/en/context-distiller.md`
- `src/content/works/en/dark-canvas-image-skill.md`
- `src/content/works/en/dense-reading-obsidian.md`
- `src/content/works/en/densegpt.md`
- `src/content/works/en/dsh-universal-palette.md`
- `src/content/works/en/gitlineage.md`
- `src/content/works/en/governance-framework.md`
- `src/content/works/en/obsidian-config.md`
- `src/content/works/en/paper-desk-obsidian.md`
- `src/content/works/en/pixel-panels.md`
- `src/content/works/en/quiet-shelf-obsidian.md`
- `src/content/works/en/reading-rail-sidebar-obsidian.md`
- `src/content/works/en/text-structure.md`
- `src/content/works/en/toolbar-pin-toggle-obsidian.md`
- `src/content/works/en/window-annotator.md`
- `src/content/works/en/work-capsule.md`
- `src/content/works/en/ym-obsidian-course-notes-standard.md`
- `src/content/works/en/yunmin-workbench.md`
- `src/content/works/en/zheng-tally-obsidian.md`
- `src/content/works/zh/ai-systematic-notes.md`
- `src/content/works/zh/anatomical-symptom-interface.md`
- `src/content/works/zh/calendar-app.md`
- `src/content/works/zh/context-distiller.md`
- `src/content/works/zh/dark-canvas-image-skill.md`
- `src/content/works/zh/dense-reading-obsidian.md`
- `src/content/works/zh/densegpt.md`
- `src/content/works/zh/dsh-universal-palette.md`
- `src/content/works/zh/gitlineage.md`
- `src/content/works/zh/governance-framework.md`
- `src/content/works/zh/obsidian-config.md`
- `src/content/works/zh/paper-desk-obsidian.md`
- `src/content/works/zh/pixel-panels.md`
- `src/content/works/zh/quiet-shelf-obsidian.md`
- `src/content/works/zh/reading-rail-sidebar-obsidian.md`
- `src/content/works/zh/text-structure.md`
- `src/content/works/zh/toolbar-pin-toggle-obsidian.md`
- `src/content/works/zh/window-annotator.md`
- `src/content/works/zh/work-capsule.md`
- `src/content/works/zh/ym-obsidian-course-notes-standard.md`
- `src/content/works/zh/yunmin-workbench.md`
- `src/content/works/zh/zheng-tally-obsidian.md`
- `src/data/public-repositories.json`
- `src/lib/catalog.ts`
- `src/lib/paper-home.ts`
- `src/pages/[lang]/[section]/index.astro`
- `src/pages/[lang]/projects/index.astro`
- `src/pages/[lang]/works/[...slug].astro`
- `src/pages/[lang]/works/index.astro`
- `src/scripts/paper/depth.js`
- `src/scripts/paper/production-bindings.js`
- `src/styles/paper/production.css`
