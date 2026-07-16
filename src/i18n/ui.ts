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
  'home.intro.title': '你好,我是 Y。',
  'home.intro.body': '(占位介绍)设计师,做视觉与影像。这里放两三行真正的自我介绍。',
  'home.viewAll': '查看全部作品',
  'works.title': '作品',
  'work.client': '客户',
  'work.role': '角色',
  'work.link': '查看线上项目',
  'work.prev': '上一个',
  'work.next': '下一个',
  'work.backToList': '全部作品',
  'blog.title': '博客',
  'about.title': '关于',
  'about.photoAlt': '照片(占位)',
  'about.status': '(占位状态)现居某地,接受合作洽谈。',
  'about.body': '(占位介绍)这里放长版自我介绍:背景、在做的事、感兴趣的方向。',
  'about.email': '邮箱',
  'about.resume': '简历(PDF,待补)',
  'notfound.title': '页面不存在',
  'notfound.body': '这个网址没有对应的页面。',
  'notfound.home': '回首页',
} as const;

const en = {
  'site.name': 'Y',
  'site.description': 'Personal website and portfolio of a designer. (placeholder)',
  'nav.works': 'Works',
  'nav.blog': 'Blog',
  'nav.about': 'About',
  'home.intro.title': 'Hi, I am Y.',
  'home.intro.body': '(Placeholder intro) Designer working in visuals and motion. A real two-line intro goes here.',
  'home.viewAll': 'View all works',
  'works.title': 'Works',
  'work.client': 'Client',
  'work.role': 'Role',
  'work.link': 'View online',
  'work.prev': 'Previous',
  'work.next': 'Next',
  'work.backToList': 'All works',
  'blog.title': 'Blog',
  'about.title': 'About',
  'about.photoAlt': 'Photo (placeholder)',
  'about.status': '(Placeholder status) Based somewhere, open for collaboration.',
  'about.body': '(Placeholder) A longer introduction goes here: background, current work, interests.',
  'about.email': 'Email',
  'about.resume': 'Resume (PDF, coming)',
  'notfound.title': 'Page not found',
  'notfound.body': 'Nothing lives at this address.',
  'notfound.home': 'Back to home',
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
