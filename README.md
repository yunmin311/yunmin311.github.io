# Yunmin · 个人网站

个人数字花园 + Creative Engineering Portfolio，中英双语，Astro 静态站，免费托管在 GitHub Pages。
**线上入口：[中文首页](https://yunmin311.github.io/zh/) · [English](https://yunmin311.github.io/en/)**

冷蓝细砂云层、玻璃界面、可展开的立体卡片和侧边音乐播放器。设计和性能基准已定稿并上线。2026-10-05 内容接入工作分支整理 22 个真实公开项目、26 个公开仓库、五个精选与当前简介；尚未推送、尚未替换线上内容。照片、歌单、学习记录仍待真实材料，展示试样单独标明。

[设计基准](docs/design-baseline-2026-10-03.md) · [接入与维护说明](docs/正式网站接入说明.md) · [内容填充准备](docs/内容填充准备.md) · [发布进度](https://github.com/yunmin311/yunmin311.github.io/actions/workflows/deploy.yml)

下面是站主的维护手册；给 AI 的交接规矩在 `AGENTS.md`。

> 最省心的用法:让 Claude Code 替你做下面所有事,你只动嘴。
> 手册的价值是——就算没有 Claude,你自己也做得了。

---

## 一、本地编辑与预览（维护时使用）

前提:电脑装了 Node.js 和 Git(没装?见 `docs/搬家清单.md`,一路下一步)。

在项目文件夹打开终端,只需两句:

```bash
npm install     # 第一次(或换电脑后)装依赖,只需跑一次
npm run dev     # 启动本地预览
```

日常访问使用上方的线上网址。只有修改代码、内容时，才用 **http://localhost:4321** 在自己的电脑预览；这个地址不是公开网站。改内容会实时刷新。
看完在终端按 `Ctrl+C` 关掉。

## 二、怎么加一篇作品

1. 在 `src/content/works/zh/` 里新建一个 md 文件,文件名用英文小写加连字符,
   比如 `brand-2026.md`。文件开头照这个模板填(冒号后面要有个空格):

   ```markdown
   ---
   title: 作品标题
   summary: 一两句话简介,会显示在列表里
   date: 2026-07-01
   cover: ../_covers/brand-2026.jpg
   client: 客户名(可删)
   role: 你的角色(可删)
   link: https://线上项目网址(可删)
   video: https://vimeo.com/xxx(可删,填了详情页就有播放器)
   featured: true
   order: 1
   ---

   这里往下是正文,普通中文随便写,空一行就是分段。
   插图这样写:![图的说明](../_images/图片文件名.jpg)
   ```

   - `featured: true` = 上首页精选,`order` 数字小的排前面;不想上首页就删掉这两行
   - `draft: true` 加上这行 = 草稿,整站看不到,写完删掉这行才发布
   - 封面图放 `src/content/works/_covers/`,正文图放 `src/content/works/_images/`,
     **图片入库前先看 `docs/图片入库工序.md`**(一条命令把大图压到合适体积)

   - 代码/研究项目支持 `category`、`status`、`stack`、`sources` 和 `reviewedAt`；封面与项目日期可缺省，使用诚实的文字卡。`reviewedAt` 是来源核对日，不是项目创建或发布日期。

2. **英文版**:在 `src/content/works/en/` 建一个**同名**文件(`brand-2026.md`),
   内容翻成英文。同名 = 网站自动认成互为翻译,页面右上角就能互切。
   **新增真实项目本轮提供了对应中英文摘要；对其他内容，不写英文版时**——这条作品只在中文站出现,英文站自动藏起来,不会 404。

3. 本地预览确认没问题(第一节),就可以提交保存了(第五节)。

## 三、怎么写一篇博客

和作品一样,只是更简单:文件放 `src/content/posts/zh/`(英文版 `posts/en/` 同名),
开头只需四行:

```markdown
---
title: 文章标题
summary: 一句话简介
date: 2026-07-01
---

正文。
```

草稿同样用 `draft: true`。

## 四、上线 / 更新线上网站

网站发布到 GitHub Pages，网址继续是 **https://yunmin311.github.io/**。

1. 修改内容后运行 `npm run check` 和 `npm run build`，确认通过；
2. 将明确修改的文件提交并推送到 `main`；
3. [GitHub Actions](https://github.com/yunmin311/yunmin311.github.io/actions/workflows/deploy.yml) 自动构建、发布。任务显示成功后，刷新线上网址即可看到更新。

也可以在同一页面选择 **Run workflow** 手动发布。发布尚在进行时，线上仍会显示上一次成功版本。

设计以本次定稿为基准，后续主要补充内容和功能；不需要等所有占位都填完才上线。

## 五、保存与备份

- **提交**(存档到本地):让 Claude 做,或自己
  `git add 具体文件` → `git commit -m "改了什么"`;
- **推送**(备份到云端)= `git push`。推送即备份,GitHub 上永远有完整副本;
- 提交前必过两道关:**`npm run check`(体检)和 `npm run build`(试装)**,
  谁红了修谁,不带病提交;
- 换电脑 → `docs/搬家清单.md`;不想用 GitHub Pages 了 → `docs/迁移备忘.md`。

## 六、文件地图(找东西用)

| 想改什么 | 去哪 |
|----------|------|
| 作品 / 文章 | `src/content/works/`、`src/content/posts/` |
| 颜色、字号、间距(全站视觉) | `src/styles/paper/`（定稿界面）及 `src/styles/tokens.css`（共享基础） |
| 界面上的字(导航、按钮、页脚) | `src/i18n/ui.ts`(中英各一份,站名也在这) |
| 个人简介和已提供的联系方式 | `src/pages/[lang]/about.astro`、`src/data/legacy-profile.json` |
| 首页交互与播放器 | `src/scripts/paper/` |
| 模型、字体、材质和许可 | `public/assets/paper/` |
| 各种说明书 | `docs/`(愿景、规格、清单都在这) |
