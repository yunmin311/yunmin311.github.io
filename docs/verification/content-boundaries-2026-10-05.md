# 页面分工与固定砂纹尺度 · 2026-10-05

工作目录 `/mnt/e/1project/yunmin311-site-performance`；分支 `codex/content-boundaries`，基于实际已发布 main `07a50c232c0ff68a5a255d5725e0a82867660736`。开始时核对远端 main、实际 AGENTS、首页/Works/Projects/Repos 实现及当日两份内容验证文档。原始仓库未提交文件不碰；既有 `node_modules` 测试依赖链接不纳入提交。实现验收时没有 push / deploy。用户随后明确要求“提交推送”，本轮获得新的发布授权；发布结果另以 Actions 与线上核验为准。没有 Windows/IDM 操作。

## 四个入口的职责

| 入口 | 现在展示 | 边界 |
| --- | --- | --- |
| Home | 5 个精选作品、8 个精选仓库 | 编辑精选，不是数据库镜像 |
| Works | 8 个代表性成果 | Portfolio，不包括全部代码库 |
| Projects | 真实过程与复盘（当前为空）、六个旧想法 Archive | 不再复制 Works |
| Repos | 完整 26 个公开仓库 | 保留 Obsidian 8 项、Fork、17 个 Release 与说明链接 |

首页五个精选的标题、摘要与状态未重写：GitLineage、Context Distiller、通用文本结构标准、DenseGPT、Anatomical Symptom Interface。

首页仓库八个：GitLineage、Context Distiller、Universal Text Structure Standard、DenseGPT、Anatomical Symptom Interface、Paper Desk、Pixel Panels、Work Capsule。覆盖 AI/协作、文本规范、界面、Obsidian、视觉工具和桌面产品。只维护名称选择，不复制标题/摘要/版本；明确提供“查看全部代码库 →”入口。

## Portfolio 选择

| 项目 | 保留理由 |
| --- | --- |
| GitLineage | 可独立说明的代码来源与证据产品 |
| Context Distiller | 人机协作和上下文整理工具，已有真实截图 |
| Universal Text Structure Standard | 独立文本结构与知识表达规范 |
| DenseGPT | 已明确边界的网页密度与界面实践 |
| Anatomical Symptom Interface | 独立解剖交互产品；继续保留医学与发布限制 |
| DSH Universal Palette | 独立命令入口产品与真实截图 |
| Work Capsule | 独立桌面 GUI/CLI 工具与真实 Release |
| Pixel Panels | 视觉组件与创意工具方向，补充独立视觉表达 |

另外 14 项从 Works 列表降为仅代码索引资料：Dense Reading、Paper Desk、Quiet Shelf、Reading Rail Sidebar、Toolbar Pin Toggle、Zheng Tally、Obsidian Config、Obsidian Course Notes Standard、AI Systematic Notes、AI Governance Framework、Activity Record、Dark Canvas、Window Annotator、Yunmin Workbench。该选择只控制展示位置，不更改项目的实际状态或质量事实。

22 项真实资料的文件全部保留，中英成对；仅代码索引项目既有详情网址保留，标明不列入代表性成果，返回完整代码库。Portfolio 详情的前后项目只在八成果内流转。Repos 的链接区分“作品详情 / Portfolio details”与“项目说明 / Repository documentation”，后者不是 Process 记录。

## 数据与 Projects

已有 `featured` 是首页精选、`kind` 是项目/练习、`group` 是主题，均不表达是否纳入 Portfolio。因此只加 `portfolio` 布尔字段，默认 false，选中的八项中英文件设 true。`getWorks` 继续提供全部 22 项资料；新增 `getPortfolioWorks` 专用于作品列表与首页阅读列表；`getFeaturedWorks` 保留首页五精选；`getHomeRepos` 从完整目录中按名称选八项。完整 `getPublicRepos` 不受 Portfolio 过滤影响。

Projects 现在独立显示“项目过程与复盘尚未公开。当前成果可以在作品与代码库中查看。”与两个入口。六个 2026-05 旧想法及原状态在 Archive 中保留；英文不伪造历史翻译。未来已同步的真实 reflections 按项目归组、标 Process / Reflection 并提供按日期倒序的最近更新；当前没有造记录。机器管理目录未写入。

仓库/Release JSON 与所有项目原文逐文件比较不变；只有十六份入选文件增加了 `portfolio: true`。没有运行时 GitHub API、动态 Stars、虚构日期或新描述。

## 材质模糊复现与修复

原页面 Repos 的砂纹使用 `background-size: cover`。模块约 2696 CSS px 高；追加内容到 4484 CSS px 后仍使用 cover。源图处理缓存只有 900×600 像素，相当于高度决定的放大从约 4.5 倍升到 7.5 倍；阅读页面同样使用 cover。

现在砂纹固定 900×600 CSS px、重复铺设；内容增长只增加复用次数，不扩大颗粒或纹理。不把云层、照片、插画当砂纹平铺。

直接重复原图出现明显接缝，所以构建阶段从现有蓝色/灰绿砂图派生 surface tile：原尺寸不缩放，仅在四边 48px 内混合相对边缘；中心部分保持原像素。左右、上下与四角的边界逐像素相同。源图保留，试样预览/下载仍用源图；模块与阅读背景改用 surface tile。无新生成设计素材，无运行时 Canvas 加工、额外画布或逐帧计算。

PNG 备用与无损 WebP 一起生成，解码比较验证相同。蓝色 WebP 从 722136 增到 755982 字节，灰绿从 656872 增到 694402 字节；两张合计增加 71376 字节（约 5.2%）。这是替换砂纹请求的体积增量，不是整站测速；没有测试本轮冷启动加载速度。重复任意次数不会重复下载素材，也不会为每个模块另生成大图。

规则已写入 AGENTS 与维护说明。修复测试 `scripts/qa/paper-material-scale.cjs` 在 390/1440/1920、DPR 1/2 六组条件下追加 50 段内容，检查尺寸固定、原分辨率900×600、重复边缘相等、阅读层固定尺度与无横向溢出。实际截图确认硬接缝已消除。

## 验证结果

- `npm run check`：32 文件，0 errors、0 warnings、4 个已有 URL API hints；三个机器管理空目录 loader 提示仍在。
- `npm run build`：70 页成功，所有既有真实资料详情网址继续可用。构建中砂纹边缘匹配和无损解码检查通过。
- Chromium：390/768/1024/1440/1920 × 中英 × 29 路由 = 290 次页面检查全部通过；覆盖要求的八入口及全部 22 项保留详情。首页作品 5、仓库 8；Works 8；Projects 为空状态 + 六个 Archive、不重复作品；完整 Repos 26、Obsidian 8、Release 17、Fork 标识与名称集合核对通过。无横向溢出、浏览器异常或错误内部页面入口（68 个不同内部目的地址）。六组原交互通过：3D/阅读/Release、云层滚动与扰动、音乐延迟播放及收起生命周期、原地语言切换及历史返回、工作台来源、仓库筛选/空状态与减少动效。
- 额外检查：中英两版全部 17 个 Release 的预发布/仅源码标记和 URL 保留；仅代码索引详情返回完整 Repos 的链接通过。逐文件字节比较确认云层、3D、音乐、刻度、滚动源码与两个现有字体不变。
- 固定纹理测试：六组屏幕宽度/DPR 全部通过；增长模块与阅读页面的尺度、边界和溢出检查通过。
- 本轮先完成本地实现与验证，用户随后明确要求“提交推送”；该新授权覆盖本轮信息架构与材质修复，按现有 main 自动 Pages 流程发布。

证据目录：[浏览器结果](content-boundaries-2026-10-05/results.json)、[浏览器日志](content-boundaries-2026-10-05/browser.txt)、[check](content-boundaries-2026-10-05/check.txt)、[build](content-boundaries-2026-10-05/build.txt)、[纹理复现](content-boundaries-2026-10-05/material-scale-before.json)、[纹理测试](content-boundaries-2026-10-05/material-scale-results.json)、[长模块截图](content-boundaries-2026-10-05/long-repos.png)。

## 未验证与待填

未做实体手机、Safari/Firefox/Edge、本轮网络冷启动速度、外部软件安装或医学规则审查；未来非空 reflections 分组路径没有真实公开记录可做端到端验收。用户临时目录截图无法读取，本轮根据实际页面与加长模块复现。

摄影、个人音乐/音源、新文章、真实过程与复盘、学习记录、其他联系渠道仍待真实材料；保持原 pending 策略。没有以 README 冒充过程记录。无需用户现在补齐才可以继续审阅本地版本。
