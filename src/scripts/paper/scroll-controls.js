// One page-edge ruler owns the currently scrollable reading surface.
(()=>{
const edge=document.querySelector('.page-ruler');if(!edge)return;
const slider=edge.querySelector('.ruler-slider'),thumb=edge.querySelector('.ruler-thumb'),caption=edge.querySelector('.ruler-caption'),ticks=edge.querySelector('.ruler-ticks');
const root=document.scrollingElement,homeBody=document.body;let target=root,owner=null,pointing=null,raf=0,drag=false;
const originalSync=typeof syncRuler==='function'?syncRuler:null;
edge.setAttribute('popover','manual');
const zh=()=>document.documentElement.lang.startsWith('zh');
const maximum=el=>Math.max(0,el.scrollHeight-el.clientHeight);
const visible=el=>el&&el.isConnected&&!el.hidden&&!el.closest('[inert]')&&getComputedStyle(el).visibility!=='hidden'&&el.getBoundingClientRect().height>0;
function active(){
 const modal=[...document.querySelectorAll('dialog[open]')].filter(visible).at(-1);
 if(modal?.matches('.music-panel')&&maximum(modal)<2)return root;
 if(modal)return modal;
 const reader=document.querySelector('.look.open .reader');if(visible(reader))return reader;
 if(visible(pointing)&&maximum(pointing)>1)return pointing;
 return root;
}
function position(){if(target===root&&originalSync){originalSync();return;}
 const max=maximum(target),value=max?Math.round(target.scrollTop/max*100):0,h=slider.getBoundingClientRect().height,y=16+value/100*(h-32);
 thumb.style.transform='translateY('+(y-5)+'px)';caption.style.top=(y-18)+'px';caption.textContent=zh()?'阅读':'Reading';slider.setAttribute('aria-valuemin','0');slider.setAttribute('aria-valuemax','100');slider.setAttribute('aria-valuenow',String(value));slider.setAttribute('aria-valuetext',value+'%');slider.setAttribute('aria-label',zh()?'阅读进度':'Reading progress');const marks=[...ticks.children];marks.forEach((mark,i)=>mark.classList.toggle('current',i===Math.round(value/100*(marks.length-1))));
}
function refresh(){raf=0;target=active();owner=target!==root?target.closest('dialog'):null;
 const host=owner||(target!==root?target:homeBody);if(edge.parentElement!==host){if(edge.matches(':popover-open'))edge.hidePopover();host.append(edge);}
 const scrollable=maximum(target)>1&&!window.paperGalleryOpen;
 if(!scrollable){if(edge.matches(':popover-open'))edge.hidePopover();return;}
 if(!edge.matches(':popover-open'))edge.showPopover();edge.dataset.scrollScope=target===root?'page':'panel';
 slider.setAttribute('role','slider');slider.tabIndex=0;edge.setAttribute('aria-hidden','false');slider.setAttribute('aria-orientation','vertical');
 if(target===root&&originalSync){slider.setAttribute('aria-valuemin','0');slider.setAttribute('aria-valuemax',String(chapterIds.length-1));}
 position();
}
function schedule(){if(!raf)raf=requestAnimationFrame(refresh);}
function fraction(event){const r=slider.getBoundingClientRect();return Math.max(0,Math.min(1,(event.clientY-r.top-16)/(r.height-32)));}
function setFraction(value){target.scrollTo({top:Math.max(0,Math.min(1,value))*maximum(target),behavior:'instant'});position();}
function managed(){return target!==root||!originalSync;}
slider.addEventListener('pointerdown',event=>{if(!managed()||event.button!==0)return;event.preventDefault();event.stopImmediatePropagation();drag=true;slider.focus({preventScroll:true});slider.setPointerCapture(event.pointerId);setFraction(fraction(event));},{capture:true});
slider.addEventListener('pointermove',event=>{if(!drag)return;event.stopImmediatePropagation();setFraction(fraction(event));},{capture:true});
for(const type of ['pointerup','pointercancel','lostpointercapture'])slider.addEventListener(type,event=>{if(drag){drag=false;event.stopImmediatePropagation();}},{capture:true});
slider.addEventListener('keydown',event=>{if(!managed())return;const direction=['ArrowDown','ArrowRight','PageDown'].includes(event.key)?1:['ArrowUp','ArrowLeft','PageUp'].includes(event.key)?-1:0;if(!direction&&!['Home','End'].includes(event.key))return;event.preventDefault();event.stopImmediatePropagation();const max=maximum(target),step=event.key.startsWith('Page')?target.clientHeight*.8:60;setFraction(event.key==='Home'?0:event.key==='End'?1:max?(target.scrollTop+direction*step)/max:0);},{capture:true});
document.addEventListener('scroll',schedule,{capture:true,passive:true});addEventListener('resize',schedule);
document.addEventListener('pointerover',event=>{if(event.target.closest?.('.page-ruler'))return;pointing=event.composedPath().find(el=>el instanceof HTMLElement&&el!==homeBody&&maximum(el)>1&&['auto','scroll'].includes(getComputedStyle(el).overflowY))||null;schedule();},{passive:true});
new MutationObserver(records=>{if(records.some(r=>r.type==='attributes'||[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1)))schedule();}).observe(homeBody,{childList:true,subtree:true,attributes:true,attributeFilter:['open','inert']});const look=document.querySelector('.look');if(look)new MutationObserver(schedule).observe(look,{attributes:true,attributeFilter:['class']});
if(originalSync)syncRuler=function(){if(target!==root)position();else originalSync();};
window.paperScroll={refresh:schedule,stats:()=>({scope:target===root?'page':'panel',target:target.className||'document',max:maximum(target),top:target.scrollTop,shown:edge.matches(':popover-open')})};schedule();
})();
