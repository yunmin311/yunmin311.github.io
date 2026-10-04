// Production routes and file-backed content take over the design-only entry points.
(()=>{
const config=window.PAPER_ROUTE_DATA;let locale=lang;
const to=path=>'/'+locale+'/'+path;
const go=path=>location.assign(path);
const languageButton=document.querySelector('.language'),existingLanguage=languageButton.onclick;
function refreshLanguage(){
 locale=lang;config.lang=lang;config.live=config.liveByLocale?.[lang]||config.live;
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';
 document.querySelector('meta[name="description"]').content=tr('Yunmin 的作品、文字与过程记录。','Works, writing, and process notes by Yunmin.');
 document.querySelector('meta[property="og:description"]').content=document.querySelector('meta[name="description"]').content;
 document.querySelector('link[rel="canonical"]').href='https://yunmin311.github.io/'+lang+'/';
 document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(/^\/(zh|en)\//.test(href))a.setAttribute('href',href.replace(/^\/(zh|en)\//,'/'+lang+'/'));});
 renderPosts();
 const oldProjects=projectBook.querySelector('.legacy-project-index');oldProjects?.remove();
 projectBook.querySelector('.book-pages')?.toggleAttribute('hidden',lang==='zh'&&config.recovered.projects.length>0);
 projectBook.querySelector('.project-tabs')?.toggleAttribute('hidden',lang==='zh'&&config.recovered.projects.length>0);
 if(lang==='zh'&&config.recovered.projects.length){const box=document.createElement('div');box.className='legacy-project-index';box.innerHTML=config.recovered.projects.map(p=>'<a href="'+esc(p.href)+'"><small>旧稿 · '+esc(p.status)+'</small><span>'+esc(p.title)+' ↗</span></a>').join('');projectBook.append(box);}
 for(const [id,key] of [['projects','reflections'],['learning','learning'],['repos','code']]){const host=document.getElementById(id);host.querySelectorAll('.live-language-index').forEach(el=>el.remove());const entries=config.liveByLocale?.[lang]?.[key]||[];if(!entries.length)continue;const box=document.createElement('div');box.className='legacy-project-index live-language-index';box.innerHTML=entries.map(e=>'<a href="'+to((key==='reflections'?'project-notes/':key==='code'?'repos/':'learning/')+e.slug+'/')+'"><span>'+esc(e.title)+' ↗</span><small>'+esc(e.summary)+'</small></a>').join('');host.append(box);}
 document.querySelectorAll('[data-zh]').forEach(el=>el.textContent=el.dataset[lang]);
 syncRuler();window.paperNavigation?.measure?.();window.paperScroll?.refresh();
}
languageButton.onclick=()=>{existingLanguage();refreshLanguage();history.pushState({paperLanguage:lang},'', '/'+lang+'/'+location.hash);};
addEventListener('popstate',()=>{const next=location.pathname.split('/')[1];if(['zh','en'].includes(next)&&next!==lang){existingLanguage();refreshLanguage();}});
document.querySelectorAll('[data-zh]').forEach(el=>el.textContent=el.dataset[locale==='zh'?'zh':'en']);document.querySelector('.language').textContent=locale==='zh'?'EN':'中';document.querySelectorAll('.zh-only').forEach(el=>el.hidden=locale==='en');
for(const button of document.querySelectorAll('[data-recovered]'))button.onclick=()=>go(to(button.dataset.recovered==='projects'?'projects/':button.dataset.recovered==='blog'?'blog/':'about/'));
let posts=config.content[locale].posts;const shelf=document.querySelector('.writing-list');
function renderPosts(){posts=config.content[lang].posts;
if(posts.length){shelf.innerHTML=posts.map(p=>'<button data-post-route="'+esc(p.href)+'"><span class="post-date">'+esc(p.date.replaceAll('-','.'))+'</span><span class="post-title">'+esc(p.title)+'</span><span class="post-type">'+(p.legacy?tr('旧稿正文','Earlier draft'):tr('文章','Article'))+'</span><span>↗</span></button>').join('');shelf.querySelectorAll('button').forEach(b=>b.onclick=()=>go(b.dataset.postRoute));}else shelf.innerHTML='<p class="paper-empty-note">'+tr('文章待补。','No articles in this language yet.')+'</p>';
}
renderPosts();
const projectBook=document.querySelector('.process-book');
if(locale==='zh'&&config.recovered.projects.length){const projects=document.createElement('div');projects.className='legacy-project-index';projects.innerHTML=config.recovered.projects.map(p=>'<a href="'+esc(p.href)+'"><small>旧稿 · '+esc(p.status)+'</small><span>'+esc(p.title)+' ↗</span></a>').join('');projectBook.append(projects);projectBook.querySelector('.book-pages')?.setAttribute('hidden','');projectBook.querySelector('.project-tabs')?.setAttribute('hidden','');}
const fillOriginal=fill;fill=function(){fillOriginal();const selected=index===0?config.content[lang].works:config.content[lang].posts;const item=detail?selected.find(p=>p.slug===detail.slug):null;if(item?.href){const a=document.createElement('a');a.className='route-link';a.href=item.href;a.textContent=tr('打开完整页面 ↗','Open full page ↗');reader.querySelector('.reading-detail')?.append(a);}window.paperScroll?.refresh();};
const sections=[['works','works/'],['projects','projects/'],['learning','learning/'],['repos','repos/'],['writing','blog/'],['about','about/']];
for(const [id,path] of sections){const section=document.getElementById(id),links=document.createElement('div');links.className='paper-route-links';links.innerHTML='<a href="'+to(path)+'">'+tr('打开完整页面 ↗','Open full page ↗')+'</a>';section.append(links);}
for(const [id,key]of [['projects','reflections'],['learning','learning'],['repos','code']]){const entries=config.live[key];if(!entries.length)continue;const host=document.getElementById(id),list=document.createElement('div');list.className='legacy-project-index live-language-index';list.innerHTML=entries.map(e=>'<a href="'+to((key==='reflections'?'project-notes/':key==='code'?'repos/':'learning/')+e.slug+'/')+'"><span>'+esc(e.title)+' ↗</span><small>'+esc(e.summary)+'</small></a>').join('');host.append(list);}
// No fake contact address is emitted. The original actual GitHub remains.
refreshLanguage();
window.paperProduction={stats:()=>({lang:locale,posts:posts.length,projects:locale==='zh'?config.recovered.projects.length:0,live:Object.fromEntries(Object.entries(config.live).map(([k,v])=>[k,v.length]))})};
})();
