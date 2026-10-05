import { getCollection } from 'astro:content';
import { getWorks, getPosts, slugOf } from './content';
import {t,type Lang} from '../i18n/ui';
import {getPublicRepos,projectGroups} from './catalog';
import {profile} from './profile';
export function localizePaper(markup: string, lang: Lang): string {
 if(lang==='zh')return markup;
 return markup.replace(/<([a-z][\w-]*)([^>]*\bdata-en="([^"]*)"[^>]*)>[^<]*<\/\1>/g,(_all,tag,attrs,text)=>`<${tag}${attrs}>${text}</${tag}>`);
}
export async function getPaperHomeData(lang: Lang) {
 const content:Record<string,{works:unknown[],posts:unknown[]}>={};
 const repos:Record<string,unknown[]>={};
 for(const locale of ['zh','en'] as const){
  const works=await getWorks(locale),posts=await getPosts(locale);
  const serialized=works.map(w=>({...w.data,cover:w.data.cover?.src,date:w.data.date?.toISOString().slice(0,10)||'',reviewedAt:w.data.reviewedAt?.toISOString().slice(0,10),slug:slugOf(w.id),body:w.data.summary,href:`/${locale}/works/${slugOf(w.id)}/`}));
  content[locale]={works:serialized,posts:posts.map(p=>({...p.data,date:p.data.date.toISOString().slice(0,10),slug:slugOf(p.id),body:p.body||'',href:`/${locale}/blog/${slugOf(p.id)}/`}))};
  repos[locale]=await getPublicRepos(locale);
 }
 const projects=(await getCollection('projectIdeas',({id,data})=>id.startsWith('zh/')&&!data.draft)).map(p=>({title:p.data.title,desc:p.data.summary,status:p.data.historicalStatus,sourceDate:p.data.sourceDate,tags:p.data.tags,slug:slugOf(p.id),href:`/zh/projects/${slugOf(p.id)}/`}));
 const live={reflections:await getCollection('reflections'),learning:await getCollection('learning'),code:await getCollection('code')};
 const liveByLocale=Object.fromEntries((['zh','en'] as const).map(locale=>[locale,Object.fromEntries(Object.entries(live).map(([key,entries])=>[key,entries.filter(e=>e.id.startsWith(locale+'/')).map(e=>({...e.data,slug:slugOf(e.id)}))]))]));
 const knowledge=Object.fromEntries((['zh','en'] as const).map(locale=>[locale,(content[locale].works as {slug:string,title:string,summary:string,status:string,sources:{url:string}[]}[]).filter(w=>['text-structure','densegpt','context-distiller'].includes(w.slug)).map(w=>({title:w.title,summary:w.summary,status:w.status,source:w.sources[0].url}))]));
 return {lang,content,repos,groups:projectGroups,profile,knowledge,descriptions:{zh:t('zh','site.description'),en:t('en','site.description')},recovered:{posts:content.zh.posts,projects},liveByLocale,live:liveByLocale[lang]};
}
