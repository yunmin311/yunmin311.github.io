import registry from '../data/public-repositories.json';
import {getWorks,slugOf} from './content';
import type {Lang} from '../i18n/ui';
export const projectGroups = [
 {id:'software',zh:'软件与交互工具',en:'Software & interaction'},
 {id:'obsidian',zh:'Obsidian · 插件与笔记系统',en:'Obsidian · Plugins & note systems'},
 {id:'knowledge',zh:'知识与协作规范',en:'Knowledge & collaboration'},
 {id:'visual',zh:'视觉与创意实验',en:'Visual & creative experiments'},
 {id:'repository',zh:'其他公开仓库与 Fork',en:'Other public repositories & forks'},
] as const;
export async function getPublicRepos(lang:Lang){
 const works=await getWorks(lang);
 return registry.map(row=>{const work=works.find(w=>slugOf(w.id)===row.workSlug);return {...row,title:work?.data.title||row.title,summary:work?.data.summary||row.summary[lang],stack:work?.data.stack||row.language,link:row.url,kind:'project',portfolio:work?.data.portfolio||false,href:work?`/${lang}/works/${row.workSlug}/`:null,release:row.release};});
}

// Editorial selection contains only names; all descriptions and Releases use the shared catalogue.
const homeRepoNames = new Set(['GitLineage','context-distiller','universal-text-structure-standard','DenseGPT','anatomical-symptom-interface','paper-desk-obsidian','pixel-panels','work-capsule']);
export async function getHomeRepos(lang: Lang) {
 return (await getPublicRepos(lang)).filter(row => homeRepoNames.has(row.name));
}
