import { getCollection } from 'astro:content';
import { getWorks, getPosts, slugOf } from './content';
import type { Lang } from '../i18n/ui';
import profile from '../data/legacy-profile.json';
export function localizePaper(markup: string, lang: Lang): string {
  if(lang==='zh')return markup;
  return markup.replace(/<([a-z][\w-]*)([^>]*\bdata-en="([^"]*)"[^>]*)>[^<]*<\/\1>/g,(_all,tag,attrs,text)=>`<${tag}${attrs}>${text}</${tag}>`);
}
export async function getPaperHomeData(lang: Lang) {
 const content:Record<string,{works:unknown[],posts:unknown[]}>={};
 for(const locale of ['zh','en'] as const){
  const works=await getWorks(locale),posts=(await getPosts(locale)).filter(p=>!/^占位文章|^Placeholder post/i.test(p.data.title));
  content[locale]={works:works.map(w=>({...w.data,date:w.data.date.toISOString().slice(0,10),slug:slugOf(w.id),body:w.data.summary,href:`/${locale}/works/${slugOf(w.id)}/`})),posts:posts.map(p=>({...p.data,date:p.data.date.toISOString().slice(0,10),slug:slugOf(p.id),body:p.body||'',href:`/${locale}/blog/${slugOf(p.id)}/`}))};
 }
 const projects=(await getCollection('projectIdeas',({id,data})=>id.startsWith('zh/')&&!data.draft)).map(p=>({title:p.data.title,desc:p.data.summary,status:p.data.historicalStatus,tags:p.data.tags,slug:slugOf(p.id),href:`/zh/projects/${slugOf(p.id)}/`}));
 const posts=content.zh.posts;
 const live={reflections:await getCollection('reflections'),learning:await getCollection('learning'),code:await getCollection('code')};
 return {lang,content,recovered:{posts,projects,about:profile},live:Object.fromEntries(Object.entries(live).map(([key,entries])=>[key,entries.filter(e=>e.id.startsWith(lang+'/')).map(e=>({...e.data,slug:slugOf(e.id)}))]))};
}
