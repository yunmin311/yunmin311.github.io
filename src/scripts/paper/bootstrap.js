(async()=>{
const data=JSON.parse(document.getElementById('paper-data').textContent),base='/assets/paper/';
const json=async url=>{const response=await fetch(url);if(!response.ok)throw Error('Asset unavailable: '+url);return response.json();};
const webpSupport=new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(image.width===1);image.onerror=()=>resolve(false);image.src='data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ7z53vf+BiOh/AAA=';});
function script(file){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=base+file;s.onload=resolve;s.onerror=reject;document.body.append(s);});}
function fallbackCards(){if(document.querySelector('.flat-card'))return;const stage=document.querySelector('.stage');stage.querySelectorAll('canvas').forEach(c=>c.remove());stage.classList.add('flat-cards');stage.querySelector('.loading').hidden=true;const titles=data.lang==='zh'?['作品','文字','探索']:['Works','Writing','Explore'];stage.insertAdjacentHTML('beforeend',titles.map((title,i)=>'<button class="flat-card" data-flat="'+i+'" data-zh="'+['作品','文字','探索'][i]+'" data-en="'+['Works','Writing','Explore'][i]+'">'+title+' ↗</button>').join(''));window.selectPaper=i=>window.onPaperSelect?.(i);window.closePaper=()=>{};window.setFrontPaper=i=>{stage.dataset.front=i;};stage.querySelectorAll('[data-flat]').forEach(b=>b.onclick=()=>window.selectPaper(+b.dataset.flat));window.paperModelMotion={stats:()=>({ready:true,fallback:true})};}
window.paperFlatFallback=fallbackCards;
try{
 const manifest=await json(base+'manifest.json');
 const [model,material,print]=await Promise.all([json(manifest.model).catch(()=>null),webpSupport.then(supported=>json(supported?base+'material-experiment.json':manifest.materialCache)).catch(()=>json(manifest.materialCache)).catch(()=>null),json(manifest.printCache).catch(()=>null)]);
 Object.assign(window,{PAPER_INITIAL_LANG:data.lang,PAPER_ROUTE_DATA:data,SITE_CONTENT:data.content,RECOVERED_CONTENT:data.recovered,PAPER_MODEL:model,PAPER_MATERIAL_CACHE:material,PAPER_PRINT_CACHE:print,PAPER_GENERATED_ASSETS:manifest.generated});
 // Start cloud/material initialization without waiting for controls or the model.
 script('print.js').catch(()=>{});
  // The approved printed atlas is the first diffuse texture, not a late replacement.
  if(innerWidth>=900&&matchMedia('(pointer:fine)').matches&&model&&print?.atlas){
   const indices=new Set((model.materials||[]).map(m=>m.pbrMetallicRoughness?.baseColorTexture?.index).filter(i=>i!==undefined));
   for(const i of indices){const source=model.textures?.[i]?.source;if(source!==undefined&&model.images?.[source])model.images[source].uri=print.atlas;}
   if(indices.size)window.PAPER_INITIAL_PRINT_ATLAS=print.atlas;
  }
 script('scene.js').then(()=>{if(!window.paperModelMotion)fallbackCards();}).catch(fallbackCards);
 await script('runtime.js');
 if(!window.paperProduction)throw Error('Controls unavailable');
 document.body.dataset.paperReady='true';
 json(base+'licenses.json').then(value=>document.getElementById('licenses').textContent=JSON.stringify(value)).catch(()=>{});
}catch(error){console.warn('Paper interaction loading:',error);document.body.classList.add('paper-fallback');document.querySelector('.loading').textContent=data.lang==='zh'?'交互暂时不可用，内容仍可阅读。':'Interaction is unavailable; content is still readable.';}
})();
