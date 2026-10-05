// 全站界面文字的唯一存放处(宪法第六条:界面文字两语齐全)。
// 当前身份与首页介绍以用户确认内容为准。
import { profile } from "../lib/profile";

export const locales = ['zh', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'zh';

const zh = {
  'site.name': 'Yunmin',
  'site.description': 'Yunmin / Qiyu Li 的个人数字花园与 Creative Engineering Portfolio：AI 原生工具、创意软件、人机协作与视觉系统。',
  'nav.works': '作品',
  'nav.blog': '文字',
  'nav.about': '关于',
  'home.intro.title': 'Qiyu Li / Yunmin',
  'home.intro.body': profile.intro.zh,
  'home.viewAll': '查看全部作品',
  'works.title': '代表性成果',
  'work.client': '客户',
  'work.role': '角色',
  'work.link': 'GitHub',
  'work.prev': '上一个',
  'work.next': '下一个',
  'work.backToList': '全部作品',
  'blog.title': '文字',
  'about.title': '关于',
  'about.photoAlt': '个人照片待提供',
  'about.status': '本科在读 · Creative Engineering',
  'about.body': profile.about.zh,
  'about.email': '邮箱',
  'about.resume': '简历(PDF,待补)',
  'notfound.title': '页面不存在',
  'notfound.body': '这个网址没有对应的页面。',
  'notfound.home': '回首页',
} as const;

const en = {
  'site.name': 'Yunmin',
  'site.description': 'Yunmin / Qiyu Li — a personal digital garden and creative engineering portfolio of AI-native tools, creative software, human–AI interaction and visual systems.',
  'nav.works': 'Works',
  'nav.blog': 'Writing',
  'nav.about': 'About',
  'home.intro.title': 'Qiyu Li / Yunmin',
  'home.intro.body': profile.intro.en,
  'home.viewAll': 'View all works',
  'works.title': 'Selected portfolio',
  'work.client': 'Client',
  'work.role': 'Role',
  'work.link': 'GitHub',
  'work.prev': 'Previous',
  'work.next': 'Next',
  'work.backToList': 'All works',
  'blog.title': 'Writing',
  'about.title': 'About',
  'about.photoAlt': 'Personal photo pending',
  'about.status': 'Undergraduate student · Creative Engineering',
  'about.body': profile.about.en,
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
