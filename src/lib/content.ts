// 内容集合的公共查询:按语言过滤、排除草稿、翻译配对(规格第三/五节)。
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

type Coll = 'works' | 'posts';

/** 集合条目 id 形如 "zh/poster-series":首段是语言,其余是短名 */
export function slugOf(id: string): string {
  return id.split('/').slice(1).join('/');
}

async function published<C extends Coll>(coll: C, lang: Lang) {
  return getCollection(coll, ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft);
}

/** 某语言的全部非草稿作品,按日期倒序 */
export async function getWorks(lang: Lang): Promise<CollectionEntry<'works'>[]> {
  const list = await published('works', lang);
  return list.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** 某语言的精选作品,按 order 升序 */
export async function getFeaturedWorks(lang: Lang): Promise<CollectionEntry<'works'>[]> {
  const list = await published('works', lang);
  return list.filter((w) => w.data.featured).sort((a, b) => a.data.order - b.data.order);
}

/** 某语言的全部非草稿文章,按日期倒序 */
export async function getPosts(lang: Lang): Promise<CollectionEntry<'posts'>[]> {
  const list = await published('posts', lang);
  return list.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** 对应翻译是否存在(同短名、非草稿) */
export async function hasTranslation(coll: Coll, otherLang: Lang, slug: string): Promise<boolean> {
  const list = await getCollection(coll, ({ id, data }) => id === `${otherLang}/${slug}` && !data.draft);
  return list.length > 0;
}
