# 个人网站 — 实现计划(plan)

日期:2026-07-16(同日随 clarify 环节更新)。
依据:`constitution.md`(宪法)→ `2026-07-16-website-spec.md`(功能规格)。
需求细节以规格为准,本计划只讲"怎么做、按什么顺序"。
任务级拆分见 `2026-07-16-tasks.md`。

## 已定的决策(计划的前提)

- 仓库 `yunmin311/yunmin311.github.io`,分支 `main`,已完成首次推送
- 网址:`https://yunmin311.github.io/`
- 默认语言中文;`/zh/…` 与 `/en/…` 都带前缀;根路径自动跳 `/zh/`
- 视觉暂用最简占位样式;视觉变量集中在 `src/styles/tokens.css`
- 站名未决:占位符集中定义(一处改、全站生效)
- 字体暂用系统自带。LXGW 等字体的授权工作等视觉定稿后单独做

## 阶段 1:骨架

- `package.json` 项目名 `scaffold` → `personal-site`
- `astro.config.mjs`:`site` + i18n(中文默认,双前缀,根路径跳转)
- 全站布局(`src/layouts/`):页头(站名占位 + 导航 + 语言切换)、页脚
- 界面文字两语齐全,集中存放(导航、按钮、页脚一处管理)
- `src/styles/tokens.css`:视觉变量集中地(最朴素的一套)

验收:本地预览中英首页壳子互切正常,根网址自动跳中文。

## 阶段 2:内容集合

- `src/content.config.ts` 定义 `works` / `posts` 两个集合,字段照规格第五节
- 目录:`src/content/{works,posts}/{zh,en}/`,同名文件互为翻译
- 示例占位内容:作品 3 条(其中 1 条带视频链接、1 条只有中文版验证隐藏逻辑)、
  文章 2 条、1 条草稿(验证草稿不上线)

验收:字段写错构建报错;占位内容齐备且明确标注"占位"。

## 阶段 3:页面

- 首页(介绍块嵌网格 + 精选作品,`featured` 按 `order` 排序)
- 作品列表(同款网格)+ 作品详情(字段头部、单列大图、视频位、上/下一个翻页)
- 博客列表(纯文字清单)+ 文章页
- 关于/联系(照片位、状态行、邮箱防爬、社交链接、中英简历 PDF 占位)
- 404;基本 SEO(标题/描述/og 卡片/hreflang/sitemap);favicon 换成站名首字母占位
- 全部双语;单语内容在另一语言站隐藏;语言切换按规格第三节的规则跳转

验收:整站可点、双语切换每页工作、规格第八节 1–5 条全过。

## 阶段 4:自动部署

- `.github/workflows/deploy.yml`(Astro 官方动作):推送 main 即自动构建发布
- **需要用户点一次**:GitHub 仓库页 → Settings → Pages → Source 选 "GitHub Actions"
- 推送、看自动构建通过、打开正式网址验收

验收:`https://yunmin311.github.io/` 公开可访问,规格第八节全部通过。

## 之后再说(不在本计划内)

真实内容替换、站名定稿、视觉方向落地、字体授权与子集化、简历 PDF、
自定义域名(若国内访问成为问题)。

## 技术备忘(给执行者,用户可跳过)

- i18n:`defaultLocale: "zh"`,`locales: ["zh", "en"]`,
  `prefixDefaultLocale: true` + `redirectToDefaultLocale: true`
- 内容集合:`glob()` loader(`base: "./src/content/works"` 等),
  语言 = `id` 的首段(`zh/…`/`en/…`),`getCollection` 按 `id.startsWith` 过滤;
  schema 用 zod:`date: z.coerce.date()`,`cover: image()`,`video: z.string().url().optional()`,
  `featured/draft` 默认 `false`,`order` 默认 `0`
- 翻译配对:去掉语言前缀后的 `id` 相同 → 互为翻译;语言切换组件据此生成目标链接,
  查不到就指向目标语言首页
- 界面文字:`src/i18n/ui.ts` 一个字典文件,键统一、两语齐全;站名占位也放这里
- 邮箱防爬:构建时简单编码 + 极小段内联脚本还原(不引第三方,不联网)
- 视频位:从链接识别 Vimeo/YouTube/B站,渲染响应式 iframe;识别不了就显示普通链接
- SEO:每页 `<title>`/`<meta description>`/og 标签;`hreflang` 互指 + `x-default` 指中文;
  sitemap 用官方 `@astrojs/sitemap` 集成(引入理由:搜索收录,宪法第五条报备)
- 封面统一比例先按 4:3 占位(视觉定稿时改),CSS `aspect-ratio` + `object-fit: cover` 居中裁切
- 日期本地化:`Intl.DateTimeFormat`(zh-CN / en-US),构建时静态输出,无运行时脚本
- 部署 workflow:`actions/checkout@v7` + `withastro/action@v6` + `actions/deploy-pages@v5`,
  `push: branches: [main]` + `workflow_dispatch`,
  permissions:`contents: read` / `pages: write` / `id-token: write`
- `astro.config.mjs`:`site: 'https://yunmin311.github.io'`(根仓库,无 `base`)
