// Collections own current content. Archive, study assets and pending slots remain distinct.
(()=>{
const config=window.PAPER_ROUTE_DATA;let locale=lang;
const to=path=>'/'+locale+'/'+path;
const go=path=>location.assign(path);
const shelf=document.querySelector('.writing-list');
function renderPosts(){const posts=config.content[lang].posts;
 shelf.innerHTML=posts.length?posts.map(p=>'<button data-post-route="'+esc(p.href)+'"><span class="post-date">'+esc(p.date.replaceAll('-','.'))+'</span><span class="post-title">'+esc(p.title)+'</span><span class="post-type">'+(p.legacy?'Archive / 2026-05':tr('文章','Article'))+'</span><span>↗</span></button>').join(''):'<p class="paper-empty-note">'+tr('尚无当前文章。历史草稿在中文版存档中保留。','No current articles in this language. Earlier Chinese drafts remain in the archive.')+'</p>';
 shelf.querySelectorAll('button').forEach(b=>b.onclick=()=>go(b.dataset.postRoute));
}
function renderRepos(){const folders=document.querySelector('.repo-folders');
 const releaseLink=w=>w.release?'<a class="release-link" href="'+esc(w.release.url)+'" target="_blank" rel="noopener">Release '+esc(w.release.tag)+' <small>'+ (w.release.prerelease?tr('预发布','Pre-release'):!w.release.hasAssets?tr('源码','Source'):'')+'</small> ↗</a>':'';
 const row=w=>'<div class="repo-row repo-folder" data-repo-kind="'+esc(w.kind)+'" data-repo-name="'+esc(w.name)+'"><span class="repo-kind">'+(w.fork?'Fork':tr('项目','Project'))+'</span><button data-repo-detail="'+esc(w.href||w.link)+'"><span>'+esc(w.title)+'</span><small>'+esc(w.stack||'')+'</small><span class="repo-summary">'+esc(w.summary)+'</span></button><div class="repo-links"><a href="'+esc(w.link)+'" target="_blank" rel="noopener">GitHub ↗</a>'+releaseLink(w)+'</div></div>';
 folders.innerHTML=config.groups.map(g=>'<section class="repo-family" data-repo-group="'+g.id+'"><h3>'+esc(g[lang])+'</h3>'+config.repos[lang].filter(w=>w.group===g.id).map(row).join('')+'</section>').join('');
 folders.querySelectorAll('button').forEach(b=>b.onclick=()=>go(b.dataset.repoDetail));
 const selected=document.querySelector('[data-repo-filter][aria-pressed=true]');selected?.click();
}
function renderArchive(){const host=document.querySelector('.archive-index');host.innerHTML='<p class="paper-empty-note">'+tr('早期想法作为存档保留，过程与复盘尚未发布。','Earlier ideas are archived in Chinese; process notes and reflections are not yet published.')+'</p><a data-source-locale="zh" href="/zh/projects/">'+tr('查看 2026-05 存档 ↗','Open the 2026-05 archive (Chinese) ↗')+'</a>';
}
function refreshLanguage(){
 locale=lang;config.lang=lang;config.live=config.liveByLocale?.[lang]||config.live;
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';
 document.querySelector('meta[name="description"]').content=config.descriptions[lang];
 document.querySelector('meta[property="og:description"]').content=config.descriptions[lang];
 document.querySelector('link[rel="canonical"]').href='https://yunmin311.github.io/'+lang+'/';
 document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(!a.dataset.sourceLocale&&/^\/(zh|en)\//.test(href))a.setAttribute('href',href.replace(/^\/(zh|en)\//,'/'+lang+'/'));});
 document.querySelector('.learning-title').removeAttribute('data-zh');document.querySelector('.learning-title').removeAttribute('data-en');document.querySelector('.learning-summary').removeAttribute('data-zh');document.querySelector('.learning-summary').removeAttribute('data-en');
 renderPosts();renderRepos();renderArchive();updateLearning(false);fillNoteDetails();
 for(const [id,key] of [['projects','reflections'],['learning','learning'],['repos','code']]){const host=document.getElementById(id);host.querySelectorAll('.live-language-index').forEach(el=>el.remove());const entries=config.liveByLocale?.[lang]?.[key]||[];if(!entries.length)continue;const box=document.createElement('div');box.className='legacy-project-index live-language-index';box.innerHTML=entries.map(e=>'<a href="'+to((key==='reflections'?'project-notes/':key==='code'?'repos/':'learning/')+e.slug+'/')+'"><span>'+esc(e.title)+' ↗</span><small>'+esc(e.summary)+'</small></a>').join('');host.append(box);}
 document.querySelectorAll('[data-zh]').forEach(el=>el.textContent=el.dataset[lang]);
 document.querySelector('.reader-tag').textContent=index===1?'Archive / 2026-05':tr('真实项目 / 一手资料','Projects / Primary sources');
 syncRuler();window.paperNavigation?.measure?.();window.paperScroll?.refresh();
}
const languageButton=document.querySelector('.language'),existingLanguage=languageButton.onclick;
languageButton.onclick=()=>{existingLanguage();refreshLanguage();history.pushState({paperLanguage:lang},'', '/'+lang+'/'+location.hash);};
addEventListener('popstate',()=>{const next=location.pathname.split('/')[1];if(['zh','en'].includes(next)&&next!==lang){existingLanguage();refreshLanguage();}});
const fillOriginal=fill;fill=function(){fillOriginal();const selected=index===0?config.content[lang].works:config.content[lang].posts;const item=detail?selected.find(p=>p.slug===detail.slug):null;if(item?.release){const release=document.createElement('a');release.className='release-link';release.href=item.release.url;release.target='_blank';release.rel='noopener';release.textContent='Release '+item.release.tag+(item.release.prerelease?tr(' · 预发布',' · Pre-release'):!item.release.hasAssets?tr(' · 源码',' · Source'):'')+' ↗';reader.querySelector('.reading-detail')?.append(release);}if(item?.href){const a=document.createElement('a');a.className='route-link';a.href=item.href;a.textContent=tr('打开完整页面 ↗','Open full page ↗');reader.querySelector('.reading-detail')?.append(a);}document.querySelector('.reader-tag').textContent=index===1?'Archive / 2026-05':tr('真实项目 / 一手资料','Projects / Primary sources');window.paperScroll?.refresh();};
for(const [id,path] of [['works','works/'],['projects','projects/'],['learning','learning/'],['repos','repos/'],['writing','blog/'],['about','about/']]){const section=document.getElementById(id),links=document.createElement('div');links.className='paper-route-links';links.innerHTML='<a href="'+to(path)+'">'+tr('打开完整页面 ↗','Open full page ↗')+'</a>';section.append(links);}
document.querySelectorAll('[data-repo-filter]').forEach(button=>button.addEventListener('click',()=>{const none=![...document.querySelectorAll('.repo-folder')].some(el=>!el.hidden);document.querySelectorAll('.repo-family').forEach(group=>group.hidden=![...group.querySelectorAll('.repo-folder')].some(row=>!row.hidden));const note=document.querySelector('.repo-empty');note.hidden=!none;note.textContent=tr('暂无已确认公开的练习项目。','No public practice repositories are curated yet.');}));
refreshLanguage();
window.paperProduction={stats:()=>({lang:locale,posts:config.content[locale].posts.length,projects:config.recovered.projects.length,repos:config.repos[locale].length,live:Object.fromEntries(Object.entries(config.live).map(([k,v])=>[k,v.length]))})};
})();
