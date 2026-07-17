// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 网站的正式网址:换域名 / 换托管平台时只改这一处(另有 public/robots.txt 里一行,见 docs/迁移备忘.md)
const SITE = 'https://yunmin311.github.io';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // 响应式图片:构建时自动为每张图产出多档尺寸(srcset),浏览器按屏幕挑小图
  image: {
    layout: 'constrained',
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      // 根路径只是跳转页(noindex),不进 sitemap
      filter: (page) => page !== `${SITE}/`,
    }),
  ],
});
