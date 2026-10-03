(async()=>{
const data=JSON.parse(document.getElementById('paper-data').textContent),base='/assets/paper/';
const json=async url=>{const response=await fetch(url);if(!response.ok)throw Error('Asset unavailable: '+url);return response.json();};
try{
 const manifest=await json(base+'manifest.json');
 const [model,material,print,licenses]=await Promise.all([json(manifest.model).catch(()=>null),json(manifest.materialCache).catch(()=>null),json(manifest.printCache).catch(()=>null),json(base+'licenses.json')]);
 Object.assign(window,{PAPER_INITIAL_LANG:data.lang,PAPER_ROUTE_DATA:data,SITE_CONTENT:data.content,RECOVERED_CONTENT:data.recovered,PAPER_MODEL:model,PAPER_MATERIAL_CACHE:material,PAPER_PRINT_CACHE:print,PAPER_GENERATED_ASSETS:manifest.generated});
 document.getElementById('licenses').textContent=JSON.stringify(licenses);
 const runtime=document.createElement('script');runtime.src=base+'runtime.js';runtime.onload=()=>{if(window.paperProduction)document.body.dataset.paperReady='true';else fallback();};runtime.onerror=()=>fallback();document.body.append(runtime);
}catch(error){console.warn('Paper interaction loading:',error);fallback();}
function fallback(){document.body.classList.add('paper-fallback');document.querySelector('.loading').textContent=data.lang==='zh'?'交互暂时不可用，内容仍可阅读。':'Interaction is unavailable; content is still readable.';}
})();
