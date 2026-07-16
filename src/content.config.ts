// 内容集合定义:字段规矩见 docs/specs/2026-07-16-website-spec.md 第五节。
// 目录按语言分(works/zh、works/en),同名文件互为翻译。
import { defineCollection, z } from 'astro:content';
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

export const collections = { works, posts };
