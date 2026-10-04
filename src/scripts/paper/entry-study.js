// Review-only composition experiment. The real scenes and controls remain mounted.
(()=>{
if(!new URLSearchParams(location.search).has('entry'))return;
const panel=document.createElement('div');panel.className='entry-study-controls';panel.setAttribute('role','group');panel.setAttribute('aria-label','首屏构图对照');panel.innerHTML='<button data-entry-mode="baseline" aria-pressed="false">定稿构图</button><button data-entry-mode="focus" aria-pressed="true">集中构图</button>';
document.body.append(panel);
function setMode(mode){document.body.classList.toggle('entry-focused',mode==='focus');panel.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.entryMode===mode)));window.paperNavigation?.measure?.();window.dispatchEvent(new Event('resize'));window.paperScroll?.refresh();}
panel.querySelectorAll('button').forEach(b=>b.onclick=()=>setMode(b.dataset.entryMode));setMode(new URLSearchParams(location.search).get('entry')==='baseline'?'baseline':'focus');
window.paperEntryStudy={setMode,stats:()=>({mode:document.body.classList.contains('entry-focused')?'focus':'baseline',live:true})};
})();
