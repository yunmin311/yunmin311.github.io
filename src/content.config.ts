// 内容集合定义:字段规矩见 docs/specs/2026-07-16-website-spec.md 第五节。
// 目录按语言分(works/zh、works/en),同名文件互为翻译。
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      cover: image(),
      client: z.string().optional(),
      role: z.string().optional(),
      link: z.string().url().optional(),
      video: z.string().url().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

// 下面三个集合是 Obsidian 同步管线的落点(spec:docs/specs/2026-07-18-obsidian-sync-spec.md)。
// ⚠️ 机器管理区:src/content/{reflections,learning,code} 由 scripts/sync/run.mjs 写入,
//    人不手改——改了会被下一次同步整个覆盖。想改内容,回 Obsidian 改了重新同步。
// 只定义数据形状;页面等视觉定稿和各板块点名后另做。

const syncBase = {
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.coerce.date(),
};

// 项目记录与反思(spec:2026-07-18-project-notes-spec.md)
const reflections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reflections' }),
  schema: z.object({
    ...syncBase,
    project: z.string().min(1), // 项目名,归组键
    kind: z.enum(['记录', '复盘']),
    work: z.string().optional(), // 关联作品(作品集条目的文件名),选填互跳
  }),
});

// 学习记录(spec:2026-07-18-learning-log-spec.md)
const learning = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learning' }),
  schema: z.object({
    ...syncBase,
    line: z.string().min(1), // 学习线,归组键
    source: z.string().optional(), // 来源(书名或链接),选填
  }),
});

// 代码库(spec:2026-07-18-repos-spec.md)
const code = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/code' }),
  schema: z.object({
    ...syncBase,
    repo: z.url(), // 仓库链接,必填,「去看代码」按钮从它来
    kind: z.enum(['正式', '练习']),
    stack: z.string().optional(), // 技术栈,逗号分隔的几个短词,手写维护
  }),
});

export const collections = { works, posts, reflections, learning, code };
