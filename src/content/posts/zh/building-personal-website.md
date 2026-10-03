---
title: "个人网站搭建全记录"
summary: "从零开始用 Next.js + Tailwind CSS 搭建个人网站，从框架选型到部署上线的完整过程。"
date: "2026-05-09"
legacy: true
draft: false
---

## 动机

一直想要一个属于自己的数字花园——不只是简历，而是能承载项目、博客和思考的空间。Github 上积累了几个项目想法后，终于开始动手。

## 技术选型

对比了几个方案：

| 方案 | 优点 | 缺点 |
|------|------|------|
| Next.js | React 生态、SSG、Vercel 一键部署 | 对简单站点略重 |
| Astro | 极轻、多框架支持 | 生态较小 |
| Hugo | 极快、纯静态 | Go 模板语法学习成本 |

最终选了 **Next.js**，因为：
1. React 生态最熟悉
2. App Router + Server Components 性能足够
3. 后续迭代空间大（API routes、数据库）

## 搭建过程

### 1. 创建项目

```bash
npx create-next-app@latest personal-website --typescript --tailwind --app --src-dir --turbopack
```

### 2. 结构设计

- `src/app/` — 页面路由
- `src/components/` — 共享组件
- `content/blog/` — MDX 博客文章

### 3. 暗色模式

使用 Tailwind CSS v4 的 `@custom-variant dark` 指令，结合 localStorage 和 inline script 实现无闪烁暗色切换。

### 4. 部署

推送到 GitHub 后在 Vercel 导入项目，自动构建部署，支持自定义域名。

## 下一步

- [ ] RSS 订阅
- [ ] 评论系统
- [ ] 项目详情页
- [ ] 图片相册
