// 日期本地化(规格:随语言各自习惯),构建时静态输出。
import type { Lang } from '../i18n/ui';

const localeOf: Record<Lang, string> = { zh: 'zh-CN', en: 'en-US' };

/** 完整日期:中文"2026年7月1日",英文 "July 1, 2026" */
export function formatDate(lang: Lang, date: Date): string {
  return new Intl.DateTimeFormat(localeOf[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** 仅年份(作品头部用) */
export function formatYear(date: Date): string {
  return String(date.getFullYear());
}
