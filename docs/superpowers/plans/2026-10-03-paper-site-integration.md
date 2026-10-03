# 已认可纸窗设计正式接入 Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task in the current session. User explicitly authorized this chat as the website implementer. Preserve all pre-existing changes; no publish or push.

**Goal:** 修复展开后的三张卡片切换、统一右侧刻度，再把已认可的细砂与玻璃视觉接入现有 Astro 网站。

**Architecture:** 已认可的 HTML 作为视觉基线；迁入独立首页组件、公共布局、样式和客户端脚本。资产改为可缓存的本地文件。文章与项目内容存入现有内容集合，保留中英文路由和笔记同步，所有缺项标明来源与待补状态。

**Tech Stack:** 当前 Astro 7、静态输出、原 Three/PhotoSwipe/Plyr/Motion 实现，本地许可随附。

**Spec:** 本对话用户 2026-10-03 的三项要求；design/纸窗-主角字号与随身音乐-2026-10-03/README.md 为已认可视觉基线。此次用户已授权替换旧规格的首页视觉、材质和动效。

## Global Constraints

- 当前项目与 https://yunmin311.github.io 沿用；中文默认、英文独立路由；无翻译不制造正文。
- 现有脏文件、CLAUDE.md、reference、旧 personal-website、Creative OS、Obsidian 同步源不得覆盖或重置。
- 滚动条视觉全部隐藏，滚轮/触摸/键盘保留；右侧刻度跟随当前页面或阅读区域。
- 仅本地实现与验证，不提交、不推送、不发布。

## Task 1: 原因复现和定稿交互

- [x] 在 design 新版本复现 selected 状态无法 cycle 与手机刻度隐藏。
- [x] 修复 scene.js 的 cycle 和 hit 点击，保持选择状态切到任一卡片；desktop 点击露出卡片，phone 保留三格控件。
- [x] 新增 scroll-controls.js/css：主刻度控制页面；弹窗和 reader 优先控制自身滚动；无可滚动内容不显示伪进度；隐藏原生条与底部直条。
- [x] 浏览器实测普通/展开/快速切换、鼠标/键盘、手机/桌面、中英、减少动效。

## Task 2: 正式资产和首页

- [x] src/components/paper 保存首页分区；src/styles/paper 与 src/scripts/paper 保存成熟实现。
- [x] scripts/build-paper.mjs 只处理正式源，生成本地可缓存资产与脚本；不用 iframe 包住设计稿，不在运行时引用 design 路径。
- [x] 保留 ../index 的中文跳转；正式 /zh/ /en/ 首页加载对应真实内容、链接到真实详情页。
- [x] 验证模型、云层、播放器和刻度；字体/库许可随附，资产缺失有可读内容入口。

## Task 3: 内容和子页面

- [x] 两篇旧文章转为 markdown 内容文件，六个旧项目条目加来源/历史状态，保留详情待补。
- [x] Base.astro 和作品/文章/关于及新增 projects 页使用定稿玻璃外框和安静阅读层，真实导航链接和右侧刻度。
- [x] 保留已写好的作品详情、视频、上下篇、单语隐藏与草稿排除；不触碰 reflections/learning/code 的机器管理源。
- [x] 检查所有路由、英文无伪翻译、表格/代码内部可横移、旧示例邮箱不成为真实联系。

## Task 4: 验证和交付

- [x] npm run check / npm run build。
- [x] 浏览器在构建产物实测三种尺寸、中英、卡片切换、弹窗刻度、页面跳转、音频与减少动效。
- [x] 核对未涉及文件的原始哈希，记录验收与来源；保存原设计与旧项目字节不变证据。
- [x] 提供正式本地预览和定稿入口；当前未上线。

## Review Focus

selected 状态仍禁用 cycle；弹窗让页面刻度失去点击；切换内容后刻度高度陈旧；手机页边控件挡住按钮；英文字体字表缺字；部署依赖只存在本机的路径。

## 执行与复核记录

- Task 1：复现了展开状态不能 cycle、手机三格隐藏、切换后控件焦点丢失。v31 与正式实现均已修复，实际照片点击与连续键盘切换通过。
- Task 2：正式源独立迁入 src；生成本地分离资产，首页构建 HTML 约 37KB；缓存纹理不再现场重做 shader，浏览器统计 shaderPasses=0。模型、云层和单一音乐实例通过。
- Task 3：两篇旧文正文逐字一致、六个历史项目已接通详情；单语回退、草稿过滤及原笔记集合保留；未动同步脚本、reference 或 CLAUDE。
- Task 4：check 0 errors / 0 warnings；build 34 页；405 个本地引用无缺失；五个首页尺寸/语言组合及十三个子页通过，资源拦截回退通过。
- Final review：按 executing-plans 要求进行一次独立只读审查。发现首页回退入口不完整、减少动效入口不可见，两项均已修复并用真实浏览器验证；未再派复审。
- 额外实际输入审计：移动刻度进入阅读区保证自然 Tab 可达；排除 inert 阅读面避免关闭后焦点留住；修正窄屏旧样式压缩点击范围，点击/拖动/全屏退出与章节滚轮均通过。
- Ruling：原有大量脏文件保留，只写本次明确的正式接入文件；用户未要求提交/发布，故不执行提交、推送或部署，不做大版本强制降级。
- 交付记录与待补内容：docs/verification/paper-site-2026-10-03.md。依赖剩余告警独立留档，发布前另处理；不把页面验收冒充发布验收。

## 用户后续授权与定稿提交

用户已明确要求在本轮结束后提交、推送至原 GitHub 仓库；本节更新此前 no push 的阶段限制。设计以正式接入版本为基准，今后主要填充内容。GitHub Pages 的手动触发保持不变，本轮不部署。下载接管兼容修复和复测记录见正式验收文档。
