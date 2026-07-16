// 全站界面文字的唯一存放处(宪法第六条:界面文字两语齐全)。
// 站名未决(规格·未决事项):占位 "Y",定稿后只改 site.name 两处。

export const locales = ['zh', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'zh';

const zh = {
  'site.name': 'Y',
  'site.description': '设计师的个人网站:作品集与博客。(占位描述,待定稿)',
  'nav.works': '作品',
  'nav.blog': '博客',
  'nav.about': '关于',
  'home.placeholder': '这里是首页壳子,阶段 3 会填入介绍块与精选作品。',
} as const;

const en = {
  'site.name': 'Y',
  'site.description': 'Personal website and portfolio of a designer. (placeholder)',
  'nav.works': 'Works',
  'nav.blog': 'Blog',
  'nav.about': 'About',
  'home.placeholder': 'Home page shell. Intro block and featured works arrive in phase 3.',
} as const;

export const ui = { zh, en } satisfies Record<Lang, Record<string, string>>;

// 键齐全性检查:构建时模块一加载就核对,漏键直接构建失败(T3 完成标志)
for (const key of Object.keys(zh)) {
  if (!(key in en)) throw new Error(`ui.ts:en 缺少键 "${key}"`);
}
for (const key of Object.keys(en)) {
  if (!(key in zh)) throw new Error(`ui.ts:zh 缺少键 "${key}"`);
}

export function t(lang: Lang, key: keyof typeof zh): string {
  return ui[lang][key];
}
