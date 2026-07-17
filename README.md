# 个人网站 — 维护手册

设计师的个人网站:作品集 + 博客,中英双语,纯静态,免费托管在 GitHub Pages。
这份手册写给**站主本人**(不懂技术也能照做);给 Claude 看的交接规矩在 `AGENTS.md`。

> 最省心的用法:让 Claude Code 替你做下面所有事,你只动嘴。
> 手册的价值是——就算没有 Claude,你自己也做得了。

---

## 一、在电脑上把网站跑起来

前提:电脑装了 Node.js 和 Git(没装?见 `docs/搬家清单.md`,一路下一步)。

在项目文件夹打开终端,只需两句:

```bash
npm install     # 第一次(或换电脑后)装依赖,只需跑一次
npm run dev     # 启动本地预览
```

然后浏览器打开 **http://localhost:4321** 就能看到网站。改内容会实时刷新。
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

2. **英文版**:在 `src/content/works/en/` 建一个**同名**文件(`brand-2026.md`),
   内容翻成英文。同名 = 网站自动认成互为翻译,页面右上角就能互切。
   **不写英文版也完全可以**——这条作品只在中文站出现,英文站自动藏起来,不会 404。

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

**网站目前没有上线**(2026-07 有意保持下线,先做设计)。上线那天:

1. 打开 `docs/上线前检查清单.md`,逐条打勾(隐私检查最重要);
2. 清单里会让你把 `.github/workflows/deploy.yml` 的自动开关改回来
   (现在是"仅手动触发"的保险状态,文件头注释里存着改回去的原样);
3. 之后每次推送到 GitHub,网站几分钟内自动更新,不用再做任何事。

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
| 颜色、字号、间距(全站视觉) | `src/styles/tokens.css`(唯一的地方) |
| 界面上的字(导航、按钮、页脚) | `src/i18n/ui.ts`(中英各一份,站名也在这) |
| 关于页的邮箱、社交链接 | `src/lib/profile.ts` |
| 各种说明书 | `docs/`(愿景、规格、清单都在这) |
